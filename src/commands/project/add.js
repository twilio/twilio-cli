const os = require('os');
const { flags } = require('@oclif/command');

const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { CLIRequestClient } = require('@twilio/cli-core').services;
const { DEFAULT_PROJECT } = require('@twilio/cli-core').services.config;
const { STORAGE_LOCATIONS } = require('@twilio/cli-core').services.secureStorage;

const helpMessages = require('../../services/messaging/help-messages');

const FRIENDLY_STORAGE_LOCATIONS = {
  [STORAGE_LOCATIONS.KEYCHAIN]: 'in your keychain',
  [STORAGE_LOCATIONS.WIN_CRED_VAULT]: 'in the Windows credential vault',
  [STORAGE_LOCATIONS.LIBSECRET]: 'using libsecret'
};

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

    if (!await this.confirmDefaultProjectAndEnvVars()) {
      this.cancel();
    }

    this.validateAccountSid();
    this.validateAuthToken();
    await this.promptForCredentials();

    if ((await this.confirmOverwrite()) && (await this.validateCredentials())) {
      await this.saveCredentials();
      this.logger.info(`Saved ${this.projectId}.`);
    } else {
      this.cancel();
    }
  }

  loadArguments() {
    this.accountSid = this.args['account-sid'];
    this.authToken = this.flags['auth-token'];
    this.projectId = this.flags.project || DEFAULT_PROJECT;
    this.force = this.flags.force;
    this.region = this.flags.region;
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

  async confirmDefaultProjectAndEnvVars() {
    let affirmative = true;
    if (this.projectId === DEFAULT_PROJECT && this.userConfig.getProjectFromEnvironment()) {
      const confirm = await this.inquirer.prompt([
        {
          type: 'confirm',
          name: 'affirmative',
          message: 'Account credentials are currently stored in environment variables and will take precedence over ' +
            `the "${DEFAULT_PROJECT}" project when connecting to Twilio, unless the "${DEFAULT_PROJECT}" project is ` +
            `explicitly specified. Continue setting up "${DEFAULT_PROJECT}" project?`,
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
        httpClient: new CLIRequestClient(this.id, this.logger),
        region: this.region
      });
    }
    return this.twilioClient;
  }

  async validateCredentials() {
    const twilioClient = this.getTwilioClient();
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
      return;
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
}

ProjectAdd.aliases = ['login'];
ProjectAdd.description = 'add credentials for an existing Twilio project';

ProjectAdd.flags = Object.assign(
  {
    'auth-token': flags.string({
      description: 'Your Twilio Auth Token for your Twilio project'
    }),
    force: flags.boolean({
      char: 'f',
      description: 'Force overwriting existing project credentials'
    }),
    region: flags.string({
      hidden: true
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
