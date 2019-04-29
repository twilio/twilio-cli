/* eslint no-unused-expressions: 0 */
const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config } = require('@twilio/cli-core').services.config;
const ProjectAdd = require('../../../src/commands/project/add');
const helpMessages = require('../../../src/services/messaging/help-messages');

describe('commands', () => {
  describe('project', () => {
    describe('add', () => {
      const addTest = (commandArgs = []) => test
        .twilioCliEnv(Config)
        .twilioCreateCommand(ProjectAdd, commandArgs)
        .do(ctx => {
          const fakePrompt = sinon.stub();
          fakePrompt
            .onFirstCall()
            .resolves({
              accountSid: constants.FAKE_ACCOUNT_SID,
              authToken: constants.FAKE_API_SECRET
            })
            .onSecondCall()
            .resolves({
              overwrite: true
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
          ctx.testCmd.exit = sinon.fake();
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
        .stdout()
        .stderr()
        .it('runs project:add', async ctx => {
          await ctx.testCmd.run();
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

      addTest()
        .nock('https://api.twilio.com', api => {
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}.json`).reply(500, {
            error: 'oops'
          });
        })
        .stdout()
        .stderr()
        .it('runs project:add with invalid credentials', async ctx => {
          await ctx.testCmd.run();
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
        .stdout()
        .stderr()
        .it('runs project:add but fails to create api key', async ctx => {
          await ctx.testCmd.run();
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('Could not create an API Key');
        });

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
        .stdout()
        .stderr()
        .it('supports other regions', async ctx => {
          await ctx.testCmd.run();
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('configuration saved');
        });
    });
  });
});
