const { TwilioApiBrowser } = require('../../src/services/twilio-api');

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
              ]
            },
            '/v1/Gadgets.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ]
            },
            '/v2/Gadgets.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              post: { createStuff: '' },
              get: { listStuff: '' }
            },
            '/v2/Gadgets/{Sid}.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              post: { updateStuff: '' },
              get: { fetchStuff: '' },
              delete: { removeStuff: '' }
            }
          }
        });

        expect(browser.domains).to.deep.equal({
          api: {
            versions: {
              v2010: {
                resources: {
                  '/Widgets': { actions: {} }
                }
              }
            }
          },
          neato: {
            versions: {
              v1: {
                resources: {
                  '/Gadgets': { actions: {} }
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
                    }
                  }
                }
              }
            }
          }
        });
      });
    });
  });
});
