const { flags } = require('@oclif/command');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const sgMail = require('@sendgrid/mail');

class Send extends BaseCommand {
  async run() {
    await super.run();
    if (!process.env.SENDGRID_API_KEY) {
      this.logger.error('Make sure you have an environment variable called SENDGRID_API_KEY set up with your SendGrid API key. Visit https://app.sendgrid.com/settings/api_keys to get an API key.');
      return this.exit(1);
    }
    await this.promptForFromEmail();
    const validFromEmail = this.validateEmail(this.fromEmail);
    const stringFromEmail = validFromEmail.toString();
    await this.promptForToEmail();
    const validToEmail = this.validateEmail(this.toEmail);
    await this.promptForSubject();
    await this.promptForText();
    const sendInformation = { to: validToEmail, from: stringFromEmail, subject: this.subjectLine, text: this.emailText, html: '<p>' + this.emailText + '</p>' };
    await this.sendEmail(sendInformation);
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
      this.logger.error('Email could not be sent, please re-run the command with valid email addresses.');
      return this.exit(1);
    }
    return emailList;
  }

  async promptForFromEmail() {
    if (this.userConfig.email.fromEmail) {
      this.fromEmail = this.userConfig.email.fromEmail;
    }
    if (this.flags.from) {
      this.fromEmail = this.flags.from;
    }
    if (!this.fromEmail) {
      const answer = await this.inquirer.prompt([
        {
          name: 'from',
          message: Send.flags.from.description + ':'
        }
      ]);
      this.fromEmail = answer.from;
    }
  }

  async promptForToEmail() {
    this.toEmail = this.flags.to;
    if (!this.toEmail) {
      const answer = await this.inquirer.prompt([{
        name: 'to',
        message: Send.flags.to.description + ':'
      }]);
      this.toEmail = answer.to;
    }
  }

  async promptForSubject() {
    if (this.userConfig.email.subjectLine) {
      this.subjectLine = this.userConfig.email.subjectLine;
    }
    if (this.flags.subject) {
      this.subjectLine = this.flags.subject;
    }
    if (!this.subjectLine) {
      const subject = await this.inquirer.prompt([
        {
          name: 'subject',
          message: Send.flags.subject.description + ':'
        }
      ]);
      this.subjectLine = subject.subject;
    }
  }

  async promptForText() {
    this.emailText = this.flags.text;
    if (!this.emailText) {
      const answers = await this.inquirer.prompt([
        {
          name: 'text',
          message: Send.flags.text.description + ':'
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
    to: flags.string({
      description: 'Email address of recipient (for multiple email addresses separate each email with a comma)'
    }),
    from: flags.string({
      description: 'Email address of the sender'
    }),
    subject: flags.string({
      description: 'The subject line for an email'
    }),
    text: flags.string({
      description: 'Text to send within the email body'
    })
  },
  BaseCommand.flags
);
Send.args = [];
module.exports = Send;
