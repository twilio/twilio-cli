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
    this.logger.debug('Using project: ' + flags.project);
    this.currentProject = this.userConfig.getProjectById(flags.project);

    if (!this.currentProject) {
      this.logger.error('No project "' + flags.project + '" configured.');
      const projParam = flags.project === 'default' ? '' : ' -p ' + flags.project;
      this.logger.error('To add project, run: twilio login' + projParam);
      this.exit(1);
      return;
    }

    const { apiKey, apiSecret } = await secureStorage.getCredentials(this.currentProject.id);
    this.twilioClient = twilio(apiKey, apiSecret, { accountSid: this.currentProject.accountSid });
  }
}

TwilioClientCommand.flags = Object.assign(
  {
    project: flags.string({
      char: 'p',
      default: 'default',
      description: 'Shorthand identifier for your Twilio project'
    })
  },
  BaseCommand.flags
);

module.exports = TwilioClientCommand;
