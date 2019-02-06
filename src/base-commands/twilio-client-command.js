const chalk = require('chalk');
const { flags } = require('@oclif/command');
const twilio = require('twilio');
const BaseCommand = require('./base-command');
const CLIRequestClient = require('../services/cli-http-client');

class TwilioClientCommand extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);
    this.twilioClient = undefined;
  }

  async run() {
    await super.run();

    this.logger.debug('Using project: ' + this.flags.project);
    this.currentProject = this.userConfig.getProjectById(this.flags.project);

    const reportUnconfigured = verb => {
      const projParam = this.flags.project === 'default' ? '' : ' -p ' + this.flags.project;
      this.logger.error('To ' + verb + ' project, run: ' + chalk.whiteBright('twilio login' + projParam));
      this.exit(1);
    };

    if (!this.currentProject) {
      this.logger.error('No project "' + this.flags.project + '" configured.');
      reportUnconfigured('add');
      return;
    }

    const { apiKey, apiSecret } = await this.secureStorage.getCredentials(this.currentProject.id);
    if (apiKey === 'error') {
      this.logger.error('Could not get credentials for project "' + this.flags.project + '".');
      reportUnconfigured('reconfigure');
      return;
    }

    this.twilioClient = twilio(apiKey, apiSecret, {
      accountSid: this.currentProject.accountSid,
      httpClient: new CLIRequestClient(this.id, this.logger)
    });
  }

  parseProperties() {
    if (!this.constructor.PropertyFlags) {
      return null;
    }

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

  async updateResource(resource, resourceSid, updatedProperties) {
    const results = {
      sid: resourceSid,
      result: '?'
    };

    updatedProperties = updatedProperties || this.parseProperties();
    this.logger.debug(updatedProperties);

    if (updatedProperties) {
      try {
        await resource(resourceSid).update(updatedProperties);
        results.result = 'Success';
        Object.assign(results, updatedProperties);
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
