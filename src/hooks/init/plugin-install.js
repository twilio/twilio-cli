const prompt = require('inquirer').prompt;
const { logger } = require('@twilio/cli-core').services.logging;
const ALLOWED_ORGS = [
  '@twilio/',
  '@twilio-labs/'
];

function isTwilioPlugin(options) {
  if (options.plugin.name === undefined) {
    return false;
  }
  return ALLOWED_ORGS.find(function (org) {
    return options.plugin.name.startsWith(org);
  });
}

module.exports = async function (options) {
  if (!isTwilioPlugin(options)) {
    logger.warn('WARNING!!! You are attempting to install a plugin from an untrusted source.');
    logger.warn('It could contain malicious software or in other ways compromise your system.');
    let response = await prompt([{
      type: 'confirm',
      name: 'continue',
      message: 'Are you sure you want to continue?',
      default: false
    }]);
    if (response.continue === false) {
      this.exit(1);
    }
  }
};
