const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;

class Zork extends BaseCommand {
  async run() {
    await super.run();

    try {
      const zork = await this.install('zorkjs');
      zork();
    } catch (error) {
      this.logger.debug(`Error loading zork: ${JSON.stringify(error)}`);
      throw new TwilioCliError('I don\'t know the word "zork".');
    }
  }
}

Zork.description = 'what could this be?';
Zork.flags = BaseCommand.flags;
Zork.hidden = true;

module.exports = Zork;
