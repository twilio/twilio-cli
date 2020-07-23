const { expect, test } = require('@twilio/cli-test');

const PluginsAvailable = require('../../../src/commands/plugins/available');

describe('commands', () => {
  describe('plugins', () => {
    describe('available', () => {
      const testConfig = test
        .twilioCliEnv()
        .stderr()
        .do((ctx) => {
          ctx.fakeConfig.plugins = [{ name: '@twilio-labs/plugin-watch' }];
        })
        .twilioCommand(PluginsAvailable, []);

      testConfig.it('should print out available plugins', (ctx) => {
        expect(ctx.stderr).to.contain('@twilio-labs/plugin-serverless');
      });

      testConfig.it('should not print out installed plugins', (ctx) => {
        expect(ctx.stderr).to.not.contain('@twilio-labs/plugin-watch');
      });
    });
  });
});
