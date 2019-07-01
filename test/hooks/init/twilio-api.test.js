const pluginFunc = require('../../../src/hooks/init/twilio-api');
const { expect, test } = require('@twilio/cli-test');

const getFakeConfig = () => ({ plugins: [] });

describe('hooks', () => {
  describe('init', () => {
    describe('twilio-api', () => {
      test.it('provides multiple resources and actions', ctx => {
        ctx.config = getFakeConfig();
        pluginFunc.call(ctx);

        const plugin = ctx.config.plugins[0];

        expect(plugin.hooks).to.eql({}); // eql is for comparing objects (== instead of ===)
        expect(plugin.topics.length).to.be.greaterThan(20);
        expect(plugin.commandIDs.length).to.be.greaterThan(plugin.topics.length);
        expect(plugin.commands.length).to.equal(plugin.commandIDs.length);

        /* eslint-disable max-nested-callbacks */
        const domainTopic = plugin.topics.find(t => t.name === 'api:accounts');
        const versionTopic = plugin.topics.find(t => t.name === 'api:accounts:v1');

        expect(domainTopic.description).to.equal('resources under accounts.twilio.com');
        expect(versionTopic.description).to.equal('version 1 of the API');

        const previewCommand = plugin.topics.find(t => t.name === 'api:preview');

        expect(previewCommand).to.equal(undefined);
      });
    });
  });
});
