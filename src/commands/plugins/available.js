const { BaseCommand } = require('@twilio/cli-core').baseCommands;

const { getAvailablePlugins } = require('../../services/plugins');

class PluginsAvailable extends BaseCommand {
  async run() {
    await super.run();

    getAvailablePlugins(this.config).forEach((pluginName) => this.logger.info(pluginName));
  }
}

PluginsAvailable.description = 'list available plugins for installation';
PluginsAvailable.flags = null;

module.exports = PluginsAvailable;
