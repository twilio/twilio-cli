const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;

class NumberList extends TwilioClientCommand {
  async run() {
    await super.run();
    const fullData = await this.twilioClient.incomingPhoneNumbers.list();
    this.output(fullData, this.flags.properties);
  }
}

NumberList.description = 'show what Twilio phone numbers you have configured';

NumberList.flags = Object.assign(
  {
    properties: flags.string({
      default: 'sid, phoneNumber, friendlyName',
      description:
        'The incomingPhoneNumber object properties you would like to display (JSON output always shows all properties).'
    })
  },
  TwilioClientCommand.flags,
  TwilioClientCommand.accountSidFlag
);

module.exports = NumberList;
