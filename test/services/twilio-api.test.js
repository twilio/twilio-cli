const { TwilioApiBrowser, getTopicName } = require('../../src/services/twilio-api');

const { expect, test } = require('../test');

describe('services', () => {
  describe('twilio-api', () => {
    describe('TwilioApiBrowser', () => {
      test.it('loads the JSON from disk', () => {
        const browser = new TwilioApiBrowser();
        // Check some known api endpoints that should be relatively stable
        expect(browser.domains.api.versions.v2010.resources['/Accounts/{AccountSid}/Calls'].actions.create).to.exist;
        expect(browser.domains.api.versions.v2010.resources['/Accounts/{AccountSid}/Calls'].actions.fetch).to.exist;
      });

      test.it('loads a specific api spec', () => {
        const browser = new TwilioApiBrowser({
          paths: {
            '/2010-04-01/Widgets.json': {
              servers: [
                {
                  url: 'https://api.twilio.com'
                }
              ],
              description: 'Widgets here\nsecond line of text'
            },
            '/v1/Gadgets.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              description: 'v1 Gadgets here'
            },
            '/v2/Gadgets.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              post: { createStuff: '' },
              get: { listStuff: '' },
              description: 'v2 Gadgets here'
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
              description: 'v2 Gadgets here (should be same)'
            }
          }
        });

        expect(browser.domains).to.deep.equal({
          api: {
            versions: {
              v2010: {
                resources: {
                  '/Widgets': { actions: {}, description: 'Widgets here second line of text' }
                }
              }
            }
          },
          neato: {
            versions: {
              v1: {
                resources: {
                  '/Gadgets': { actions: {}, description: 'v1 Gadgets here' }
                }
              },
              v2: {
                resources: {
                  '/Gadgets': {
                    actions: {
                      create: { createStuff: '' },
                      fetch: { fetchStuff: '' },
                      list: { listStuff: '' },
                      update: { updateStuff: '' },
                      remove: { removeStuff: '' }
                    },
                    description: 'v2 Gadgets here'
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
        expect(getTopicName('foo', 'v1', '/Bars')).to.equal('foo-v1-bars');
      });

      test.it('handles a nested resource path with parameters', () => {
        expect(getTopicName('foo', 'v1', '/Bars/{BarId}/SubBars')).to.equal('foo-v1-bars-sub-bars');
      });
    });
  });
});
