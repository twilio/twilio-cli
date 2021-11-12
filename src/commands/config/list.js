const { BaseCommand } = require('@twilio/cli-core').baseCommands;

const { getFromEnvironment } = require('../../services/config-utility');

class ConfigList extends BaseCommand {
  async run() {
    await super.run();
    const configData = [];
    Object.keys(this.userConfig).forEach((config) => {
      let configEnvValue = getFromEnvironment(config);
      if (configEnvValue) {
        configEnvValue += '[env]';
      }

      configData.push({
        configName: config,
        value: JSON.stringify(configEnvValue || this.userConfig[config]),
      });
    });
    this.output(configData);
  }
}
ConfigList.description = 'list Twilio CLI configurations.';

ConfigList.flags = BaseCommand.flags;
module.exports = ConfigList;
