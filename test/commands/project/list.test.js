const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const ProjectList = require('../../../src/commands/project/list');

describe('commands', () => {
  describe('project', () => {
    describe('list', () => {
      test
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProjectList, [])
        .it('runs project:list with no projects', ctx => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('No projects have been configured');
        });

      test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('project1', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProjectList, [])
        .it('runs project:list with 1 project', ctx => {
          expect(ctx.stdout).to.contain('project1');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('project1', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.addProject('project2', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProjectList, [])
        .it('runs project:list with multiple projects', ctx => {
          expect(ctx.stdout).to.contain('project1');
          expect(ctx.stdout).to.contain('project2');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('project1', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.addProject('project2', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.activeProject = 'project1';
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProjectList, [])
        .it('when the active project is set', ctx => {
          expect(ctx.stdout).to.contain('project1');
          expect(ctx.stdout).to.contain('project2');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stdout).to.match(/project1.*true/);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('default', constants.FAKE_ACCOUNT_SID, 'dev');
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProjectList, [])
        .it('runs project:list with 1 regional project', ctx => {
          expect(ctx.stdout).to.contain('default');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.contain('dev');
          expect(ctx.stdout).to.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stderr).to.equal('');
        });
    });
  });
});
