const sinon = require('sinon');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const pluginFunc = require('../../../src/hooks/init/buy-phone-number');
const TwilioApiCommand = require('../../../src/base-commands/twilio-api-command');

const TEST_COUNTRY_CODE = 'US';
const TEST_PHONE_NUMBER = '+12345678901';
const TEST_AREA_CODE = '123';

const getFakeConfig = () => ({
  plugins: [
    {
      name: 'api-cli-commands',
      commands: [
        TwilioApiCommand.setUpNewCommandClass({
          actionDefinition: {
            topicName: 'api:core:available-phone-numbers:local',
            commandName: 'list',
            domainName: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json',
            actionName: 'list',
            action: {
              parameters: [
                { name: 'CountryCode', in: 'path', schema: { type: 'string' } },
                { name: 'AreaCode', in: 'query', schema: { type: 'string' } },
              ],
            },
          },
        }),
        TwilioApiCommand.setUpNewCommandClass({
          actionDefinition: {
            topicName: 'api:core:available-phone-numbers:toll-free',
            commandName: 'list',
            domainName: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json',
            actionName: 'list',
            action: {
              parameters: [{ name: 'Sid', in: 'query', description: 'toll-free-list-sid', schema: { type: 'string' } }],
            },
          },
        }),
        TwilioApiCommand.setUpNewCommandClass({
          actionDefinition: {
            topicName: 'api:core:incoming-phone-numbers',
            commandName: 'create',
            domainName: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
            actionName: 'create',
            action: { parameters: [{ name: 'PhoneNumber', in: 'query', schema: { type: 'string' } }] },
          },
        }),
      ],
    },
  ],
});

describe('hooks', () => {
  describe('init', () => {
    describe('buy-phone-number', () => {
      const getPlugin = () => {
        const ctx = { config: getFakeConfig() };
        pluginFunc.call(ctx);
        return ctx.config.plugins[1];
      };

      const getBuyLocalCommand = () => {
        return getPlugin().commands.find((t) => t.id === 'phone-numbers:buy:local');
      };

      const setup = () =>
        test.do((ctx) => {
          ctx.plugin = getPlugin();
        });

      setup().it('creates the proper commands', (ctx) => {
        expect(ctx.plugin.hooks).to.eql({}); // eql is for comparing objects (== instead of ===)
        expect(ctx.plugin.topics).to.have.length(1);
        expect(ctx.plugin.commands).to.have.length(2);

        const TollFreeCommand = ctx.plugin.commands.find((t) => t.id === 'phone-numbers:buy:toll-free');

        expect(TollFreeCommand.description).to.equal('purchase a toll-free phone number');
        expect(TollFreeCommand.flags.sid.description).to.equal('toll-free-list-sid');
        expect(TollFreeCommand.flags['phone-number']).to.be.undefined;
      });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .twilioCreateCommand(getBuyLocalCommand(), ['--country-code', TEST_COUNTRY_CODE, '--area-code', TEST_AREA_CODE])
        .stderr()
        .do((ctx) => {
          ctx.testCmd.inquirer.prompt = sinon
            .stub()
            .onFirstCall()
            .resolves({ phoneNumber: TEST_PHONE_NUMBER })
            .onSecondCall()
            .resolves({ affirmative: true });
        })
        .nock('https://api.twilio.com', (api) => {
          api
            .get(
              `/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/AvailablePhoneNumbers/${TEST_COUNTRY_CODE}/Local.json?AreaCode=${TEST_AREA_CODE}`,
            )
            .reply(200, {
              /* eslint-disable camelcase */
              available_phone_numbers: [
                {
                  phone_number: TEST_PHONE_NUMBER,
                  iso_country: TEST_COUNTRY_CODE,
                },
              ],
              /* eslint-enable camelcase */
            });

          api.post(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/IncomingPhoneNumbers.json`).reply(200, {});
        })
        .do((ctx) => ctx.testCmd.run())
        .it('allows purchasing a phone number', (ctx) => {
          expect(ctx.testCmd.flags['phone-number']).to.equal(TEST_PHONE_NUMBER);
          expect(ctx.testCmd.flags).to.not.include.key('area-code');

          expect(ctx.stderr).to.contain('successfully purchased');
        });

      test.stderr().it('does nothing if the API commands plugin is not found', (ctx) => {
        ctx.config = getFakeConfig();
        ctx.config.plugins[0].name = 'not the API command plugins';
        pluginFunc.call(ctx);

        expect(ctx.config.plugins).to.have.length(1);
        expect(ctx.stderr).to.contain('Twilio API Plugin');
      });

      test.stderr().it('does nothing if no phone number list commands are found', (ctx) => {
        ctx.config = getFakeConfig();
        ctx.config.plugins[0].commands = ctx.config.plugins[0].commands.filter((c) =>
          c.id.includes('incoming-phone-numbers'),
        );
        pluginFunc.call(ctx);

        expect(ctx.config.plugins).to.have.length(1);
        expect(ctx.stderr).to.contain('locate available');
      });

      test.stderr().it('does nothing if the phone number create command is not found', (ctx) => {
        ctx.config = getFakeConfig();
        ctx.config.plugins[0].commands = ctx.config.plugins[0].commands.filter((c) =>
          c.id.includes('available-phone-numbers'),
        );
        pluginFunc.call(ctx);

        expect(ctx.config.plugins).to.have.length(1);
        expect(ctx.stderr).to.contain('locate incoming');
      });
    });
  });
});
