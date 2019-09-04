/* eslint no-unused-expressions: 0 */
const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const ProfilesAdd = require('../../../src/commands/profiles/add');
const helpMessages = require('../../../src/services/messaging/help-messages');

describe('commands', () => {
  describe('profiles', () => {
    describe('add', () => {
      const addTest = (commandArgs = [], profileId = 'default') =>
        test
          .twilioFakeProfile(ConfigData)
          .twilioCliEnv(Config)
          .twilioCreateCommand(ProfilesAdd, commandArgs)
          .stdout()
          .stderr()
          .do(ctx => {
            const fakePrompt = sinon.stub();
            fakePrompt
              .onFirstCall()
              .resolves({
                profileId
              })
              .onSecondCall()
              .resolves({
                overwrite: true
              })
              .onThirdCall()
              .resolves({
                accountSid: constants.FAKE_ACCOUNT_SID,
                authToken: constants.FAKE_API_SECRET
              });
            ctx.testCmd.inquirer.prompt = fakePrompt;
          });

      addTest()
        .nock('https://api.twilio.com', api => {
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}.json`).reply(200, {
            sid: constants.FAKE_ACCOUNT_SID
          });
          api.post(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys.json`).reply(200, {
            sid: constants.FAKE_API_KEY,
            secret: constants.FAKE_API_SECRET
          });
        })
        .do(ctx => ctx.testCmd.run())
        .it('runs profiles:add', ctx => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain(helpMessages.AUTH_TOKEN_NOT_SAVED);
          expect(ctx.stderr).to.contain('Saved default.');
          expect(ctx.stderr).to.contain('configuration saved');
          expect(ctx.stderr).to.contain(
            `Created API Key ${constants.FAKE_API_KEY} and stored the secret using libsecret`
          );
          expect(ctx.stderr).to.contain(
            `See: https://www.twilio.com/console/runtime/api-keys/${constants.FAKE_API_KEY}`
          );
        });

      addTest(['not-an-account-sid'])
        .do(ctx => {
          const fakePrompt = ctx.testCmd.inquirer.prompt;
          fakePrompt.onThirdCall().resolves({
            authToken: constants.FAKE_API_SECRET
          });

          return ctx.testCmd.run();
        })
        .catch(/Account SID must be "AC"/)
        .it('fails for invalid account SIDs');

      addTest()
        .do(ctx => {
          process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
          process.env.TWILIO_API_KEY = constants.FAKE_API_KEY;
          process.env.TWILIO_API_SECRET = constants.FAKE_API_SECRET;

          const fakePrompt = ctx.testCmd.inquirer.prompt;
          fakePrompt.onSecondCall().resolves({
            affirmative: false
          });

          return ctx.testCmd.run();
        })
        .exit(1)
        .it('prompts when adding default profile with env vars set', ctx => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('Cancelled');
        });

      addTest()
        .nock('https://api.twilio.com', api => {
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}.json`).reply(500, {
            error: 'oops'
          });
        })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('fails for invalid credentials', ctx => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('Could not validate the provided credentials');
        });

      addTest()
        .nock('https://api.twilio.com', api => {
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}.json`).reply(200, {
            sid: constants.FAKE_ACCOUNT_SID
          });
          api.post(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys.json`).reply(500, {
            error: 'oops'
          });
        })
        .do(ctx => ctx.testCmd.run())
        .catch(/Could not create an API Key/)
        .it('fails to create an API key');

      addTest(['--region', 'dev'])
        .nock('https://api.dev.twilio.com', api => {
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}.json`).reply(200, {
            sid: constants.FAKE_ACCOUNT_SID
          });
          api.post(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys.json`).reply(200, {
            sid: constants.FAKE_API_KEY,
            secret: constants.FAKE_API_SECRET
          });
        })
        .do(async ctx => ctx.testCmd.run())
        .it('supports other regions', ctx => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('configuration saved');
        });
    });
  });
});
