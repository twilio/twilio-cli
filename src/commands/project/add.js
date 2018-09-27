const os = require('os');
const { flags } = require('@oclif/command');
const twilio = require('twilio');

const BaseCommand = require('../../base-commands/base-command');
const TwilioClientCommand = require('../../base-commands/twilio-client-command');

class ProjectAdd extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.accountSid = undefined;
    this.authToken = undefined;
    this.projectId = undefined;
    this.force = false;
    this.questions = [];
  }

  async run() {
    await super.run();

    this.loadArguments();

    this.validateAccountSid();
    this.validateAuthToken();
    await this.promptForCredentials();

    if ((await this.confirmOverwrite()) && (await this.validateCredentials())) {
      await this.saveCredentials();
      this.logger.info(`Saved ${this.projectId}.`);
      this.exit(0);
    } else {
      this.logger.warn('Cancelled');
      this.exit(1);
    }
  }

  loadArguments() {
    this.accountSid = this.args['account-sid'];
    this.authToken = this.flags['auth-token'];
    this.projectId = this.flags.project;
    this.force = this.flags.force;
  }

  validateAccountSid() {
    if (!this.accountSid) {
      this.questions.push({
        name: 'accountSid',
        message: ProjectAdd.args[0].description + ':',
        validate: input => Boolean(input)
      });
    }
  }

  validateAuthToken() {
    if (!this.authToken) {
      this.questions.push({
        type: 'password',
        name: 'authToken',
        message: ProjectAdd.flags['auth-token'].description,
        validate: input => Boolean(input)
      });
    }
  }

  async promptForCredentials() {
    if (this.questions) {
      this.logger.info('You can find your Account SID and Auth Token at https://www.twilio.com/console');
      const answers = await this.inquirer.prompt(this.questions);
      this.accountSid = answers.accountSid || this.accountSid;
      this.authToken = answers.authToken || this.authToken;
    }

    if (!this.accountSid.toUpperCase().startsWith('AC')) {
      this.logger.error('Account SID must be "AC" followed by 32 hexadecimal digits (0-9, a-z)');
      this.exit(1);
    }
  }

  async confirmOverwrite() {
    let overwrite = true;
    if (this.userConfig.getProjectById(this.projectId)) {
      overwrite = this.force;
      if (!overwrite) {
        const confirm = await this.inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `Overwrite exsting project credentials for "${this.projectId}"?`,
            default: false
          }
        ]);
        overwrite = confirm.overwrite;
      }
    }
    return overwrite;
  }

  async validateCredentials() {
    const twilioClient = twilio(this.accountSid, this.authToken);
    try {
      const account = await twilioClient.api.accounts(this.accountSid).fetch();
      this.logger.debug(account);
      return true;
    } catch (err) {
      this.logger.error('Could not validate the provided credentials. Not saving.');
      this.logger.debug(err);
      return false;
    }
  }

  async saveCredentials() {
    const apiKeyFriendlyName = 'Twilio CLI on ' + os.hostname();
    let apiKey = null;

    const twilioClient = twilio(this.accountSid, this.authToken);
    try {
      apiKey = await twilioClient.newKeys.create({ friendlyName: apiKeyFriendlyName });
      this.logger.debug(apiKey);
    } catch (err) {
      this.logger.error('Could not create an API Key.');
      this.logger.debug(err);
      this.exit(1);
    }

    this.userConfig.addProject(this.projectId, this.accountSid);
    await this.secureStorage.saveCredentials(this.projectId, apiKey.sid, apiKey.secret);
    await this.configFile.save(this.userConfig);
  }
}

ProjectAdd.aliases = ['login'];
ProjectAdd.description = 'Add credentials for an existing Twilio project';

ProjectAdd.flags = Object.assign(
  {
    'auth-token': flags.string({
      description: 'Your Twilio Auth Token for your Twilio project'
    }),
    force: flags.boolean({
      char: 'f',
      description: 'Force overwriting existing project credentials'
    })
  },
  TwilioClientCommand.flags // Yes! We _do_ want the same flags as TwilioClientCommand
);

ProjectAdd.args = [
  {
    name: 'account-sid',
    description: 'The Account SID for your Twilio project'
  }
];

module.exports = ProjectAdd;
