const { Help } = require('@oclif/plugin-help');

const TwilioCommandHelp = require('./twilio-command-help');

module.exports = class TwilioHelp extends Help {
  formatCommand(command) {
    const help = new TwilioCommandHelp(command, this.config, this.opts);
    return help.generate();
  }
};
