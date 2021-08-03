/* eslint-disable no-console */
const chalk = require('chalk');
const { Config } = require('@twilio/cli-core').services.config;
const { configureEnv } = require('@twilio/cli-core');

const PORT_WARNING = `Profiles exist with API keys in system keychain. Please run ${chalk.bold(
  'twilio profiles:port',
)} to port all keys to the config file`;

const AUTOCOMLETE_WARNING = `If you’re using autocomplete, you’ll need to run '${chalk.bold(
  'twilio autocomplete',
)}' after the install and then open a new terminal window. The CLI needs to re-build its cache.`;

class PostInstallDisplayManager {
  constructor(configDir, userConfig) {
    configureEnv();
    this.configDir = configDir || process.env.TWILIO_CONFIG_DIR;
    this.configFile = new Config(this.configDir);
    this.userConfig = userConfig;
  }

  hasProjects() {
    return this.userConfig.projects && this.userConfig.projects.length > 0;
  }

  hasPreConfiguredProfiles() {
    return this.hasProjects() || (this.userConfig.profiles && Object.keys(this.userConfig.profiles).length > 0);
  }

  displayGrid() {
    console.log();
    console.log('*************************************************************************');
    console.log('*                                                                       *');
    console.log('* To get started, please create a twilio-cli profile:                   *');
    console.log('*                                                                       *');
    console.log('*     twilio login                                                      *');
    console.log('*                                                                       *');
    console.log('*     OR                                                                *');
    console.log('*                                                                       *');
    console.log('*     twilio profiles:create                                            *');
    console.log('*                                                                       *');
    console.log('*************************************************************************');
    console.log();
  }

  async displayMessage() {
    this.userConfig = this.userConfig || (await this.configFile.load());

    if (!this.hasPreConfiguredProfiles()) {
      this.displayGrid();
    }

    if (this.hasProjects()) {
      console.warn(chalk.yellowBright(` » ${PORT_WARNING}`));
    }
    console.warn(chalk.yellowBright(` » ${AUTOCOMLETE_WARNING}`));
  }
}

module.exports = {
  PostInstallDisplayManager,
  PORT_WARNING,
  AUTOCOMLETE_WARNING,
};
