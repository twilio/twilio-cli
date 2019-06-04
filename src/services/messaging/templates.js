const { templatize } = require('@twilio/cli-core').services.templating;

exports.commandConflict = templatize`The plugin "${'plugin'}" contains a conflicting command name: ${'command'}. \
You may discover commands are unexpectedly grouped together or conflict. \
You may wish to uninstall this plugin via 'twilio plugins:uninstall'. \
Contact the plugin developer to update the plugin.`;
