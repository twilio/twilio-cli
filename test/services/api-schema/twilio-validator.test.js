const TwilioSchemaValidator = require('../../../src/services/api-schema/twilio-validator');

const { expect, test, logger } = require('../../test');

const validateSchema = (schema, value) => {
  const schemaValidator = new TwilioSchemaValidator(logger);
  schemaValidator.validateSchema(schema, value);
  return schemaValidator.errors;
};

describe('services/api-schema', () => {
  describe('twilio-validator', () => {
    describe('string-type-date', () => {
      const schema = {
        type: 'string',
        format: 'date'
      };

      test.it('accepts any string', () => {
        expect(validateSchema(schema, '2019-01-01')).to.be.empty;
        expect(validateSchema(schema, 'November 5, 1605')).to.be.empty;
        expect(validateSchema(schema, 'yesterday')).to.be.empty;
      });

      test.it('reports non-strings', () => {
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

      test.it('accepts any string', () => {
        expect(validateSchema(schema, '2019-01-01T12:13:14Z')).to.be.empty;
        expect(validateSchema(schema, 'noon-ish')).to.be.empty;
      });

      test.it('reports non-strings', () => {
        expect(validateSchema(schema, ['2019-01-01T12:13:14Z'])).to.have.length(1);
        expect(validateSchema(schema, -5)).to.have.length(1);
      });
    });

    describe('string-type-uri', () => {
      const schema = {
        type: 'string',
        format: 'uri'
      };

      test.it('accepts any string', () => {
        expect(validateSchema(schema, 'http://web.service')).to.be.empty;
        expect(validateSchema(schema, 'my " " dot com')).to.be.empty;
      });

      test.it('reports non-strings', () => {
        expect(validateSchema(schema, 127.0)).to.have.length(1);
        expect(validateSchema(schema, ['a', 'web', 'hook'])).to.have.length(1);
      });
    });
  });
});
