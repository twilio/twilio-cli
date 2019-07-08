const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;
const emailSend = require('../../../src/commands/email/send');

describe('commands', () => {
  describe('projects', () => {
    describe('send', () => {
      const defaultSetup = ({ flags = [], toEmail = '', subjectLine = '', fromEmail = '', bodyText = 'Hello world', attachmentVerdict = false, filePath = 'test/commands/email/test.txt', fileName = 'Top Secret' } = {}) => test
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
          fakePrompt
            .resolves({
              to: toEmail,
              from: fromEmail,
              subject: subjectLine,
              text: bodyText,
              sendAttachment: attachmentVerdict,
              path: filePath,
              name: fileName
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
        });
      const noDefault = ({ flags = [], toEmail = '', subjectLine = '', fromEmail = '', bodyText = 'Hello world' } = {}) => test
        .twilioCliEnv(Config)
        .twilioCreateCommand(emailSend, flags)
        .stdout()
        .stderr()
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1134567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          var fakePrompt = sinon.stub();
          fakePrompt
            .resolves({
              to: toEmail,
              from: fromEmail,
              subject: subjectLine,
              text: bodyText
            });
          ctx.testCmd.inquirer.prompt = fakePrompt;
        });
      defaultSetup({ toEmail: 'jen@test.com, mike@test.com, tamu@test.com' })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run email:send with no environmental variable for SendGrid key', ctx => {
          expect(ctx.stderr).to.contain('Make sure you have an environmental variable called SENDGRID_API_KEY set up with your SendGrid API key');
        });

      noDefault({ toEmail: 'JonSnow, BranStark@winterfell', fromEmail: 'Ygritte@wall.com', flags: ['--subjectLine', 'Open ASAP'], bodyText: 'You know nothing Jon Snow.' })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run email:send without defaults and with multiple recipients including an incorrect to email address', ctx => {
          expect(ctx.stderr).to.contain('JonSnow is not a valid email');
          expect(ctx.stderr).to.contain('Email could not be sent please re-run the command with valid email addresses');
        });
      noDefault({ toEmail: 'JonSnow@castleBlack.com', fromEmail: 'Ygritte@wall.com', subjectLine: 'Secret Message', bodyText: 'You know nothing Jon Snow.' })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => ctx.testCmd.run())
        .it('run email:send with filled out inquirer prompts', ctx => {
          expect(ctx.stderr).to.contain('Your email containing the message "You know nothing Jon Snow." sent from Ygritte@wall.com to JonSnow@castleBlack.com with the subject line Secret Message has been sent!');
        });
      noDefault({ toEmail: 'JonSnow@castleBlack.com', fromEmail: 'Ygritte', subjectLine: 'Secret Message', bodyText: 'You know nothing Jon Snow.' })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run email:send without defaults and an invalid from email address', ctx => {
          expect(ctx.stderr).to.contain('Ygritte is not a valid email');
          expect(ctx.stderr).to.contain('Email could not be sent please re-run the command with valid email addresses');
        });

      defaultSetup({ toEmail: 'jen@test.com' })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with default subject line and sending email address', ctx => {
          expect(ctx.stderr).to.contain('Your email containing the message "Hello world" sent from default@test.com to jen@test.com with the subject line default has been sent!');
        });

      defaultSetup({ toEmail: 'jen@test.com, mike@test.com, tamu@test.com' })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with defaults and multiple recipients', ctx => {
          expect(ctx.stderr).to.contain('Your email containing the message "Hello world" sent from default@test.com to jen@test.com, mike@test.com, tamu@test.com with the subject line default has been sent!');
        });
      defaultSetup({ flags: ['--toEmail', 'Frodo@test.com', '--fromEmail', 'Bilbo@test.com', '--subjectLine', 'Greetings', '--emailText', 'Short cuts make delays, but inns make longer ones.'] })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with all flags', ctx => {
          expect(ctx.stderr).to.contain('Your email containing the message "Short cuts make delays, but inns make longer ones." sent from Bilbo@test.com to Frodo@test.com with the subject line Greetings has been sent!');
        });
      defaultSetup({ flags: ['--toEmail', 'Frodo@test.com', '--fromEmail', 'Bilbo@test.com', '--emailText', 'Short cuts make delays, but inns make longer ones.'] })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with flags and default subject line', ctx => {
          expect(ctx.stderr).to.contain('Your email containing the message "Short cuts make delays, but inns make longer ones." sent from Bilbo@test.com to Frodo@test.com with the subject line default has been sent!');
        });

      defaultSetup({ flags: ['--subjectLine', 'Secret Message', '--toEmail', 'JonSnow@castleBlack.com', '--fromEmail', 'Ygritte@wall.com', '--emailText', 'You know nothing Jon Snow.', '--attachment', 'test/commands/email/test.txt', '--attachmentName', 'attachment'] })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        }).do(ctx => ctx.testCmd.run())
        .it('run email:send using flags to set information using relative file path', ctx => {
          expect(ctx.stderr).to.contain('Your email containing the message "You know nothing Jon Snow." sent from Ygritte@wall.com to JonSnow@castleBlack.com with the subject line Secret Message has been sent!');
          expect(ctx.stderr).to.contain('test.txt path');
        });
      defaultSetup({ flags: ['--subjectLine', 'Secret Message', '--toEmail', 'JonSnow@castleBlack.com', '--fromEmail', 'Ygritte@wall.com', '--emailText', 'You know nothing Jon Snow.', '--attachment', 'test/commands/email/invalid.txt', '--attachmentName', 'absolute'] })
        .do(ctx => ctx.testCmd.run())
        .exit(1)
        .it('run email:send using flags to set information using invalid file path', ctx => {
          expect(ctx.stderr).to.contain('"code":"ENOENT","syscall":"open"');
        });
      defaultSetup({ toEmail: 'jen@test.com', attachmentVerdict: true })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with default subject line and sending email address and relative path for attachment', ctx => {
          expect(ctx.stderr).to.contain('Your email containing the message "Hello world" sent from default@test.com to jen@test.com with the subject line default has been sent!');
          expect(ctx.stderr).to.contain('test.txt');
        });
      defaultSetup({ toEmail: 'jen@test.com', attachmentVerdict: true, filePath: '' })
        .nock('https://api.sendgrid.com', api => {
          api.post('/v3/mail/send').reply(200, {});
        })
        .do(ctx => {
          process.env.SENDGRID_API_KEY = 'SG.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef_4';
          return ctx.testCmd.run();
        })
        .it('run email:send with default subject line and sending email address and empty path for attachment', ctx => {
          expect(ctx.stderr).to.contain('Your email containing the message "Hello world" sent from default@test.com to jen@test.com with the subject line default has been sent!');
        });
    });
  });
});
