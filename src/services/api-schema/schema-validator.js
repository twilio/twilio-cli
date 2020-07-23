const TwilioSchemaValidator = require('./twilio-validator');

/**
 * Validates an object's value against a given schema. Uses the Twilio schema
 * validator.
 *
 * @param {Object} schema - object to validate against
 * @param {Object} value - object to validate
 * @param {Logger} logger - debug logger
 * @returns {Array} - validation errors strings
 */
function validateSchema(schema, value, logger) {
  const schemaValidator = new TwilioSchemaValidator(logger);
  schemaValidator.validateSchema(schema, value);
  return schemaValidator.errors;
}

module.exports = {
  validateSchema,
};
