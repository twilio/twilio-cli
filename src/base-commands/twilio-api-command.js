/* eslint no-warning-comments: "off" */
// TODO: Remove the above eslint directive when this file
// is free of TODO's.

const { flags } = require('@oclif/command');
const TwilioClientCommand = require('./twilio-client-command');
const { validateSchema } = require('../services/api-schema/schema-validator');
const { kebabCase, camelCase } = require('../services/naming-conventions');
const { doesObjectHaveProperty } = require('../services/javascript-utilities');
const ResourcePathParser = require('../services/resource-path-parser');

const isInstanceAction = actionName => ['fetch', 'remove', 'update'].includes(actionName);

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
    const cmd = this.constructor;
    const domainName = cmd.actionDefinition.domainName;
    const versionName = cmd.actionDefinition.versionName;
    const currentPath = cmd.actionDefinition.path;
    const actionName = cmd.actionDefinition.actionName;

    const { flags: receivedFlags } = this.parse(this.constructor);

    // TODO: Possible extender event: "beforeValidateParameters"

    const camelCasedFlags = {};
    const flagErrors = {};
    Object.keys(receivedFlags).forEach(key => {
      const flagValue = receivedFlags[key];

      if (doesObjectHaveProperty(cmd.flags[key], 'apiDetails')) {
        const schema = cmd.flags[key].apiDetails.parameter.schema;
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

    if (isInstanceAction(actionName)) {
      endpoint = endpoint(receivedFlags.sid);
      delete receivedFlags.sid;
      this.logger.debug(`endpoint=${typeof endpoint}`);
    }
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
    this.output(Array.isArray(response) ? response : [response], this.flags.properties);

    // TODO: Possible extender event: "afterInvokeApi"
  }
}

TwilioApiCommand.flags = TwilioClientCommand.flags;

// A static function to help us add the other static
// fields required by oclif on our dynamically created
// command class.
TwilioApiCommand.setUpApiCommandOptions = cmd => {
  const domainName = cmd.actionDefinition.domainName;
  const versionName = cmd.actionDefinition.versionName;
  const resource = cmd.actionDefinition.resource;
  const action = cmd.actionDefinition.action;

  // Parameters
  const cmdFlags = {};
  const isApi2010 = domainName === 'api' && versionName === 'v2010';
  action.parameters.forEach(param => {
    const flagName = kebabCase(param.name);
    const flagConfig = {
      description: param.description,
      // AccountSid on api.v2010 not required, we can get from the current project
      required: flagName === ACCOUNT_SID_FLAG && isApi2010 ? false : param.required,
      multiple: param.schema.type === 'array',
      apiDetails: {
        parameter: param,
        action: action,
        resource: resource
      }
    };

    let flagType;
    if (doesObjectHaveProperty(param.schema, 'enum')) {
      flagType = flags.enum;
      flagConfig.options = param.schema.enum
        .map(value => value.toLowerCase()) // standardize the enum values
        .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates
    } else {
      flagType = typeMap[param.schema.type];
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

  cmdFlags.properties = flags.string({
    default: 'sid',
    description: 'The properties you would like to display (JSON output always shows all properties)'
  });

  // Class statics
  cmd.id = cmd.actionDefinition.topicName + ':' + cmd.actionDefinition.commandName;
  cmd.args = [];
  cmd.flags = Object.assign(cmdFlags, TwilioApiCommand.flags);
  cmd.description = action.description;
  cmd.load = () => cmd;
};

module.exports = TwilioApiCommand;
