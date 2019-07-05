const { flags } = require('@oclif/command');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const sgMail = require('@sendgrid/mail');

class send extends BaseCommand {
  async run() {
    await super.run();
    this.loadArguments();
    console.log(process.env.SENDGRID_API_KEY);
    if (!process.env.SENDGRID_API_KEY) {
      this.logger.error('Make sure you have an enviornmental varible called SENDGRID_API_KEY set up with your API key. Visit https://app.sendgrid.com/settings/api_keys to get an API key');
      return this.exit(1);
    }
    this.fromEmail = await this.promptForFromEmail();
    const validFromEmail = this.validateEmail(this.fromEmail);
    const stringFromEmail = validFromEmail.toString();
    await this.promptForToEmail();
    const validToEmail = this.validateEmail(this.toEmail);
    this.subjectLine = await this.promptForSubject();
    await this.promptForText();
    const sendInfomation = { to: validToEmail, from: stringFromEmail, subject: this.subjectLine, text: this.emailText };
    this.sendEmail(sendInfomation);
  }

  loadArguments() {
    this.toEmail = this.flags.toEmail;
    this.fromEmail = this.flags.fromEmail;
    this.subjectLine = this.flags.subjectLine;
    this.emailText = this.flags.emailText;
  }

  validateEmail(email) {
    var emailList = [];
    var test;
    const multipleEmail = email.includes(',');
    if (multipleEmail === true) {
      emailList = email.split(',').map(item => {
        return item.trim();
      });
    } else {
      emailList[0] = email;
    }
    emailList.forEach(emailAddress => {
      const emailVerdict = emailAddress.includes('@');
      if (emailVerdict === false) {
        this.logger.error(emailAddress + ' is not a valid email.');
        test = false;
      }
    });
    if (test === false) {
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
    if (!this.fromEmail || !this.userConfig.email.fromEmail) {
      const answer = await this.inquirer.prompt([
        {
          name: 'from',
          message: send.flags.fromEmail.description + ':'
        }
      ]);
      return answer.from;
    }
  }

  async promptForToEmail() {
    if (!this.toEmail) {
      const answer = await this.inquirer.prompt([{
        name: 'to',
        message: send.flags.toEmail.description + ':'
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
    if (!this.subjectLine || !this.userConfig.email.subjectLine) {
      const subject = await this.inquirer.prompt([
        {
          name: 'subject',
          message: send.flags.subjectLine.description + ':'
        }
      ]);
      return subject.subject;
    }
  }

  async promptForText() {
    if (!this.emailText) {
      const answers = await this.inquirer.prompt([
        {
          name: 'text',
          message: send.flags.emailText.description + ':'
        }
      ]);
      this.emailText = answers.text;
    }
  }

  sendEmail(sendInfomation) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(sendInfomation);
    this.logger.info('Your email containing the message "' + this.emailText + '" sent from ' + this.fromEmail + ' to ' + this.toEmail + ' with the subject line ' + this.subjectLine + ' has been sent!');
  }
}

send.description = 'sends emails to single or multiple recipients';
send.flags = Object.assign(
  {
    toEmail: flags.string({
      description: 'Email address of recipient (for multiple email addresses seprate each email with a comma)'
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
send.args = [];
module.exports = send;
