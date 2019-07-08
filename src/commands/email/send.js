const { flags } = require('@oclif/command');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const sgMail = require('@sendgrid/mail');

class Send extends BaseCommand {
  async run() {
    await super.run();
    this.loadArguments();
    if (!process.env.SENDGRID_API_KEY) {
      this.logger.error('Make sure you have an environment variable called SENDGRID_API_KEY set up with your SendGrid API key. Visit https://app.sendgrid.com/settings/api_keys to get an API key.');
      return this.exit(1);
    }
    this.fromEmail = await this.promptForFromEmail();
    const validFromEmail = this.validateEmail(this.fromEmail);
    const stringFromEmail = validFromEmail.toString();
    await this.promptForToEmail();
    const validToEmail = this.validateEmail(this.toEmail);
    this.subjectLine = await this.promptForSubject();
    await this.promptForText();
    const sendInfomation = { to: validToEmail, from: stringFromEmail, subject: this.subjectLine, text: this.emailText, html: '<p>' + this.emailText + '</p>' };
    await this.sendEmail(sendInfomation);
  }

  loadArguments() {
    this.toEmail = this.flags.toEmail;
    this.fromEmail = this.flags.fromEmail;
    this.subjectLine = this.flags.subjectLine;
    this.emailText = this.flags.emailText;
  }

  validateEmail(email) {
    var emailList = [];
    var validEmail;
    const multipleEmail = email.includes(',');
    if (multipleEmail === true) {
      emailList = email.split(',').map(item => {
        return item.trim();
      });
    } else {
      emailList[0] = email;
    }

    emailList.forEach(emailAddress => {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailVerdict = re.test(String(emailAddress).toLowerCase());
      if (emailVerdict === false) {
        this.logger.error(emailAddress + ' is not a valid email.');
        validEmail = false;
      }
    });
    if (validEmail === false) {
      this.logger.error('Email could not be sent please re-run the command with valid email addresses.');
      return this.exit(1);
    }
    return emailList;
  }

  async promptForFromEmail() {
    if (this.fromEmail) {
      return this.fromEmail;
    }
    if (this.userConfig.email.fromEmail) {
      return this.userConfig.email.fromEmail;
    }
    const answer = await this.inquirer.prompt([
      {
        name: 'from',
        message: Send.flags.fromEmail.description + ':'
      }
    ]);
    return answer.from;
  }

  async promptForToEmail() {
    if (!this.toEmail) {
      const answer = await this.inquirer.prompt([{
        name: 'to',
        message: Send.flags.toEmail.description + ':'
      }]);
      this.toEmail = answer.to;
    }
  }

  async promptForSubject() {
    if (this.subjectLine) {
      return this.subjectLine;
    }
    if (this.userConfig.email.subjectLine) {
      return this.userConfig.email.subjectLine;
    }
    const subject = await this.inquirer.prompt([
      {
        name: 'subject',
        message: Send.flags.subjectLine.description + ':'
      }
    ]);
    return subject.subject;
  }

  async promptForText() {
    if (!this.emailText) {
      const answers = await this.inquirer.prompt([
        {
          name: 'text',
          message: Send.flags.emailText.description + ':'
        }
      ]);
      this.emailText = answers.text;
    }
  }

  async sendEmail(sendInfomation) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(sendInfomation);
    this.logger.info('Your email containing the message "' + this.emailText + '" sent from ' + this.fromEmail + ' to ' + this.toEmail + ' with the subject line ' + this.subjectLine + ' has been sent!');
  }
}

Send.description = 'sends emails to single or multiple recipients';
Send.flags = Object.assign(
  {
    toEmail: flags.string({
      description: 'Email address of recipient (for multiple email addresses separate each email with a comma)'
    }),
    fromEmail: flags.string({
      description: 'Email address of the sender'
    }),
    subjectLine: flags.string({
      description: 'The subject line for an email'
    }),
    emailText: flags.string({
      description: 'Text to send within the email body'
    })
  },
  BaseCommand.flags
);
Send.args = [];
module.exports = Send;
