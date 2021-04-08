const chalk = require('chalk');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;

class ProfilesList extends BaseCommand {
  async run() {
    await super.run();
    const envProfile = this.userConfig.getProfileFromEnvironment();
    let strippedEnvProfile = undefined;
    if (typeof envProfile !== 'undefined') {
      strippedEnvProfile = {
        id: '[env]',
        accountSid: envProfile.accountSid,
        region: envProfile.region,
      };
      this.userConfig.profiles.push(strippedEnvProfile);
    }
    if (this.userConfig.profiles.length > 0) {
      // If none of the profiles have a region, delete it from all of them so it doesn't show up in the output.
      if (!this.userConfig.profiles.some((p) => p.region)) {
        this.userConfig.profiles.forEach((p) => delete p.region);
      }
      const activeProfile = typeof envProfile === 'undefined' ? this.userConfig.getActiveProfile() : strippedEnvProfile;
      this.userConfig.profiles.forEach((p) => {
        if (p.id === activeProfile.id) {
          p.active = true;
        }
      });
      this.output(this.userConfig.profiles);
    } else {
      this.logger.warn(`No profiles have been configured. Run ${chalk.bold('twilio profiles:create')} to create one!`);
    }
  }
}

ProfilesList.description = 'show what profiles you have configured';
ProfilesList.flags = BaseCommand.flags;

module.exports = ProfilesList;
