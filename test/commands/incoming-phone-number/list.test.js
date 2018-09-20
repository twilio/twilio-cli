const { expect, test, constants } = require('../../test');
const { ConfigData } = require('../../../src/utility/config');
const NumberList = require('../../../src/commands/incoming-phone-number/list');

describe('commands', () => {
  describe('incoming-phone-number', () => {
    describe('list', () => {
      const setUpTest = (args = []) => {
        return test
          .do(ctx => {
            ctx.userConfig = new ConfigData();
            ctx.userConfig.addProject('default', constants.FAKE_ACCOUNT_SID);
          })
          .twilioCliEnv()
          .stdout()
          .nock('https://api.twilio.com', api =>
            api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/IncomingPhoneNumbers.json`).reply(200, {
              incoming_phone_numbers: [{ sid: 'PN123', phone_number: '+12095551212', friendly_name: 'my phone #' }] // eslint-disable-line camelcase
            })
          )
          .do(async ctx => {
            ctx.testCmd = new NumberList(args, ctx.fakeConfig, {
              async getCredentials(projectId) {
                return {
                  apiKey: constants.FAKE_API_KEY,
                  apiSecret: constants.FAKE_API_SECRET + projectId
                };
              }
            });

            await ctx.testCmd.run();
          });
      };

      setUpTest([]).it('runs incoming-phone-number:list', ctx => {
        expect(ctx.stdout).to.equal('SID    Phone Number  Friendly Name\nPN123  +12095551212  my phone #   \n');
      });

      setUpTest(['--properties', 'phoneNumber']).it('runs incoming-phone-number:list with custom properties', ctx => {
        expect(ctx.stdout).to.equal('Phone Number\n+12095551212\n');
      });
    });
  });
});
