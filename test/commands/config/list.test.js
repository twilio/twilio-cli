const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ConfigList = require('../../../src/commands/config/list');

describe('commands', () => {
  describe('config', () => {
    describe('list', () => {
      const listConfig = ({ addEdge = '' } = {}) =>
        test
          .do((ctx) => {
            ctx.userConfig = new ConfigData();
            if (addEdge) {
              ctx.userConfig.edge = addEdge;
            }
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(ConfigList, [])
          .stdout()
          .stderr();

      listConfig({ addEdge: 'testEdge' })
        .do((ctx) => ctx.testCmd.run())
        .it('runs config:list, should list config variables', (ctx) => {
          expect(ctx.stdout).to.contain('Config Name');
          expect(ctx.stdout).to.contain('Value');
          expect(ctx.stdout).to.contain('testEdge');
          expect(ctx.stdout).to.contain('edge');
        });
      listConfig({ addEdge: 'testEdge' })
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
    });
  });
});
