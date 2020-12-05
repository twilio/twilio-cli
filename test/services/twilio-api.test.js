const { expect, test } = require('@twilio/cli-test');

const { getTopicName, getActionDescription } = require('../../src/services/twilio-api');

describe('services', () => {
  describe('twilio-api', () => {
    describe('getTopicName', () => {
      test.it('handles a simple, non-nested resource path', () => {
        expect(
          getTopicName({
            domainName: 'foo',
            path: '/v1/Bars',
          }),
        ).to.equal('foo:v1:bars');
      });

      test.it('handles a nested resource path with parameters', () => {
        expect(
          getTopicName({
            domainName: 'foo',
            path: '/v1/Bars/{BarId}/SubBars/{SubBarId}.json',
          }),
        ).to.equal('foo:v1:bars:sub-bars');
      });

      test.it('handles v2010 APIs', () => {
        expect(
          getTopicName({
            domainName: 'api',
            path: '/2010-04-01/Accounts/{Sid}.json',
          }),
        ).to.equal('core:accounts');

        expect(
          getTopicName({
            domainName: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json',
          }),
        ).to.equal('core:addresses');
      });
    });

    describe('getActionDescription', () => {
      test.it('returns existing action description', () => {
        const result = getActionDescription({
          action: {
            description: 'Hey there!',
          },
        });
        expect(result).to.equal('Hey there!');
      });

      test.it('returns a default List action description', () => {
        const result = getActionDescription({
          action: {
            description: null,
          },
          actionName: 'list',
          path: '/Foo/Bar',
        });
        expect(result).to.equal('list multiple Bar resources');
      });

      test.it('returns a default Create action description', () => {
        const result = getActionDescription({
          action: {
            description: null,
          },
          actionName: 'create',
          path: '/Foo/Bar.json',
        });
        expect(result).to.equal('create a Bar resource');
      });

      test.it('returns a default Fetch action description', () => {
        const result = getActionDescription({
          action: {
            description: null,
          },
          actionName: 'fetch',
          path: '/Foo/{Account}/Bar/{BarSid}.json',
        });
        expect(result).to.equal('fetch a Bar resource');
      });

      test.it('returns a default Remove action description', () => {
        const result = getActionDescription({
          action: {
            description: null,
          },
          actionName: 'remove',
          path: '/Foo/Bar/excellentSubResource',
        });
        expect(result).to.equal('remove an ExcellentSubResource resource');
      });

      test.it('handles actions with maturity', () => {
        const result = getActionDescription({
          action: {
            description: 'Beeta!',
            'x-maturity': ['beta'],
          },
          domain: {},
        });
        expect(result).to.equal('[BETA] Beeta!');
      });

      test.it('ignores GA maturity level', () => {
        const result = getActionDescription({
          action: {
            description: 'Generally Beta!',
            'x-maturity': ['beta', 'ga'],
          },
          domain: {},
        });
        expect(result).to.equal('[BETA] Generally Beta!');
      });

      test.it('handles actions with maturity and descriptions', () => {
        const result = getActionDescription({
          action: {
            description: 'Pree-vue!',
            'x-maturity': ['preview'],
          },
          domain: {
            'x-maturity': [
              {
                name: 'preview',
                description: 'shhhh',
              },
            ],
          },
        });
        expect(result).to.equal('[PREVIEW] Pree-vue!\n\nshhhh');
      });

      test.it('handles actions with multiple maturities and description', () => {
        const result = getActionDescription({
          action: {
            description: 'Pre-beta!',
            'x-maturity': ['beta', 'preview'],
          },
          domain: {
            'x-maturity': [
              {
                name: 'beta',
                description: '???',
              },
              {
                name: 'preview',
                description: 'shhhh',
              },
            ],
          },
        });
        expect(result).to.equal('[BETA] [PREVIEW] Pre-beta!\n\n???\n\nshhhh');
      });
    });
  });
});
