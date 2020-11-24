/* eslint no-warning-comments: "off" */
/*
 * TODO: Remove the above eslint directive when this file
 * is free of TODO's.
 */

const { doesObjectHaveProperty } = require('@twilio/cli-core').services.JSUtils;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const { logger } = require('@twilio/cli-core').services.logging;
const { TwilioApiFlags } = require('@twilio/cli-core').services.TwilioApi;

const { validateSchema } = require('../api-schema/schema-validator');
const { getFlagConfig } = require('./get-flag-config');

class ApiCommandRunner {
  constructor(twilioClient, actionDefinition, flagDefinitions, flagValues) {
    this.twilioClient = twilioClient;
    this.actionDefinition = actionDefinition;
    this.flagDefinitions = flagDefinitions;
    this.flagValues = flagValues;
  }

  async run() {
    this.validateFlags();

    return this.execute();
  }

  validateFlags() {
    // TODO: Possible extender event: "beforeValidateParameters"

    const flagErrors = {};
    Object.keys(this.flagValues).forEach((key) => {
      const flagValue = this.flagValues[key];

      if (doesObjectHaveProperty(this.flagDefinitions[key], 'apiDetails')) {
        const { schema } = this.flagDefinitions[key].apiDetails.parameter;
        logger.debug(`Schema for "${key}": ${JSON.stringify(schema)}`);

        const validationErrors = validateSchema(schema, flagValue, logger);

        if (validationErrors.length > 0) {
          flagErrors[key] = validationErrors;
        }
      }
    });

    logger.debug(`Provided flags: ${JSON.stringify(this.flagValues)}`);

    /*
     * If there were any errors validating the flag values, log them by flag
     * key and throw.
     */
    if (Object.keys(flagErrors).length > 0 && !this.flagValues['skip-parameter-validation']) {
      logger.error('Flag value validation errors:');
      Object.keys(flagErrors).forEach((key) => {
        flagErrors[key].forEach((error) => {
          logger.error(`  ${key}: ${error}`);
        });
      });
      throw new TwilioCliError('Cannot execute command');
    }

    // TODO: Possible extender event: "afterValidateParameters"
  }

  async execute() {
    const { domainName, path, actionName } = this.actionDefinition;
    const actionParams = this.actionDefinition.action.parameters || [];

    logger.debug(`domainName=${domainName}, path=${path}, actionName=${actionName}`);

    const pathParams = {};
    const queryParams = {};
    const headerParams = {};

    // Build the path, query, and header params based on the parameters defined with the API action.
    actionParams.forEach((parameter) => {
      switch (parameter.in) {
        case 'path':
          this.addParameter(parameter, pathParams);
          break;
        case 'header':
          this.addParameter(parameter, headerParams);
          break;
        default:
          this.addParameter(parameter, queryParams);
      }
    });

    // Also add any API "snowflake" flags to the query params.
    Object.values(TwilioApiFlags).forEach((apiFlagName) => {
      this.addParameter({ name: apiFlagName }, queryParams);
    });

    // TODO: Possible extender event: "beforeInvokeApi"

    return this.twilioClient[actionName]({
      domain: domainName,
      path,
      pathParams,
      data: queryParams,
      headers: headerParams,
    });

    // TODO: Possible extender event: "afterInvokeApi"
  }

  addParameter(parameter, params) {
    const flag = getFlagConfig(parameter, this.actionDefinition);

    // Add the param if it does't exist already and we have a value to add.
    if (!doesObjectHaveProperty(params, parameter.name) && doesObjectHaveProperty(this.flagValues, flag.name)) {
      params[parameter.name] = this.flagValues[flag.name];
    }
  }
}

module.exports = { ApiCommandRunner };
