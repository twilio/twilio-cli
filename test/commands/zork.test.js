const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config } = require('@twilio/cli-core').services.config;
const Zork = require('../../src/commands/zork');

describe('commands', () => {
  describe('zork', () => {
    test
      .twilioCliEnv(Config)
      .twilioCreateCommand(Zork, [])
      .do(ctx => {
        ctx.testCmd.plugins = { install: sinon.stub().throws('simulated error installing module') };
        ctx.testCmd.findZork = sinon.stub().throws('simulated error finding module');
        ctx.testCmd.exit = sinon.fake();
      })
      .do(ctx => ctx.testCmd.run())
      .catch(/I don't know the word "zork"/)
      .it('tries to install zork and fails');

    test
      .twilioCliEnv(Config)
      .twilioCreateCommand(Zork, [])
      .do(ctx => {
        ctx.testCmd.plugins = { install: sinon.stub().resolves() };
        ctx.testCmd.findZork = sinon
          .stub()
          .onFirstCall()
          .throws('simulated error finding module')
          .onSecondCall()
          .returns(() => ctx.testCmd.logger.info('Running zork'));
      })
      .stdout()
      .stderr()
      .it('tries to install zork and runs it', async ctx => {
        await ctx.testCmd.run();
        expect(ctx.stdout).to.equal('');
        expect(ctx.stderr).to.contain('Running zork');
      });

    test
      .twilioCliEnv(Config)
      .twilioCreateCommand(Zork, [])
      .do(ctx => {
        ctx.testCmd.findZork = sinon.stub().returns(() => ctx.testCmd.logger.info('Running zork'));
      })
      .stdout()
      .stderr()
      .it('runs an already installed zork', async ctx => {
        await ctx.testCmd.run();
        expect(ctx.stdout).to.equal('');
        expect(ctx.stderr).to.contain('Running zork');
      });
  });
});
