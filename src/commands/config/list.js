const { BaseCommand } = require('@twilio/cli-core').baseCommands;

const { getFromEnvironment } = require('../../services/config-utility');

class ConfigList extends BaseCommand {
  async run() {
    await super.run();
    const configData = [];
    const parseUserConfigValue = (config) => {
      // only parse to JSON string in case of Objects/ Arrays
      if (this.userConfig[config] instanceof Array || this.userConfig[config] instanceof Object) {
        return JSON.stringify(this.userConfig[config]);
      }
      return this.userConfig[config];
    };
    Object.keys(this.userConfig).forEach((config) => {
      let configEnvValue = getFromEnvironment(config);
      if (configEnvValue) {
        configEnvValue += '[env]';
      }

      configData.push({
        configName: config,
        value: configEnvValue || parseUserConfigValue(config),
      });
    });
    this.output(configData);
  }
}
ConfigList.description = 'list Twilio CLI configurations.';

ConfigList.flags = BaseCommand.flags;
module.exports = ConfigList;
