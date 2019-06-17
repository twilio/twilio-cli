
const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const ProjectsRemove = require('../../../src/commands/projects/remove');

describe('commands', () => {
  describe('projects', () => {
    describe('remove', () => {
      const setup = (commandArgs = [], mockValue = true) => test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('project1', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.addProject('project2', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.addProject('project3', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.addProject('project4', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config)
        .twilioCreateCommand(ProjectsRemove, commandArgs)
        .stdout()
        .stderr()
        .do(ctx => {
          const fakePrompt = sinon.stub();
          fakePrompt
            .onFirstCall()
            .resolves({
              affirmative: mockValue
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
        })
        .do(ctx => ctx.testCmd.run());
      const oneSetup = (commandArgs = [], mockValue = true) => test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('project1', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config)
        .twilioCreateCommand(ProjectsRemove, commandArgs)
        .stdout()
        .stderr()
        .do(ctx => {
          const fakePrompt = sinon.stub();
          fakePrompt
            .onFirstCall()
            .resolves({
              affirmative: mockValue
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
        })
        .do(ctx => ctx.testCmd.run());

      setup(['project2']).it('run projects:remove with a project', ctx => {
        expect(ctx.stderr).to.contain('');
        expect(ctx.stderr).to.contain('Deleted project2');
        expect(ctx.stderr).to.contain('configuration saved');
      });

      setup(['project1']).it('run projects:remove with the active project', ctx => {
        expect(ctx.stderr).to.contain('Removing the active project');
        expect(ctx.stderr).to.contain('Deleted project1');
        expect(ctx.stderr).to.contain('configuration saved');
      });

      setup(['project2'], false).exit(1).it('run projects:remove with a project and decide not to remove project', ctx => {
        expect(ctx.stderr).to.contain('Cancelled');
      });

      oneSetup(['project1']).it('run projects:remove with the last configured project', ctx => {
        expect(ctx.stderr).to.contain('Removing the active project');
        expect(ctx.stderr).to.contain('Removing last project');
        expect(ctx.stderr).to.contain('Deleted project1');
        expect(ctx.stderr).to.contain('configuration saved');
      });

      setup(['invalidProject']).exit(1).it('run projects:remove with non-existing project', ctx => {
        expect(ctx.stderr).to.contain('does not exist');
      });
    });
  });
});
