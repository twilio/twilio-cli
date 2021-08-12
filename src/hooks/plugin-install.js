const { logger } = require('@twilio/cli-core').services.logging;
const chalk = require('chalk');

const { isTwilioPlugin } = require('../services/plugins');

const AUTOCOMLETE_INSTALL_WARNING = `If you’re using autocomplete, you’ll need to run ${chalk.bold(
  'twilio autocomplete',
)} after installing a plugin and then open a new terminal window. The CLI needs to re-build its cache.`;

module.exports = async function pluginInstall(options) {
  logger.warn(chalk.yellowBright(`${AUTOCOMLETE_INSTALL_WARNING}`));

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
