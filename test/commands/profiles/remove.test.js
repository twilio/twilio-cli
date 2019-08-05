
const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const ProfilesRemove = require('../../../src/commands/profiles/remove');

describe('commands', () => {
  describe('profiles', () => {
    describe('remove', () => {
      const setup = (commandArgs = [], { addProfiles = 4, deleteProfile = true, deleteKey = true, removeCred = true } = {}) => test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          for (var i = 1; i <= addProfiles; i++) {
            ctx.userConfig.addProfile('profile' + i, constants.FAKE_ACCOUNT_SID);
          }
        })
        .twilioCliEnv(Config)
        .twilioCreateCommand(ProfilesRemove, commandArgs)
        .stdout()
        .stderr()
        .do(ctx => {
          const fakePrompt = sinon.stub();
          fakePrompt
            .onFirstCall()
            .resolves({
              affirmative: deleteProfile
            })
            .onSecondCall()
            .resolves({
              affirmative: deleteKey
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
        })
        .do(ctx => {
          ctx.testCmd.secureStorage.removeCredentials = () => {
            return removeCred;
          };
        });

      setup(['profile2'], { deleteKey: false })
        .do(ctx => ctx.testCmd.run())
        .it('run profiles:remove with a profile and delets local key but keep remote key', ctx => {
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The API Key for profile2 profile still exists in The Twilio console');
          expect(ctx.stderr).to.contain('Deleted profile2');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['profile3'], { removeCred: false, deleteKey: false })
        .do(ctx => ctx.testCmd.run())
        .it('run profiles:remove with a profile and fails to delete both keys', ctx => {
          expect(ctx.stderr).to.contain('Could not delete local key');
          expect(ctx.stderr).to.contain('The API Key for profile3 profile still exists in The Twilio console.');
          expect(ctx.stderr).to.contain('Deleted profile3');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['profile1'])
        .nock('https://api.twilio.com', api => {
          api.delete(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys/${constants.FAKE_API_KEY}.json`).reply(200, {
            sid: constants.FAKE_API_KEY,
            secret: constants.FAKE_API_SECRET
          });
        })
        .do(ctx => ctx.testCmd.run())
        .it('run profiles:remove with the active profile and deletes both keys', ctx => {
          expect(ctx.stderr).to.contain('remove the active profile');
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The API Key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted profile1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['profile2'])
        .do(ctx => ctx.testCmd.run())
        .it('run profiles:remove with profile and deletes local key but can not delete remote key', ctx => {
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('Could not delete the API Key.');
          expect(ctx.stderr).to.contain('Deleted profile2');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['profile2'], { deleteProfile: false })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run profiles:remove with a profile and decide not to remove profile', ctx => {
          expect(ctx.stderr).to.contain('Cancelled');
        });

      setup(['profile1'], { addProfiles: 1 })
        .nock('https://api.twilio.com', api => {
          api.delete(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys/${constants.FAKE_API_KEY}.json`).reply(200, {
            sid: constants.FAKE_API_KEY,
            secret: constants.FAKE_API_SECRET
          });
        })
        .do(ctx => ctx.testCmd.run())
        .it('run profiles:remove with the last configured profile and delete all keys', ctx => {
          expect(ctx.stderr).to.contain('remove the active profile');
          expect(ctx.stderr).to.contain('remove the last profile');
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The API Key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted profile1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['invalidProfile'])
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run profiles:remove with non-existing profile', ctx => {
          expect(ctx.stderr).to.contain('does not exist');
        });
    });
  });
});
