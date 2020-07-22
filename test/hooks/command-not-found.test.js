const sinon = require('sinon');
const inquirer = require('inquirer');
const proxyquire = require('proxyquire');
const { expect, test } = require('@twilio/cli-test');

function PluginsMock() {
  this.install = sinon.stub();
}

const hookFunc = proxyquire('../../src/hooks/command-not-found', {
  '@oclif/plugin-plugins': { default: PluginsMock },
});

const config = {
  plugins: [{ name: '@twilio-labs/plugin-watch' }],
  runHook: sinon.stub(),
};

describe('hooks', () => {
  describe('command-not-found', () => {
    before(() => {
      inquirer._prompt = inquirer.prompt;
      inquirer.prompt = sinon.stub().resolves({ install: true });
    });

    after(() => {
      inquirer.prompt = inquirer._prompt;
      delete inquirer._prompt;
    });

    test.stderr().it('warns and installs non-installed plugin topics', async (ctx) => {
      ctx.exit = sinon.stub().resolves(1);
      await hookFunc.call(ctx, { id: 'serverless', config });
      expect(ctx.stderr).to.contain('not installed');
    });

    test.stderr().it('warns and install non-installed plugins commands', async (ctx) => {
      ctx.exit = sinon.stub().resolves(1);
      await hookFunc.call(ctx, { id: 'serverless:init', config });
      expect(ctx.stderr).to.contain('not installed');
    });

    /* eslint-disable no-unused-expressions */
    test.stderr().it('does nothing for installed plugins or unknown commands', async (ctx) => {
      await hookFunc.call(ctx, { id: 'watch', config });
      expect(ctx.stderr).to.be.empty;
      await hookFunc.call(ctx, { id: 'serverless-schmerverless', config });
      expect(ctx.stderr).to.be.empty;
    });
  });
});
