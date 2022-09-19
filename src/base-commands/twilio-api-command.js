/* eslint no-warning-comments: "off" */
/*
 * TODO: Remove the above eslint directive when this file
 * is free of TODO's.
 */

const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { doesObjectHaveProperty } = require('@twilio/cli-core').services.JSUtils;
const { logger } = require('@twilio/cli-core').services.logging;
const { camelCase } = require('@twilio/cli-core').services.namingConventions;
const { Flags: flags } = require('@oclif/core');

const { ApiCommandRunner, getActionDescription, getFlagConfig, getDocLink } = require('../services/twilio-api');

// Open API type to oclif flag type mapping. For numerical types, we'll do validation elsewhere.
const typeMap = {
  array: flags.string,
  boolean: flags.boolean,
  integer: flags.string,
  number: flags.string,
  string: flags.string,
  object: flags.string,
  undefined: flags.string, // TODO: Handle "anyOf" case more explicitly
};

const isRemoveCommand = (actionDefinition) => actionDefinition.commandName === 'remove';

class TwilioApiCommand extends TwilioClientCommand {
  async run() {
    await super.run();

    const runner = new ApiCommandRunner(
      this.twilioApiClient,
      this.constructor.actionDefinition,
      this.constructor.flags,
      this.flags,
    );

    const response = await runner.run();

    if (isRemoveCommand(this.constructor.actionDefinition)) {
      logger.info(response ? 'The resource was deleted successfully' : 'Failed to delete the resource');
      return;
    }

    this.output(response, this.flags.properties);
  }
}

TwilioApiCommand.flags = {
  'skip-parameter-validation': flags.boolean({
    default: false,
    hidden: true,
  }),
  ...TwilioClientCommand.flags,
};

/*
 * A static function to help us add the other static
 * fields required by oclif on our dynamically created
 * command class.
 */
TwilioApiCommand.setUpNewCommandClass = (NewCommandClass) => {
  const { resource, action } = NewCommandClass.actionDefinition;
  const commandId = `${NewCommandClass.actionDefinition.topicName}:${NewCommandClass.actionDefinition.commandName}`;

  // Parameters
  let cmdFlags = {};
  (action.parameters || []).forEach((param) => {
    const flagConfig = getFlagConfig(param, NewCommandClass.actionDefinition);
    const flagType = typeMap[param.schema.type];

    flagConfig.apiDetails = {
      parameter: param,
      action,
      resource,
    };

    if (doesObjectHaveProperty(param.schema, 'enum')) {
      /*
       * We want the best of all worlds. We want the help to show just lower-case options, but accept all options. Since
       * oclif doesn't support this, we'll create a string that matches the enum flag text and let the schema validator
       * take care of the actual validation.
       */
      const options = param.schema.enum
        .map((value) => value.toLowerCase()) // standardize the enum values
        .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates
      flagConfig.helpValue = `(${options.join('|')})`; // format it like the help plugin
    }

    if (flagType) {
      /*
       * If the flag already exists, issue a warning. We're not equipped to
       * handle such issues at the moment.
       */
      if (cmdFlags[flagConfig.name]) {
        logger.warn(`The command "${commandId}" contains a conflicting flag: "--${flagConfig.name}"`);
      }

      cmdFlags[flagConfig.name] = flagType(flagConfig);
    } else {
      logger.error(`Unknown parameter type '${param.schema.type}' for parameter '${param.name}'`);
    }
  });

  // 'remove' commands have no response body and thus do not need display properties.
  if (NewCommandClass.actionDefinition.commandName !== 'remove') {
    const defaultProperties =
      (action && action.defaultOutputProperties) || (resource && resource.defaultOutputProperties) || [];

    cmdFlags.properties = flags.string({
      // Camel-cased, CSV of the provided property list. Or just the SID.
      default: defaultProperties.map((prop) => camelCase(prop)).join(',') || 'sid',
      description: 'The properties you would like to display (JSON output always shows all properties).',
    });
  }

  if (
    NewCommandClass.actionDefinition.commandName === 'list' ||
    NewCommandClass.actionDefinition.commandName === 'fetch'
  ) {
    cmdFlags = Object.assign(cmdFlags, TwilioClientCommand.noHeader);
  }

  // 'list' commands get limit flags for specifying the result set size.
  if (NewCommandClass.actionDefinition.commandName === 'list') {
    cmdFlags = Object.assign(cmdFlags, TwilioClientCommand.limitFlags);
  }

  // Class statics
  NewCommandClass.id = commandId;
  NewCommandClass.args = [];
  NewCommandClass.flags = Object.assign(cmdFlags, TwilioApiCommand.flags);
  NewCommandClass.description = getActionDescription(NewCommandClass.actionDefinition);
  NewCommandClass.docLink = getDocLink(NewCommandClass.id);
  NewCommandClass.load = () => NewCommandClass;

  return NewCommandClass;
};

module.exports = TwilioApiCommand;
