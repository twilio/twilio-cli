const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ConfigSet = require('../../../src/commands/config/set');

describe('commands', () => {
  describe('config', () => {
    describe('set', () => {
      const createConfig = (commandArgs = [], { addEdge = '', updateEdge = true, removeEdge = true } = {}) =>
        test
          .do((ctx) => {
            ctx.userConfig = new ConfigData();
            if (addEdge) {
              ctx.userConfig.edge = addEdge;
            }
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(ConfigSet, commandArgs)
          .do((ctx) => {
            const fakePrompt = sinon.stub();
            fakePrompt.onFirstCall().resolves({
              Overwrite: updateEdge,
              Remove: removeEdge,
            });
            ctx.testCmd.inquirer.prompt = fakePrompt;
          })
          .stdout()
          .stderr();

      createConfig(['--edge=createEdge'])
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:set --edge=createEdge', (ctx) => {
          expect(ctx.testCmd.userConfig.edge).to.contain('createEdge');
          expect(ctx.stderr).to.contain('configuration saved');
        });
      createConfig(['--edge=updateEdge'], { addEdge: 'createEdge' })
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:set --edge=updateEdge', (ctx) => {
          expect(ctx.testCmd.userConfig.edge).to.contain('updateEdge');
          expect(ctx.stderr).to.contain('configuration saved');
        });
      createConfig(['--edge=updateEdge'], { addEdge: 'createEdge', updateEdge: false })
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
          expect(ctx.stderr).to.contain('There is an environment variable already set: envEdge');
          expect(ctx.stderr).to.contain('configuration saved');
        });
      createConfig(['--edge='], { addEdge: 'createEdge' })
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:set --edge= ,should remove the edge from configuration', (ctx) => {
          expect(ctx.testCmd.userConfig.edge).to.be.undefined;
          expect(ctx.stderr).to.contain('configuration saved');
        });
      createConfig(['--edge='], { addEdge: 'createEdge', removeEdge: false })
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
      createConfig(['--edge='], {})
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:set --edge= ,should throw error as there is no existing edge', (ctx) => {
          expect(ctx.testCmd.userConfig.edge).to.be.undefined;
          expect(ctx.stderr).to.contain('There is no existing edge to remove.');
        });
      createConfig([], {})
        .do((ctx) => ctx.testCmd.run())
        .catch(/No configuration is added to set. Run "twilio configs:set --help" to see how to set a configurations./)
        .it('runs config:set ,should throw error as there are no configurations/flags provided.');
    });
  });
});
