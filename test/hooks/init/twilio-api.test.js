const { expect, test } = require('@twilio/cli-test');
const { fake } = require('sinon');

const pluginFunc = require('../../../src/hooks/init/twilio-api');

const { TwilioRestApiPlugin, inferPathType } = pluginFunc;

const getFakeConfig = () => ({ plugins: [], loadCommands: fake.returns({}), loadTopics: fake.returns({}) });

describe('hooks', () => {
  describe('init', () => {
    describe('twilio-api', () => {
      test.stderr().it('provides multiple resources and actions', (ctx) => {
        ctx.config = getFakeConfig();
        pluginFunc.call(ctx);

        expect(ctx.stderr).to.be.empty; // Think conflicting command flag warnings

        const plugin = ctx.config.plugins[0];

        expect(plugin.hooks).to.eql({}); // eql is for comparing objects (== instead of ===)
        expect(plugin.topics.length).to.be.greaterThan(20);

        /* eslint-disable max-nested-callbacks */
        const domainTopic = plugin.topics.find((t) => t.name === 'api:accounts');
        const versionTopic = plugin.topics.find((t) => t.name === 'api:accounts:v1');

        expect(domainTopic.description).to.equal('resources under accounts.twilio.com');
        expect(versionTopic.description).to.equal('version 1 of the API');

        const previewCommand = plugin.topics.find((t) => t.name === 'api:preview');
        expect(previewCommand.description).to.equal('resources under preview.twilio.com');
        expect(previewCommand.name).to.equal('api:preview');

        /*
         * Some specs (e.g. Insights v3's InsightsDomains resources) don't declare
         * x-twilio.pathType at all. Commands must still be generated for them via
         * the path-shape fallback, instead of being silently skipped.
         */
        expect(plugin.commandIDs).to.include('api:insights:v3:insights-domains:conversations:query:list');
        expect(plugin.commandIDs).to.include('api:insights:v3:insights-domains:conversations:query:create');
        expect(plugin.commandIDs).to.include('api:insights:v3:insights-domains:conversations:metadata:list');
      });

      describe('inferPathType', () => {
        test.it('treats a path ending in a {parameter} placeholder as an instance path', () => {
          expect(inferPathType('/v3/InsightsDomains/Conversations/QueryJobs/{operationId}')).to.equal('instance');
        });

        test.it('treats a path ending in a fixed segment as a list path', () => {
          expect(inferPathType('/v3/InsightsDomains/Conversations/Query')).to.equal('list');
          expect(inferPathType('/v3/InsightsDomains/Conversations/QueryJobs')).to.equal('list');
        });

        test.it('ignores a trailing legacy .json suffix', () => {
          expect(inferPathType('/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json')).to.equal('instance');
          expect(inferPathType('/2010-04-01/Accounts/{AccountSid}/Calls.json')).to.equal('list');
        });
      });

      test.stderr().it('generates commands for a resource with no declared pathType', (ctx) => {
        const apiBrowser = {
          domains: {
            widgets: {
              paths: {
                '/v1/Widgets': {
                  server: 'https://widgets.twilio.com',
                  description: '',
                  operations: {
                    get: { parameters: [] },
                    post: { parameters: [] },
                  },
                },
                '/v1/Widgets/{Sid}': {
                  server: 'https://widgets.twilio.com',
                  description: '',
                  operations: {
                    get: { parameters: [] },
                  },
                },
              },
            },
          },
        };

        const plugin = new TwilioRestApiPlugin({}, apiBrowser);

        expect(ctx.stderr).to.be.empty;
        expect(plugin.commandIDs).to.include('api:widgets:v1:widgets:list');
        expect(plugin.commandIDs).to.include('api:widgets:v1:widgets:create');
        expect(plugin.commandIDs).to.include('api:widgets:v1:widgets:fetch');
      });
    });
  });
});
