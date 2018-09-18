const { URL } = require('url');
const { flags } = require('@oclif/command');
const TwilioClientCommand = require('../../base-commands/twilio-client-command');
const IncomingPhoneNumberHelper = require('../../utility/resource-helpers/api/v2010/incoming-phone-number');

class NumberUpdate extends TwilioClientCommand {
  async run() {
    await super.run();
    const helper = new IncomingPhoneNumberHelper(this);
    const phoneNumber = await helper.findPhoneNumber(this.args['phone-number']);

    this.tunnels = [];
    const results = await this.updateResource(this.twilioClient.incomingPhoneNumbers, phoneNumber.sid, props => {
      props = this.checkForLocalhost(props, 'smsUrl');
      props = this.checkForLocalhost(props, 'voiceUrl');
      return props;
    });

    if (this.tunnels.length > 0) {
      this.logger.debug('TODO: Spin up ngrok!!');
      this.logger.debug(this.tunnels);
    }

    this.output(results);
  }

  checkForLocalhost(props, propName) {
    if (props[propName]) {
      const url = new URL(props[propName]);
      if (['localhost', '127.0.0.1'].indexOf(url.hostname) > -1) {
        const newTunnel = {
          name: propName,
          originalUrl: url,
          newUrl: new URL('https://asdfasdfasd.ngrok.io' + url.pathname + url.search)
        };
        this.tunnels.push(newTunnel);
        props[propName] = newTunnel.newUrl.toString();
      }
    }
    return props;
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
  }),
  'voice-url': flags.string({
    description: 'The URL that Twilio should request when somebody dials the phone number'
  }),
  'voice-method': flags.enum({
    options: ['GET', 'POST'],
    description: 'The HTTP method Twilio will use when making requests to the VoiceUrl'
  }),
  'voice-fallback-url': flags.string({
    description:
      'A URL that Twilio will request if an error occurs requesting or executing the TwiML defined by VoiceUrl'
  }),
  'voice-fallback-method': flags.enum({
    options: ['GET', 'POST'],
    description: 'The HTTP method Twilio will use when requesting the VoiceFallbackUrl'
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
