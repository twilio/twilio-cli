const Plugins = require('@oclif/plugin-plugins').default;
const { logger } = require('@twilio/cli-core').services.logging;

const { getSupportedPlugin, isPluginInstalled } = require('../services/plugins');

const installPlugin = async (config, pluginName) => {
  const plugins = new Plugins(config);

  await config.runHook('plugins:preinstall', { plugin: { name: pluginName } });

  return plugins.install(pluginName);
};

module.exports = async function commandNotFound(options) {
  const pluginName = getSupportedPlugin(options.id);

  if (pluginName && !isPluginInstalled(options.config, pluginName)) {
    logger.warn(`Plugin ${pluginName} not installed for command "${options.id}"`);

    const { prompt } = require('inquirer');
    const response = await prompt([
      {
        type: 'confirm',
        name: 'install',
        message: 'Would you like to install the plugin?',
        default: false,
      },
    ]);
    if (response.install) {
      logger.warn(`Installing plugin ${pluginName} ...`);

      await installPlugin(options.config, pluginName);

      logger.warn(`Installed plugin ${pluginName}"!`);
      logger.warn('Please try running the command again');
      this.exit(0);
    }
  }
};
