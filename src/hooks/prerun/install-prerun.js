/* eslint-disable no-console */
const chalk = require('chalk');

const urlUtil = require('../../services/hyperlink-utility');

const TWILIO_CLI_DOCS_LINK = 'https://www.twilio.com/docs/twilio-cli/quickstart';
let UPDATE_ALERT = `Warning: Use '${chalk.bold('npm update twilio-cli')}' for npm based installations. `;

module.exports = async function pluginPostRun(options) {
  if (options.Command.id === 'update') {
    const hyperLink = urlUtil.convertToHyperlink('MORE INFO', TWILIO_CLI_DOCS_LINK);
    if (hyperLink.isSupported) {
      UPDATE_ALERT = UPDATE_ALERT.concat(hyperLink.url);
    } else {
      UPDATE_ALERT = UPDATE_ALERT.concat(`MORE INFO: ${TWILIO_CLI_DOCS_LINK}`);
    }
    console.warn(chalk.greenBright(` » ${UPDATE_ALERT}`));
  }
};
