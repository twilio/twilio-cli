const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ProfilesRemove = require('../../../src/commands/profiles/remove');

describe('commands', () => {
  describe('profiles', () => {
    describe('remove', () => {
      const setup = (
        commandArgs = [],
        {
          addProjects = 4,
          addProfiles = 3,
          deleteProfile = true,
          deleteKey = true,
          removeCred = true,
          setActiveProfile = '',
        } = {},
      ) =>
        test
          .do((ctx) => {
            ctx.userConfig = new ConfigData();
            for (let i = 1; i <= addProjects; i++) {
              ctx.userConfig.addProject(`profile${i}`, constants.FAKE_ACCOUNT_SID);
            }
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
          })
          .do((ctx) => {
            ctx.testCmd.secureStorage.removeCredentials = () => {
              return removeCred;
            };
          });

      setup(['profile2'], { deleteKey: false })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with a profile in keytar and deletes local key but keep remote key', (ctx) => {
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The API Key for profile2 profile still exists in The Twilio console');
          expect(ctx.stderr).to.contain('Deleted profile2');
          expect(ctx.stderr).to.contain('configuration saved');
        });
      setup(['configProfile2'], { deleteKey: false })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with a profile in config file but keep remote key', (ctx) => {
          expect(ctx.stderr).to.contain('The API Key for configProfile2 profile still exists in The Twilio console');
          expect(ctx.stderr).to.contain('Deleted configProfile2');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['profile3'], { removeCred: false, deleteKey: false })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with a profile and fails to delete both keys', (ctx) => {
          expect(ctx.stderr).to.contain('Could not delete local key');
          expect(ctx.stderr).to.contain('The API Key for profile3 profile still exists in The Twilio console.');
          expect(ctx.stderr).to.contain('Deleted profile3');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['profile1'])
        .nock('https://api.twilio.com', (api) => {
          api
            .delete(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys/${constants.FAKE_API_KEY}.json`)
            .reply(200, {
              sid: constants.FAKE_API_KEY,
              secret: constants.FAKE_API_SECRET,
            });
        })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with the active profile and deletes both keys', (ctx) => {
          expect(ctx.stderr).to.contain('remove the active profile');
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The API Key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted profile1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['configProfile1'], { addProjects: 0, setActiveProfile: 'configProfile1' })
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
        .it('run profiles:remove with the active profile and deletes both remote keys and config profile', (ctx) => {
          expect(ctx.stderr).to.contain('remove the active profile');
          expect(ctx.stderr).to.contain('The API Key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted configProfile1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['profile2'])
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with profile and deletes local key but can not delete remote key', (ctx) => {
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('Could not delete the API Key.');
          expect(ctx.stderr).to.contain('Deleted profile2');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['profile2'], { deleteProfile: false })
        .do((ctx) => ctx.testCmd.run())
        .catch(/Cancelled/)
        .it('run profiles:remove with a profile and decide not to remove profile');

      setup(['profile1'], { addProjects: 1, addProfiles: 0 })
        .nock('https://api.twilio.com', (api) => {
          api
            .delete(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys/${constants.FAKE_API_KEY}.json`)
            .reply(200, {
              sid: constants.FAKE_API_KEY,
              secret: constants.FAKE_API_SECRET,
            });
        })
        .do((ctx) => ctx.testCmd.run())
        .it('run profiles:remove with the last configured profile in keytar and delete all keys', (ctx) => {
          expect(ctx.stderr).to.contain('remove the active profile');
          expect(ctx.stderr).to.contain('remove the last profile');
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The API Key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted profile1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

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

      setup(['invalidProfile'])
        .do((ctx) => ctx.testCmd.run())
        .catch(/does not exist/)
        .it('run profiles:remove with non-existing profile');
    });
  });
});
