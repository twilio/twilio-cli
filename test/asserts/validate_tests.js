const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

const { fakeResource, fakeCallResponse } = require('../../src/base-commands/twilio-api-command');
const TwilioApiCommand = require('../../src/base-commands/twilio-api-command');
const { getTopicName } = require('../../src/services/twilio-api');

const NUMBER_OF_BASE_COMMAND_FLAGS = 6;
const NUMBER_OF_PARAMS_FOR_CALL_CREATE = fakeResource.actions.create.parameters.length;

const validateTests = async () => {
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

          expect(NewCommandClass.flags.to.description).to.equal(
            'Phone number, SIP address, or `client identifier` to call',
          );

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
        });

        test.it('checks the help document url', () => {
          const NewCommandClass = getCommandClass(callCreateActionDefinition);
          expect(NewCommandClass.id).to.equal('api:core:calls:create');
          expect(NewCommandClass.description).to.equal(fakeResource.actions.create.description);
          expect(NewCommandClass.docLink).to.equal('https://twilio.com/docs/usage/api');
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
          .twilioCreateCommand(getCommandClass(callRemoveActionDefinition), ['--sid', fakeCallResponse.sid])
          .do((ctx) => {
            ctx.testCmd.twilioApi = { remove: sinon.stub().returns(true) };
            return ctx.testCmd.run();
          })
          .it('deletes a call', (ctx) => {
            expect(ctx.stderr).to.contain('success');
          });
      });
    });
  });
};
(async () => {
  await validateTests();
})();
