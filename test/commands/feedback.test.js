const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const Feedback = require('../../src/commands/feedback');

describe('commands', () => {
  describe('feedback', () => {
    test
      .do((ctx) => {
        ctx.userConfig = new ConfigData();
      })
      .twilioCliEnv(Config)
      .stdout()
      .stderr()
      .twilioCommand(Feedback, [])
      .it('runs feedback', (ctx) => {
        expect(ctx.stdout).to.contain('Ahoy! Thank you for using twilio-cli!');
        expect(ctx.stderr).to.equal('');
        expect(ctx.stdout).to.contain('https://airtable.com/shrcFDU1gmKWOqZXe');
      });
  });
});
