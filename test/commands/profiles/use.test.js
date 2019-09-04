const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const ProfilesUse = require('../../../src/commands/profiles/use');

describe('commands', () => {
  describe('profiles', () => {
    describe('use', () => {
      const setup = () => test
        .stdout()
        .stderr()
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.addProfile('identity', constants.FAKE_ACCOUNT_SID);
        })
        .twilioCliEnv(Config);

      setup()
        .twilioCommand(ProfilesUse, ['identity'])
        .it('should set the active profile with id', ctx => {
          expect(ctx.stderr).to.contain('set "identity" as active profile');
        });

      setup()
        .twilioCommand(ProfilesUse, ['incorrectId'])
        .catch(/does not exist/)
        .it('run profiles:active with non-existing profile');
    });
  });
});
