const sinon = require('sinon');
const inquirer = require('inquirer');
const hookFunc = require('../../src/hooks/command-not-found');
const { expect, test } = require('@twilio/cli-test');

const config = {
  plugins: [{ name: '@twilio-labs/plugin-watch' }]
};

describe('hooks', () => {
  describe('command-not-found', () => {
    before(() => {
      inquirer._prompt = inquirer.prompt;
      inquirer.prompt = sinon.stub().resolves({ continue: false });
    });

    after(() => {
      inquirer.prompt = inquirer._prompt;
      delete inquirer._prompt;
    });

    test.stderr().it('warns for non-installed plugin topics', async ctx => {
      await hookFunc.call(ctx, { id: 'serverless', config });
      expect(ctx.stderr).to.contain('not installed');
    });

    test.stderr().it('warns for non-installed plugins commands', async ctx => {
      await hookFunc.call(ctx, { id: 'serverless:init', config });
      expect(ctx.stderr).to.contain('not installed');
    });

    /* eslint-disable no-unused-expressions */
    test.stderr().it('does nothing for installed plugins or unknown commands', async ctx => {
      await hookFunc.call(ctx, { id: 'watch', config });
      expect(ctx.stderr).to.be.empty;
      await hookFunc.call(ctx, { id: 'serverless-schmerverless', config });
      expect(ctx.stderr).to.be.empty;
    });
  });
});
