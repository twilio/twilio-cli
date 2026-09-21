/* eslint no-unused-expressions: 0 */
const os = require('os');

const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ProfilesCreate = require('../../../src/commands/profiles/create');
const helpMessages = require('../../../src/services/messaging/help-messages');

describe('commands', () => {
  describe('profiles', () => {
    describe('create', () => {
      const createTest = (commandArgs = [], { profileId = 'default', addProjects = [] } = {}) =>
        test
          .twilioFakeProfile(ConfigData)
          .do((ctx) => {
            ctx.userConfig = new ConfigData();
            addProjects.forEach((project) => ctx.userConfig.addProject(project, constants.FAKE_ACCOUNT_SID));
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(ProfilesCreate, commandArgs)
          .stdout()
          .stderr()
          .do((ctx) => {
            const fakePrompt = sinon.stub();
            fakePrompt
              .onFirstCall()
              .resolves({
                accountSid: constants.FAKE_ACCOUNT_SID,
                authToken: '0'.repeat(32),
              })
              .onSecondCall()
              .resolves({
                profileId,
              })
              .onThirdCall()
              .resolves({
                overwrite: true,
              });
            ctx.testCmd.inquirer.prompt = fakePrompt;
          });

      const mockCredentialValidation = (api) => {
        api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}.json`).reply(200, {
          sid: constants.FAKE_ACCOUNT_SID,
        });
      };

      const mockKeyCreation = (api) => {
        api
          .post('/v1/Keys', (body) => {
            const params = typeof body === 'string' ? Object.fromEntries(new URLSearchParams(body)) : body;
            return params.AccountSid === constants.FAKE_ACCOUNT_SID && Boolean(params.FriendlyName);
          })
          .reply(201, {
            sid: constants.FAKE_API_KEY,
            secret: constants.FAKE_API_SECRET,
          });
      };

      afterEach(() => {
        sinon.restore();
      });

      createTest()
        .nock('https://api.twilio.com', mockCredentialValidation)
        .nock('https://iam.twilio.com', mockKeyCreation)
        .do((ctx) => ctx.testCmd.run())
        .it('runs profiles:create', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain(helpMessages.AUTH_TOKEN_NOT_SAVED);
          expect(ctx.stderr).to.contain('Saved default.');
          expect(ctx.stderr).to.contain('configuration saved');
          expect(ctx.stderr).to.contain(`Created API Key ${constants.FAKE_API_KEY} and stored the secret in Config.`);
          expect(ctx.stderr).to.contain(
            `See: https://www.twilio.com/console/runtime/api-keys/${constants.FAKE_API_KEY}`,
          );
        });

      createTest([], { profileId: 'profile1', addProjects: ['profile1'] })
        .nock('https://api.twilio.com', mockCredentialValidation)
        .nock('https://iam.twilio.com', mockKeyCreation)
        .do((ctx) => ctx.testCmd.run())
        .it('runs profiles:create with existing profile in Projects', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain(helpMessages.AUTH_TOKEN_NOT_SAVED);
          expect(ctx.stderr).to.contain('Saved profile1.');
          expect(ctx.stderr).to.contain('configuration saved');
          expect(ctx.stderr).to.contain(`Created API Key ${constants.FAKE_API_KEY} and stored the secret in Config.`);
          expect(ctx.stderr).to.contain(
            `See: https://www.twilio.com/console/runtime/api-keys/${constants.FAKE_API_KEY}`,
          );
        });

      createTest([], { profileId: 'profile1', addProjects: ['profile1'], removeCred: false })
        .nock('https://api.twilio.com', mockCredentialValidation)
        .nock('https://iam.twilio.com', mockKeyCreation)
        .do((ctx) => ctx.testCmd.run())
        .it('runs profiles:create with existing profile in Projects with Keytar remove failed', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain(helpMessages.AUTH_TOKEN_NOT_SAVED);
          expect(ctx.stderr).to.contain('Saved profile1.');
          expect(ctx.stderr).to.contain('configuration saved');
          expect(ctx.stderr).to.contain(`Created API Key ${constants.FAKE_API_KEY} and stored the secret in Config.`);
          expect(ctx.stderr).to.contain(
            `See: https://www.twilio.com/console/runtime/api-keys/${constants.FAKE_API_KEY}`,
          );
        });

      createTest()
        .do((ctx) => {
          sinon.stub(os, 'hostname').returns('some_super_long_fake_hostname');
          sinon.stub(os, 'userInfo').returns({
            username: 'some_super_long_fake_username',
          });
          ctx.returned = ctx.testCmd.getApiKeyFriendlyName();
        })
        .it('truncates apiKeyFriendlyName to 64 characters', (ctx) => {
          expect(ctx.returned.length).to.equal(64);
          expect(ctx.returned).to.equal('twilio-cli for some_super_long_fake_username on some_super_long_');
        });

      createTest()
        .do((ctx) => {
          sinon.stub(os, 'hostname').returns('host');
          sinon.stub(os, 'userInfo').throws('no username');
          return ctx.testCmd.run();
        })
        .exit(1)
        .it('handles bad user info', (ctx) => {
          const friendlyName = ctx.testCmd.getApiKeyFriendlyName();
          expect(friendlyName).to.equal('twilio-cli on host');
        });

      createTest(['not-an-account-sid'])
        .do((ctx) => {
          const fakePrompt = ctx.testCmd.inquirer.prompt;
          fakePrompt.onFirstCall().resolves({
            authToken: constants.FAKE_API_SECRET,
          });

          return ctx.testCmd.run();
        })
        .catch(/Account SID must be "AC"/)
        .it('fails for invalid account SIDs');

      createTest()
        .do((ctx) => {
          const fakePrompt = ctx.testCmd.inquirer.prompt;
          fakePrompt.onFirstCall().resolves({
            accountSid: constants.FAKE_ACCOUNT_SID,
            authToken: '0',
          });

          return ctx.testCmd.run();
        })
        .catch(/Auth Token must be 32/)
        .it('fails for invalid Auth Tokens');

      createTest(['--skip-parameter-validation'])
        .nock('https://api.twilio.com', mockCredentialValidation)
        .nock('https://iam.twilio.com', mockKeyCreation)
        .do((ctx) => {
          const fakePrompt = ctx.testCmd.inquirer.prompt;
          fakePrompt.onFirstCall().resolves({
            accountSid: constants.FAKE_ACCOUNT_SID,
            authToken: 'blurgh',
          });

          return ctx.testCmd.run();
        })
        .it('can skip parameter validation', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      createTest()
        .do((ctx) => {
          process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
          process.env.TWILIO_API_KEY = constants.FAKE_API_KEY;
          process.env.TWILIO_API_SECRET = constants.FAKE_API_SECRET;

          const fakePrompt = ctx.testCmd.inquirer.prompt;
          fakePrompt.onThirdCall().resolves({
            affirmative: false,
          });

          return ctx.testCmd.run();
        })
        .exit(1)
        .it('prompts when creating default profile with env vars set', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('Cancelled');
        });

      createTest()
        .nock('https://api.twilio.com', (api) => {
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}.json`).reply(500, {
            error: 'oops',
          });
        })
        .do((ctx) => ctx.testCmd.run())
        .exit(1)
        .it('fails for invalid credentials', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('Could not validate the provided credentials');
        });

      createTest()
        .nock('https://api.twilio.com', (api) => {
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}.json`).reply(200, {
            sid: constants.FAKE_ACCOUNT_SID,
          });
        })
        .nock('https://iam.twilio.com', (api) => {
          api.post('/v1/Keys').reply(500, {
            error: 'oops',
          });
        })
        .do((ctx) => ctx.testCmd.run())
        .catch(/Could not create an API Key/)
        .it('fails to create an API key');

      createTest(['--region', 'dev', '--edge', 'sydney'])
        .nock('https://api.sydney.dev.twilio.com', mockCredentialValidation)
        .nock('https://iam.sydney.dev.twilio.com', mockKeyCreation)
        .do(async (ctx) => ctx.testCmd.run())
        .it('supports other regions', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      createTest(['--region', 'unknown-region'])
        .nock('https://api.unknown-region.twilio.com', mockCredentialValidation)
        .nock('https://iam.unknown-region.twilio.com', mockKeyCreation)
        .do(async (ctx) => ctx.testCmd.run())
        .it('allows unmapped regions without edge', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('configuration saved');
          expect(ctx.stderr).not.to.contain('Deprecation Warning');
        });
    });
  });
});
