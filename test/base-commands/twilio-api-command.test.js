const TwilioApiCommand = require('../../src/base-commands/twilio-api-command');
const { getTopicName } = require('../../src/services/twilio-api');
const { expect, test, constants } = require('@twilio/cli-test');
const { fakeResource, fakeCallResponse } = require('./twilio-api-command.fixtures');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const NUMBER_OF_BASE_COMMAND_FLAGS = 5;
const NUMBER_OF_PARAMS_FOR_CALL_CREATE = fakeResource.actions.create.parameters.length;

describe('base-commands', () => {
  describe('twilio-api-command', () => {
    describe('TwilioApiCommand', () => {
      const callCreateActionDefinition = {
        domainName: 'api',
        commandName: 'create',
        path: '/2010-04-01/Accounts/{AccountSid}/Calls.json',
        resource: fakeResource,
        actionName: 'create',
        action: fakeResource.actions.create
      };

      const callListActionDefinition = {
        domainName: 'api',
        commandName: 'list',
        path: '/2010-04-01/Accounts/{AccountSid}/Calls.json',
        resource: fakeResource,
        actionName: 'list',
        action: {
          parameters: [
            { name: 'StartTime<', in: 'query', schema: { type: 'string' } },
            { name: 'StartTime>', in: 'query', schema: { type: 'string' } }
          ]
        }
      };

      const callRemoveActionDefinition = {
        domainName: 'api',
        commandName: 'remove',
        path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
        actionName: 'remove',
        action: {
          parameters: [{ name: 'Sid', in: 'path', schema: { type: 'string' } }]
        }
      };

      const getCommandClass = (actionDefinition = callCreateActionDefinition) => {
        const NewCommandClass = class extends TwilioApiCommand { };
        NewCommandClass.actionDefinition = actionDefinition;
        NewCommandClass.actionDefinition.topicName = getTopicName(NewCommandClass.actionDefinition);
        TwilioApiCommand.setUpNewCommandClass(NewCommandClass);

        return NewCommandClass;
      };

      test.it('setUpNewCommandClass', () => {
        const NewCommandClass = getCommandClass();

        expect(NewCommandClass.id).to.equal('core:calls:create');
        expect(NewCommandClass.description).to.equal(fakeResource.actions.create.description);
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
          'Phone number, SIP address, or `client identifier` to call'
        );
        expect(NewCommandClass.flags.from.required).to.be.true;
        expect(NewCommandClass.flags.method.required).to.be.false;
        expect(NewCommandClass.flags.method.type).to.equal('option');
        expect(NewCommandClass.flags.method.helpValue).to.equal('(head|get|post|patch|put|delete)');
        expect(NewCommandClass.flags.record.type).to.equal('boolean');
        expect(NewCommandClass.flags.properties.default).to.equal('sid,friendlyName,status');

        expect(Object.keys(NewCommandClass.flags).length).to.equal(
          NUMBER_OF_PARAMS_FOR_CALL_CREATE + NUMBER_OF_BASE_COMMAND_FLAGS
        );
      });

      test.it('checks that parameters with inequalities convert to the correct flag names', () => {
        const NewCommandClass = getCommandClass(callListActionDefinition);

        expect(Object.keys(NewCommandClass.flags)).to.include('start-time-after');
        expect(Object.keys(NewCommandClass.flags)).to.include('start-time-before');
      });

      test.it('handles remove action', () => {
        const NewCommandClass = getCommandClass(callRemoveActionDefinition);

        expect(NewCommandClass.id).to.equal('core:calls:remove');
        expect(NewCommandClass.flags.properties).to.be.undefined;
      });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .nock('https://api.twilio.com', api =>
          api.post(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Calls.json`).reply(201, fakeCallResponse)
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
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .nock('https://api.twilio.com', api =>
          api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Calls.json?StartTime%3C=before-that&StartTime%3E=after-this`).reply(200)
        )
        .twilioCommand(getCommandClass(callListActionDefinition), [
          '--start-time-after', 'after-this',
          '--start-time-before', 'before-that'
        ])
        .it('lists calls', ctx => {
          expect(ctx.stdout).to.be.empty;
          expect(ctx.stderr).to.contain('No results');
        });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .nock('https://api.twilio.com', api =>
          api.delete(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Calls/${fakeCallResponse.sid}.json`).reply(204)
        )
        .twilioCommand(getCommandClass(callRemoveActionDefinition), ['--sid', fakeCallResponse.sid])
        .it('deletes a call', ctx => {
          expect(ctx.stdout).to.be.empty;
          expect(ctx.stderr).to.contain('success');
        });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stderr()
        .twilioCommand(getCommandClass(), [
          '--from',
          '+15555555555',
          '--to',
          '+14155555555',
          '--url',
          'http://example.com/',
          '--application-sid',
          'ap12345678901234567890123456789012' // Lower-cased 'ap'
        ])
        .catch(/Cannot execute command/)
        .it('exits with a failure code and prints validation errors', ctx => {
          expect(ctx.stderr).to.contain('validation errors');
        });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .nock('https://api.twilio.com', api =>
          api.post(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/Calls.json`).reply(201, fakeCallResponse)
        )
        .twilioCommand(getCommandClass(), [
          '--skip-parameter-validation',
          '--from',
          '+15555555555',
          '--to',
          '+14155555555',
          '--url',
          'http://example.com/',
          '--application-sid',
          'ap12345678901234567890123456789012' // Lower-cased 'ap'
        ])
        .it('creates a call with invalid parameter', ctx => {
          expect(ctx.stdout).to.contain(fakeCallResponse.sid);
        });
    });
  });
});
