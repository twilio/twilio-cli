const { templatize } = require('@twilio/cli-core').services.templating;

exports.commandConflict = templatize`The plugin "${'plugin'}" contains a conflicting command: ${'command'}`;
