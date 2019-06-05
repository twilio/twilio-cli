const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const ProjectUse = require('../../../src/commands/project/use');

describe('commands', () => {
  describe('project', () => {
    describe('use', () => {
      const setup = () => test
        .stdout()
        .stderr()
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('identity', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config);

      setup().twilioCommand(ProjectUse, ['identity']).it('should set the active project with id', ctx => {
        expect(ctx.stderr).to.contain('set identity as active project');
      });
      setup().twilioCommand(ProjectUse, ['incorrectId']).exit(1).it('run project:active with non-existing project', ctx => {
        expect(ctx.stderr).to.contain('does not exist');
      });
    });
  });
});
