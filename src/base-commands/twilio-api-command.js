/* eslint no-warning-comments: "off" */
// TODO: Remove the above eslint directive when this file
// is free of TODO's.

const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { doesObjectHaveProperty } = require('@twilio/cli-core').services.JSUtils;
const { validateSchema } = require('../services/api-schema/schema-validator');
const { kebabCase, camelCase } = require('../services/naming-conventions');
const ResourcePathParser = require('../services/resource-path-parser');
const { getActionDescription, isApi2010 } = require('../services/twilio-api');

// Open API type to oclif flag type mapping. For numerical types, we'll do validation elsewhere.
const typeMap = {
  array: flags.string,
  boolean: flags.boolean,
  integer: flags.string,
  number: flags.string,
  string: flags.string,
  object: flags.string,
  undefined: flags.string // TODO: Handle "anyOf" case more explicitly
};

// AccountSid is a special snowflake
const ACCOUNT_SID_FLAG = 'account-sid';

class TwilioApiCommand extends TwilioClientCommand {
  async run() {
    await super.run();

    // "this.constructor" is the class used for this command.
    // Because oclif is constructing the object for us,
    // we can't pass the actionDefinition in through
    // the constructor, so we make it a static property
    // of the command class.
    const ThisCommandClass = this.constructor;
    const domainName = ThisCommandClass.actionDefinition.domainName;
    const versionName = ThisCommandClass.actionDefinition.versionName;
    const currentPath = ThisCommandClass.actionDefinition.path;
    const actionName = ThisCommandClass.actionDefinition.actionName;

    const { flags: receivedFlags } = this.parse(this.constructor);

    // TODO: Possible extender event: "beforeValidateParameters"

    const camelCasedFlags = {};
    const flagErrors = {};
    Object.keys(receivedFlags).forEach(key => {
      const flagValue = receivedFlags[key];

      if (doesObjectHaveProperty(ThisCommandClass.flags[key], 'apiDetails')) {
        const schema = ThisCommandClass.flags[key].apiDetails.parameter.schema;
        this.logger.debug(`Schema for "${key}": ` + JSON.stringify(schema));

        const validationErrors = validateSchema(schema, flagValue, this.logger);

        if (validationErrors.length > 0) {
          flagErrors[key] = validationErrors;
        }
      }

      camelCasedFlags[camelCase(key)] = flagValue;
    });

    this.logger.debug('Provided flags: ' + JSON.stringify(receivedFlags));

    // If there were any errors validating the flag values, log them by flag
    // key and exit with a non-zero code.
    if (Object.keys(flagErrors).length > 0) {
      this.logger.error('Flag value validation errors:');
      Object.keys(flagErrors).forEach(key => {
        flagErrors[key].forEach(error => {
          this.logger.error(`  ${key}: ${error}`);
        });
      });
      this.exit(1);
    }

    // TODO: Possible extender event: "afterValidateParameters"

    // TODO: Possible extender event: "beforeInvokeApi"

    // This converts a path like "/Accounts/{AccountSid}/Calls" to
    // the Node.js object in the Twilio Helper library.
    // Example: twilioClient.api.v2010.accounts('ACxxxx').calls
    const helperVersion = this.twilioClient[domainName][versionName];
    const resourcePathParser = new ResourcePathParser(currentPath);
    let endpoint = helperVersion;

    resourcePathParser.forEachPathNode(pathNode => {
      if (resourcePathParser.isPathVariable(pathNode)) {
        const paramName = kebabCase(pathNode.replace(/[{}]/g, ''));
        let value = '';

        if (doesObjectHaveProperty(receivedFlags, paramName)) {
          value = receivedFlags[paramName];
        } else if (paramName === ACCOUNT_SID_FLAG) {
          value = this.twilioClient.accountSid;
        }

        // Since this part of the path has a parameter, we invoke
        // the current endpoint as a function, passing the parameter
        // and then use it's result as the new endpoint.
        endpoint = endpoint(value);
        this.logger.debug(`pathNode=${pathNode}, value=${value}, endpoint=${typeof endpoint}`);
      } else {
        endpoint = endpoint[camelCase(pathNode)];
        this.logger.debug(`pathNode=${pathNode}, endpoint=${typeof endpoint}`);
      }
    });

    this.logger.debug(`actionName=${actionName}, endpoint[actionName]=${typeof endpoint[actionName]}`);

    let response;
    try {
      response = await endpoint[actionName](camelCasedFlags);
    } catch (error) {
      if (error.moreInfo) {
        this.logger.error(`Error ${error.code} response from Twilio: ${error.message}`);
        this.logger.info(`See ${error.moreInfo} for more info.`);
      } else {
        this.logger.error(`Twilio library error: ${error.message}`);
      }
      this.exit(error.code);
    }

    // TODO: Figure out sane default output columns
    this.output(response, this.flags.properties);

    // TODO: Possible extender event: "afterInvokeApi"
  }
}

