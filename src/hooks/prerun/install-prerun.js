/* eslint-disable no-console */
const chalk = require('chalk');

const UPDATE_ALERT = `Warning: Use '${chalk.bold('npm update twilio-cli')}' for npm based installations. `;

module.exports = async function pluginPostRun(options) {
  if (options.Command.id === 'update') {
    console.warn(chalk.greenBright(` » ${UPDATE_ALERT}`));
  }
};
