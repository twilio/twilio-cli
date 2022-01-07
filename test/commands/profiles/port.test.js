const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ProfilesPort = require('../../../src/commands/profiles/port');

describe('commands', () => {
  describe('profiles', () => {
    describe('port', () => {
      const setup = (
        commandArgs = [],
        { addProjects = 4, addProfiles = 3, portProfiles = true, removeCred = true, getCreds = true } = {},
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
          .twilioCliEnv(Config)
          .twilioCreateCommand(ProfilesPort, commandArgs)
          .stdout()
          .stderr()
          .do((ctx) => {
            const fakePrompt = sinon.stub();
            fakePrompt.onFirstCall().resolves({
              confirmation: portProfiles,
            });

            ctx.testCmd.inquirer.prompt = fakePrompt;
          })
          .do((ctx) => {
            ctx.testCmd.secureStorage.removeCredentials = () => {
              return removeCred;
            };
          })
          .do((ctx) => {
            ctx.testCmd.secureStorage.getCredentials = (projectId) => {
              return {
                apiKey: getCreds === true ? constants.FAKE_API_KEY : 'error',
                apiSecret: getCreds === true ? constants.FAKE_API_SECRET : 'error_message',
              };
            };
          });

      setup([], { portProfiles: true, removeCred: true })
        .do((ctx) => ctx.testCmd.run())
        .it('should port all projects to profiles in config', (ctx) => {
          expect(ctx.testCmd.userConfig.projects).to.have.length(0);
          expect(Object.keys(ctx.testCmd.userConfig.profiles)).to.have.length(7);
          expect(ctx.stderr).to.contain('Profiles port process complete!');
          expect(ctx.stderr).to.not.contain('All profiles already ported to config file!');
          expect(ctx.stderr).to.not.contain('Failed: Unable to retrieve credentials from Keytar.');
        });

      setup(['profile3'], { portProfiles: true, removeCred: true })
        .do((ctx) => ctx.testCmd.run())
        .it('Should only port profile3 to profiles', (ctx) => {
          expect(ctx.testCmd.userConfig.projects).to.have.length(3);
          expect(Object.keys(ctx.testCmd.userConfig.profiles)).to.have.length(4);
          expect(ctx.stderr).to.not.contain('All profiles already ported to config file!');
          expect(ctx.stderr).to.not.contain('Failed: Unable to retrieve credentials from Keytar.');
          expect(ctx.testCmd.userConfig.profiles.profile3.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
          expect(ctx.testCmd.userConfig.profiles.profile3.region).to.be.undefined;
          expect(ctx.testCmd.userConfig.profiles.profile3.apiKey).to.equal(constants.FAKE_API_KEY);
          expect(ctx.testCmd.userConfig.profiles.profile3.apiSecret).to.equal(constants.FAKE_API_SECRET);
        });

      setup(['profileNotExisting'], { portProfiles: true, removeCred: true })
        .do((ctx) => ctx.testCmd.run())
        .it('should not port any non-existing profile', (ctx) => {
          expect(ctx.testCmd.userConfig.projects).to.have.length(4);
          expect(Object.keys(ctx.testCmd.userConfig.profiles)).to.have.length(3);
          expect(ctx.stderr).to.contain(
            "Unable to port keys for profile profileNotExisting since it doesn't exist or has already been ported!",
          );
        });

      setup(['profile1'], { portProfiles: true, removeCred: false })
        .do((ctx) => ctx.testCmd.run())
        .it('should ignore keytar profile removal', (ctx) => {
          expect(ctx.stderr).to.contain('Unable to clean-up credentials from keytar for profile profile1');
          expect(ctx.stderr).to.contain('Porting profile1... Done!');
          expect(ctx.testCmd.userConfig.projects).to.have.length(3);
          expect(Object.keys(ctx.testCmd.userConfig.profiles)).to.have.length(4);
          expect(ctx.testCmd.userConfig.profiles.profile1.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
          expect(ctx.testCmd.userConfig.profiles.profile1.region).to.be.undefined;
          expect(ctx.testCmd.userConfig.profiles.profile1.apiKey).to.equal(constants.FAKE_API_KEY);
          expect(ctx.testCmd.userConfig.profiles.profile1.apiSecret).to.equal(constants.FAKE_API_SECRET);
        });

      setup([], { portProfiles: false })
        .do((ctx) => ctx.testCmd.run())
        .it('should not not initiate port process if not confirmed by user', (ctx) => {
          expect(ctx.stderr).to.contain('Abort!');
          expect(ctx.stderr).to.not.contain('Profiles port process complete!');
          expect(ctx.testCmd.userConfig.projects).to.have.length(4);
          expect(Object.keys(ctx.testCmd.userConfig.profiles)).to.have.length(3);
        });

      setup([], { addProjects: 0, portProfiles: true, removeCred: true })
        .do((ctx) => ctx.testCmd.run())
        .it('should inform in case of no profiles to port', (ctx) => {
          expect(ctx.testCmd.userConfig.projects).to.have.length(0);
          expect(Object.keys(ctx.testCmd.userConfig.profiles)).to.have.length(3);
          expect(ctx.stderr).to.contain('No profiles have keys in keytar. Nothing to do.');
        });

      setup(['profile2'], { portProfiles: true, removeCred: true, getCreds: false })
        .do((ctx) => ctx.testCmd.run())
        .it('Should not port profile in case credentials can not be fetched from keytar', (ctx) => {
          expect(ctx.testCmd.userConfig.projects).to.have.length(4);
          expect(Object.keys(ctx.testCmd.userConfig.profiles)).to.have.length(3);
          expect(ctx.stderr).to.contain('Porting profile2... Failed: Unable to retrieve credentials from keytar.');
        });
    });
  });
});
