/* eslint no-unused-expressions: 0 */
const { expect, test, constants, getFakeSid } = require('@twilio/cli-test');

const IncomingPhoneNumberHelper = require('../../../../../src/services/resource-helpers/api/v2010/incoming-phone-number');

const fakeNumber = '+12095551212';
const fakeNumberSid = getFakeSid('PN');
const fakeNumberResource = {
  sid: fakeNumberSid,
  phone_number: fakeNumber, // eslint-disable-line camelcase
  friendly_name: 'my phone #', // eslint-disable-line camelcase
};
const fakeNumberUrl = `/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/IncomingPhoneNumbers/${fakeNumberSid}.json`;
const fakeNumberLookupUrl = `/2010-04-01/Accounts/${
  constants.FAKE_ACCOUNT_SID
}/IncomingPhoneNumbers.json?PhoneNumber=${encodeURIComponent(fakeNumber)}`;

function runTests() {
  const helperTest = test.do((ctx) => {
    const twilioClient = require('twilio')(constants.FAKE_ACCOUNT_SID, 'password');
    ctx.helper = new IncomingPhoneNumberHelper(twilioClient);
  });

  helperTest
    .nock('https://api.twilio.com', (api) => {
      api.get(fakeNumberUrl).reply(200, fakeNumberResource);
    })
    .it('finds number by valid sid', async (ctx) => {
      const number = await ctx.helper.findPhoneNumber(fakeNumberSid);
      expect(number.sid).to.equal(fakeNumberSid);
    });

  helperTest
    .nock('https://api.twilio.com', (api) => {
      api.get(fakeNumberUrl).reply(404, { code: 20404 });
    })
    .it("doesn't find number by invalid sid", async (ctx) => {
      await expect(ctx.helper.findPhoneNumber(fakeNumberSid)).to.be.rejectedWith('Could not find phone number');
    });

  helperTest
    .nock('https://api.twilio.com', (api) => {
      api.get(fakeNumberUrl).reply(500, { code: 20500, message: 'What happened?' });
    })
    .it('handles error looking up phone number sid', async (ctx) => {
      await expect(ctx.helper.findPhoneNumber(fakeNumberSid)).to.be.rejectedWith('What happened?');
    });

  helperTest
    .nock('https://api.twilio.com', (api) => {
      api.get(fakeNumberLookupUrl).reply(200, {
        incoming_phone_numbers: [fakeNumberResource], // eslint-disable-line camelcase
      });
    })
    .it('finds number by valid phone number', async (ctx) => {
      const number = await ctx.helper.findPhoneNumber(fakeNumber);
      expect(number.sid).to.equal(fakeNumberSid);
    });

  helperTest
    .nock('https://api.twilio.com', (api) => {
      api.get(fakeNumberLookupUrl).reply(200, {
        incoming_phone_numbers: [], // eslint-disable-line camelcase
      });
    })
    .it("doesn't find number by invalid phone number", async (ctx) => {
      await expect(ctx.helper.findPhoneNumber(fakeNumber)).to.be.rejectedWith('Could not find phone number');
    });

  helperTest
    .nock('https://api.twilio.com', (api) => {
      api.get(fakeNumberLookupUrl).reply(500, {
        code: 20500,
        message: 'What happened?',
      });
    })
    .it('handles error looking up phone number', async (ctx) => {
      await expect(ctx.helper.findPhoneNumber(fakeNumber)).to.be.rejectedWith('What happened?');
    });
}

describe('utility', () => {
  describe('resource-helpers', () => {
    describe('api', () => {
      describe('v2010', () => {
        describe('incoming-phone-number', runTests);
      });
    });
  });
});
