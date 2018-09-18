const { flags } = require('@oclif/command');
const twilio = require('twilio');

const BaseCommand = require('./base-command');
const { SecureStorage } = require('../utility/secure-storage');
const secureStorage = new SecureStorage();

class TwilioClientCommand extends BaseCommand {
  constructor(argv, config) {
    super(argv, config);
    this.twilioClient = undefined;
  }

  async run() {
    await super.run();

    const { flags } = this.parse(this.constructor);
    this.currentProject = this.userConfig.getProjectById(flags.project);

    const { apiKey, apiSecret } = await secureStorage.getCredentials(this.currentProject.id);
    this.twilioClient = twilio(apiKey, apiSecret, { accountSid: this.currentProject.accountSid });
  }
}

TwilioClientCommand.flags = Object.assign(
  {
    project: flags.string({
      char: 'p',
      default: 'default',
      description: 'Shorthand identifier for your Twilio project.'
    })
  },
  BaseCommand.flags
);

module.exports = TwilioClientCommand;
