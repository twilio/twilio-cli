const TwilioApiCommand = require('../../src/base-commands/twilio-api-command');
const { getTopicName } = require('../../src/services/twilio-api');
const { expect, test, constants } = require('@twilio/cli-test');
const { fakeResource, fakeCallResponse } = require('./twilio-api-command.fixtures');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const NUMBER_OF_BASE_COMMAND_FLAGS = 4;
const NUMBER_OF_PARAMS_FOR_CALL_CREATE = fakeResource.actions.create.parameters.length;

describe('base-commands', () => {
  describe('twilio-api-command', () => {
    describe('TwilioApiCommand', () => {
      const getCommandClass = () => {
        const NewCommandClass = class extends TwilioApiCommand {};
        NewCommandClass.actionDefinition = {
          domainName: 'api',
          versionName: 'v2010',
          commandName: 'create',
          path: '/Accounts/{AccountSid}/Calls',
          resource: fakeResource,
          actionName: 'create',
          action: fakeResource.actions.create
        };
        NewCommandClass.actionDefinition.topicName = getTopicName(NewCommandClass.actionDefinition);
        TwilioApiCommand.setUpNewCommandClass(NewCommandClass);

        return NewCommandClass;
      };

      test.it('setUpNewCommandClass', async () => {
        const NewCommandClass = getCommandClass();

        expect(NewCommandClass.id).to.equal('api:calls:create');
        expect(NewCommandClass.description).to.contain('\'Twilio Client\' connections');
        expect(NewCommandClass.load()).to.equal(NewCommandClass);

        expect(NewCommandClass.flags['account-sid'].required).to.be.false;
        expect(NewCommandClass.flags['account-sid'].apiDetails.parameter.name).to.equal('AccountSid');
        expect(NewCommandClass.flags['account-sid'].apiDetails.action).to.equal(
          NewCommandClass.actionDefinition.action
        );
        expect(NewCommandClass.flags['account-sid'].apiDetails.resource).to.equal(
          NewCommandClass.actionDefinition.resource
        );
        expect(NewCommandClass.flags.to.required).to.be.true;
        expect(NewCommandClass.flags.to.description).to.equal(
          'Phone number, SIP address, or \'client identifier\' to call'
        );
        expect(NewCommandClass.flags.from.required).to.be.true;
        expect(NewCommandClass.flags.method.required).to.be.false;
        expect(NewCommandClass.flags.method.type).to.equal('option');
        expect(NewCommandClass.flags.method.helpValue).to.eql('(head|get|post|patch|put|delete)');
        expect(NewCommandClass.flags.record.type).to.equal('boolean');

        expect(Object.keys(NewCommandClass.flags).length).to.equal(
          NUMBER_OF_PARAMS_FOR_CALL_CREATE + NUMBER_OF_BASE_COMMAND_FLAGS
        );
      });

      test
        .twilioFakeProject(ConfigData)
        .twilioCliEnv(Config)
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
        .twilioFakeProject(ConfigData)
        .twilioCliEnv(Config)
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
