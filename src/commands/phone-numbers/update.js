const { URL } = require('url');

const chalk = require('chalk');
const { Flags: flags } = require('@oclif/core');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;

const IncomingPhoneNumberHelper = require('../../services/resource-helpers/api/v2010/incoming-phone-number');

class NumberUpdate extends TwilioClientCommand {
  constructor(argv, config) {
    super(argv, config);
    this.ngrok = null;
  }

  async run() {
    await super.run();

    const helper = new IncomingPhoneNumberHelper(this.twilioClient);
    const phoneNumber = await helper.findPhoneNumber(this.args['phone-number']);

    const props = this.parseProperties();
    this.tunnels = {};

    const localHostProps = NumberUpdate.UrlFlags.filter((propName) => this.isLocalhostUrl(props, propName));
    const hasLocalHostProp = localHostProps.length > 0;

    if (hasLocalHostProp) {
      const promptId = 'ngrok-warning';

      if (!this.userConfig.isPromptAcked(promptId)) {
        await this.confirmTunnelCreation();
        this.userConfig.ackPrompt(promptId);
        const configSavedMessage = await this.configFile.save(this.userConfig);
        this.logger.info(configSavedMessage);
      }

      if (!this.ngrok) {
        this.ngrok = await this.install('ngrok');
      }

      /*
       * Create each tunnel. Note that we can't parallelize this since we're only creating 1 tunnel
       * per port and we don't yet know the unique set of ports.
       */
      for (const propName of localHostProps) {
        // eslint-disable-next-line no-await-in-loop
        await this.createTunnel(props, propName);
      }
    }

    const results = await this.updateResource(this.twilioClient.incomingPhoneNumbers, phoneNumber.sid, props);
    this.output(results);

    if (hasLocalHostProp) {
      this.logger.info(`ngrok is running. Open ${chalk.bold(this.ngrok.getUrl())} to view tunnel activity.`);
      this.logger.info('Press CTRL-C to exit.');
      this.logger.debug('Tunnels:');
      this.logger.debug(this.tunnels);
    }
  }

  isLocalhostUrl(props, propName) {
    if (props && props[propName]) {
      const url = new URL(props[propName]);

      return ['localhost', '127.0.0.1'].includes(url.hostname);
    }

    return false;
  }

  async createTunnel(props, propName) {
    const url = new URL(props[propName]);
    const isHttps = url.protocol === 'https:';
    const urlPort = url.port || (isHttps ? '443' : '80');
    let newBaseUrl = this.tunnels[urlPort];

    // Create a new tunnel if one does not yet exist for this port.
    if (!newBaseUrl) {
      const newTunnel = {
        /* eslint-disable camelcase */
        proto: 'http',
        addr: isHttps ? `https://${url.host}` : urlPort,
        host_header: url.host,
        bind_tls: true, // https only
        onLogEvent: (message) => this.logger.debug(`ngrok: ${message}`),
        /* eslint-enable camelcase */
      };

      try {
        newBaseUrl = await this.ngrok.connect(newTunnel);
      } catch (error) {
        this.logger.debug(`ngrok response: ${JSON.stringify(error)}`);
        if (isHttps && error.details.err.includes('too many colons in address')) {
          // We don't have a current ngrok version downloaded
          throw new TwilioCliError(
            'Installed version of ngrok does not support tunnels to https endpoints. ' +
              'To update ngrok: 1) uninstall the Twilio CLI, ' +
              '2) remove any zip files in ~/.ngrok, ' +
              '3) reinstall the CLI',
          );
        } else {
          throw new TwilioCliError((error.details && error.details.err) || error);
        }
      }

      this.tunnels[urlPort] = newBaseUrl;
    }

    // Build the new prop value using the tunnel URL.
    // eslint-disable-next-line require-atomic-updates
    props[propName] = newBaseUrl + url.pathname + url.search;
  }

  async confirmTunnelCreation() {
    this.logger.warn('WARNING: Detected localhost URL.');
    this.logger.warn(
      'For convenience, we will automatically create an encrypted tunnel using the 3rd-party service https://ngrok.io',
    );
    this.logger.warn('While running, this will expose your computer to the internet.');
    this.logger.warn('Please exit this command after testing.');

    const confirm = await this.inquirer.prompt([
      {
        type: 'confirm',
        name: 'affirmative',
        message: 'Do you want to proceed?',
        default: false,
      },
    ]);

    if (!confirm.affirmative) {
      throw new TwilioCliError('Cancelled');
    }
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
