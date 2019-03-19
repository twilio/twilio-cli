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
          ctx.userConfig.addProject('default', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProjectList, [])
        .it('runs project:list with 1 project', ctx => {
          expect(ctx.stdout).to.contain('default');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stderr).to.equal('');
        });
    });
  });
});
