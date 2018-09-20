const { expect, test, constants } = require('../../test');
const { ConfigData } = require('../../../src/utility/config');

describe('commands', () => {
  describe('project', () => {
    describe('list', () => {
      test
        .twilioCliEnv()
        .stdout()
        .stderr()
        .command(['project:list'])
        .it('runs project:list with no projects', ctx => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('No projects have been configured');
        });

      test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProject('default', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv()
        .stdout()
        .stderr()
        .command(['project:list'])
        .it('runs project:list with 1 project', ctx => {
          expect(ctx.stdout).to.contain('default');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stderr).to.equal('');
        });
    });
  });
});
