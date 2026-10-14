const { expect } = require('@twilio/cli-test');

const { isTwilioPlugin } = require('../../src/services/plugins');

describe('services', () => {
  describe('plugins', () => {
    describe('isTwilioPlugin', () => {
      it('trusts an npm package under an allowed org', () => {
        expect(isTwilioPlugin('@twilio/debugger')).to.be.ok;
        expect(isTwilioPlugin('@twilio-labs/debugger')).to.be.ok;
      });

      it('does not trust an npm package under a disallowed org', () => {
        expect(isTwilioPlugin('@twilio-labs-h4x0r/plugin-serverless')).to.not.be.ok;
      });

      it('does not trust when the package name is undefined and there is no url', () => {
        expect(isTwilioPlugin(undefined)).to.be.false;
      });

      it('trusts a url on an allowed host', () => {
        expect(isTwilioPlugin(undefined, 'https://twilio.world/cli/plugin/abc-123')).to.be.true;
      });

      it('trusts a url on an allowed subdomain', () => {
        expect(isTwilioPlugin(undefined, 'https://cli.twilio.world/plugin.tgz')).to.be.true;
      });

      it('trusts HTTPS URLs on nested allowed subdomains', () => {
        expect(isTwilioPlugin(undefined, 'https://play.dev.twilio.world/plugin.tgz')).to.be.true;
        expect(isTwilioPlugin(undefined, 'https://cli.stage.twilio.world/plugin.tgz')).to.be.true;
      });

      ['http:', 'ftp:', 'git+https:'].forEach((protocol) => {
        it(`does not trust ${protocol} URLs on allowed hosts`, () => {
          for (const host of ['twilio.world', 'play.twilio.world', 'play.dev.twilio.world']) {
            const url = `${protocol}//${host}/plugin.tgz`;
            expect(isTwilioPlugin(undefined, url)).to.be.false;
            expect(isTwilioPlugin('@twilio/debugger', url)).to.be.false;
          }
        });
      });

      it('does not trust a url on a disallowed host', () => {
        expect(isTwilioPlugin(undefined, 'https://evil.example.com/plugin.tgz')).to.be.false;
      });

      it('does not trust a url on a host that merely contains the allowed host as a substring', () => {
        expect(isTwilioPlugin(undefined, 'https://twilio.world.evil.com/plugin.tgz')).to.be.false;
      });

      it('does not trust a malformed url', () => {
        expect(isTwilioPlugin(undefined, 'not-a-url')).to.be.false;
      });

      it('prefers the url check over the name check when both are present', () => {
        expect(isTwilioPlugin('@twilio/debugger', 'https://evil.example.com/plugin.tgz')).to.be.false;
      });
    });
  });
});
