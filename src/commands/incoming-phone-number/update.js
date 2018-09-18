const TwilioClientCommand = require('../../base-commands/twilio-client-command');

class NumberUpdate extends TwilioClientCommand {
  async run() {
    await super.run();

    const fullData = await this.twilioClient.incomingPhoneNumbers.list();
    this.output(fullData);
  }
}

NumberUpdate.description = 'Update the properties of a Twilio phone number';
NumberUpdate.flags = TwilioClientCommand.flags;

module.exports = NumberUpdate;
