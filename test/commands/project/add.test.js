/* eslint no-unused-expressions: 0 */
const sinon = require('sinon');
// const nock = require('nock');
const { expect, test, constants } = require('../../test');
const ProjectAdd = require('../../../src/commands/project/add');

// nock.recorder.rec();

describe('commands', () => {
  describe('project', () => {
    describe('add', () => {
      test
        .twilioCliEnv()
        .twilioCreateCommand(ProjectAdd, [])
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
        })
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
          expect(ctx.stderr).to.contain('Saved default.');
        });
    });
  });
});
