const sinon = require('sinon');
const pluginFunc = require('../../../src/hooks/init/buy-phone-number');
const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const TEST_COUNTRY_CODE = 'US';
const TEST_PHONE_NUMBER = '+12345678901';
const TEST_AREA_CODE = '123';

const getFakeConfig = () => ({
  plugins: [{
    name: 'api-cli-commands',
    commands: [
      {
        id: 'api:core:available-phone-numbers:local:list',
        actionDefinition: {
          domainName: 'api',
          path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json',
          actionName: 'list'
        },
        flags: {
          sid: { description: 'local-list-sid' },
          'country-code': { default: TEST_COUNTRY_CODE },
          'phone-number': { description: 'local-list-phone-number' },
          'area-code': { default: TEST_AREA_CODE }
        }
      },
      {
        id: 'api:core:available-phone-numbers:toll-free:list',
        actionDefinition: {
          domainName: 'api',
          path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json',
          actionName: 'list'
        },
        flags: {
          sid: { description: 'toll-free-list-sid' },
          'phone-number': { description: 'toll-free-list-phone-number' }
        }
      },
      {
        id: 'api:core:incoming-phone-numbers:create',
        actionDefinition: {
          domainName: 'api',
          path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
          actionName: 'create'
        },
        flags: {
          sid: { description: 'incoming-create-sid' },
          properties: { description: 'incoming-create-props' },
          'phone-number': { description: 'incoming-phone-number' }
        }
      }
    ]
  }]
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
        return getPlugin().commands.find(t => t.id === 'phone-numbers:buy:local');
      };

      const setup = () => test
        .do(ctx => {
          ctx.plugin = getPlugin();
        });

      setup().it('creates the proper commands', ctx => {
        expect(ctx.plugin.hooks).to.eql({}); // eql is for comparing objects (== instead of ===)
        expect(ctx.plugin.topics).to.have.length(1);
        expect(ctx.plugin.commands).to.have.length(2);

        const TollFreeCommand = ctx.plugin.commands.find(t => t.id === 'phone-numbers:buy:toll-free');

        expect(TollFreeCommand.description).to.equal('purchase a toll-free phone number');
        expect(TollFreeCommand.flags.sid.description).to.equal('toll-free-list-sid');
        expect(TollFreeCommand.flags['phone-number']).to.be.undefined;
      });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .twilioCreateCommand(getBuyLocalCommand(), [])
        .stderr()
        .do(ctx => {
          ctx.testCmd.inquirer.prompt = sinon.stub()
            .onFirstCall()
            .resolves({ phoneNumber: TEST_PHONE_NUMBER })
            .onSecondCall()
            .resolves({ affirmative: true });
        })
        .nock('https://api.twilio.com', api => {
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/AvailablePhoneNumbers/${TEST_COUNTRY_CODE}/Local.json?AreaCode=${TEST_AREA_CODE}`)
            .reply(200, {
              /* eslint-disable camelcase */
              available_phone_numbers: [{
                phone_number: TEST_PHONE_NUMBER,
                iso_country: TEST_COUNTRY_CODE
              }]
              /* eslint-enable camelcase */
            });

          api.post(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/IncomingPhoneNumbers.json`)
            .reply(200, {});
        })
        .do(ctx => ctx.testCmd.run())
        .it('allows purchasing of a phone number', ctx => {
          expect(ctx.testCmd.flags['phone-number']).to.equal(TEST_PHONE_NUMBER);
          expect(ctx.testCmd.flags).to.not.include.key('area-code');

          expect(ctx.stderr).to.contain('successfully purchased');
        });

      test.stderr().it('does nothing if the API commands plugin is not found', ctx => {
        ctx.config = getFakeConfig();
        ctx.config.plugins[0].name = 'not the API command plugins';
        pluginFunc.call(ctx);

        expect(ctx.config.plugins).to.have.length(1);
        expect(ctx.stderr).to.contain('Twilio API Plugin');
      });

      test.stderr().it('does nothing if no phone number list commands are found', ctx => {
        ctx.config = getFakeConfig();
        ctx.config.plugins[0].commands = ctx.config.plugins[0].commands.filter(c => c.id.includes('incoming-phone-numbers'));
        pluginFunc.call(ctx);

        expect(ctx.config.plugins).to.have.length(1);
        expect(ctx.stderr).to.contain('locate available');
      });

      test.stderr().it('does nothing if the phone number create command is not found', ctx => {
        ctx.config = getFakeConfig();
        ctx.config.plugins[0].commands = ctx.config.plugins[0].commands.filter(c => c.id.includes('available-phone-numbers'));
        pluginFunc.call(ctx);

        expect(ctx.config.plugins).to.have.length(1);
        expect(ctx.stderr).to.contain('locate incoming');
      });
    });
  });
});
