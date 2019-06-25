const { kebabCase, camelCase, capitalize } = require('../../src/services/naming-conventions');

const { expect, test } = require('@twilio/cli-test');

describe('services', () => {
  describe('namingConventions', () => {
    describe('kebabCase', () => {
      test.it('handles single word', () => {
        expect(kebabCase('one')).to.equal('one');
      });

      test.it('trims leading and trailing spaces', () => {
        expect(kebabCase('  one  ')).to.equal('one');
      });

      test.it('trims leading and trailing symbols', () => {
        expect(kebabCase('__one__')).to.equal('one');
      });

      test.it('handles words with spaces', () => {
        expect(kebabCase('one two')).to.equal('one-two');
        expect(kebabCase('one two three')).to.equal('one-two-three');
      });

      test.it('handles two words with extra space', () => {
        expect(kebabCase('one  two')).to.equal('one-two');
        expect(kebabCase('one  two  three')).to.equal('one-two-three');
      });

      test.it('handles snake_case', () => {
        expect(kebabCase('one_two')).to.equal('one-two');
        expect(kebabCase('one_two_three')).to.equal('one-two-three');
      });

      test.it('handles camelCase', () => {
        expect(kebabCase('oneTwo')).to.equal('one-two');
        expect(kebabCase('oneTwoThree')).to.equal('one-two-three');
      });

      test.it('handles PascalCase', () => {
        expect(kebabCase('OneTwo')).to.equal('one-two');
        expect(kebabCase('OneTwoThree')).to.equal('one-two-three');
      });

      test.it('handles PascalCase with digits', () => {
        expect(kebabCase('One1Two')).to.equal('one1-two');
        expect(kebabCase('One1Two2Three')).to.equal('one1-two2-three');
      });

      test.it('handles kebab-case', () => {
        expect(kebabCase('one-two')).to.equal('one-two');
        expect(kebabCase('one-two-three')).to.equal('one-two-three');
      });
    });

    describe('camelCase', () => {
      test.it('handles single word', () => {
        expect(camelCase('one')).to.equal('one');
      });

      test.it('handles all caps word', () => {
        expect(camelCase('ONE')).to.equal('one');
      });

      test.it('trims leading and trailing spaces', () => {
        expect(camelCase('  one  ')).to.equal('one');
      });

      test.it('trims leading and trailing symbols', () => {
        expect(kebabCase('__one__')).to.equal('one');
      });

      test.it('handles words with spaces', () => {
        expect(camelCase('one two')).to.equal('oneTwo');
        expect(camelCase('one two three')).to.equal('oneTwoThree');
      });

      test.it('handles two words with extra space', () => {
        expect(camelCase('one  two')).to.equal('oneTwo');
        expect(camelCase('one  two  three')).to.equal('oneTwoThree');
      });

      test.it('handles snake_case', () => {
        expect(camelCase('one_two')).to.equal('oneTwo');
        expect(camelCase('one_two_three')).to.equal('oneTwoThree');
      });

      test.it('handles camelCase', () => {
        expect(camelCase('oneTwo')).to.equal('oneTwo');
        expect(camelCase('oneTwoThree')).to.equal('oneTwoThree');
      });

      test.it('handles PascalCase', () => {
        expect(camelCase('OneTwo')).to.equal('oneTwo');
        expect(camelCase('OneTwoThree')).to.equal('oneTwoThree');
      });

      test.it('handles kebab-case', () => {
        expect(camelCase('one-two')).to.equal('oneTwo');
        expect(camelCase('one-two-three')).to.equal('oneTwoThree');
      });
    });

    describe('capitalize', () => {
      test.it('handles single word', () => {
        expect(capitalize('one')).to.equal('One');
      });

      test.it('handles multiple words', () => {
        expect(capitalize('one two three')).to.equal('One two three');
      });

      test.it('trims leading and trailing spaces', () => {
        expect(capitalize('  one  ')).to.equal('One');
      });
    });
  });
});
