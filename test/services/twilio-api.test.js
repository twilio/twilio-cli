const { getTopicName, getActionDescription } = require('../../src/services/twilio-api');

const { expect, test } = require('@twilio/cli-test');

describe('services', () => {
  describe('twilio-api', () => {
    describe('getTopicName', () => {
      test.it('handles a simple, non-nested resource path', () => {
        expect(getTopicName({
          domainName: 'foo',
          path: '/v1/Bars'
        })).to.equal('foo:v1:bars');
      });

      test.it('handles a nested resource path with parameters', () => {
        expect(getTopicName({
          domainName: 'foo',
          path: '/v1/Bars/{BarId}/SubBars/{SubBarId}.json'
        })).to.equal('foo:v1:bars:sub-bars');
      });
    });

    describe('getActionDescription', () => {
      test.it('returns existing action description', () => {
        const result = getActionDescription({
          action: {
            description: 'Hey there!'
          }
        });
        expect(result).to.equal('Hey there!');
      });

      test.it('returns a default List action description', () => {
        const result = getActionDescription({
          action: {
            description: null
          },
          actionName: 'list',
          path: '/Foo/Bar'
        });
        expect(result).to.equal('list multiple Bar resources');
      });

      test.it('returns a default Create action description', () => {
        const result = getActionDescription({
          action: {
            description: null
          },
          actionName: 'create',
          path: '/Foo/Bar.json'
        });
        expect(result).to.equal('create a Bar resource');
      });

      test.it('returns a default Fetch action description', () => {
        const result = getActionDescription({
          action: {
            description: null
          },
          actionName: 'fetch',
          path: '/Foo/{Account}/Bar/{BarSid}.json'
        });
        expect(result).to.equal('fetch a Bar resource');
      });

      test.it('returns a default Remove action description', () => {
        const result = getActionDescription({
          action: {
            description: null
          },
          actionName: 'remove',
          path: '/Foo/Bar/excellentSubResource'
        });
        expect(result).to.equal('remove an ExcellentSubResource resource');
      });

      test.it('handles actions with tags', () => {
        const result = getActionDescription({
          action: {
            description: 'Beeta!',
            tags: ['beta']
          },
          domain: {}
        });
        expect(result).to.equal('[BETA] Beeta!');
      });

      test.it('ignores GA tags', () => {
        const result = getActionDescription({
          action: {
            description: 'Generally Beta!',
            tags: ['beta', 'ga']
          },
          domain: {}
        });
        expect(result).to.equal('[BETA] Generally Beta!');
      });

      test.it('handles actions with tags and descriptions', () => {
        const result = getActionDescription({
          action: {
            description: 'Pree-vue!',
            tags: ['preview']
          },
          domain: {
            tags: [{
              name: 'preview',
              description: 'shhhh'
            }]
          }
        });
        expect(result).to.equal('[PREVIEW] Pree-vue!\n\nshhhh');
      });

      test.it('handles actions with multiple tags and description', () => {
        const result = getActionDescription({
          action: {
            description: 'Pre-beta!',
            tags: ['beta', 'preview']
          },
          domain: {
            tags: [{
              name: 'beta',
              description: '???'
            }, {
              name: 'preview',
              description: 'shhhh'
            }]
          }
        });
        expect(result).to.equal('[BETA] [PREVIEW] Pre-beta!\n\n???\n\nshhhh');
      });
    });
  });
});
