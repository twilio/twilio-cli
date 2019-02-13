const pluginFunc = require('../../../src/hooks/init/twilio-api');
const { expect, test } = require('../../test');

const getFakeContext = () => ({ config: { plugins: [] } });

describe('hooks', () => {
  describe('init', () => {
    describe('twilio-api', () => {
      test.it('as a proof-of-concept, provides a single action', async () => {
        const ctx = getFakeContext();
        await pluginFunc.call(ctx);
        const plugin = ctx.config.plugins[0];

        expect(plugin.hooks).to.eql({}); // eql is for comparing objects (== instead of ===)
        expect(plugin.topics[0].name).to.equal('call');
        expect(plugin.topics[0].description).to.be.a('string');
        expect(plugin.commandIDs[0]).to.equal('call:create');
        expect(plugin.commands[0].actionDefinition.topicName).to.equal('call');
      });
    });
  });
});
