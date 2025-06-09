const sinon = require('sinon');
const { expect, test, constants, getFakeSid } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const NumberUpdate = require('../../../src/commands/phone-numbers/update');

const fakeNumber = '+12095551212';
const fakeNumberSid = getFakeSid('PN');
const fakeNumberResource = {
  sid: fakeNumberSid,
  phone_number: fakeNumber, // eslint-disable-line camelcase
  friendly_name: 'my phone #', // eslint-disable-line camelcase
};
const fakeNumberUrl = `/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/IncomingPhoneNumbers/${fakeNumberSid}.json`;

async function patchCommand(ctx) {
  ctx.testCmd.inquirer.prompt = sinon.stub().onFirstCall().resolves({ affirmative: true });
}

describe('commands', () => {
  describe('phone-numbers', () => {
    describe('update', () => {
      const setUpTest = (args = []) => {
        return test
          .do((ctx) => {
            ctx.userConfig = new ConfigData();
            ctx.userConfig.addProfile(
              'default',
              constants.FAKE_ACCOUNT_SID,
              '',
              constants.FAKE_API_KEY,
              constants.FAKE_API_SECRET,
            );
            ctx.userConfig.setActiveProfile('default');
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(NumberUpdate, args)
          .stdout()
          .do((ctx) => patchCommand(ctx));
      };

      setUpTest([fakeNumberSid, '--friendly-name', 'MyPhoneNumber', '-o', 'tsv'])
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .do((ctx) => ctx.testCmd.run())
        .it(`runs incoming-phone-number:update ${fakeNumberSid} --friendly-name <name>`, (ctx) => {
          expect(ctx.stdout).to.contain(`sid\tresult\tfriendlyName\n${fakeNumberSid}\tSuccess\tMyPhoneNumber`);
        });

      setUpTest([fakeNumberSid, '--sms-url', 'http://example.com/', '-o', 'tsv'])
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .do((ctx) => ctx.testCmd.run())
        .it(`runs incoming-phone-number:update ${fakeNumberSid} --sms-url <url>`, (ctx) => {
          expect(ctx.stdout).to.contain(`sid\tresult\tsmsUrl\n${fakeNumberSid}\tSuccess\thttp://example.com/`);
        });

      setUpTest([fakeNumberSid])
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .stderr()
        .do((ctx) => ctx.testCmd.run())
        .it('should return nothing to update if no properties passed', (ctx) => {
          expect(ctx.stderr).to.contain('Nothing to update');
        });

      setUpTest([fakeNumberSid, '--sms-url', 'http://localhost:4567/', '-o', 'tsv'])
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .do((ctx) => ctx.testCmd.run())
        .catch(/Localhost URLs are not allowed for this operation./)
        .it(`throws an error when a localhost URL is provided for --sms-url`);

      setUpTest([fakeNumberSid, '--sms-url', 'http://127.0.0.1:4567/', '-o', 'tsv'])
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .do((ctx) => ctx.testCmd.run())
        .catch(/Localhost URLs are not allowed for this operation./)
        .it(`throws an error when a 127.0.0.1 URL is provided for --sms-url`);
    });
  });
});
