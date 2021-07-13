const { BaseCommand } = require('@twilio/cli-core').baseCommands;

const availableConfigs = ['edge'];

class ConfigList extends BaseCommand {
  async run() {
    await super.run();
    const configData = [];
    availableConfigs.forEach((config) => {
      configData.push({
        configName: config,
        value: this.getFromEnvironment(config) || this.userConfig[config],
      });
    });
    this.output(configData);
  }

  getFromEnvironment(config) {
    const configEnv = `TWILIO_${config.toUpperCase()}`;
    if (process.env[configEnv]) {
      return `${process.env[configEnv]}[env]`;
    }
    return undefined;
  }
}
ConfigList.description = 'list the Twilio configuration.';

ConfigList.flags = BaseCommand.flags;
module.exports = {
  ConfigList,
  availableConfigs,
};
