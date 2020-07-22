const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const ProfilesList = require('../../../src/commands/profiles/list');

describe('commands', () => {
  describe('profiles', () => {
    describe('list', () => {
      test
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with no profiles', (ctx) => {
          expect(ctx.stdout).to.equal('');
          expect(ctx.stderr).to.contain('No profiles have been configured');
        });

      test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile('profile1', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with 1 profile', (ctx) => {
          expect(ctx.stdout).to.contain('profile1');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile('profile1', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.addProfile('profile2', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with multiple profiles', (ctx) => {
          expect(ctx.stdout).to.contain('profile1');
          expect(ctx.stdout).to.contain('profile2');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile('profile1', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.addProfile('profile2', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.activeProfile = 'profile1';
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('when the active profile is set', (ctx) => {
          expect(ctx.stdout).to.contain('profile1');
          expect(ctx.stdout).to.contain('profile2');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stdout).to.match(/profile1.*true/);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile('default', constants.FAKE_ACCOUNT_SID, 'dev');
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with 1 regional profile', (ctx) => {
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
