const url = require('url');

// Implement validation for schema type 'object'?
const SCHEMA_TYPE_TO_VALIDATE_FUNC_MAP = {
  array: 'validateArray',
  boolean: 'validateBoolean',
  integer: 'validateInteger',
  number: 'validateNumber',
  string: 'validateString',
};

const STRING_FORMAT_TO_VALIDATE_FUNC_MAP = {
  date: 'validateDate',
  'date-time': 'validateDateTime',
  uri: 'validateURI',
};

function isEmpty(value) {
  return value.length === 0;
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

/**
 * A JSON Schema validator that implements validation as defined here:
 * http://json-schema.org
 */
class JSONSchemaValidator {
  constructor(logger) {
    this.logger = logger;
    this.errors = [];
  }

  validateSchema(schema, value) {
    const validateFunc = SCHEMA_TYPE_TO_VALIDATE_FUNC_MAP[schema.type];

    if (validateFunc) {
      this[validateFunc](schema, value);
    } else {
      this.logger.debug(`No validation function for "${schema.type}" schema type`);
    }
  }

  validateArray(schema, value) {
    if (!Array.isArray(value)) {
      this.errors.push(`"${value}" is not an array`);
      return;
    }

    // Recurse into the value using the schema's items schema.
    value.forEach((item) => this.validateSchema(schema.items, item));

    if (schema.minItems && value.length < schema.minItems) {
      this.errors.push(`"${value}" item count (${value.length}) less than min (${schema.minItems})`);
    }

    if (schema.maxItems && value.length > schema.maxItems) {
      this.errors.push(`"${value}" item count (${value.length}) greater than max (${schema.maxItems})`);
    }

    if (schema.uniqueItems && new Set(value).size !== value.length) {
      this.errors.push(`"${value}" contains duplicate items`);
    }
  }

  validateBoolean(schema, value) {
    if (typeof value !== 'boolean') {
      this.errors.push(`"${value}" is not a boolean`);
    }
  }

  validateInteger(schema, value) {
    if (!/^[+-]?\d+$/.test(value)) {
      this.errors.push(`"${value}" is not a valid integer`);
      return;
    }

    this.validateNumber(schema, value);
  }

  validateNumber(schema, value) {
    if (isNaN(value)) {
      this.errors.push(`"${value}" is not a valid number`);
      return;
    }

    if (schema.minimum !== undefined) {
      if (
        (schema.exclusiveMinimum && value <= schema.minimum) ||
        (!schema.exclusiveMinimum && value < schema.minimum)
      ) {
        this.errors.push(`"${value}" is less than min (${schema.minimum})`);
      }
    }

    if (schema.maximum !== undefined) {
      if (
        (schema.exclusiveMaximum && value >= schema.maximum) ||
        (!schema.exclusiveMaximum && value > schema.maximum)
      ) {
        this.errors.push(`"${value}" is greater than max (${schema.maximum})`);
      }
    }

    if (schema.multipleOf && value % schema.multipleOf !== 0) {
      this.errors.push(`"${value}" is not a multiple of "${schema.multipleOf}"`);
    }
  }

  validateString(schema, value) {
    if (!isString(value)) {
      this.errors.push(`"${value}" is not a string`);
      return;
    }

    if (isEmpty(value)) {
      return;
    }

    if (schema.minLength && value.length < schema.minLength) {
      this.errors.push(`"${value}" length (${value.length}) is less than min (${schema.minLength})`);
    }

    if (schema.maxLength && value.length > schema.maxLength) {
      this.errors.push(`"${value}" length (${value.length}) is greater than max (${schema.maxLength})`);
    }

    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      this.errors.push(`"${value}" does not match pattern "${schema.pattern}"`);
    }

    if (schema.enum) {
      this.validateEnum(schema, value);
    }

    if (schema.format) {
      const validateFunc = STRING_FORMAT_TO_VALIDATE_FUNC_MAP[schema.format];

      if (validateFunc) {
        this[validateFunc](schema, value);
      } else {
        this.logger.debug(`No validation function for "${schema.format}" schema format`);
      }
    }
  }

  validateEnum(schema, value) {
    if (schema.enum.indexOf(value) === -1) {
      this.errors.push(`"${value}" is not one of "${schema.enum}"`);
    }
  }

  validateDate(schema, value) {
    if (!isString(value) || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      this.errors.push(`"${value}" does not match date pattern "yyyy-MM-dd"`);
    }
  }

  validateDateTime(schema, value) {
    if (!isString(value) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) {
      this.errors.push(`"${value}" does not match date-time pattern "yyyy-MM-ddTHH:mm:ssZ"`);
    }
  }

  validateURI(schema, value) {
    const parsedValue = url.parse(value);

    if (!parsedValue.hostname) {
      this.errors.push(`"${value}" does not match URI pattern`);
    }
  }
}

module.exports = JSONSchemaValidator;
