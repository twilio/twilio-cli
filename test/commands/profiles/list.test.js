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
          ctx.userConfig.addProfile(
            'profile1',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
          ctx.userConfig.setActiveProfile('profile1');
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
          ctx.userConfig.addProfile(
            'profile1',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with 1 profile without active profile', (ctx) => {
          expect(ctx.stdout).to.contain('profile1');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/false/g)).to.have.length(1);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do(() => {
          process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
          process.env.TWILIO_AUTH_TOKEN = constants.FAKE_API_SECRET;
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with environment variables set', (ctx) => {
          expect(ctx.stdout).to.contain('[env]');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile(
            'profile1',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
          ctx.userConfig.addProfile(
            'profile2',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
          ctx.userConfig.setActiveProfile('profile1');
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with multiple profiles and with active profile', (ctx) => {
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
          ctx.userConfig.addProfile(
            'profile1',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
          ctx.userConfig.addProfile(
            'profile2',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with multiple profiles without a active profile', (ctx) => {
          expect(ctx.stdout).to.contain('profile1');
          expect(ctx.stdout).to.contain('profile2');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/false/g)).to.have.length(2);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile(
            'profile1',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
          ctx.userConfig.addProject('profile2', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.activeProfile = 'profile1';
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('when the active profile is set from profiles', (ctx) => {
          expect(ctx.stdout).to.contain('profile1');
          expect(ctx.stdout).to.contain('profile2');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stdout).to.match(/profile1.*true/);
          expect(ctx.stderr).to.equal('');
          expect(ctx.stdout).to.contain('ID');
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
        .twilioCommand(ProfilesList, ['--no-header'])
        .it('list with --no-header', (ctx) => {
          expect(ctx.stdout).not.to.contain('ID');
          expect(ctx.stdout).not.to.contain('Account SID');
          expect(ctx.stdout).not.to.contain('Active');
          expect(ctx.stdout).to.contain('profile1');
          expect(ctx.stdout).to.contain('profile2');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
        });

      test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile(
            'profile1',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
          ctx.userConfig.addProject('profile2', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.activeProfile = 'profile2';
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('when the active profile is set from projects', (ctx) => {
          expect(ctx.stdout).to.contain('profile1');
          expect(ctx.stdout).to.contain('profile2');
          expect(ctx.stdout).to.contain(constants.FAKE_ACCOUNT_SID);
          expect(ctx.stdout).to.not.contain('Region');
          expect(ctx.stdout.match(/true/g)).to.have.length(1);
          expect(ctx.stdout).to.match(/profile2.*true/);
          expect(ctx.stderr).to.equal('');
        });

      test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile(
            'default',
            constants.FAKE_ACCOUNT_SID,
            'dev',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
          ctx.userConfig.addProfile(
            'profile1',
            constants.FAKE_ACCOUNT_SID,
            '',
            constants.FAKE_API_KEY,
            constants.FAKE_API_SECRET,
          );
          ctx.userConfig.addProject('profile2', constants.FAKE_ACCOUNT_SID);
          ctx.userConfig.activeProfile = 'profile1';
        })
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCommand(ProfilesList, [])
        .it('runs profiles:list with 1 regional profile set and with multiple profiles', (ctx) => {
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
