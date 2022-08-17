/* eslint-disable max-classes-per-file */
const { Plugin } = require('@oclif/core');
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const { logger } = require('@twilio/cli-core').services.logging;
const { OutputFormats } = require('@twilio/cli-core').services.outputFormats;
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;

const { ApiCommandRunner, TOPIC_SEPARATOR, BASE_TOPIC_NAME, CORE_TOPIC_NAME } = require('../../services/twilio-api');

const LIST_COMMAND = [BASE_TOPIC_NAME, CORE_TOPIC_NAME, 'available-phone-numbers', '(.+)', 'list'].join(
  TOPIC_SEPARATOR,
);
const LIST_COMMAND_TYPE_GROUP_INDEX = 1;

const CREATE_COMMAND = [BASE_TOPIC_NAME, CORE_TOPIC_NAME, 'incoming-phone-numbers', 'create'].join(TOPIC_SEPARATOR);

const LIST_COMMAND_PATTERN = new RegExp(`^${LIST_COMMAND}$`);

const PHONE_NUMBER_FLAG = 'phone-number';
const AREA_CODE_FLAG = 'area-code';

class TwilioBuyPhoneNumberPlugin extends Plugin {
  constructor(config, listPhoneNumberCommands, createPhoneNumberCommand) {
    super(config);

    this.commandTopic = {
      name: ['phone-numbers', 'buy'].join(TOPIC_SEPARATOR),
      description: 'purchase Twilio phone numbers',
    };

    this.commands = listPhoneNumberCommands.map((listCommand) => {
      const commandIdMatch = listCommand.id.match(LIST_COMMAND_PATTERN);
      const phoneNumberType = commandIdMatch[LIST_COMMAND_TYPE_GROUP_INDEX];

      return this.buildCommandClass(listCommand, createPhoneNumberCommand, phoneNumberType);
    });
  }

  buildCommandClass(listCommand, createCommand, phoneNumberType) {
    const NewCommandClass = class extends TwilioClientCommand {
      async run() {
        await super.run();

        const phoneNumber = await this.getPhoneNumber();

        if (!(await this.confirmPurchase(phoneNumber))) {
          throw new TwilioCliError('Cancelled');
        }

        await this.purchasePhoneNumber(phoneNumber);
      }

      async getPhoneNumber() {
        const listCommandRunner = new ApiCommandRunner(
          this.twilioApiClient,
          listCommand.actionDefinition,
          listCommand.flags,
          this.flags,
        );

        const response = await listCommandRunner.run();

        this.logger.debug(`Search returned ${response.length} phone number(s)`);

        if (response.length === 0) {
          throw new TwilioCliError('Search returned 0 phone numbers. Please expand your search criteria.');
        }

        const limitedData = this.getLimitedData(response, this.flags.properties);
        const outputLines = OutputFormats.columns(response, limitedData).split('\n');
        const outputHeader = outputLines[0];
        const phoneNumberLines = outputLines.slice(1);

        const choices = response.map((item, index) => ({
          name: phoneNumberLines[index],
          value: item.phoneNumber,
        }));

        const phoneNumberSelection = await this.inquirer.prompt([
          {
            type: 'list',
            name: 'phoneNumber',
            // Throw on a newline (and space) so the selected phone number shows on the next line.
            message: `${outputHeader}\n `,
            choices,
            pageSize: 10, // Seems like a reasonable size.
          },
        ]);

        this.logger.debug(`Selected phone number: ${phoneNumberSelection.phoneNumber}`);

        return phoneNumberSelection.phoneNumber;
      }

      async confirmPurchase(phoneNumber) {
        const confirm = await this.inquirer.prompt([
          {
            type: 'confirm',
            name: 'affirmative',
            message: `Are you sure you want to purchase the phone number "${phoneNumber}"?`,
          },
        ]);

        return confirm.affirmative;
      }

      async purchasePhoneNumber(phoneNumber) {
        /*
         * Set the phone number flag and drop the area code flag (if present)
         * as they are mutually exclusive for the create command.
         */
        this.flags[PHONE_NUMBER_FLAG] = phoneNumber;
        delete this.flags[AREA_CODE_FLAG];

        const createCommandRunner = new ApiCommandRunner(
          this.twilioApiClient,
          createCommand.actionDefinition,
          createCommand.flags,
          this.flags,
        );

        const response = await createCommandRunner.run();

        this.logger.info('Phone number successfully purchased!');

        // Print the create response using the command's default output properties.
        this.output(response, createCommand.flags.properties.default);
      }
    };

    NewCommandClass.id = [this.commandTopic.name, phoneNumberType].join(TOPIC_SEPARATOR);
    NewCommandClass.description = `purchase a ${phoneNumberType} phone number`;
    NewCommandClass.args = listCommand.args;
    /*
     * Merge the flags for the commands we're utilizing. Place the list command
     * last so it takes precedence for conflicting flags (like the output
     * properties flag).
     */
    NewCommandClass.flags = { ...createCommand.flags, ...listCommand.flags };
    /*
     * Drop the phone number flag (part of the create command) since the
     * objective is to use the list command to figure it out.
     */
    delete NewCommandClass.flags[PHONE_NUMBER_FLAG];
    NewCommandClass.flags.properties.default = 'phoneNumber, region, isoCountry, addressRequirements';
    NewCommandClass.load = () => NewCommandClass;

    return NewCommandClass;
  }

  get hooks() {
    // This plugin doesn't introduce any other hooks. Return empty object.
    return {};
  }

  get topics() {
    return [this.commandTopic];
  }
}

module.exports = function buyPhoneNumbers() {
  const twilioApiPlugin = this.config.plugins.find((p) => p.name === 'api-cli-commands');

  if (!twilioApiPlugin) {
    logger.warn('Failed to locate the Twilio API Plugin');
    return;
  }

  const listPhoneNumberCommands = twilioApiPlugin.commands.filter((command) => command.id.match(LIST_COMMAND_PATTERN));
  const createPhoneNumberCommand = twilioApiPlugin.commands.find((command) => command.id === CREATE_COMMAND);

  if (listPhoneNumberCommands.length === 0) {
    logger.warn('Failed to locate available phone number list commands.');
    return;
  }

  if (!createPhoneNumberCommand) {
    logger.warn('Failed to locate incoming phone number create command.');
    return;
  }

  const plugin = new TwilioBuyPhoneNumberPlugin(this.config, listPhoneNumberCommands, createPhoneNumberCommand);
  plugin.name = 'buy-phone-number-commands';
  plugin.version = this.config.version;
  plugin.tag = 'latest';
  plugin.type = 'core';
  this.config.plugins.push(plugin);
};
