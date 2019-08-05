const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const emailSend = require('../../../src/commands/email/send');

describe('commands', () => {
  describe('email', () => {
    describe('send', () => {
      const defaultSetup = ({
        flags = [],
        toEmail = '',
        subjectLine = '',
        fromEmail = '',
        bodyText = 'Hello world',
        attachmentVerdict = false,
        filePath = 'test/commands/email/test.txt'
      } = {}) =>
        test
          .do(ctx => {
            ctx.userConfig = new ConfigData();
            ctx.userConfig.email.fromEmail = 'default@test.com';
            ctx.userConfig.email.subjectLine = 'default';
          })
          .twilioCliEnv(Config)
          .twilioCreateCommand(emailSend, flags)
          .stdout()
          .stderr()
          .do(ctx => {
            const fakePrompt = sinon.stub();
            fakePrompt.resolves({
              to: toEmail,
              from: fromEmail,
              subjectLine: subjectLine,
              text: bodyText,
              sendAttachment: attachmentVerdict,
              path: filePath
            });
            ctx.testCmd.inquirer.prompt = fakePrompt;
          });

      const noDefault = ({
        flags = [],
        toEmail = '',
        subjectLine = '',
        fromEmail = '',
        bodyText = 'Hello world'
      } = {}) =>
        test
          .twilioCliEnv(Config)
          .twilioCreateCommand(emailSend, flags)
          .stdout()
          .stderr()
          .do(ctx => {
            process.env.SENDGRID_API_KEY = 'SG.1134567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
            var fakePrompt = sinon.stub();
            fakePrompt.resolves({
              to: toEmail,
              from: fromEmail,
              subject: subjectLine,
              text: bodyText
            });
            ctx.testCmd.inquirer.prompt = fakePrompt;
          });

      defaultSetup({ toEmail: 'jen@test.com , mike@test.com, tamu@test.com' })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run email:send with no environment variable for SendGrid key', ctx => {
          expect(ctx.stderr).to.contain('SENDGRID_API_KEY');
        });

      noDefault({
        toEmail: 'JonSnow, BranStark@winterfell',
        fromEmail: 'Ygritte@wall.com',
        flags: ['--subject', 'Open ASAP', '--force-tty'],
        bodyText: 'You know nothing Jon Snow.'
      })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it(
          'run email:send without defaults and with multiple recipients including an incorrect to email address',
          ctx => {
            expect(ctx.stderr).to.contain('JonSnow is not a valid email');
            expect(ctx.stderr).to.contain('Email could not be sent');
          }
        );

      noDefault({
        toEmail: 'JonSnow@castleBlack.com',
        fromEmail: 'Ygritte@wall.com',
        subjectLine: 'Secret Message',
        flags: ['--force-tty'],
        bodyText: 'You know nothing Jon Snow.'
      })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => ctx.testCmd.run())
        .it('run email:send with filled out inquirer prompts', ctx => {
          expect(ctx.stderr).to.contain('You know nothing Jon Snow');
          expect(ctx.stderr).to.contain('Ygritte@wall.com');
          expect(ctx.stderr).to.contain('JonSnow@castleBlack.com');
          expect(ctx.stderr).to.contain('Secret Message');
        });

      noDefault({
        toEmail: 'JonSnow@castleBlack.com',
        fromEmail: 'Ygritte@wall.com',
        flags: ['--subject', 'Open ASAP', '--force-tty'],
        bodyText: 'You know nothing Jon Snow.'
      })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => ctx.testCmd.run())
        .it('run email:send use inquire and a flag to set information', ctx => {
          expect(ctx.stderr).to.contain('You know nothing Jon Snow');
          expect(ctx.stderr).to.contain('Ygritte@wall.com');
          expect(ctx.stderr).to.contain('JonSnow@castleBlack.com');
          expect(ctx.stderr).to.contain('Open ASAP');
        });

      noDefault({
        toEmail: 'JonSnow@castleBlack.com',
        fromEmail: 'Ygritte',
        subjectLine: 'Secret Message',
        flags: ['--force-tty'],
        bodyText: 'You know nothing Jon Snow.'
      })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run email:send without defaults and an invalid from email address', ctx => {
          expect(ctx.stderr).to.contain('Ygritte is not a valid email');
          expect(ctx.stderr).to.contain('Email could not be sent');
        });

      defaultSetup({ toEmail: 'jen@test.com', flags: ['--force-tty'] })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with default subject line and sending email address', ctx => {
          expect(ctx.stderr).to.contain('Hello world');
          expect(ctx.stderr).to.contain('default@test.com');
          expect(ctx.stderr).to.contain('jen@test.com');
          expect(ctx.stderr).to.contain('default');
        });

      defaultSetup({ toEmail: 'jen@test.com, mike@test.com, tamu@test.com', flags: ['--force-tty'] })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with defaults and multiple recipients', ctx => {
          expect(ctx.stderr).to.contain('Hello world');
          expect(ctx.stderr).to.contain('default@test.com');
          expect(ctx.stderr).to.contain('jen@test.com');
          expect(ctx.stderr).to.contain('mike@test.com');
          expect(ctx.stderr).to.contain('tamu@test.com');
          expect(ctx.stderr).to.contain('default');
        });

      defaultSetup({
        flags: [
          '--to',
          'Frodo@test.com',
          '--from',
          'Bilbo@test.com',
          '--subject',
          'Greetings',
          '--text',
          'Short cuts make delays, but inns make longer ones.',
          '--force-tty'
        ]
      })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with all flags', ctx => {
          expect(ctx.stderr).to.contain('Short cuts make delays, but inns make longer ones');
          expect(ctx.stderr).to.contain('Bilbo@test.com');
          expect(ctx.stderr).to.contain('Frodo@test.com');
          expect(ctx.stderr).to.contain('Greetings');
        });

      defaultSetup({
        flags: [
          '--to',
          'Frodo@test.com',
          '--from',
          'Bilbo@test.com',
          '--text',
          'Short cuts make delays, but inns make longer ones.',
          '--force-tty'
        ]
      })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with flags and default subject line', ctx => {
          expect(ctx.stderr).to.contain('Short cuts make delays, but inns make longer ones');
          expect(ctx.stderr).to.contain('Bilbo@test.com');
          expect(ctx.stderr).to.contain('Frodo@test.com');
          expect(ctx.stderr).to.contain('default');
        });

      defaultSetup({
        flags: [
          '--subject',
          'Secret Message',
          '--to',
          'JonSnow@castleBlack.com',
          '--from',
          'Ygritte@wall.com',
          '--text',
          'You know nothing Jon Snow.',
          '--attachment',
          'test/commands/email/test.txt',
          '--force-tty'
        ]
      })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send using flags to set information using relative file path', ctx => {
          expect(ctx.stderr).to.contain('You know nothing Jon Snow');
          expect(ctx.stderr).to.contain('Ygritte@wall.com');
          expect(ctx.stderr).to.contain('JonSnow@castleBlack.com');
          expect(ctx.stderr).to.contain('Secret Message');
          expect(ctx.stderr).to.contain('test.txt path');
        });

      defaultSetup({
        flags: [
          '--subject',
          'Secret Message',
          '--to',
          'JonSnow@castleBlack.com',
          '--from',
          'Ygritte@wall.com',
          '--text',
          'You know nothing Jon Snow.',
          '--attachment',
          'test/commands/email/invalid.txt',
          '--force-tty'
        ]
      })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .exit(1)
        .it('run email:send using flags to set information using invalid file path', ctx => {
          expect(ctx.stderr).to.contain('Unable to read the file:');
        });

      defaultSetup({ toEmail: 'jen@test.com', attachmentVerdict: true, flags: ['--force-tty'] })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it(
          'run email:send with default subject line and sending email address and relative path for attachment',
          ctx => {
            expect(ctx.stderr).to.contain('Hello world');
            expect(ctx.stderr).to.contain('default@test.com ');
            expect(ctx.stderr).to.contain('jen@test.com ');
            expect(ctx.stderr).to.contain('default@test.com');
            expect(ctx.stderr).to.contain('test.txt path');
          }
        );

      defaultSetup({
        flags: [
          '--subject',
          'Secret Message',
          '--to',
          'JonSnow@castleBlack.com',
          '--from',
          'Ygritte@wall.com',
          '--text',
          'You know nothing Jon Snow.'
        ]
      })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .stdin('this is some piped data', 100)
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send using stdin as the attachment source', ctx => {
          expect(ctx.stderr).to.contain('You know nothing Jon Snow');
          expect(ctx.stderr).to.contain('Ygritte@wall.com');
          expect(ctx.stderr).to.contain('JonSnow@castleBlack.com');
          expect(ctx.stderr).to.contain('Secret Message');
          expect(ctx.stderr).to.contain('Your piped data attachment has been sent');
        });

      defaultSetup({
        flags: ['--from', 'Ygritte@wall.com', '--text', 'You know nothing Jon Snow.']
      })
        .stdin('this is some piped data', 100)
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .exit(1)
        .it('run email:send using stdin as the attachment source but missing a To', ctx => {
          expect(ctx.stderr).to.contain('No terminal');
          expect(ctx.stderr).to.contain('Please provide');
        });
    });
  });
});
