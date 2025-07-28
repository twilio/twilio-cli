const { URL } = require('url');

const chalk = require('chalk');
const { Flags: flags } = require('@oclif/core');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;

const IncomingPhoneNumberHelper = require('../../services/resource-helpers/api/v2010/incoming-phone-number');

class NumberUpdate extends TwilioClientCommand {
  async run() {
    await super.run();

    const helper = new IncomingPhoneNumberHelper(this.twilioClient);
    const phoneNumber = await helper.findPhoneNumber(this.args['phone-number']);

    const props = this.parseProperties();

    const localHostProps = NumberUpdate.UrlFlags.filter((propName) => this.isLocalhostUrl(props, propName));
    const hasLocalHostProp = localHostProps.length > 0;

    if (hasLocalHostProp) {
      throw new TwilioCliError('Localhost URLs are not allowed for this operation.');
    }

    const results = await this.updateResource(this.twilioClient.incomingPhoneNumbers, phoneNumber.sid, props);
    this.output(results);
  }

  isLocalhostUrl(props, propName) {
    if (props && props[propName]) {
      const url = new URL(props[propName]);

      return ['localhost', '127.0.0.1'].includes(url.hostname);
    }

    return false;
  }
}

NumberUpdate.description = 'update the properties of a Twilio phone number';

NumberUpdate.PropertyFlags = {
  'friendly-name': flags.string({
    description: 'A human readable descriptive text for this resource, up to 64 characters long.',
  }),
  'sms-url': flags.string({
    description: 'The URL that Twilio should request when somebody sends an SMS to the new phone number.',
  }),
  'sms-method': flags.enum({
    options: ['GET', 'POST'],
    description: 'The HTTP method Twilio will use when making requests to the SmsUrl.',
  }),
  'sms-fallback-url': flags.string({
    description:
      'A URL that Twilio will request if an error occurs requesting or executing the TwiML defined by SmsUrl.',
  }),
  'sms-fallback-method': flags.enum({
    options: ['GET', 'POST'],
    description: 'The HTTP method that should be used to request the SmsFallbackUrl.',
  }),
  'voice-url': flags.string({
    description: 'The URL that Twilio should request when somebody dials the phone number.',
  }),
  'voice-method': flags.enum({
    options: ['GET', 'POST'],
    description: 'The HTTP method Twilio will use when making requests to the VoiceUrl.',
  }),
  'voice-fallback-url': flags.string({
    description:
      'A URL that Twilio will request if an error occurs requesting or executing the TwiML defined by VoiceUrl.',
  }),
  'voice-fallback-method': flags.enum({
    options: ['GET', 'POST'],
    description: 'The HTTP method Twilio will use when requesting the VoiceFallbackUrl.',
  }),
};

NumberUpdate.UrlFlags = ['smsUrl', 'smsFallbackUrl', 'voiceUrl', 'voiceFallbackUrl'];

NumberUpdate.flags = {
  ...NumberUpdate.PropertyFlags,
  ...TwilioClientCommand.flags,
  ...TwilioClientCommand.accountSidFlag,
};

NumberUpdate.args = [
  {
    name: 'phone-number',
    required: true,
    description: 'The SID or E.164 formatted phone number you wish to update.',
  },
];

module.exports = NumberUpdate;
