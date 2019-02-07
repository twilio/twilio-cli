const { Plugin } = require('@oclif/config');
// const { TwilioClientCommand } = require('../../base-commands/twilio-client-command');
// const { TwilioApiBrowser } = require('../../services/twilio-api');

class TwilioRestApiPlugin extends Plugin {
  async load() {
    await super.load();
  }

  get hooks() {
    return {};
  }

  get topics() {
    return [];
  }

  get commandIDs() {
    return [];
  }

  get commands() {
    return [];
  }
}

module.exports = async function () {
  // const browser = new TwilioApiBrowser();
  this.config.plugins.push(new TwilioRestApiPlugin(this.config));
};
