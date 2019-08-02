const sinon = require('sinon');
const { expect, test, constants, getFakeSid } = require('@twilio/cli-test');
const NumberUpdate = require('../../../src/commands/phone-numbers/update');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const fakeNumber = '+12095551212';
const fakeNumberSid = getFakeSid('PN');
const fakeNumberResource = {
  sid: fakeNumberSid,
  phone_number: fakeNumber, // eslint-disable-line camelcase
  friendly_name: 'my phone #' // eslint-disable-line camelcase
};
const fakeNumberUrl = `/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/IncomingPhoneNumbers/${fakeNumberSid}.json`;

const fakeNgrokUrl = 'https://12345.ngrok.io';

async function createCommand(ctx, args, useFakeNgrok) {
  ctx.fakeNgrok = {
    connect: sinon.fake.resolves(fakeNgrokUrl)
  };

  ctx.testCmd = new NumberUpdate(
    args,
    ctx.fakeConfig,
    {
      async getCredentials(profileId) {
        return {
          apiKey: constants.FAKE_API_KEY,
          apiSecret: constants.FAKE_API_SECRET + profileId
        };
      }
    },
    useFakeNgrok ? ctx.fakeNgrok : undefined
  );

  ctx.testCmd.inquirer.prompt = sinon.stub()
    .onFirstCall()
    .resolves({ affirmative: true });
}

describe('commands', () => {
  describe('phone-numbers', () => {
    describe('update', () => {
      const setUpTest = (args = [], useFakeNgrok = false) => {
        return test
          .twilioFakeProfile(ConfigData)
          .twilioCliEnv(Config)
          .stdout()
          .do(ctx => createCommand(ctx, args, useFakeNgrok));
      };

      setUpTest([fakeNumberSid, '--friendly-name', 'MyPhoneNumber', '-o', 'tsv'])
        .nock('https://api.twilio.com', api => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .it(`runs incoming-phone-number:update ${fakeNumberSid} --friendly-name <name>`, async ctx => {
          await ctx.testCmd.run();
          expect(ctx.stdout).to.contain(`sid\tresult\tfriendlyName\n${fakeNumberSid}\tSuccess\tMyPhoneNumber`);
        });

      setUpTest([fakeNumberSid, '--sms-url', 'http://example.com/', '-o', 'tsv'])
        .nock('https://api.twilio.com', api => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .it(`runs incoming-phone-number:update ${fakeNumberSid} --sms-url <url>`, async ctx => {
          await ctx.testCmd.run();
          expect(ctx.stdout).to.contain(`sid\tresult\tsmsUrl\n${fakeNumberSid}\tSuccess\thttp://example.com/`);
        });

      setUpTest([fakeNumberSid, '--sms-url', 'http://localhost:4567/', '-o', 'tsv'], true)
        .nock('https://api.twilio.com', api => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .stderr()
        .it(
          `runs incoming-phone-number:update ${fakeNumberSid} --sms-url <LOCALHOST url> and starts ngrok`,
          async ctx => {
            await ctx.testCmd.run();
            expect(ctx.stdout).to.contain(`sid\tresult\tsmsUrl\n${fakeNumberSid}\tSuccess\t${fakeNgrokUrl}/`);
            expect(ctx.stderr).to.contain('ngrok is running');
            expect(ctx.fakeNgrok.connect.calledOnce).to.be.true;
            const tunnel = ctx.fakeNgrok.connect.getCall(0).args[0];
            expect(tunnel.proto).to.equal('http');
            expect(tunnel.addr).to.equal('4567');
            expect(tunnel.host_header).to.equal('localhost:4567');
          }
        );

      setUpTest(
        [
          fakeNumberSid,
          '--sms-url',
          'http://localhost:4567/',
          '--voice-url',
          'http://localhost:4567/',
          '--sms-fallback-url',
          'http://localhost:5678/',
          '--voice-fallback-url',
          'http://localhost:5678/',
          '-o',
          'tsv'
        ],
        true
      )
        .nock('https://api.twilio.com', api => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .stderr()
        .it('runs incoming-phone-number:update with multiple urls and multiple ngrok tunnels', async ctx => {
          await ctx.testCmd.run();
          expect(ctx.stdout).to.contain(
            `sid\tresult\tsmsUrl\tsmsFallbackUrl\tvoiceUrl\tvoiceFallbackUrl\n${fakeNumberSid}\tSuccess\t${fakeNgrokUrl}/\t${fakeNgrokUrl}/\t${fakeNgrokUrl}/\t${fakeNgrokUrl}/`
          );
          expect(ctx.stderr).to.contain('ngrok is running');
          expect(ctx.fakeNgrok.connect.calledTwice).to.be.true;

          let tunnel = ctx.fakeNgrok.connect.getCall(0).args[0];
          expect(tunnel.proto).to.equal('http');
          expect(tunnel.addr).to.equal('4567');
          expect(tunnel.host_header).to.equal('localhost:4567');

          tunnel = ctx.fakeNgrok.connect.getCall(1).args[0];
          expect(tunnel.proto).to.equal('http');
          expect(tunnel.addr).to.equal('5678');
          expect(tunnel.host_header).to.equal('localhost:5678');
        });
    });
  });
});
