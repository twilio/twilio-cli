const { TwilioApiBrowser, getTopicName, getActionDescription } = require('../../src/services/twilio-api');

const { expect, test } = require('@twilio/cli-test');

describe('services', () => {
  describe('twilio-api', () => {
    describe('TwilioApiBrowser', () => {
      test.it('loads the JSON from disk', () => {
        const browser = new TwilioApiBrowser();
        // Check some known api endpoints that should be relatively stable
        expect(browser.domains.api.versions.v2010.resources['/Accounts/{AccountSid}/Calls'].actions.create).to.exist;
        expect(browser.domains.api.versions.v2010.resources['/Accounts/{AccountSid}/Calls/{Sid}'].actions.fetch).to.exist;
      });

      test.it('loads a specific api spec', () => {
        const browser = new TwilioApiBrowser([{
          paths: {
            '/2010-04-01/Widgets.json': {
              servers: [
                {
                  url: 'https://api.twilio.com'
                }
              ],
              description: 'Widgets here\nsecond line of text',
              'x-default-output-properties': ['sid']
            },
            '/v1/Gadgets.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              description: 'v1 Gadgets here',
              'x-default-output-properties': ['sid']
            },
            '/v2/Gadgets.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              post: { createStuff: '' },
              get: { listStuff: '' },
              description: 'v2 list Gadgets here',
              'x-default-output-properties': ['sid', 'name']
            },
            '/v2/Gadgets/{Sid}.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              post: { updateStuff: '' },
              get: { fetchStuff: '' },
              delete: { removeStuff: '' },
              description: 'v2 instance Gadgets here',
              'x-default-output-properties': ['sid', 'description']
            }
          },
          tags: [
            {
              name: 'GA',
              description: 'Generally Available!'
            }
          ]
        }]);

        expect(browser.domains).to.deep.equal({
          api: {
            tags: [
              {
                name: 'GA',
                description: 'Generally Available!'
              }
            ],
            versions: {
              v2010: {
                resources: {
                  '/Widgets': {
                    actions: {},
                    description: 'Widgets here second line of text',
                    defaultOutputProperties: ['sid']
                  }
                }
              }
            }
          },
          neato: {
            tags: [
              {
                name: 'GA',
                description: 'Generally Available!'
              }
            ],
            versions: {
              v1: {
                resources: {
                  '/Gadgets': {
                    actions: {},
                    description: 'v1 Gadgets here',
                    defaultOutputProperties: ['sid']
                  }
                }
              },
              v2: {
                resources: {
                  '/Gadgets': {
                    actions: {
                      create: { createStuff: '' },
                      list: { listStuff: '' }
                    },
                    description: 'v2 list Gadgets here',
                    defaultOutputProperties: ['sid', 'name']
                  },
                  '/Gadgets/{Sid}': {
                    actions: {
                      fetch: { fetchStuff: '' },
                      update: { updateStuff: '' },
                      remove: { removeStuff: '' }
                    },
                    description: 'v2 instance Gadgets here',
                    defaultOutputProperties: ['sid', 'description']
                  }
                }
              }
            }
          }
        });
      });
    });

    describe('getTopicName', () => {
      test.it('handles a simple, non-nested resource path', () => {
        expect(getTopicName({
          domainName: 'foo',
          versionName: 'v1',
          path: '/Bars'
        })).to.equal('foo:v1:bars');
      });

      test.it('handles a nested resource path with parameters', () => {
        expect(getTopicName({
          domainName: 'foo',
          versionName: 'v1',
          path: '/Bars/{BarId}/SubBars/{SubBarId}'
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
          path: '/Foo/Bar'
        });
        expect(result).to.equal('create a Bar resource');
      });

      test.it('returns a default Fetch action description', () => {
        const result = getActionDescription({
          action: {
            description: null
          },
          actionName: 'fetch',
          path: '/Foo/Bar/{BarSid}'
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
