const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;

class ProfilesRemove extends TwilioClientCommand {
  async run() {
    await super.run();

    const deleteProfile = this.userConfig.getProfileById(this.args.profile);
    this.removeProfileStatus(deleteProfile, this.args.profile);
    const verdict = await this.confirmRemoveProfile();
    if (verdict === true) {
      const keyVerdict = await this.confirmRemoveKey();
      await this.deleteRemoteKey(deleteProfile, keyVerdict);
      this.logger.info(`Deleted ${deleteProfile.id} profile.`);
      this.userConfig.removeProfile(deleteProfile);
    } else {
      throw new TwilioCliError('Cancelled');
    }
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info(configSavedMessage);
  }

  removeProfileStatus(deleteProfile, profileId) {
    const activeProfile = this.userConfig.getActiveProfile();
    if (!deleteProfile) {
      throw new TwilioCliError(
        `The profile "${profileId}" does not exist. Run "twilio profiles:list" to see the list of configured profiles.`,
      );
    }
    if (activeProfile && activeProfile.id === deleteProfile.id) {
      this.logger.warn(
        'Are you sure you want to remove the active profile? Run "twilio profiles:use" to set another profile as active.',
      );
    }
    if (this.userConfig.projects.length + Object.keys(this.userConfig.profiles).length === 1) {
      this.logger.warn(
        'Are you sure you want to remove the last profile? Run "twilio profiles:create" to create another profile.',
      );
    }
  }

  async deleteRemoteKey(profileDelete, keyVerdict) {
    if (keyVerdict === true) {
      try {
        const { apiKey } = profileDelete;
        await this.twilioClient.api.keys(apiKey).remove();
        this.logger.info('The API Key has been deleted from The Twilio console.');
      } catch (error) {
        this.logger.error(
          'Could not delete the API Key. See: https://www.twilio.com/console/runtime/api-keys to delete the API Key from The Twilio Console.',
        );
        this.logger.debug(error.message);
      }
    }
    if (keyVerdict === false) {
      this.logger.warn(`The API Key for ${profileDelete.id} profile still exists in The Twilio console.`);
    }
  }

  async confirmRemoveProfile() {
    const confirm = await this.inquirer.prompt([
      {
        type: 'confirm',
        name: 'affirmative',
        message: `Are you sure you want to remove the "${this.args.profile}" profile?`,
        default: false,
      },
    ]);
    return confirm.affirmative;
  }

  async confirmRemoveKey() {
    const confirm = await this.inquirer.prompt([
      {
        type: 'confirm',
        name: 'affirmative',
        message: 'Would you like to attempt to delete the API Key?',
        default: false,
      },
    ]);
    return confirm.affirmative;
  }
}

ProfilesRemove.description = 'select which profile to remove';
ProfilesRemove.args = [
  {
    name: 'profile',
    description: 'Shorthand identifier for your profile',
    required: true,
  },
];
ProfilesRemove.flags = BaseCommand.flags;

module.exports = ProfilesRemove;
