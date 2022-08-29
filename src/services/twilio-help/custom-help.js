const { Help } = require('@oclif/core');

const TwilioCommandHelp = require('./twilio-command-help');

module.exports = class TwilioHelp extends Help {
  formatCommand(command) {
    const help = new TwilioCommandHelp(command, this.config, this.opts);
    return help.generate();
  }
};
