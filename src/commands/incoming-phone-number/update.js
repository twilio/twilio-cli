const { flags } = require('@oclif/command');
const TwilioClientCommand = require('../../base-commands/twilio-client-command');
const IncomingPhoneNumberHelper = require('../../utility/resource-helpers/api/v2010/incoming-phone-number');

class NumberUpdate extends TwilioClientCommand {
  async run() {
    await super.run();
    const helper = new IncomingPhoneNumberHelper(this);
    const phoneNumber = await helper.findPhoneNumber(this.args['phone-number']);

    const updatedProperties = this.parseProperties();
    this.logger.debug(updatedProperties);

    const results = {
      sid: phoneNumber.sid,
      result: '?'
    };

    if (updatedProperties) {
      try {
        await this.twilioClient.incomingPhoneNumbers(phoneNumber.sid).update(updatedProperties);
        results.result = 'Success';
      } catch (err) {
        this.logger.error(err.message);
        results.result = 'Error';
      }
    } else {
      this.logger.warn('Nothing to update.');
      results.result = 'Nothing to update';
    }

    this.output(results);
  }
}

NumberUpdate.aliases = ['number:update', 'phone-number:update'];
NumberUpdate.description = 'Update the properties of a Twilio phone number';
NumberUpdate.PropertyFlags = {
  'friendly-name': flags.string({
    description: 'A human readable descriptive text for this resource, up to 64 characters long'
  }),
  'sms-url': flags.string({
    description: 'The URL that Twilio should request when somebody sends an SMS to the new phone number'
  }),
  'sms-method': flags.enum({
    options: ['GET', 'POST'],
    description: 'The HTTP method Twilio will use when making requests to the SmsUrl'
  }),
  'sms-fallback-url': flags.string({
    description: 'A URL that Twilio will request if an error occurs requesting or executing the TwiML defined by SmsUrl'
  }),
  'sms-fallback-method': flags.enum({
    options: ['GET', 'POST'],
    description: 'The HTTP method that should be used to request the SmsFallbackUrl'
  })
};

NumberUpdate.flags = Object.assign({}, NumberUpdate.PropertyFlags, TwilioClientCommand.flags);

NumberUpdate.args = [
  {
    name: 'phone-number',
    required: true,
    description: 'The SID or E.164 formatted phone number you wish to update'
  }
];

module.exports = NumberUpdate;
