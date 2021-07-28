const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ConfigList = require('../../../src/commands/config/list');

describe('commands', () => {
  describe('config', () => {
    describe('list', () => {
      const listConfig = ({ configProperty, configPropertyValue } = {}) =>
        test
          .do((ctx) => {
            ctx.userConfig = new ConfigData();
            if (configProperty) {
              ctx.userConfig[configProperty] = configPropertyValue;
            }
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(ConfigList, [])
          .stdout()
          .stderr();
      const configFixture = [
        {
          configProperty: 'edge',
          configPropertyValue: 'testEdge',
        },
        {
          configProperty: 'requireProfileInput',
          configPropertyValue: true,
        },
      ];
      listConfig({ configProperty: 'edge', configPropertyValue: 'testEdge' })
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list config variables', (ctx) => {
          expect(ctx.stdout).to.contain('Config Name');
          expect(ctx.stdout).to.contain('Value');
          expect(ctx.stdout).to.contain('testEdge');
          expect(ctx.stdout).to.contain('edge');
        });
      listConfig({ configProperty: 'edge', configPropertyValue: 'testEdge' })
        .do((ctx) => {
          process.env.TWILIO_EDGE = 'fakeEdge';
          return ctx.testCmd.run();
        })
        .it('runs config:list, should prioritize environment if both environment and config edge set', (ctx) => {
          expect(ctx.stdout).to.contain('Config Name');
          expect(ctx.stdout).to.contain('Value');
          expect(ctx.stdout).to.contain('fakeEdge[env]');
          expect(ctx.stdout).to.contain('edge');
        });
      listConfig({})
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list empty as edge is not set', (ctx) => {
          expect(ctx.stdout).to.contain('Config Name');
          expect(ctx.stdout).to.contain('Value');
          expect(ctx.stdout).to.contain('');
          expect(ctx.stdout).to.contain('edge');
        });
      listConfig({ configProperty: 'requireProfileInput', configPropertyValue: true })
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list config variables as requireProfileInput set', (ctx) => {
          expect(ctx.stdout).to.contain('Config Name');
          expect(ctx.stdout).to.contain('Value');
          expect(ctx.stdout).to.contain('true');
          expect(ctx.stdout).to.contain('requireProfileInput');
        });
      listConfig({})
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list config variables as requireProfileInput not set', (ctx) => {
          expect(ctx.stdout).to.contain('Config Name');
          expect(ctx.stdout).to.contain('Value');
          expect(ctx.stdout).to.contain('');
          expect(ctx.stdout).to.contain('requireProfileInput');
        });
      listConfig({})
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list all config properties in userConfig', (ctx) => {
          Object.keys(new ConfigData()).forEach((value) => {
            expect(ctx.stdout).to.contain(value);
          });
        });
    });
  });
});
