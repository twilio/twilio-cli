const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const EmailSet = require('../../../src/commands/email/set');

describe('commands', () => {
  describe('projects', () => {
    describe('set', () => {
      const setup = ({ emailAddress = '', subjectLine = '' } = {}) => test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.email.fromEmail = 'default@test.com';
          ctx.userConfig.email.subjectLine = 'default subjet line';
        })
        .twilioCliEnv(Config)
        .twilioCreateCommand(EmailSet, [])
        .stdout()
        .stderr()
        .do(ctx => {
          const fakePrompt = sinon.stub();
          fakePrompt
            .resolves({
              from: emailAddress,
              subject: subjectLine
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
        });
      const noDefaults = ({ flags = [], emailAddress = '', subjectLine = '' } = {}) => test
        .twilioCliEnv(Config)
        .twilioCreateCommand(EmailSet, flags)
        .stdout()
        .stderr()
        .do(ctx => {
          const fakePrompt = sinon.stub();
          fakePrompt
            .resolves({
              from: emailAddress,
              subject: subjectLine
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
        });

      noDefaults({ flags: ['--from', 'Frodo@test.com', '--subject', 'Where is the ring'] })
        .do(ctx => ctx.testCmd.run())
        .it('run email:set to set a new default sending email and subject with flags', ctx => {
          expect(ctx.stderr).to.contain('Frodo@test.com');
          expect(ctx.stderr).to.contain('Where is the ring');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      noDefaults({ emailAddress: 'newDefault@gmail.com', subjectLine: 'greetings' })
        .do(ctx => ctx.testCmd.run())
        .it('run email:set to set a new default sending email and subject', ctx => {
          expect(ctx.stderr).to.contain('newDefault@gmail.com');
          expect(ctx.stderr).to.contain('greetings');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup({ emailAddress: 'corgi@gmail.com', subjectLine: 'MORE Greetings' })
        .do(ctx => ctx.testCmd.run())
        .it('run email:set to set a new default sending email and subject when a default has already been setup', ctx => {
          expect(ctx.stderr).to.contain('Current default sending email: default@test.com');
          expect(ctx.stderr).to.contain('Current default subject line: default subjet line');
          expect(ctx.stderr).to.contain('corgi@gmail.com');
          expect(ctx.stderr).to.contain('MORE Greetings');
          expect(ctx.stderr).to.contain('configuration saved');
        });

      setup({ emailAddress: 'fakeEmail.com', subjectLine: 'testSubject' })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run email:set with invalid email and correct subject line when a default has already been set up', ctx => {
          expect(ctx.stderr).to.contain('Current default sending email: default@test.com');
          expect(ctx.stderr).to.contain('Current default subject line: default subjet line');
          expect(ctx.stderr).to.contain('Please use a valid email');
        });
    });
  });
});

