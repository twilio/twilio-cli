const { logger } = require('@twilio/cli-core').services.logging;

const { isTwilioPlugin } = require('../services/plugins');

module.exports = async function pluginInstall(options) {
  if (!isTwilioPlugin(options.plugin.name)) {
    logger.warn('WARNING!!! You are attempting to install a plugin from an untrusted source.');
    logger.warn('It could contain malicious software or in other ways compromise your system.');

    const { prompt } = require('inquirer');
    const response = await prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Are you sure you want to continue?',
        default: false,
      },
    ]);
    if (response.continue === false) {
      this.exit(1);
    }
  }
};
