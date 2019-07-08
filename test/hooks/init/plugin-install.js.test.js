const sinon = require('sinon');
const inquirer = require('inquirer');
const pluginFunc = require('../../../src/hooks/init/plugin-install');
const { expect, test } = require('@twilio/cli-test');

const getNonTwilioPlugin = () => ({
  plugin: {
    name: '@twilio-labs-h4x0r/plugin-serverless'
  }
});

const getTwilioPlugin = () => ({
  plugin: {
    name: '@twilio/debugger'
  }
});

const getTwilioLabsPlugin = () => ({
  plugin: {
    name: '@twilio-labs/debugger'
  }
});

const getUndefinedPlugin = () => ({
  plugin: {
    name: undefined
  }
});

describe('hooks', () => {
  describe('init', () => {
    describe('plugin-install', () => {
      before(() => {
        inquirer._prompt = inquirer.prompt;
        inquirer.prompt = sinon.stub().resolves({ continue: false });
        sinon.stub(process, 'exit');
      });

      after(() => {
        inquirer.prompt = inquirer._prompt;
        delete inquirer._prompt;
        process.exit.restore();
      });

      test.stderr().it('warning when non Twilio plugin is installed', async ctx => {
        await pluginFunc.call(ctx, getNonTwilioPlugin());
        expect(ctx.stderr).to.contain('WARNING');
      });

      test.stderr().it('warning when plugin is undefined', async ctx => {
        await pluginFunc.call(ctx, getUndefinedPlugin());
        expect(ctx.stderr).to.contain('WARNING');
      });

      test.stderr().it('outputs nothing when Twilio plugin is installed', async ctx => {
        await pluginFunc.call(ctx, getTwilioPlugin());
        expect(ctx.stderr).to.be.empty;
        await pluginFunc.call(ctx, getTwilioLabsPlugin());
        expect(ctx.stderr).to.be.empty;
      });
    });
  });
});
