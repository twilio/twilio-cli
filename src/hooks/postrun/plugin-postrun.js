/* eslint-disable no-console */
const chalk = require('chalk');

const AUTOCOMLETE_UPDATE_WARNING = `If you’re using autocomplete, you’ll need to run ${chalk.bold(
  'twilio autocomplete',
)} after an update and then open a new terminal window. The CLI needs to re-build its cache.`;
const AUTOCOMLETE_ALERT = `If you are running bash or zsh on macOS or Linux, you can run one of the two commands below (as appropriate for the shell you are using): \n '${chalk.bold(
  '1) twilio autocomplete bash',
)}' or \n '${chalk.bold('2) twilio autocomplete zsh')}' `;

module.exports = async function pluginPostRun(options) {
  if (options.Command.id === 'plugins:update' || options.Command.id === 'update') {
    console.warn(chalk.yellowBright(` » ${AUTOCOMLETE_UPDATE_WARNING}`));
  }
  if (options.Command.id === 'autocomplete') {
    if (Object.keys(options.argv).length === 0) {
      console.warn(chalk.yellowBright(` » ${AUTOCOMLETE_ALERT}`));
    }
  }
};
