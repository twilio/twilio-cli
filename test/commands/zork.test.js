const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config } = require('@twilio/cli-core').services.config;

const Zork = require('../../src/commands/zork');

describe('commands', () => {
  describe('zork', () => {
    test
      .twilioCliEnv(Config)
      .twilioCreateCommand(Zork, [])
      .do((ctx) => {
        ctx.testCmd.install = sinon.stub().throws('simulated error finding module');
        ctx.testCmd.exit = sinon.fake();
      })
      .do((ctx) => ctx.testCmd.run())
      .catch(/I don't know the word "zork"/)
      .it('tries to install zork and fails');

    test
      .twilioCliEnv(Config)
      .twilioCreateCommand(Zork, [])
      .do((ctx) => {
        ctx.testCmd.install = sinon.stub().returns(() => ctx.testCmd.logger.info('Running zork'));
      })
      .stdout()
      .stderr()
      .do((ctx) => ctx.testCmd.run())
      .it('tries to install zork and runs it', async (ctx) => {
        expect(ctx.stdout).to.equal('');
        expect(ctx.stderr).to.contain('Running zork');
      });
  });
});
