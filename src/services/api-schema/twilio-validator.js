const JSONSchemaValidator = require('./json-validator');

/**
 * A Twilio extension of the JSON Schema validator that is intended to be more
 * relaxed. This is because there may not be a 1-1 mapping between what Twilio
 * APIs accept and what can be specified in the JSON Schema.
 *
 * We don't do validation of string formats 'date', 'date-time', or 'uri'.
 *
 * The intent is for this to disappear as Twilio APIs become more standardized.
 */
class TwilioSchemaValidator extends JSONSchemaValidator {
  validateDate() {
    // No-op
  }

  validateDateTime() {
    // No-op
  }

  validateURI() {
    // No-op
  }
}

module.exports = TwilioSchemaValidator;
