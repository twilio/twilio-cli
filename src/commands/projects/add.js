const os = require('os');
const { flags } = require('@oclif/command');

const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { CliRequestClient } = require('@twilio/cli-core').services;
const { STORAGE_LOCATIONS } = require('@twilio/cli-core').services.secureStorage;

const helpMessages = require('../../services/messaging/help-messages');

const FRIENDLY_STORAGE_LOCATIONS = {
  [STORAGE_LOCATIONS.KEYCHAIN]: 'in your keychain',
  [STORAGE_LOCATIONS.WIN_CRED_VAULT]: 'in the Windows credential vault',
  [STORAGE_LOCATIONS.LIBSECRET]: 'using libsecret'
};

class ProjectsAdd extends BaseCommand {
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
    await this.promptForProjectId();

    if (!(await this.confirmProjectAndEnvVars()) || !(await this.confirmOverwrite())) {
      this.cancel();
    }

    this.validateAccountSid();
    this.validateAuthToken();
    await this.promptForCredentials();

    if (await this.validateCredentials()) {
      await this.saveCredentials();
      this.logger.info(`Saved ${this.projectId}.`);
    } else {
      this.cancel();
    }
  }

  loadArguments() {
    this.accountSid = this.args['account-sid'];
    this.authToken = this.flags['auth-token'];
    this.projectId = this.flags.project;
    this.force = this.flags.force;
    this.region = this.flags.region;
  }

  async promptForProjectId() {
    if (!this.projectId) {
      let counter = 0;
      const answer = await this.inquirer.prompt([
        {
          name: 'projectId',
          message: this.getPromptMessage(ProjectsAdd.flags.project.description),
          validate: function (value) {
            if (!value && counter < 1) {
              counter++;
              return 'Shorthand identifier for your Twilio project is required';
            }
            return true;
          }
        }
      ]);
      if (!answer.projectId) {
        this.logger.error('Shorthand identifier for your Twilio project is required');
        return this.exit(1);
      }
      this.projectId = answer.projectId;
    }
  }

  validateAccountSid() {
    if (!this.accountSid) {
      this.questions.push({
        name: 'accountSid',
        message: this.getPromptMessage(ProjectsAdd.args[0].description),
        validate: input => Boolean(input)
      });
    }
  }

  validateAuthToken() {
    if (!this.authToken) {
      this.questions.push({
        type: 'password',
        name: 'authToken',
        message: this.getPromptMessage(ProjectsAdd.flags['auth-token'].description),
        validate: input => Boolean(input)
      });
    }
  }

  async promptForCredentials() {
    if (this.questions) {
      this.logger.info(helpMessages.WHERE_TO_FIND_ACCOUNT_SID);
      this.logger.error(helpMessages.AUTH_TOKEN_NOT_SAVED);
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
            message: `Overwrite existing project credentials for "${this.projectId}"?`,
            default: false
          }
        ]);
        overwrite = confirm.overwrite;
      }
    }
    return overwrite;
  }

  async confirmProjectAndEnvVars() {
    let affirmative = true;
    if (this.userConfig.getProjectFromEnvironment()) {
      const confirm = await this.inquirer.prompt([
        {
          type: 'confirm',
          name: 'affirmative',
          message:
            'Account credentials are currently stored in environment variables and will take precedence over ' +
            `the "${this.projectId}" project when connecting to Twilio, unless the "${this.projectId}" project is ` +
            `explicitly specified. Continue setting up "${this.projectId}" project?`,
          default: false
        }
      ]);
      affirmative = confirm.affirmative;
    }
    return affirmative;
  }

  cancel() {
    this.logger.warn('Cancelled');
    this.exit(1);
  }

  getTwilioClient() {
    if (!this.twilioClient) {
      this.twilioClient = require('twilio')(this.accountSid, this.authToken, {
        httpClient: new CliRequestClient(this.id, this.logger),
        region: this.region
      });
    }
    return this.twilioClient;
  }

  async validateCredentials() {
    const twilioClient = this.getTwilioClient();
    try {
      // Don't log the response since it contains the account auth token.
      await twilioClient.api.accounts(this.accountSid).fetch();
      return true;
    } catch (err) {
      this.logger.error('Could not validate the provided credentials. Not saving.');
      this.logger.debug(err);
      return false;
    }
  }

  async saveCredentials() {
    const apiKeyFriendlyName = `twilio-cli for ${os.userInfo().username} on ${os.hostname()}`;
    let apiKey = null;

    const twilioClient = this.getTwilioClient();
    try {
      apiKey = await twilioClient.newKeys.create({ friendlyName: apiKeyFriendlyName });
      this.logger.debug(apiKey);
    } catch (err) {
      this.logger.error('Could not create an API Key.');
      this.logger.debug(err);
      this.exit(1);
    }

    this.userConfig.addProject(this.projectId, this.accountSid, this.region);
    await this.secureStorage.saveCredentials(this.projectId, apiKey.sid, apiKey.secret);
    const configSavedMessage = await this.configFile.save(this.userConfig);

    this.logger.info(
      `Created API Key ${apiKey.sid} and stored the secret ${
        FRIENDLY_STORAGE_LOCATIONS[this.secureStorage.storageLocation]
      }. See: https://www.twilio.com/console/runtime/api-keys/${apiKey.sid}`
    );
    this.logger.info(configSavedMessage);
  }

  getPromptMessage(message) {
    // Drop the trailing period and put a colon at the end of the message.
    return message.trim().replace(/[.:]?$/, ':');
  }
}

ProjectsAdd.aliases = ['login'];
ProjectsAdd.description = 'add credentials for an existing Twilio project';

ProjectsAdd.flags = Object.assign(
  {
    'auth-token': flags.string({
      description: 'Your Twilio Auth Token for your Twilio project.'
    }),
    force: flags.boolean({
      char: 'f',
      description: 'Force overwriting existing project credentials.'
    }),
    region: flags.string({
      hidden: true
    })
  },
  TwilioClientCommand.flags // Yes! We _do_ want the same flags as TwilioClientCommand
);

ProjectsAdd.args = [
  {
    name: 'account-sid',
    description: 'The Account SID for your Twilio project.'
  }
];

module.exports = ProjectsAdd;
