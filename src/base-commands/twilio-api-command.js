/* eslint no-warning-comments: "off" */
// TODO: Remove the above eslint directive when this file
// is free of TODO's.

const { flags } = require('@oclif/command');
const TwilioClientCommand = require('./twilio-client-command');
const { kebabCase, camelCase } = require('../services/naming-conventions');

// Open API type to oclif flag type mapping
const typeMap = {
  boolean: flags.boolean,
  integer: flags.integer
};

// AccountSid is a special snowflake
const accountSidFlag = 'account-sid';

class TwilioApiCommand extends TwilioClientCommand {
  async run() {
    await super.run();

    const cmd = this.constructor;
    const domainName = cmd.actionDefinition.domainName;
    const versionName = cmd.actionDefinition.versionName;
    const currentPath = cmd.actionDefinition.path;

    const { flags } = this.parse(this.constructor);

    // TODO: Possible extender event: "beforeValidateParameters"

    Object.keys(flags).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(cmd.flags[key], 'apiDetails')) {
        const schema = cmd.flags[key].apiDetails.parameter.schema;
        // TODO: Run param validation for minLength, maxLength, and pattern
        this.logger.debug(`Schema for ${key}: ` + JSON.stringify(schema));
      }
    });

    this.logger.debug('Provided flags: ' + JSON.stringify(flags));

    // TODO: Possible extender event: "afterValidateParameters"

    // TODO: Possible extender event: "beforeInvokeApi"

    // This converts a path like "/Accounts/{AccountSid}/Calls" to
    // the Node.js object in the Twilio Helper library.
    // Example: twilioClient.api.v2010.accounts('ACxxxx').calls
    const helperVersion = this.twilioClient[domainName][versionName];
    const pathNodes = currentPath.split('/');
    pathNodes.splice(0, 1); // Remove first empty node
    let endpoint = helperVersion;
    pathNodes.forEach(pathNode => {
      if (pathNode.startsWith('{')) {
        const paramName = kebabCase(pathNode.replace(/[{}]/g, ''));
        let value = '';
        if (Object.hasOwnProperty.call(flags, paramName)) {
          value = flags[paramName];
        } else if (paramName === accountSidFlag) {
          value = this.twilioClient.accountSid;
        }
        endpoint = endpoint(value);
      } else {
        endpoint = endpoint[camelCase(pathNode)];
      }
    });

    const camelCasedFlags = {};
    Object.keys(flags).forEach(key => {
      camelCasedFlags[camelCase(key)] = flags[key];
    });

    let response;
    try {
      response = await endpoint.create(camelCasedFlags);
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
    this.output([response], this.flags.properties);

    // TODO: Possible extender event: "afterInvokeApi"
  }
}

TwilioApiCommand.flags = TwilioClientCommand.flags;

TwilioApiCommand.setUpApiCommandOptions = cmd => {
  const domainName = cmd.actionDefinition.domainName;
  const versionName = cmd.actionDefinition.versionName;
  const resource = cmd.actionDefinition.resource;
  const action = cmd.actionDefinition.action;

  // Parameters
  const cmdFlags = {};
  const isApi2010 = domainName === 'api' && versionName === 'v2010';
  action.parameters.forEach(p => {
    const flagName = kebabCase(p.name);
    const flagConfig = {
      description: p.description,
      // AccountSid on api.v2010 not required, we can get from the current project
      required: flagName === accountSidFlag && isApi2010 ? false : p.required,
      multiple: p.schema.type === 'array',
      apiDetails: {
        parameter: p,
        action: action,
        resource: resource
      }
    };

    let flagType = flags.string;
    if (Object.prototype.hasOwnProperty.call(typeMap, p.schema.type)) {
      flagType = typeMap[p.schema.type];
    } else if (Object.prototype.hasOwnProperty.call(p.schema, 'enums')) {
      flagType = flags.enum;
      flagConfig.options = p.schema.enums
        .map(value => value.toLowerCase()) // standardize the enum values
        .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates
    }

    cmdFlags[flagName] = flagType(flagConfig);
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
