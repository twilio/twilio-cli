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

const fakeNgrokUrl = 'https://12345.ngrok.io';

async function patchCommand(ctx, useFakeNgrok) {
  if (useFakeNgrok) {
    ctx.fakeNgrok = {
      connect: sinon.fake.resolves(fakeNgrokUrl),
      getUrl: () => {
        // no-op
      },
    };

    ctx.testCmd.ngrok = ctx.fakeNgrok;
  }

  ctx.testCmd.inquirer.prompt = sinon.stub().onFirstCall().resolves({ affirmative: true });
}

describe('commands', () => {
  describe('phone-numbers', () => {
    describe('update', () => {
      const setUpTest = (args = [], { useFakeNgrok = false, promptAcked = false } = {}) => {
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

            if (promptAcked) {
              ctx.userConfig.ackPrompt('ngrok-warning');
            }
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(NumberUpdate, args)
          .stdout()
          .do((ctx) => patchCommand(ctx, useFakeNgrok));
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

      setUpTest([fakeNumberSid, '--sms-url', 'http://localhost:4567/', '-o', 'tsv'], { useFakeNgrok: true })
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .stderr()
        .do((ctx) => ctx.testCmd.run())
        .it(`runs incoming-phone-number:update ${fakeNumberSid} --sms-url <LOCALHOST url> and starts ngrok`, (ctx) => {
          expect(ctx.stdout).to.contain(`sid\tresult\tsmsUrl\n${fakeNumberSid}\tSuccess\t${fakeNgrokUrl}/`);
          expect(ctx.stderr).to.contain('WARNING: Detected localhost');
          expect(ctx.stderr).to.contain('ngrok is running');
          expect(ctx.fakeNgrok.connect.calledOnce).to.be.true;
          const tunnel = ctx.fakeNgrok.connect.getCall(0).args[0];
          expect(tunnel.proto).to.equal('http');
          expect(tunnel.addr).to.equal('4567');
          expect(tunnel.host_header).to.equal('localhost:4567');
        });

      setUpTest([fakeNumberSid, '--sms-url', 'https://localhost:4567/', '-o', 'tsv'], { useFakeNgrok: true })
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .stderr()
        .do((ctx) => ctx.testCmd.run())
        .it(
          `runs incoming-phone-number:update ${fakeNumberSid} --sms-url <https LOCALHOST url> and starts ngrok`,
          (ctx) => {
            expect(ctx.stdout).to.contain(`sid\tresult\tsmsUrl\n${fakeNumberSid}\tSuccess\t${fakeNgrokUrl}/`);
            expect(ctx.stderr).to.contain('WARNING: Detected localhost');
            expect(ctx.stderr).to.contain('ngrok is running');
            expect(ctx.fakeNgrok.connect.calledOnce).to.be.true;
            const tunnel = ctx.fakeNgrok.connect.getCall(0).args[0];
            expect(tunnel.proto).to.equal('http');
            expect(tunnel.addr).to.equal('https://localhost:4567');
            expect(tunnel.host_header).to.equal('localhost:4567');
          },
        );

      setUpTest([fakeNumberSid, '--sms-url', 'https://localhost:4567/', '-o', 'tsv'], { useFakeNgrok: true })
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .do((ctx) => {
          ctx.fakeNgrok.connect = () => {
            const fakeTooManyColonsError = { details: { err: 'too many colons in address' } };
            throw fakeTooManyColonsError;
          };
        })
        .do((ctx) => ctx.testCmd.run())
        .catch(/Installed version of ngrok does not support tunnels to https endpoints/)
        .it(
          `runs incoming-phone-number:update ${fakeNumberSid} --sms-url <https LOCALHOST url> and catches the ngrok error`,
        );

      setUpTest(
        [
          fakeNumberSid,
          '--sms-url',
          'http://localhost:4567/',
          '--voice-url',
          'http://localhost:4567/',
          '--sms-fallback-url',
          'http://localhost:80/',
          '--voice-fallback-url',
          'http://localhost',
          '-o',
          'tsv',
        ],
        { useFakeNgrok: true, promptAcked: true },
      )
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
          api.post(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .stderr()
        .do((ctx) => ctx.testCmd.run())
        .it('runs incoming-phone-number:update with multiple urls and multiple ngrok tunnels', (ctx) => {
          expect(ctx.stdout).to.contain(
            `sid\tresult\tsmsUrl\tsmsFallbackUrl\tvoiceUrl\tvoiceFallbackUrl\n${fakeNumberSid}\tSuccess\t${fakeNgrokUrl}/\t${fakeNgrokUrl}/\t${fakeNgrokUrl}/\t${fakeNgrokUrl}/`,
          );
          expect(ctx.stderr).to.not.contain('WARNING: Detected localhost');
          expect(ctx.stderr).to.contain('ngrok is running');
          expect(ctx.fakeNgrok.connect.calledTwice).to.be.true;

          let tunnel = ctx.fakeNgrok.connect.getCall(0).args[0];
          expect(tunnel.proto).to.equal('http');
          expect(tunnel.addr).to.equal('4567');
          expect(tunnel.host_header).to.equal('localhost:4567');

          tunnel = ctx.fakeNgrok.connect.getCall(1).args[0];
          expect(tunnel.proto).to.equal('http');
          expect(tunnel.addr).to.equal('80');
          expect(tunnel.host_header).to.equal('localhost');
        });

      setUpTest([fakeNumberSid, '--sms-url', 'http://localhost:4567/'])
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .stderr()
        .do((ctx) => {
          ctx.testCmd.ngrok = { connect: sinon.fake.rejects("Can't grok this") };
          return ctx.testCmd.run();
        })
        .catch(/Can't grok this/)
        .it('handles generic ngrok errors');

      setUpTest([fakeNumberSid, '--sms-url', 'http://localhost:4567/'])
        .nock('https://api.twilio.com', (api) => {
          api.get(fakeNumberUrl).reply(200, fakeNumberResource);
        })
        .stderr()
        .do((ctx) => {
          ctx.testCmd.ngrok = {
            connect: () => {
              // eslint-disable-next-line no-throw-literal
              throw { details: { err: "Can't grok this" } };
            },
          };
          return ctx.testCmd.run();
        })
        .catch(/Can't grok this/)
        .it('handles complex ngrok errors');
    });
  });
});
