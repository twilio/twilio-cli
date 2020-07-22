const { logger } = require('@twilio/cli-core').services.logging;
const { splitArray } = require('@twilio/cli-core').services.JSUtils;

const MessageTemplates = require('../../services/messaging/templates');

const checkCommandConflicts = (corePlugins, installedPlugins) => {
  const commandSet = new Set();

  const collisionCheck = (plugin, command) => {
    // If there's a collision or conflict, issue a stern warning.
    if (commandSet.has(command)) {
      logger.warn(MessageTemplates.commandConflict({ plugin: plugin.name, command }));
    }
    commandSet.add(command);
  };

  // Add every command and alias from the our core plugins to the unique collection.
  corePlugins.forEach((plugin) => {
    plugin.commands.forEach((command) => {
      commandSet.add(command.id);

      if (command.aliases) command.aliases.forEach((alias) => commandSet.add(alias));
    });
  });

  /*
   * Check all commands and aliases from installed plugins for collisions/conflicts with our core plugins, other
   * installed plugins, and the plugin itself.
   */
  installedPlugins.forEach((plugin) => {
    plugin.commands.forEach((command) => {
      collisionCheck(plugin, command.id);

      if (command.aliases) command.aliases.forEach((alias) => collisionCheck(plugin, alias));
    });
  });
};

module.exports = function pluginVerification() {
  const isCorePlugin = (plugin) => plugin.type === 'core';

  // Split the plugins into "core" and "installed".
  const [corePlugins, installedPlugins] = splitArray(this.config.plugins, isCorePlugin);

  checkCommandConflicts(corePlugins, installedPlugins);
};
