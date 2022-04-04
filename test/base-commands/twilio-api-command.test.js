const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const { fakeResource, fakeCallResponse } = require('./twilio-api-command.fixtures');
const TwilioApiCommand = require('../../src/base-commands/twilio-api-command');
const { getTopicName } = require('../../src/services/twilio-api');

const NUMBER_OF_BASE_COMMAND_FLAGS = 6;
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
        action: fakeResource.actions.create,
      };

      const callListActionDefinition = {
        domainName: 'api',
        commandName: 'list',
        path: '/2010-04-01/Accounts/{AccountSid}/Calls.json',
        actionName: 'list',
        action: {
          parameters: [
            { name: 'StartTime<', in: 'query', schema: { type: 'string' } },
            { name: 'StartTime>', in: 'query', schema: { type: 'string' } },
          ],
        },
      };

      const callRemoveActionDefinition = {
        domainName: 'api',
        commandName: 'remove',
        path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
        actionName: 'remove',
        action: {
          parameters: [{ name: 'Sid', in: 'path', schema: { type: 'string' } }],
        },
      };

      const numberUpdateActionDefinition = {
        domainName: 'api',
        commandName: 'update',
        path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
        actionName: 'update',
        action: {
          parameters: [
            { name: 'Sid', in: 'path', schema: { type: 'string' } },
            { name: 'AccountSid', in: 'path', schema: { type: 'string' } },
            { name: 'AccountSid', in: 'query', schema: { type: 'string' } },
          ],
        },
      };

      const syncMapItemUpdateActionDefinition = {
        domainName: 'sync',
        commandName: 'update',
        path: '/v1/Services/{ServiceSid}/Maps/{MapSid}/Items/{Sid}.json',
        actionName: 'update',
        action: {
          parameters: [
            { name: 'Sid', in: 'path', schema: { type: 'string' } },
            { name: 'MapSid', in: 'path', schema: { type: 'string' } },
            { name: 'ServiceSid', in: 'path', schema: { type: 'string' } },
            { name: 'Key', in: 'query', schema: { type: 'string' } },
            { name: 'If-Match', in: 'header', schema: { type: 'string' } },
          ],
        },
      };

      const callApiHelpDoc = {
        domainName: 'sync',
        commandName: 'services',
        path: '',
        actionName: 'list',
        action: {
          description: null,
        },
        docLink: undefined,
      };

      const getCommandClass = (actionDefinition = callCreateActionDefinition) => {
        const NewCommandClass = class extends TwilioApiCommand {};
        NewCommandClass.actionDefinition = actionDefinition;
        NewCommandClass.actionDefinition.topicName = `api:${getTopicName(NewCommandClass.actionDefinition)}`;
        NewCommandClass.docLink = `${NewCommandClass.actionDefinition.topicName}:${NewCommandClass.actionDefinition.commandName}`;
        TwilioApiCommand.setUpNewCommandClass(NewCommandClass);

        return NewCommandClass;
      };

      test.it('setUpNewCommandClass', () => {
        const NewCommandClass = getCommandClass();

        expect(NewCommandClass.id).to.equal('api:core:calls:create');
        expect(NewCommandClass.description).to.equal(fakeResource.actions.create.description);
        expect(NewCommandClass.load()).to.equal(NewCommandClass);

        expect(NewCommandClass.flags['account-sid'].required).to.be.false;
        expect(NewCommandClass.flags['account-sid'].apiDetails.parameter.name).to.equal('AccountSid');
        expect(NewCommandClass.flags['account-sid'].apiDetails.action).to.equal(
          NewCommandClass.actionDefinition.action,
        );
        expect(NewCommandClass.flags['account-sid'].apiDetails.resource).to.equal(
          NewCommandClass.actionDefinition.resource,
        );
        expect(NewCommandClass.flags.to.required).to.be.true;
        expect(NewCommandClass.flags.to.description).to.equal(
          'Phone number, SIP address, or `client identifier` to call',
        );
        expect(NewCommandClass.flags.from.required).to.be.true;
        expect(NewCommandClass.flags.method.required).to.be.false;
        expect(NewCommandClass.flags.method.type).to.equal('option');
        expect(NewCommandClass.flags.method.helpValue).to.equal('(head|get|post|patch|put|delete)');
        expect(NewCommandClass.flags.record.type).to.equal('boolean');
        expect(NewCommandClass.flags.properties.default).to.equal('sid,friendlyName,status');

        expect(Object.keys(NewCommandClass.flags).length).to.equal(
          NUMBER_OF_PARAMS_FOR_CALL_CREATE + NUMBER_OF_BASE_COMMAND_FLAGS,
        );
      });

      test.it('checks that parameters with inequalities convert to the correct flag names', () => {
        const NewCommandClass = getCommandClass(callListActionDefinition);

        expect(Object.keys(NewCommandClass.flags)).to.include('start-time-after');
        expect(Object.keys(NewCommandClass.flags)).to.include('start-time-before');
        expect(Object.keys(NewCommandClass.flags)).to.include('limit');
        expect(Object.keys(NewCommandClass.flags)).to.include('no-limit');
        expect(Object.keys(NewCommandClass.flags)).to.include('no-header');
      });

      test.it('checks the help document url', () => {
        const NewCommandClass = getCommandClass(callCreateActionDefinition);
        expect(NewCommandClass.id).to.equal('api:core:calls:create');
        expect(NewCommandClass.description).to.equal(fakeResource.actions.create.description);
        expect(NewCommandClass.docLink).to.equal('https://twilio.com/docs/usage/api');
        expect(Object.keys(NewCommandClass.flags)).not.to.include('no-header');
      });

      test.it('checks the help document url', () => {
        const NewCommandClass = getCommandClass(callApiHelpDoc);
        expect(NewCommandClass.id).to.equal('api:sync:services');
        expect(NewCommandClass.docLink).to.equal('https://twilio.com/docs/sync/api');
      });

      test.it('handles remove action', () => {
        const NewCommandClass = getCommandClass(callRemoveActionDefinition);

        expect(NewCommandClass.id).to.equal('api:core:calls:remove');
        expect(NewCommandClass.flags.properties).to.be.undefined;
      });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCreateCommand(getCommandClass(), [
          '--from',
          '+15555555555',
          '--to',
          '+14155555555',
          '--url',
          'http://example.com/',
        ])
        .do((ctx) => {
          ctx.testCmd.twilioApi = { create: sinon.stub().returns(fakeCallResponse) };
          return ctx.testCmd.run();
        })
        .it('creates a call', (ctx) => {
          expect(ctx.stdout).to.contain(fakeCallResponse.sid);
        });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCreateCommand(getCommandClass(callListActionDefinition), [
          '--start-time-after',
          'after-this',
          '--start-time-before',
          'before-that',
          '--limit',
          '1',
        ])
        .do((ctx) => {
          ctx.testCmd.twilioApi = { list: sinon.stub().returns([]) };
          return ctx.testCmd.run();
        })
        .it('lists calls', (ctx) => {
          const callOptions = ctx.testCmd.twilioApi.list.firstCall.args[0];
          expect(callOptions.data).to.include({ 'StartTime>': 'after-this' });
          expect(callOptions.data).to.include({ 'StartTime<': 'before-that' });
          expect(callOptions.data).to.include({ Limit: '1' });

          expect(ctx.stdout).to.be.empty;
          expect(ctx.stderr).to.contain('No results');
        });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCreateCommand(getCommandClass(callRemoveActionDefinition), ['--sid', fakeCallResponse.sid])
        .do((ctx) => {
          ctx.testCmd.twilioApi = { remove: sinon.stub().returns(true) };
          return ctx.testCmd.run();
        })
        .it('deletes a call', (ctx) => {
          expect(ctx.stdout).to.be.empty;
          expect(ctx.stderr).to.contain('success');
        });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stderr()
        .twilioCreateCommand(getCommandClass(numberUpdateActionDefinition), [
          '--sid',
          fakeCallResponse.sid,
          '--account-sid',
          'AC012',
          '--target-account-sid',
          'AC123',
        ])
        .do((ctx) => {
          ctx.testCmd.twilioApi = { update: sinon.stub().returns({}) };
          return ctx.testCmd.run();
        })
        .it('updates a call', (ctx) => {
          const callOptions = ctx.testCmd.twilioApi.update.firstCall.args[0];
          expect(callOptions.data).to.include({ AccountSid: 'AC123' });
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
          'ap12345678901234567890123456789012', // Lower-cased 'ap'
        ])
        .catch(/Cannot execute command/)
        .it('exits with a failure code and prints validation errors', (ctx) => {
          expect(ctx.stderr).to.contain('validation errors');
        });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCreateCommand(getCommandClass(), [
          '--skip-parameter-validation',
          '--from',
          '+15555555555',
          '--to',
          '+14155555555',
          '--url',
          'http://example.com/',
          '--application-sid',
          'ap12345678901234567890123456789012', // Lower-cased 'ap'
        ])
        .do((ctx) => {
          ctx.testCmd.twilioApi = { create: sinon.stub().returns(fakeCallResponse) };
          return ctx.testCmd.run();
        })
        .it('creates a call with an invalid parameter', (ctx) => {
          expect(ctx.stdout).to.contain(fakeCallResponse.sid);
        });

      test
        .twilioFakeProfile(ConfigData)
        .twilioCliEnv(Config)
        .stdout()
        .stderr()
        .twilioCreateCommand(getCommandClass(syncMapItemUpdateActionDefinition), [
          '--sid',
          'unique_name',
          '--map-sid',
          'MP0123',
          '--service-sid',
          'IS1234',
          '--key',
          'test_key',
          '--if-match',
          'revision',
        ])
        .do((ctx) => {
          ctx.testCmd.twilioApi = { update: sinon.stub().returns({}) };
          return ctx.testCmd.run();
        })
        .it('adds header parameters', (ctx) => {
          const syncOptions = ctx.testCmd.twilioApi.update.firstCall.firstArg;
          expect(syncOptions.headers).to.include({ 'If-Match': 'revision' });
        });
    });
  });
});
