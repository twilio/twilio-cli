const chalk = require('chalk');
const { URL } = require('url');
const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const IncomingPhoneNumberHelper = require('../../services/resource-helpers/api/v2010/incoming-phone-number');

class NumberUpdate extends TwilioClientCommand {
  constructor(argv, config, secureStorage, ngrok) {
    super(argv, config, secureStorage);
    this.ngrok = ngrok || require('ngrok');
  }

  async run() {
    await super.run();
    const helper = new IncomingPhoneNumberHelper(this);
    const phoneNumber = await helper.findPhoneNumber(this.args['phone-number']);

    const props = this.parseProperties();
    this.tunnels = {};
    await this.checkForLocalhost(props, 'smsUrl');
    await this.checkForLocalhost(props, 'smsFallbackUrl');
    await this.checkForLocalhost(props, 'voiceUrl');
    await this.checkForLocalhost(props, 'voiceFallbackUrl');

    const results = await this.updateResource(this.twilioClient.incomingPhoneNumbers, phoneNumber.sid, props);
    this.output(results);

    if (Object.keys(this.tunnels).length > 0) {
      this.logger.info(
        'ngrok is running. Open ' + chalk.blueBright('http://localhost:4040/') + ' to view tunnel activity.'
      );
      this.logger.info('Press CTRL-C to stop.');
      this.logger.debug(this.tunnels);
    }
  }

  async checkForLocalhost(props, propName) {
    if (props[propName]) {
      const url = new URL(props[propName]);
      if (['localhost', '127.0.0.1'].indexOf(url.hostname) > -1 && url.protocol === 'http:') {
        let newBaseUrl = this.tunnels[url.port];
        if (!newBaseUrl) {
          const newTunnel = {
            proto: 'http',
            addr: url.port,
            host_header: url.host // eslint-disable-line camelcase
          };
          newBaseUrl = await this.ngrok.connect(newTunnel);
          this.tunnels[url.port] = newBaseUrl;
        }
        props[propName] = newBaseUrl + url.pathname + url.search;
      }
    }
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
