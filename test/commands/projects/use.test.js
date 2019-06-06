const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const ProjectsUse = require('../../../src/commands/projects/use');

describe('commands', () => {
  describe('projects', () => {
    describe('use', () => {
      const setup = () => test
        .stdout()
        .stderr()
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('identity', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config);

      setup().twilioCommand(ProjectsUse, ['identity']).it('should set the active project with id', ctx => {
        expect(ctx.stderr).to.contain('set identity as active project');
      });
      setup().twilioCommand(ProjectsUse, ['incorrectId']).exit(1).it('run projects:active with non-existing project', ctx => {
        expect(ctx.stderr).to.contain('does not exist');
      });
    });
  });
});
