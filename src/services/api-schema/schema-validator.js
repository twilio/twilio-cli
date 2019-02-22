const TwilioSchemaValidator = require('./twilio-validator');

/**
 * Validates an object's value against a given schema. Uses the Twilio schema
 * validator.
 *
 * @param schema {Object} - object to validate against
 * @param value {Object} - object to validate
 * @param logger {Logger} - debug logger
 * @returns {Array} - validation errors strings
 */
function validateSchema(schema, value, logger) {
  const schemaValidator = new TwilioSchemaValidator(logger);
  schemaValidator.validateSchema(schema, value);
  return schemaValidator.errors;
}

module.exports = {
  validateSchema
};
