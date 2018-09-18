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

    this.logger.debug('Using project: ' + this.flags.project);
    this.currentProject = this.userConfig.getProjectById(this.flags.project);

    if (!this.currentProject) {
      this.logger.error('No project "' + this.flags.project + '" configured.');
      const projParam = this.flags.project === 'default' ? '' : ' -p ' + this.flags.project;
      this.logger.error('To add project, run: twilio login' + projParam);
      this.exit(1);
      return;
    }

    const { apiKey, apiSecret } = await secureStorage.getCredentials(this.currentProject.id);
    this.twilioClient = twilio(apiKey, apiSecret, { accountSid: this.currentProject.accountSid });
  }

  parseProperties() {
    let updatedProperties = null;
    Object.keys(this.constructor.PropertyFlags).forEach(propName => {
      if (this.flags[propName]) {
        updatedProperties = updatedProperties || {};
        // Convert kebab-case to camelCase
        const paramName = propName.replace(/-([a-z])/g, g => g[1].toUpperCase());
        updatedProperties[paramName] = this.flags[propName];
      }
    });

    return updatedProperties;
  }

  async updateResource(resource, resourceSid, propertiesCallback) {
    const results = {
      sid: resourceSid,
      result: '?'
    };

    let updatedProperties = this.parseProperties();
    if (propertiesCallback) {
      updatedProperties = propertiesCallback(updatedProperties) || updatedProperties;
    }
    this.logger.debug(updatedProperties);

    if (updatedProperties) {
      try {
        await resource(resourceSid).update(updatedProperties);
        results.result = 'Success';
      } catch (err) {
        this.logger.error(err.message);
        results.result = 'Error';
      }
    } else {
      this.logger.warn('Nothing to update.');
      results.result = 'Nothing to update';
    }

    return results;
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
