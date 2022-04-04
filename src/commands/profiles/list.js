const chalk = require('chalk');
const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;

class ProfilesList extends BaseCommand {
  async run() {
    await super.run();
    const envProfile = this.userConfig.getProfileFromEnvironment();
    // If environment profile exists, add required details to userConfig.projects, and mark as active.
    if (envProfile) {
      const { accountSid: ENVIRONMENT_ACCOUNT_SID, region: ENVIRONMENT_REGION } = envProfile;
      const strippedEnvProfile = {
        id: '[env]',
        accountSid: ENVIRONMENT_ACCOUNT_SID,
        region: ENVIRONMENT_REGION,
      };
      this.userConfig.projects.unshift(strippedEnvProfile);
      this.userConfig.setActiveProfile(strippedEnvProfile.id);
    }
    const profiles = this.userConfig.projects.slice(0);
    Object.keys(this.userConfig.profiles).forEach((id) =>
      profiles.push({
        id,
        accountSid: this.userConfig.profiles[id].accountSid,
        region: this.userConfig.profiles[id].region,
      }),
    );
    if (profiles.length > 0) {
      // If none of the profiles have a region, delete it from all of them so it doesn't show up in the output.
      if (!profiles.some((p) => p.region)) {
        profiles.forEach((p) => delete p.region);
      }
      const activeProfile = this.userConfig.getActiveProfile();
      profiles.forEach((p) => {
        p.active = activeProfile ? p.id === activeProfile.id : false;
      });

      this.output(profiles);
    } else {
      this.logger.warn(`No profiles have been configured. Run ${chalk.bold('twilio profiles:create')} to create one!`);
    }
  }
}

ProfilesList.description = 'show what profiles you have configured';
ProfilesList.flags = { ...BaseCommand.flags, ...TwilioClientCommand.noHeader };

module.exports = ProfilesList;
