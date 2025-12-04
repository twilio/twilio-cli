const os = require('os');

const { Flags: flags } = require('@oclif/core');
const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { CliRequestClient } = require('@twilio/cli-core').services;
const { TwilioCliError } = require('@twilio/cli-core').services.error;

const helpMessages = require('../../services/messaging/help-messages');

const SKIP_VALIDATION = 'skip-parameter-validation';

/*
 * REGION_EDGE_MAP: Temporary mapping for Phase 1 migration
 * Phase 1: Support api.twilio.com and api.region.edge.twilio.com, deprecate api.region.twilio.com
 * Phase 2: Will deprecate api.region.edge.twilio.com and restore api.region.twilio.com
 * This mapping auto-fills edge when only region is provided, with deprecation warning
 * Aligns with cli-core's buildClient() behavior (see @twilio/cli-core/src/base-commands/twilio-client-command.js)
 */
const REGION_EDGE_MAP = {
  au1: 'sydney',
  br1: 'sao-paulo',
  de1: 'frankfurt',
  ie1: 'dublin',
  jp1: 'tokyo',
  jp2: 'osaka',
  sg1: 'singapore',
  us1: 'ashburn',
  us2: 'umatilla',
};

class ProfilesCreate extends BaseCommand {
  constructor(argv, config) {
    super(argv, config);

    this.accountSid = undefined;
    this.authToken = undefined;
    this.profileId = undefined;
    this.force = false;
    this.questions = [];
  }

  async run() {
    await super.run();

    this.loadArguments();

    this.loadAccountSid();
    this.loadAuthToken();
    await this.promptForCredentials();

    if (await this.validateCredentials()) {
      await this.loadProfileId();
      await this.saveCredentials();
      this.logger.info(`Saved ${this.profileId}.`);
      if (!this.userConfig.getActiveProfile()) {
        this.logger.warn(`You don't have any active profile set, run "twilio profiles:use" to set a profile as active`);
      }
    } else {
      this.cancel();
    }
  }

  loadArguments() {
    this.force = this.flags.force;
    this.region = this.flags.region;
    this.edge = this.flags.edge;

    /*
     * Phase 1 Migration: Auto-map edge from region if not explicitly provided
     * When region is specified without edge, automatically set edge using REGION_EDGE_MAP
     * and show deprecation warning. This is a temporary behavior during Phase 1 migration
     * where api.region.twilio.com is being deprecated in favor of api.edge.region.twilio.com.
     */
    if (this.region && !this.edge) {
      if (REGION_EDGE_MAP[this.region]) {
        this.logger.warn('Deprecation Warning: Setting default `edge` for provided `region`');
        this.edge = REGION_EDGE_MAP[this.region];
      } else {
        // For unmapped regions, require explicit --edge flag
        throw new TwilioCliError(
          `The --edge flag is required for region "${this.region}".\n\n` +
            'Regional endpoints require both region and edge location.\n' +
            `Example: twilio profiles:create --region ${this.region} --edge <edge-location>\n\n` +
            'Valid edge locations by region:\n' +
            '  au1: sydney\n' +
            '  ie1: dublin\n' +
            '  jp1: tokyo\n\n' +
            'For a complete list, visit: https://www.twilio.com/docs/global-infrastructure/edge-locations',
        );
      }
    }
  }

  async loadProfileId() {
    this.profileId = this.flags.profile;
    if (!this.profileId) {
      const answer = await this.inquirer.prompt([
        {
          name: 'profileId',
          message: this.getPromptMessage(ProfilesCreate.flags.profile.description),
          validate: (input) => Boolean(input.trim()),
        },
      ]);
      this.profileId = answer.profileId;
    }

    this.profileId = this.profileId.trim();

    if (!(await this.confirmProfileAndEnvVars()) || !(await this.confirmOverwrite())) {
      this.cancel();
    }
  }

  loadAccountSid() {
    this.accountSid = this.args['account-sid'];
    if (!this.accountSid) {
      this.questions.push({
        name: 'accountSid',
        message: this.getPromptMessage(ProfilesCreate.args[0].description),
        validate: (input) => this.validAccountSid(input),
      });
    }
  }

  loadAuthToken() {
    this.authToken = this.flags['auth-token'];
    if (!this.authToken) {
      this.questions.push({
        type: 'password',
        name: 'authToken',
        message: this.getPromptMessage(ProfilesCreate.flags['auth-token'].description),
        validate: (input) => this.validAuthToken(input),
      });
    }
  }

