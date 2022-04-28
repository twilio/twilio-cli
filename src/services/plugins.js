const ALLOWED_ORGS = ['@twilio/', '@twilio-labs/', '@dabblelab/plugin-autopilot'];

const PLUGIN_COMMANDS = {
  '@twilio-labs/plugin-dev-phone': ['dev-phone'],
  '@twilio-labs/plugin-flex': ['flex'],
  '@twilio-labs/plugin-rtc': ['rtc'],
  '@twilio-labs/plugin-serverless': ['serverless'],
  '@twilio-labs/plugin-signal2020': ['signal', 'signal2020'],
  '@twilio-labs/plugin-token': ['token'],
  '@twilio-labs/plugin-watch': ['watch'],
  '@twilio-labs/plugin-assets': ['assets'],
  '@dabblelab/plugin-autopilot': ['autopilot'],
};

exports.isTwilioPlugin = (pluginName) => {
  if (pluginName === undefined) {
    return false;
  }
  return ALLOWED_ORGS.find((org) => pluginName.startsWith(org));
};

exports.isPluginInstalled = (config, pluginName) => {
  return config.plugins.find((p) => p.name === pluginName);
};

exports.getSupportedPlugin = (commandId) => {
  return Object.keys(PLUGIN_COMMANDS).find((plugin) => {
    return PLUGIN_COMMANDS[plugin].find((command) => commandId === command || commandId.startsWith(`${command}:`));
  });
};

exports.getAvailablePlugins = (config) => {
  return Object.keys(PLUGIN_COMMANDS).filter((pluginName) => !exports.isPluginInstalled(config, pluginName));
};
