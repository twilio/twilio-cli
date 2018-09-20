const OclifConfig = require('@oclif/config');
const { expect, test } = require('@oclif/test');
const tmp = require('tmp');
const { Logger, LoggingLevel } = require('../src/utility/logging');
const { Config } = require('../src/utility/config');

const logger = new Logger({ level: LoggingLevel.debug });

const twilioTest = test.register('twilioCliEnv', () => {
  return {
    async run(ctx) {
      ctx.tempConfigDir = tmp.dirSync({ unsafeCleanup: true });
      ctx.fakeConfig = {
        configDir: ctx.tempConfigDir.name
      };

      if (!ctx.config) {
        ctx.config = await OclifConfig.load();
      }
      ctx.config.configDir = ctx.fakeConfig.configDir;

      if (ctx.userConfig) {
        const tempConfig = new Config(ctx.fakeConfig.configDir);
        await tempConfig.save(ctx.userConfig);
      }
    },
    finally(ctx) {
      ctx.tempConfigDir.removeCallback();
    }
  };
});

module.exports = {
  expect,
  test: twilioTest,
  logger,
  constants: {
    FAKE_ACCOUNT_SID: 'AC1234567890abcdef1234567890abcdef'
  }
};
