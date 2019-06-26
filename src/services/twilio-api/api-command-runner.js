/* eslint no-warning-comments: "off" */
// TODO: Remove the above eslint directive when this file
// is free of TODO's.

const { doesObjectHaveProperty } = require('@twilio/cli-core').services.JSUtils;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const { logger } = require('@twilio/cli-core').services.logging;
const { kebabCase, camelCase } = require('@twilio/cli-core').services.namingConventions;
const { validateSchema } = require('../api-schema/schema-validator');
const { ResourcePathParser } = require('@twilio/cli-core').services;

// AccountSid is a special snowflake
const ACCOUNT_SID_FLAG = 'account-sid';

class ApiCommandRunner {
  constructor(twilioClient, actionDefinition, flagDefinitions, flagValues) {
    this.twilioClient = twilioClient;
    this.actionDefinition = actionDefinition;
    this.flagDefinitions = flagDefinitions;
    this.flagValues = flagValues;
  }

  async run() {
    this.validateFlags();

    const endpoint = this.getEndpoint();

    return this.execute(endpoint);
  }

  validateFlags() {
    // TODO: Possible extender event: "beforeValidateParameters"

    const flagErrors = {};
    Object.keys(this.flagValues).forEach(key => {
      const flagValue = this.flagValues[key];

      if (doesObjectHaveProperty(this.flagDefinitions[key], 'apiDetails')) {
        const schema = this.flagDefinitions[key].apiDetails.parameter.schema;
        logger.debug(`Schema for "${key}": ` + JSON.stringify(schema));

        const validationErrors = validateSchema(schema, flagValue, logger);

        if (validationErrors.length > 0) {
          flagErrors[key] = validationErrors;
        }
      }
    });

    logger.debug('Provided flags: ' + JSON.stringify(this.flagValues));

    // If there were any errors validating the flag values, log them by flag
    // key and throw.
    if (Object.keys(flagErrors).length > 0) {
      logger.error('Flag value validation errors:');
      Object.keys(flagErrors).forEach(key => {
        flagErrors[key].forEach(error => {
          logger.error(`  ${key}: ${error}`);
        });
      });
      throw new TwilioCliError('Cannot execute command');
    }

    // TODO: Possible extender event: "afterValidateParameters"
  }

  getEndpoint() {
    const domainName = this.actionDefinition.domainName;
    const versionName = this.actionDefinition.versionName;
    const path = this.actionDefinition.path;

    // This converts a path like "/Accounts/{AccountSid}/Calls" to
    // the Node.js object in the Twilio Helper library.
    // Example: twilioClient.api.v2010.accounts('ACxxxx').calls
    const helperVersion = this.twilioClient[domainName][versionName];
    const resourcePathParser = new ResourcePathParser(path);
    let endpoint = helperVersion;

    resourcePathParser.forEachPathNode(pathNode => {
      if (resourcePathParser.isPathVariable(pathNode)) {
        const paramName = kebabCase(pathNode.replace(/[{}]/g, ''));
        let value = '';

        if (doesObjectHaveProperty(this.flagValues, paramName)) {
          value = this.flagValues[paramName];
        } else if (paramName === ACCOUNT_SID_FLAG) {
          value = this.twilioClient.accountSid;
        }

        // Since this part of the path has a parameter, we invoke
        // the current endpoint as a function, passing the parameter
        // and then use it's result as the new endpoint.
        endpoint = endpoint(value);
        logger.debug(`pathNode=${pathNode}, value=${value}, endpoint=${typeof endpoint}`);
      } else {
        endpoint = endpoint[camelCase(pathNode)];
        logger.debug(`pathNode=${pathNode}, endpoint=${typeof endpoint}`);
      }
    });

    return endpoint;
  }

  async execute(endpoint) {
    const actionName = this.actionDefinition.actionName;

    const camelCasedFlags = {};
    Object.keys(this.flagValues).forEach(key => {
      camelCasedFlags[camelCase(key)] = this.flagValues[key];
    });

    logger.debug(`actionName=${actionName}, endpoint[actionName]=${typeof endpoint[actionName]}`);

    // TODO: Possible extender event: "beforeInvokeApi"

    const actionPromise = endpoint[actionName](camelCasedFlags);

    try {
      return await actionPromise;
    } catch (error) {
      throw new TwilioCliError(`Error code ${error.code} from Twilio: ${error.message}. See ${error.moreInfo} for more info.`, error.code);
    }

    // TODO: Possible extender event: "afterInvokeApi"
  }
}

module.exports = { ApiCommandRunner };
