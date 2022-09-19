const { TwilioCliError } = require('@twilio/cli-core/src/services/error');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const { Flags: flags } = require('@oclif/core');
const { camelCase } = require('@twilio/cli-core').services.namingConventions;

const { availableConfigs, getFromEnvironment } = require('../../services/config-utility');

class ConfigSet extends BaseCommand {
  async run() {
    await super.run();
    let isError = true;
    let isUserConfigUpdated = false;
    for (const flag of availableConfigs) {
      const configProperty = camelCase(flag);
      if (this.flags[flag] !== undefined) {
        isError = false;
        this.preWarnings(flag);
        if (this.flags[flag] === '') {
          isUserConfigUpdated = await this.removeConfig(flag, isUserConfigUpdated);
          continue;
        }
        if (await this.isOverwrite(configProperty)) {
          this.userConfig[configProperty] = this.sanitizeFlag(this.flags[flag]);
          isUserConfigUpdated = true;
        }
      }
    }
    if (isError) {
      throw new TwilioCliError(
        `No configuration is added to set. Run "twilio config:set --help" to see how to set a configurations.`,
      );
    }
    if (isUserConfigUpdated) {
      await this.saveConfiguration();
    }
  }

  sanitizeFlag(flag) {
    return typeof flag === 'string' ? this.userConfig.sanitize(flag) : flag;
  }

  preWarnings(flag) {
    const flagEnvValue = getFromEnvironment(flag);
    if (flagEnvValue) {
      this.logger.warn(`There is an environment variable already set for ${flag} : ${flagEnvValue}`);
    }
  }

  async removeConfig(flag, isUserConfigUpdated) {
    if (this.userConfig[flag]) {
      const verdict = await this.confirmDialog('Remove', flag);
      if (verdict) {
        isUserConfigUpdated = true;
        this.userConfig[flag] = undefined;
      }
    } else {
      this.logger.info(`There is no existing ${flag} to remove.`);
    }
    return isUserConfigUpdated;
  }

  async isOverwrite(flag) {
    if (this.userConfig[flag]) {
      return this.confirmDialog('Overwrite', flag);
    }
    return true;
  }

  async saveConfiguration() {
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info(configSavedMessage);
  }

  async confirmDialog(type, flag) {
    const confirm = await this.inquirer.prompt([
      {
        type: 'confirm',
        name: type,
        message: `${type} existing ${flag} value?`,
        default: false,
      },
    ]);
    return confirm[type];
  }
}
ConfigSet.description = 'update Twilio CLI configurations.';

ConfigSet.flags = {
  edge: flags.string({
    char: 'e',
    description: 'Sets an Edge configuration.',
  }),
  'require-profile-input': flags.boolean({
    description: 'Whether the profile flag for Twilio CLI commands is required or not.',
    allowNo: true,
  }),
  ...BaseCommand.flags, // To add the same flags as BaseCommand
};
module.exports = ConfigSet;
