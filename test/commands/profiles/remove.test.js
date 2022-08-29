const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ProfilesRemove = require('../../../src/commands/profiles/remove');

describe('commands', () => {
  describe('profiles', () => {
    describe('remove', () => {
      const setup = (
        commandArgs = [],
        { addProfiles = 3, deleteProfile = true, deleteKey = true, setActiveProfile = '' } = {},
      ) =>
        test
          .do((ctx) => {
            ctx.userConfig = new ConfigData();
            for (let i = 1; i <= addProfiles; i++) {
              ctx.userConfig.addProfile(
                `configProfile${i}`,
                constants.FAKE_ACCOUNT_SID,
                '',
                `${constants.FAKE_API_KEY}configProfile${i}`,
                constants.FAKE_API_SECRET,
              );
            }
          })
          .do((ctx) => {
            if (setActiveProfile) {
              ctx.userConfig.setActiveProfile(setActiveProfile);
            }
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(ProfilesRemove, commandArgs)
          .stdout()
          .stderr()
          .do((ctx) => {
            const fakePrompt = sinon.stub();
            fakePrompt
              .onFirstCall()
              .resolves({
                affirmative: deleteProfile,
              })
              .onSecondCall()
              .resolves({
                affirmative: deleteKey,
              });
            ctx.testCmd.inquirer.prompt = fakePrompt;
          });

      setup(['configProfile1'], { deleteKey: false })
        .do((ctx) => {
          process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
          process.env.TWILIO_AUTH_TOKEN = constants.FAKE_API_SECRET;
          return ctx.testCmd.run();
        })
        .it('run profiles:remove with environment variables set with profile in config', (ctx) => {
          expect(ctx.stderr).to.contain('The API Key for configProfile1 profile still exists in The Twilio console');
          expect(ctx.stderr).to.contain('Deleted configProfile1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['configProfile2'], { deleteKey: false, setActiveProfile: 'configProfile1' })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with a profile in config file', (ctx) => {
          expect(ctx.stderr).to.contain('The API Key for configProfile2 profile still exists in The Twilio console');
          expect(ctx.stderr).to.contain('Deleted configProfile2');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['configProfile1'], { setActiveProfile: 'configProfile1' })
        .nock('https://api.twilio.com', (api) => {
          api
            .delete(
              `/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys/${constants.FAKE_API_KEY}configProfile1.json`,
            )
            .reply(200, {
              sid: constants.FAKE_API_KEY,
              secret: constants.FAKE_API_SECRET,
            });
        })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with the active profile and delete config profile', (ctx) => {
          expect(ctx.stderr).to.contain('remove the active profile');
          expect(ctx.stderr).to.contain('The API Key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted configProfile1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['configProfile2'], { setActiveProfile: 'configProfile2' })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with profile and deletes local key', (ctx) => {
          expect(ctx.stderr).to.contain('Could not delete the API Key.');
          expect(ctx.stderr).to.contain('Deleted configProfile2');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['configProfile2'], { deleteProfile: false, setActiveProfile: 'configProfile1' })
        .do((ctx) => ctx.testCmd.run())
        .catch(/Cancelled/)
        .it('run profiles:remove with a profile and decide not to remove profile');

      setup(['configProfile1'], { addProjects: 0, addProfiles: 1, setActiveProfile: 'configProfile1' })
        .nock('https://api.twilio.com', (api) => {
          api
            .delete(
              `/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys/${constants.FAKE_API_KEY}configProfile1.json`,
            )
            .reply(200, {
              sid: constants.FAKE_API_KEY,
              secret: constants.FAKE_API_SECRET,
            });
        })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with the last configured profile in config file and delete all keys', (ctx) => {
          expect(ctx.stderr).to.contain('remove the active profile');
          expect(ctx.stderr).to.contain('remove the last profile');
          expect(ctx.stderr).to.contain('The API Key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted configProfile1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['invalidProfile'], { setActiveProfile: 'configProfile1' })
        .do((ctx) => ctx.testCmd.run())
        .catch(/does not exist/)
        .it('run profiles:remove with non-existing profile');
    });
  });
});
