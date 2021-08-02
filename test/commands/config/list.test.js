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

      // parsing the stdout to a key value pair
      const parseOutputToMap = (output) => {
        const propertyWithValue = output.split('\n');
        const propertyMap = new Map();
        propertyWithValue.forEach((value) => {
          const entry = value.trim().split(/\s{2,}/);
          propertyMap.set(entry[0], entry[1]);
        });
        return propertyMap;
      };
      listConfig({ configProperty: 'edge', configPropertyValue: 'testEdge' })
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list config variables', (ctx) => {
          const configListOutput = parseOutputToMap(ctx.stdout);
          expect(configListOutput.get('edge')).is.equal('"testEdge"');
        });
      listConfig({ configProperty: 'edge', configPropertyValue: 'testEdge' })
        .do((ctx) => {
          process.env.TWILIO_EDGE = 'fakeEdge';
          return ctx.testCmd.run();
        })
        .it('runs config:list, should prioritize environment if both environment and config edge set', (ctx) => {
          const configListOutput = parseOutputToMap(ctx.stdout);
          expect(configListOutput.get('edge')).is.not.undefined;
          expect(configListOutput.get('edge')).is.equal('"fakeEdge[env]"');
        });
      listConfig({})
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list empty config properties are not set', (ctx) => {
          const configListOutput = parseOutputToMap(ctx.stdout);
          expect(configListOutput.get('edge')).is.undefined;
          expect(configListOutput.get('requireProfileInput')).is.undefined;
          expect(configListOutput.get('email')).is.equal('{}');
          expect(configListOutput.get('projects')).is.equal('[]');
          expect(configListOutput.get('activeProfile')).is.equal('null');
          expect(configListOutput.get('profiles')).is.equal('{}');
        });
      listConfig({ configProperty: 'requireProfileInput', configPropertyValue: true })
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list requireProfileInput as set', (ctx) => {
          const configListOutput = parseOutputToMap(ctx.stdout);
          expect(configListOutput.get('requireProfileInput')).is.not.undefined;
          expect(configListOutput.get('requireProfileInput')).is.equal('true');
        });
      listConfig({})
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list all config properties in userConfig', (ctx) => {
          Object.keys(new ConfigData()).forEach((configProperty) => {
            expect(ctx.stdout).to.contain(configProperty);
          });
        });
    });
  });
});