  validAccountSid(input) {
    if (!input) {
      return false;
    }

    if (!this.flags[SKIP_VALIDATION]) {
      if (!input.startsWith('AC') || input.length !== 34) {
        return 'Account SID must be "AC" followed by 32 hexadecimal digits (0-9, a-z)';
      }
    }

    return true;
  }

  validAuthToken(input) {
    if (!input) {
      return false;
    }

    if (!this.flags[SKIP_VALIDATION]) {
      if (input.length !== 32) {
        return 'Auth Token must be 32 characters in length';
      }
    }

    return true;
  }

  async promptForCredentials() {
    if (this.questions && this.questions.length > 0) {
      this.logger.info(helpMessages.WHERE_TO_FIND_ACCOUNT_SID);
      this.logger.error(helpMessages.AUTH_TOKEN_NOT_SAVED);
      const answers = await this.inquirer.prompt(this.questions);
      this.accountSid = answers.accountSid || this.accountSid;
      this.authToken = answers.authToken || this.authToken;
    }

    const throwIfInvalid = (valid) => {
      if (valid !== true) {
        throw new TwilioCliError(valid || 'You must provide a valid value');
      }
    };

    throwIfInvalid(this.validAccountSid(this.accountSid));
    throwIfInvalid(this.validAuthToken(this.authToken));
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
            default: false,
          },
        ]);
        // eslint-disable-next-line prefer-destructuring
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
          default: false,
        },
      ]);
      // eslint-disable-next-line prefer-destructuring
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
        region: this.region,
        edge: this.edge,
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
    } catch (error) {
      let errorMsg = 'Could not validate the provided credentials. Not saving.';

      // Add regional guidance for 20003 errors
      if (this.region && (error.code === 20003 || error.code === '20003')) {
        errorMsg += `\n\nYou are creating a profile for region "${this.region}".`;
        errorMsg += '\nEnsure you are using region-specific credentials:';
        errorMsg += '\n1. Log into the Twilio Console';
        errorMsg += '\n2. Navigate to Account > API Keys & Tokens section';
        errorMsg += `\n3. Use the Auth Token for the ${this.region.toUpperCase()} region located below the API Keys`;
        errorMsg += '\n\nRegion-specific Auth Tokens are different from your default (US) Auth Token.';
      }

      this.logger.error(errorMsg);
      this.logger.debug(error);
      return false;
    }
  }

  getApiKeyFriendlyName() {
    const username = this.getUsername();
    const friendlyName = `twilio-cli${username ? ` for ${username}` : ''} on ${os.hostname()}`;
    return friendlyName.substring(0, 64);
  }

  getUsername() {
    try {
      return os.userInfo().username;
    } catch (error) {
      // Throws a SystemError if a user has no username or homedir.
      this.logger.debug(error);

      return undefined;
    }
  }

  async saveCredentials() {
    const apiKeyFriendlyName = this.getApiKeyFriendlyName();
    let apiKey = null;

    const twilioClient = this.getTwilioClient();
    try {
      // Don't log the response since it contains the secret.
      apiKey = await twilioClient.newKeys.create({ friendlyName: apiKeyFriendlyName });
    } catch (error) {
      this.logger.debug(error);
      throw new TwilioCliError('Could not create an API Key.');
    }
    this.userConfig.addProfile(this.profileId, this.accountSid, this.region, this.edge, apiKey.sid, apiKey.secret);
    const configSavedMessage = await this.configFile.save(this.userConfig);

    this.logger.info(
      `Created API Key ${apiKey.sid} and stored the secret in Config. See: https://www.twilio.com/console/runtime/api-keys/${apiKey.sid}`,
    );
    this.logger.info(configSavedMessage);
  }
}

ProfilesCreate.aliases = ['profiles:add', 'login'];
ProfilesCreate.description = 'create a new profile to store Twilio Account credentials and configuration';

ProfilesCreate.flags = {
  'auth-token': flags.string({
    description: 'Your Twilio Auth Token for your Twilio Account or Subaccount.',
  }),
  force: flags.boolean({
    char: 'f',
    description: 'Force overwriting existing profile credentials.',
  }),
  [SKIP_VALIDATION]: flags.boolean({
    default: false,
    hidden: true,
  }),
  region: flags.string({
    description: 'Twilio region to use.',
  }),
  edge: flags.string({
    description: 'Twilio edge location to use. Auto-detected from region if not specified.',
  }),
  ...TwilioClientCommand.flags, // Yes! We _do_ want the same flags as TwilioClientCommand
};

ProfilesCreate.args = [
  {
    name: 'account-sid',
    description: 'The Account SID for your Twilio Account or Subaccount.',
  },
];

module.exports = ProfilesCreate;