TwilioApiCommand.flags = TwilioClientCommand.flags;

// A static function to help us add the other static
// fields required by oclif on our dynamically created
// command class.
TwilioApiCommand.setUpNewCommandClass = NewCommandClass => {
  const domainName = NewCommandClass.actionDefinition.domainName;
  const versionName = NewCommandClass.actionDefinition.versionName;
  const resource = NewCommandClass.actionDefinition.resource;
  const action = NewCommandClass.actionDefinition.action;

  const sanitizeDescription = description => {
    if (description) {
      // Replace all backticks with single-quotes. We don't want them mistaken
      // for statements that need to be evaluated (think zsh autocomplete).
      return description.replace(/`/g, '\'');
    }
  };

  // Parameters
  const cmdFlags = {};
  action.parameters.forEach(param => {
    const flagName = kebabCase(param.name);
    const flagConfig = {
      description: sanitizeDescription(param.description),
      // AccountSid on api.v2010 not required, we can get from the current project
      required: flagName === ACCOUNT_SID_FLAG && isApi2010(domainName, versionName) ? false : param.required,
      multiple: param.schema.type === 'array',
      apiDetails: {
        parameter: param,
        action: action,
        resource: resource
      },
      // Allow negated booleans ('-no' option)
      allowNo: true
    };

    const flagType = typeMap[param.schema.type];

    if (doesObjectHaveProperty(param.schema, 'enum')) {
      // We want the best of all worlds. We want the help to show just lower-case options, but accept all options. Since
      // oclif doesn't support this, we'll create a string that matches the enum flag text and let the schema validator
      // take care of the actual validation.
      const options = param.schema.enum
        .map(value => value.toLowerCase()) // standardize the enum values
        .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates
      flagConfig.helpValue = `(${options.join('|')})`; // format it like the help plugin
    }

    if (flagType) {
      cmdFlags[flagName] = flagType(flagConfig);
    } else {
      // We don't have a logger in this context and our build process should ensure this
      // error condition isn't possible.
      // eslint-disable-next-line no-console
      console.error(`Unknown parameter type '${param.schema.type}' for parameter '${flagName}'`);
    }
  });

  const defaultProperties = resource.defaultOutputProperties || [];

  cmdFlags.properties = flags.string({
    // Camel-cased, CSV of the provided property list. Or just the SID.
    default: defaultProperties.map(prop => camelCase(prop)).join(',') || 'sid',
    description: 'The properties you would like to display (JSON output always shows all properties).'
  });

  // Class statics
  NewCommandClass.id = NewCommandClass.actionDefinition.topicName + ':' + NewCommandClass.actionDefinition.commandName;
  NewCommandClass.args = [];
  NewCommandClass.flags = Object.assign(cmdFlags, TwilioApiCommand.flags);
  NewCommandClass.description = sanitizeDescription(getActionDescription(NewCommandClass.actionDefinition));
  NewCommandClass.load = () => NewCommandClass;
};

module.exports = TwilioApiCommand;
