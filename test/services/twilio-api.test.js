const { expect, test } = require('@twilio/cli-test');
const flush = require('flush-cache');

const ORIG_ENV = { ...process.env };
const { getTopicName, getActionDescription, getDocLink, getFlagConfig } = require('../../src/services/twilio-api');
const { getRootPath } = require('../../src/services/twilio-api/get-help-doc-link');

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
    describe('getDocLink', () => {
      test.it('handles a simple core api', () => {
        expect(getDocLink('api:core:accounts:create')).to.equal('https://twilio.com/docs/usage/api');
      });

      test.it('handles another topic', () => {
        expect(getDocLink('debugger:logs:list')).to.equal('https://twilio.com/docs/flex/end-user-guide/debugger');
      });
      test.it('checks for an api which doesnt have a specific reference doc', () => {
        expect(getDocLink('api:ip:v1:credentials:create')).to.equal('https://twilio.com/docs/');
      });
      test.it('checks for command that doesnt have any reference doc, returns default url', () => {
        expect(getDocLink('help')).to.equal('https://twilio.com/docs/api/');
      });
      test.it('handles a command', () => {
        expect(getDocLink('autocomplete')).to.equal(
          'https://twilio.com/docs/twilio-cli/quickstart#install-cli-autocomplete-bash-or-zsh-only',
        );
      });
      test.it('handles an api with subroute url', () => {
        expect(getDocLink('api:chat:v2:credentials:list')).to.equal(
          'https://twilio.com/docs/chat/api/credential-resource',
        );
      });
      test.it('handles an api with subroute url', () => {
        expect(getDocLink('api:events:v1:subscriptions:fetch')).to.equal(
          'https://twilio.com/docs/events/event-streams/subscription',
        );
      });
      test.it('handles the json with empty api list {}', () => {
        const jsonMap = require('./api-doc-mapping-test.json');
        const urlMap = new Map(Object.entries(jsonMap));
        const pathMap = new Map(Object.entries(urlMap.get('path')));
        const subpathMap = new Map(Object.entries(urlMap.get('subpath')));
        const topicsMap = new Map(Object.entries(pathMap.get('topics')));
        const commandsMap = new Map(Object.entries(pathMap.get('commands')));
        const cmdDetailsArr = 'api:events:v1:subscriptions:fetch'.split(':');
        expect(getRootPath(cmdDetailsArr, subpathMap, topicsMap, commandsMap)).to.equal('');
      });
    });

    describe('getFlagConfig : checking for hyperlink in markdowns', () => {
      beforeEach(flush);
      afterEach(() => {
        process.env = ORIG_ENV;
        delete process.env.FORCE_HYPERLINK;
      });

      test.it('handles a description on a supported terminal : iTerm', () => {
        process.env.TERM_PROGRAM = 'iTerm.app';
        process.env.TERM_PROGRAM_VERSION = '3.1.0';
        process.env.FORCE_HYPERLINK = 1;
        const desc = getFlagConfig(
          {
            name: 'DummyCmd',
            schema: {
              description:
                "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) to which the Sim resource should belong. Account or that of a [Subaccount](https://www.twilio.com/docs/iam/api/subaccounts) of the requesting Account. Only valid when the Sim resource's status is `new`. For more information, see the [Move SIMs between Subaccounts documentation](https://www.twilio.com/docs/wireless/api/sim-resource#move-sims-between-subaccounts).",
              type: 'string',
            },
            in: 'query',
            required: false,
            description:
              "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) to which the Sim resource should belong. Account or that of a [Subaccount](https://www.twilio.com/docs/iam/api/subaccounts) of the requesting Account. Only valid when the Sim resource's status is `new`. For more information, see the [Move SIMs between Subaccounts documentation](https://www.twilio.com/docs/wireless/api/sim-resource#move-sims-between-subaccounts).",
          },
          {
            domainName: 'foo',
            path: '/v1/Bars',
          },
        ).description;
        expect(desc).to.contain('\u001b]8;;https:');
      });

      test.it('handles a description which doesnt match the regex, on a supported terminal : iTerm', () => {
        process.env.TERM_PROGRAM = 'iTerm.app';
        process.env.TERM_PROGRAM_VERSION = '3.1.0';
        expect(
          getFlagConfig(
            {
              name: 'DummyCmd',
              schema: {
                description:
                  'The SID of the [Account](https://www.twi lio.com/docs/iam/api/account) to which the Sim resource should belong. ',
                type: 'string',
              },
              in: 'query',
              required: false,
              description:
                'The SID of the [Account](https://www.twi lio.com/docs/iam/api/account) to which the Sim resource should belong.  ',
            },
            {
              domainName: 'foo',
              path: '/v1/Bars',
            },
          ).description,
        ).to.not.contain('\u001b]8;;https:');
      });

      test.it('handles a description on a non-supported terminal : MAC', () => {
        process.env.TERM_PROGRAM = 'Apple_Terminal';
        process.env.TERM_PROGRAM_VERSION = '440';
        expect(
          getFlagConfig(
            {
              name: 'DummyCmd',
              schema: {
                description:
                  "This is a dummy url [Message Feedback API](https://www.twilio.com/docs/sms/api/message-feedback-resource) and '[E.164](http://www.twilio.com/docs/glossary/what-e164)'",
                type: 'string',
              },
              in: 'query',
              required: false,
              description:
                "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) to which the Sim resource should belong. Account or that of a [Subaccount](https://www.twilio.com/docs/iam/api/subaccounts) of the requesting Account. Only valid when the Sim resource's status is `new`. For more information, see the [Move SIMs between Subaccounts documentation](https://www.twilio.com/docs/wireless/api/sim-resource#move-sims-between-subaccounts).",
            },
            {
              domainName: 'foo',
              path: '/v1/Bars',
            },
          ).description,
        ).to.contain('[Account](https://www.twilio.com/docs/iam/api/account)');
      });
    });
  });
});
