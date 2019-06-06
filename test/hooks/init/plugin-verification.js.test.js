const pluginFunc = require('../../../src/hooks/init/plugin-verification');
const { expect, test } = require('@twilio/cli-test');

const getCliPlugin = () => ({
  name: 'twilio-cli',
  type: 'core',
  commands: [{
    id: 'login',
    aliases: ['logon']
  }, {
    id: 'feedback'
  }, {
    id: 'api'
  }]
});

const getApiPlugin = () => ({
  name: 'api-plugin',
  type: 'core',
  commands: [{
    id: 'api'
  }]
});

const getConformingPlugin = () => ({
  name: 'plugin-meals',
  commands: [{
    id: 'breakfast'
  }, {
    id: 'lunch',
    aliases: ['dinner']
  }]
});

const getConflictingPlugin = () => ({
  name: 'plugin-schmlugin',
  commands: [{
    id: 'logon'
  }, {
    id: 'feed:me',
    aliases: ['feedback']
  }]
});

const getFakeConfig = () => ({
  plugins: [getCliPlugin(), getApiPlugin()]
});

describe('hooks', () => {
  describe('post-api-plugin', () => {
    describe('plugin-verification', () => {
      test.stderr().it('outputs nothing for just core plugins', ctx => {
        ctx.config = getFakeConfig();

        pluginFunc.call(ctx, getApiPlugin());

        expect(ctx.stderr).to.be.empty;
      });

      test.stderr().it('outputs nothing if no conflicts in installed plugins', ctx => {
        ctx.config = getFakeConfig();
        ctx.config.plugins.push(getConformingPlugin());

        pluginFunc.call(ctx, getApiPlugin());

        expect(ctx.stderr).to.be.empty;
      });

      test.stderr().it('warns for each conflicting command', ctx => {
        ctx.config = getFakeConfig();
        ctx.config.plugins.push(getConflictingPlugin());

        pluginFunc.call(ctx, getApiPlugin());

        expect(ctx.stderr).to.contain('logon');
        expect(ctx.stderr).to.contain('feedback');
      });
    });
  });
});
