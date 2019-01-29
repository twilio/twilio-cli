const sinon = require('sinon');
const { expect, test } = require('../test');
const Zork = require('../../src/commands/zork');

describe('commands', () => {
  describe('zork', () => {
    test
      .twilioCliEnv()
      .twilioCreateCommand(Zork, [])
      .do(ctx => {
        ctx.testCmd.exec = sinon.stub().resolves();
        ctx.testCmd.exit = sinon.fake();
        ctx.testCmd.findZork = sinon.stub().returns(null);
      })
      .stdout()
      .stderr()
      .it('tries to install zork and fails', async ctx => {
        await ctx.testCmd.run();
        expect(ctx.stdout).to.equal('');
        expect(ctx.stderr).to.contain('I don\'t know the word "zork".');
      });

    test
      .twilioCliEnv()
      .twilioCreateCommand(Zork, [])
      .do(ctx => {
        ctx.testCmd.exec = sinon.stub().resolves();
        ctx.testCmd.findZork = sinon
          .stub()
          .onFirstCall()
          .returns(null)
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
      .twilioCliEnv()
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
