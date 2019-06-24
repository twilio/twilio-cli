
const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const ProjectsRemove = require('../../../src/commands/projects/remove');

describe('commands', () => {
  describe('projects', () => {
    describe('remove', () => {
      const setup = (commandArgs = [], { addProjects = 4, deleteProject = true, deleteKey = true, removeCred = true } = {}) => test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          for (var i = 1; i <= addProjects; i++) {
            ctx.userConfig.addProject('project' + i, constants.FAKE_ACCOUNT_SID);
          }
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
              affirmative: deleteProject
            })
            .onSecondCall()
            .resolves({
              affirmative: deleteKey
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
        })
        .do(ctx => {
          ctx.testCmd.secureStorage.removeCredentials = () => {
            return removeCred;
          };
        });

      setup(['project2'], { deleteKey: false })
        .do(ctx => ctx.testCmd.run())
        .it('run projects:remove with a project and delets local key but keep remote key', ctx => {
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The key for project2 project still exists in The Twilio console');
          expect(ctx.stderr).to.contain('Deleted project2');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['project3'], { removeCred: false, deleteKey: false })
        .do(ctx => ctx.testCmd.run())
        .it('run projects:remove with a project and fails to delete both keys', ctx => {
          expect(ctx.stderr).to.contain('Could not delete local key');
          expect(ctx.stderr).to.contain('The key for project3 project still exists in The Twilio console.');
          expect(ctx.stderr).to.contain('Deleted project3');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['project1'])
        .nock('https://api.twilio.com', api => {
          api.delete(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys/${constants.FAKE_API_KEY}.json`).reply(200, {
            sid: constants.FAKE_API_KEY,
            secret: constants.FAKE_API_SECRET
          });
        })
        .do(ctx => ctx.testCmd.run())
        .it('run projects:remove with the active project and deletes both keys', ctx => {
          expect(ctx.stderr).to.contain('remove the active project');
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted project1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['project2'])
        .do(ctx => ctx.testCmd.run())
        .it('run projects:remove with project and deletes local key but can not delete remote key', ctx => {
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('Could not delete the API Key.');
          expect(ctx.stderr).to.contain('Deleted project2');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['project2'], { deleteProject: false })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run projects:remove with a project and decide not to remove project', ctx => {
          expect(ctx.stderr).to.contain('Cancelled');
        });

      setup(['project1'], { addProjects: 1 })
        .nock('https://api.twilio.com', api => {
          api.delete(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Keys/${constants.FAKE_API_KEY}.json`).reply(200, {
            sid: constants.FAKE_API_KEY,
            secret: constants.FAKE_API_SECRET
          });
        })
        .do(ctx => ctx.testCmd.run())
        .it('run projects:remove with the last configured project and delete all keys', ctx => {
          expect(ctx.stderr).to.contain('remove the active project');
          expect(ctx.stderr).to.contain('remove the last project');
          expect(ctx.stderr).to.contain('Deleted local key.');
          expect(ctx.stderr).to.contain('The key has been deleted from The Twilio console');
          expect(ctx.stderr).to.contain('Deleted project1');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup(['invalidProject'])
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run projects:remove with non-existing project', ctx => {
          expect(ctx.stderr).to.contain('does not exist');
        });
    });
  });
});
