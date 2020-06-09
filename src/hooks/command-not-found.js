const Plugins = require('@oclif/plugin-plugins').default;
const { logger } = require('@twilio/cli-core').services.logging;

const PLUGIN_COMMANDS = {
  '@twilio-labs/plugin-flex': ['flex'],
  '@twilio-labs/plugin-rtc': ['rtc'],
  '@twilio-labs/plugin-serverless': ['serverless'],
  '@twilio-labs/plugin-token': ['token'],
  '@twilio-labs/plugin-watch': ['watch'],
  '@dabblelab/plugin-autopilot': ['autopilot']
};

const getSupportedPlugin = commandId => {
  return Object.keys(PLUGIN_COMMANDS).find(plugin => {
    return PLUGIN_COMMANDS[plugin].find(command => commandId === command || commandId.startsWith(command + ':'));
  });
};

const isPluginInstalled = (config, pluginName) => {
  return config.plugins.find(p => p.name === pluginName);
};

const installPlugin = async (config, pluginName) => {
  const plugins = new Plugins(config);

  await config.runHook('plugins:preinstall', { plugin: { name: pluginName } });

  return plugins.install(pluginName);
};

module.exports = async function (options) {
  const pluginName = getSupportedPlugin(options.id);

  if (pluginName && !isPluginInstalled(options.config, pluginName)) {
    logger.warn(`Plugin ${pluginName} not installed for command "${options.id}"`);

    const prompt = require('inquirer').prompt;
    const response = await prompt([{
      type: 'confirm',
      name: 'install',
      message: 'Would you like to install the plugin?',
      default: false
    }]);
    if (response.install) {
      logger.warn(`Installing plugin ${pluginName} ...`);

      await installPlugin(options.config, pluginName);

      logger.warn(`Installed plugin ${pluginName}"!`);
      logger.warn('Please try running the command again');
      this.exit(0);
    }
  }
};
