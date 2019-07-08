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

describe('hooks', () => {
  describe('init', () => {
    describe('plugin-install', () => {
      before(function ()  {
        sinon.stub(inquirer, 'prompt').resolves({ continue: false });
      });
      after(function ()  {
        inquirer.prompt.restore();
      });
      test
        .stderr().it('warning when non Twilio plugin is installed', ctx => {
          pluginFunc.call(ctx, getNonTwilioPlugin());
          expect(ctx.stderr).to.contain('WARNING');
        });

      test.stderr().it('outputs nothing when Twilio plugin is installed', ctx => {
        pluginFunc.call(ctx, getTwilioPlugin());
        expect(ctx.stderr).to.be.empty;
        pluginFunc.call(ctx, getTwilioLabsPlugin());
        expect(ctx.stderr).to.be.empty;
      });
    });
  });
});
