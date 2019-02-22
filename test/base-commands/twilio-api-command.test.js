const TwilioApiCommand = require('../../src/base-commands/twilio-api-command');
const { expect, test, constants } = require('../test');
const { fakeResource, fakeCallResponse } = require('./twilio-api-command.fixtures');

const NUMBER_OF_BASE_COMMAND_FLAGS = 4;
const NUMBER_OF_PARAMS_FOR_CALL_CREATE = fakeResource.actions.create.parameters.length;

describe('base-commands', () => {
  describe('twilio-api-command', () => {
    describe('TwilioApiCommand', () => {
      const getCommandClass = () => {
        const cmd = class extends TwilioApiCommand {};
        cmd.actionDefinition = {
          domainName: 'api',
          versionName: 'v2010',
          topicName: 'call',
          commandName: 'create',
          path: '/Accounts/{AccountSid}/Calls',
          resource: fakeResource,
          action: fakeResource.actions.create
        };
        TwilioApiCommand.setUpApiCommandOptions(cmd);

        return cmd;
      };

      test.it('setUpApiCommandOptions', async () => {
        const cmd = getCommandClass();

        expect(cmd.id).to.equal('call:create');
        expect(cmd.description).to.equal(fakeResource.actions.create.description);
        expect(cmd.load()).to.equal(cmd);

        expect(cmd.flags['account-sid'].required).to.be.false;
        expect(cmd.flags['account-sid'].apiDetails.parameter.name).to.equal('AccountSid');
        expect(cmd.flags['account-sid'].apiDetails.action).to.equal(cmd.actionDefinition.action);
        expect(cmd.flags['account-sid'].apiDetails.resource).to.equal(cmd.actionDefinition.resource);
        expect(cmd.flags.to.required).to.be.true;
        expect(cmd.flags.to.description).to.equal('Phone number, SIP address, or client identifier to call');
        expect(cmd.flags.from.required).to.be.true;
        expect(cmd.flags.method.required).to.be.false;
        expect(cmd.flags.method.optionType).to.equal('enum');
        expect(cmd.flags.method.options).to.eql(['head', 'get', 'post', 'patch', 'put', 'delete']);
        expect(cmd.flags.record.type).to.equal('boolean');

        expect(Object.keys(cmd.flags).length).to.equal(NUMBER_OF_PARAMS_FOR_CALL_CREATE + NUMBER_OF_BASE_COMMAND_FLAGS);
      });

      test
        .twilioFakeProject()
        .twilioCliEnv()
        .stdout()
        .nock('https://api.twilio.com', api =>
          api.post(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Calls.json`).reply(200, fakeCallResponse)
        )
        .twilioCommand(getCommandClass(), [
          '--from',
          '+15555555555',
          '--to',
          '+14155555555',
          '--url',
          'http://example.com/'
        ])
        .it('creates a call', ctx => {
          expect(ctx.stdout).to.contain(fakeCallResponse.sid);
        });

      test
        .twilioFakeProject()
        .twilioCliEnv()
        .stderr()
        .twilioCommand(getCommandClass(), [
          '--from',
          '+15555555555',
          '--to',
          '+14155555555',
          '--url',
          'http://example.com/',
          '--account-sid',
          'ac12345678901234567890123456789012' // Lower-cased 'ac'
        ])
        .exit(1)
        .it('exits with a failure code and prints validation errors', ctx => {
          expect(ctx.stderr).to.contain('validation errors');
        });
    });
  });
});
