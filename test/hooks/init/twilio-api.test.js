const pluginFunc = require('../../../src/hooks/init/twilio-api');
const { expect, test } = require('../../test');

const getFakeContext = () => ({ config: { plugins: [] } });

describe('hooks', () => {
  describe('init', () => {
    describe('twilio-api', () => {
      test.it('provides multiple resources and actions', async () => {
        const ctx = getFakeContext();
        await pluginFunc.call(ctx);
        const plugin = ctx.config.plugins[0];

        expect(plugin.hooks).to.eql({}); // eql is for comparing objects (== instead of ===)
        expect(plugin.topics.length).to.be.greaterThan(20);
        expect(plugin.commandIDs.length).to.be.greaterThan(plugin.topics.length);
        expect(plugin.commands.length).to.equal(plugin.commandIDs.length);
      });
    });
  });
});
