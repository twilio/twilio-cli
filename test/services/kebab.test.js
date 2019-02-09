const kebab = require('../../src/services/kebab');

const { expect, test } = require('../test');

describe('services', () => {
  describe('kebab', () => {
    test.it('handles single word', () => {
      expect(kebab('one')).to.equal('one');
    });

    test.it('trims leading and trailing spaces', () => {
      expect(kebab('  one  ')).to.equal('one');
    });

    test.it('handles two words', () => {
      expect(kebab('one two')).to.equal('one-two');
    });

    test.it('handles two words with extra space', () => {
      expect(kebab('one  two')).to.equal('one-two');
    });

    test.it('handles snake_case', () => {
      expect(kebab('one_two')).to.equal('one-two');
    });

    test.it('handles camelCase', () => {
      expect(kebab('oneTwo')).to.equal('one-two');
    });

    test.it('handles PascalCase', () => {
      expect(kebab('OneTwo')).to.equal('one-two');
    });
  });
});
