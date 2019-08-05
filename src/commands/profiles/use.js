const { BaseCommand } = require('@twilio/cli-core').baseCommands;

class ProfilesUse extends BaseCommand {
  async run() {
    await super.run();

    const profile = this.userConfig.getProfileById(this.args.profile);
    if (!profile) {
      this.logger.error('The profile "' + this.args.profile + '" does not exist. Run "twilio profiles:list" to see the list of configured profiles.');
      this.exit(1);
    }
    this.userConfig.activeProfile = this.args.profile;
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info('set ' + this.args.profile + ' as active profile');
    this.logger.info(configSavedMessage);
  }
}
ProfilesUse.description = 'select which profile to use';

ProfilesUse.args = [
  {
    name: 'profile',
    description: 'Shorthand identifier for your profile',
    required: true
  }
];
ProfilesUse.flags = BaseCommand.flags;

module.exports = ProfilesUse;
