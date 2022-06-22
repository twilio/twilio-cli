const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ConfigSet = require('../../../src/commands/config/set');

describe('commands', () => {
  describe('config', () => {
    describe('set', () => {
      const createConfig = (
        commandArgs = [],
        { configProperty = '', configPropertyValue, updateConfigProperty = true, removeConfigProperty = true } = {},
      ) =>
        test
          .do((ctx) => {
            ctx.userConfig = new ConfigData();
            if (configProperty) {
              ctx.userConfig[configProperty] = configPropertyValue;
            }
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(ConfigSet, commandArgs)
          .do((ctx) => {
            const fakePrompt = sinon.stub();
            fakePrompt.onFirstCall().resolves({
              Overwrite: updateConfigProperty,
              Remove: removeConfigProperty,
            });
            ctx.testCmd.inquirer.prompt = fakePrompt;
          })
          .stdout()
          .stderr();
      describe('edge', () => {
        createConfig(['--edge=createEdge'])
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --edge=createEdge', (ctx) => {
            expect(ctx.testCmd.userConfig.edge).to.contain('createEdge');
            expect(ctx.stderr).to.contain('configuration saved');
          });
        createConfig(['--edge=updateEdge'], { configProperty: 'edge', configPropertyValue: 'createEdge' })
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --edge=updateEdge', (ctx) => {
            expect(ctx.testCmd.userConfig.edge).to.contain('updateEdge');
            expect(ctx.stderr).to.contain('configuration saved');
          });
        createConfig(['--edge=updateEdge'], {
          configProperty: 'edge',
          configPropertyValue: 'createEdge',
          updateConfigProperty: false,
        })
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --edge=updateEdge with overwrite as false', (ctx) => {
            expect(ctx.testCmd.userConfig.edge).to.contain('createEdge');
            expect(ctx.stderr).to.not.contain('There is an environment variable already set');
          });
        createConfig(['--edge=createEdge'], {})
          .do((ctx) => {
            process.env.TWILIO_EDGE = 'envEdge';
            return ctx.testCmd.run();
          })
          .it('runs config:set --edge=createEdge, will show warning if environment variable exists', (ctx) => {
            expect(ctx.testCmd.userConfig.edge).to.contain('createEdge');
            expect(ctx.stderr).to.contain('There is an environment variable already set for edge : envEdge');
            expect(ctx.stderr).to.contain('configuration saved');
          });
        createConfig(['--edge='], { configProperty: 'edge', configPropertyValue: 'createEdge' })
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --edge= ,should remove the edge from configuration', (ctx) => {
            expect(ctx.testCmd.userConfig.edge).to.be.undefined;
            expect(ctx.stderr).to.contain('configuration saved');
          });
        createConfig(['--edge='], {
          configProperty: 'edge',
          configPropertyValue: 'createEdge',
          removeConfigProperty: false,
        })
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --edge= ,should not remove the edge from configuration', (ctx) => {
            expect(ctx.testCmd.userConfig.edge).to.contain('createEdge');
            expect(ctx.stderr).to.not.contain('configuration saved');
          });
        createConfig(['--edge='], {})
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --edge= ,should throw error as there is no existing edge', (ctx) => {
            expect(ctx.testCmd.userConfig.edge).to.be.undefined;
            expect(ctx.stderr).to.contain('There is no existing edge to remove.');
          });
      });

      describe('require-profile-input', () => {
        createConfig(['--require-profile-input'])
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --require-profile-input', (ctx) => {
            expect(ctx.testCmd.userConfig.requireProfileInput).to.be.true;
            expect(ctx.stderr).to.contain('configuration saved');
          });
        createConfig(['--no-require-profile-input'], {
          configProperty: 'requireProfileInput',
          configPropertyValue: true,
        })
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --no-require-profile-input', (ctx) => {
            expect(ctx.testCmd.userConfig.requireProfileInput).to.be.false;
            expect(ctx.stderr).to.contain('configuration saved');
          });
        createConfig(['--no-require-profile-input'], {
          configProperty: 'requireProfileInput',
          configPropertyValue: true,
          updateConfigProperty: false,
        })
          .do((ctx) => ctx.testCmd.run())
          .it('runs config:set --no-require-profile-input with confirmation overwrite as false', (ctx) => {
            expect(ctx.testCmd.userConfig.requireProfileInput).to.be.true;
            expect(ctx.stderr).to.not.contain('There is an environment variable already set');
          });
      });

      createConfig([], {})
        .do((ctx) => ctx.testCmd.run())
        .catch(/No configuration is added to set. Run "twilio config:set --help" to see how to set a configurations./)
        .it('runs config:set ,should throw error as there are no configurations/flags provided.');
    });
  });
});
