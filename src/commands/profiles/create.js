const os = require('os');
const { flags } = require('@oclif/command');

const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { CliRequestClient } = require('@twilio/cli-core').services;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const { STORAGE_LOCATIONS } = require('@twilio/cli-core').services.secureStorage;

const helpMessages = require('../../services/messaging/help-messages');

const FRIENDLY_STORAGE_LOCATIONS = {
  [STORAGE_LOCATIONS.KEYCHAIN]: 'in your keychain',
  [STORAGE_LOCATIONS.WIN_CRED_VAULT]: 'in the Windows credential vault',
  [STORAGE_LOCATIONS.LIBSECRET]: 'using libsecret'
};

class ProfilesCreate extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.accountSid = undefined;
    this.authToken = undefined;
    this.profileId = undefined;
    this.force = false;
    this.questions = [];
  }

  async run() {
    await super.run();

    // Eagerly load up the credential store. No need to proceed if this fails.
    await this.secureStorage.loadKeytar();

    this.loadArguments();
    await this.promptForProfileId();

    if (!(await this.confirmProfileAndEnvVars()) || !(await this.confirmOverwrite())) {
      this.cancel();
    }

    this.validateAccountSid();
    this.validateAuthToken();
    await this.promptForCredentials();

    if (await this.validateCredentials()) {
      await this.saveCredentials();
      this.logger.info(`Saved ${this.profileId}.`);
    } else {
      this.cancel();
    }
  }

  loadArguments() {
    this.accountSid = this.args['account-sid'];
    this.authToken = this.flags['auth-token'];
    this.profileId = this.flags.profile;
    this.force = this.flags.force;
    this.region = this.flags.region;
  }

  async promptForProfileId() {
    if (!this.profileId) {
      const answer = await this.inquirer.prompt([
        {
          name: 'profileId',
          message: this.getPromptMessage(ProfilesCreate.flags.profile.description),
          validate: input => Boolean(input)
        }
      ]);
      this.profileId = answer.profileId;
    }
  }

  validateAccountSid() {
    if (!this.accountSid) {
      this.questions.push({
        name: 'accountSid',
        message: this.getPromptMessage(ProfilesCreate.args[0].description),
        validate: input => Boolean(input)
      });
    }
  }

  validateAuthToken() {
    if (!this.authToken) {
      this.questions.push({
        type: 'password',
        name: 'authToken',
        message: this.getPromptMessage(ProfilesCreate.flags['auth-token'].description),
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
      throw new TwilioCliError('Account SID must be "AC" followed by 32 hexadecimal digits (0-9, a-z)');
    }
  }

  async confirmOverwrite() {
    let overwrite = true;
    if (this.userConfig.getProfileById(this.profileId)) {
      overwrite = this.force;
      if (!overwrite) {
        const confirm = await this.inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `Overwrite existing profile credentials for "${this.profileId}"?`,
            default: false
          }
        ]);
        overwrite = confirm.overwrite;
      }
    }
    return overwrite;
  }

  async confirmProfileAndEnvVars() {
    let affirmative = true;
    if (this.userConfig.getProfileFromEnvironment()) {
      const confirm = await this.inquirer.prompt([
        {
          type: 'confirm',
          name: 'affirmative',
          message:
            'Account credentials are currently stored in environment variables and will take precedence over ' +
            `the "${this.profileId}" profile when connecting to Twilio, unless the "${this.profileId}" profile is ` +
            `explicitly specified. Continue setting up "${this.profileId}" profile?`,
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

  getApiKeyFriendlyName() {
    const friendlyName = `twilio-cli for ${os.userInfo().username} on ${os.hostname()}`;
    return friendlyName.substring(0, 64);
  }

  async saveCredentials() {
    const apiKeyFriendlyName = this.getApiKeyFriendlyName();
    let apiKey = null;

    const twilioClient = this.getTwilioClient();
    try {
      apiKey = await twilioClient.newKeys.create({ friendlyName: apiKeyFriendlyName });
      this.logger.debug(apiKey);
    } catch (err) {
      this.logger.debug(err);
      throw new TwilioCliError('Could not create an API Key.');
    }

    this.userConfig.addProfile(this.profileId, this.accountSid, this.region);
    await this.secureStorage.saveCredentials(this.profileId, apiKey.sid, apiKey.secret);
    const configSavedMessage = await this.configFile.save(this.userConfig);

    this.logger.info(
      `Created API Key ${apiKey.sid} and stored the secret ${
        FRIENDLY_STORAGE_LOCATIONS[this.secureStorage.storageLocation]
      }. See: https://www.twilio.com/console/runtime/api-keys/${apiKey.sid}`
    );
    this.logger.info(configSavedMessage);
  }
}

ProfilesCreate.aliases = ['profiles:add', 'login'];
ProfilesCreate.description = 'create a new profile to store Twilio Project credentials and configuration';

ProfilesCreate.flags = Object.assign(
  {
    'auth-token': flags.string({
      description: 'Your Twilio Auth Token for your Twilio Project.'
    }),
    force: flags.boolean({
      char: 'f',
      description: 'Force overwriting existing profile credentials.'
    }),
    region: flags.string({
      hidden: true
    })
  },
  TwilioClientCommand.flags // Yes! We _do_ want the same flags as TwilioClientCommand
);

ProfilesCreate.args = [
  {
    name: 'account-sid',
    description: 'The Account SID for your Twilio Project.'
  }
];

module.exports = ProfilesCreate;
