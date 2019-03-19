const JSONSchemaValidator = require('../../../src/services/api-schema/json-validator');

const { expect, test } = require('@twilio/cli-test');
const { Logger, LoggingLevel } = require('@twilio/cli-core').services.logging;

const validateSchema = (schema, value) => {
  const logger = new Logger({ level: LoggingLevel.debug });
  const schemaValidator = new JSONSchemaValidator(logger);
  schemaValidator.validateSchema(schema, value);
  return schemaValidator.errors;
};

describe('services/api-schema', () => {
  describe('json-validator', () => {
    describe('array-type', () => {
      const schema = {
        type: 'array',
        items: {
          type: 'string',
          minLength: 3,
          maxLength: 20,
          pattern: '^\\w+$'
        },
        minItems: 1,
        maxItems: 2,
        uniqueItems: true
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, ['single'])).to.be.empty;
        expect(validateSchema(schema, ['multi', 'item'])).to.be.empty;
      });

      test.it('reports too few items', () => {
        expect(validateSchema(schema, [])).to.have.length(1);
      });

      test.it('reports too many items', () => {
        expect(validateSchema(schema, ['too', 'many', 'items'])).to.have.length(1);
      });

      test.it('reports unique constraint violations', () => {
        expect(validateSchema(schema, ['UniqueNewYork', 'UniqueNewYork'])).to.have.length(1);
      });

      test.it('reports nested value violations', () => {
        expect(validateSchema(schema, ['not-just-letters'])).to.have.length(1);
        expect(validateSchema(schema, ['hm'])).to.have.length(1);
        expect(validateSchema(schema, ['Sorta_Big_Strings_And_Really_Big_Rings_00000'])).to.have.length(1);
      });

      test.it('reports invalid types', () => {
        expect(validateSchema(schema, 19.99)).to.have.length(1);
        expect(validateSchema(schema, 'free.99')).to.have.length(1);
        expect(validateSchema(schema, { 'an object?': 'what the what?!?' })).to.have.length(1);
      });
    });

    describe('boolean-type', () => {
      const schema = {
        type: 'boolean'
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, true)).to.be.empty;
        expect(validateSchema(schema, false)).to.be.empty;
      });

      test.it('reports invalid booleans', () => {
        expect(validateSchema(schema, 'true')).to.have.length(1);
        expect(validateSchema(schema, '')).to.have.length(1);
        expect(validateSchema(schema, 0)).to.have.length(1);
        expect(validateSchema(schema, null)).to.have.length(1);
      });
    });

    describe('integer-type', () => {
      const schema = {
        type: 'integer',
        minimum: -10,
        maximum: 10,
        multipleOf: 2
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, 2)).to.be.empty;
        expect(validateSchema(schema, '8')).to.be.empty;
        expect(validateSchema(schema, +10)).to.be.empty;
        expect(validateSchema(schema, -4)).to.be.empty;
      });

      test.it('reports invalid integers', () => {
        expect(validateSchema(schema, 'integer?')).to.have.length(1);
        expect(validateSchema(schema, [100])).to.have.length(1);
        expect(validateSchema(schema, 3.14159)).to.have.length(1);
      });

      test.it('reports min violations', () => {
        expect(validateSchema(schema, -14)).to.have.length(1);
      });

      test.it('reports max violations', () => {
        expect(validateSchema(schema, 12)).to.have.length(1);
      });

      test.it('reports multiple-of violations', () => {
        expect(validateSchema(schema, 5)).to.have.length(1);
      });

      test.it('reports multiple violations', () => {
        expect(validateSchema(schema, 11)).to.have.length(2);
      });
    });

    describe('number-type', () => {
      const schema = {
        type: 'number',
        minimum: 1,
        maximum: 2,
        exclusiveMinimum: true,
        exclusiveMaximum: true
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, 1.5)).to.be.empty;
        expect(validateSchema(schema, '1.9999')).to.be.empty;
      });

      test.it('reports invalid numbers', () => {
        expect(validateSchema(schema, 'noomber')).to.have.length(1);
        expect(validateSchema(schema, NaN)).to.have.length(1);
        expect(validateSchema(schema, 1.0)).to.have.length(1);
        expect(validateSchema(schema, 2.0)).to.have.length(1);
      });
    });

    describe('string-type', () => {
      const schema = {
        type: 'string',
        minLength: 6,
        maxLength: 20
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, 'a_strung')).to.be.empty;
      });

      test.it('reports bad values', () => {
        expect(validateSchema(schema, 'short')).to.have.length(1);
        expect(validateSchema(schema, 'loooooooooooooooooong')).to.have.length(1);
        expect(validateSchema(schema, ['not', 'a', 'string'])).to.have.length(1);
        expect(validateSchema(schema, 9.99)).to.have.length(1);
      });
    });

    describe('string-type-enum', () => {
      const schema = {
        type: 'string',
        enum: ['this', 'that']
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, 'that')).to.be.empty;
      });

      test.it('reports bad values', () => {
        expect(validateSchema(schema, 'other')).to.have.length(1);
        expect(validateSchema(schema, { this: 'that' })).to.have.length(1);
      });
    });

    describe('string-type-date', () => {
      const schema = {
        type: 'string',
        format: 'date'
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, '2019-01-01')).to.be.empty;
      });

      test.it('reports bad values', () => {
        expect(validateSchema(schema, '2019-1-1')).to.have.length(1);
        expect(validateSchema(schema, ['2019-12-31'])).to.have.length(1);
        expect(validateSchema(schema, 2019)).to.have.length(1);
        expect(validateSchema(schema, [2019, 1, 1])).to.have.length(1);
      });
    });

    describe('string-type-date-time', () => {
      const schema = {
        type: 'string',
        format: 'date-time'
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, '2019-01-01T12:13:14Z')).to.be.empty;
      });

      test.it('reports bad values', () => {
        expect(validateSchema(schema, '2019-01-01')).to.have.length(1);
        expect(validateSchema(schema, ['2019-01-01T12:13:14Z'])).to.have.length(1);
      });
    });

    describe('string-type-uri', () => {
      const schema = {
        type: 'string',
        format: 'uri'
      };

      test.it('validates happy paths', () => {
        expect(validateSchema(schema, 'http://web.service')).to.be.empty;
      });

      test.it('reports bad values', () => {
        expect(validateSchema(schema, 'myspace.com')).to.have.length(1);
        expect(validateSchema(schema, 127.0)).to.have.length(1);
      });
    });

    test.it('handles new schema types', () => {
      const schema = {
        type: 'object'
      };
      expect(validateSchema(schema, { key: 'value' })).to.be.empty;
    });

    test.it('handles new string formats', () => {
      const schema = {
        type: 'string',
        format: 'password'
      };
      expect(validateSchema(schema, 'super_secret')).to.be.empty;
    });
  });
});
