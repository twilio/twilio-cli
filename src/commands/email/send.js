const { flags } = require('@oclif/command');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const emailUtilities = require('../../services/email-utility');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

class Send extends BaseCommand {
  async run() {
    await super.run();
    if (!process.env.SENDGRID_API_KEY) {
      this.logger.error('Make sure you have an environment variable called SENDGRID_API_KEY set up with your SendGrid API key. Visit https://app.sendgrid.com/settings/api_keys to get an API key.');
      return this.exit(1);
    }
    await this.promptForFromEmail();
    const validFromEmail = this.validateEmail(this.fromEmail);
    await this.promptForToEmail();
    const validToEmail = this.validateEmail(this.toEmail);
    await this.promptForSubject();
    await this.promptForText();
    const sendInformation = { to: validToEmail, from: validFromEmail[0], subject: this.subjectLine, text: this.emailText, html: '<p>' + this.emailText + '</p>' };
    const attachmentVerdict = await this.askAttachment();
    await this.promptAttachment(attachmentVerdict);
    if (this.attachment) {
      const fileContent = this.readFile(this.attachment);
      const attachment = this.createAttachmentArray(fileContent);
      sendInformation.attachments = attachment;
    }
    await this.sendEmail(sendInformation);
  }

  async askAttachment() {
    this.attachment = this.flags.attachment;
    if (!this.attachment) {
      const verdict = await this.inquirer.prompt([
        {
          type: 'confirm',
          name: 'sendAttachment',
          message: 'Would you like to send an attachment?',
          default: false
        }
      ]);
      return verdict.sendAttachment;
    }
    return false;
  }

  async promptAttachment(verdict) {
    if (verdict === true) {
      const file = await this.inquirer.prompt([
        {
          name: 'path',
          message: Send.flags.attachment.description + ':'
        }
      ]);
      this.attachment = file.path;
    }
  }

  readFile(filePath) {
    this.fileName = path.basename(filePath);
    try {
      const coded = fs.readFileSync(filePath, 'base64');
      return coded;
    } catch (err) {
      this.logger.error(filePath + ' file not found.');
      return this.exit(1);
    }
  }

  createAttachmentArray(fileContent) {
    return [{
      content: fileContent,
      type: 'plain/text',
      disposition: 'attachment',
      filename: this.fileName,
      contentId: 'attachmentText'
    }];
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
      if (emailUtilities.validateEmail(emailAddress) === false) {
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

  async sendEmail(sendInformation) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(sendInformation);
    this.logger.info('Your email containing the message "' + this.emailText + '" sent from ' + this.fromEmail + ' to ' + this.toEmail + ' with the subject line ' + this.subjectLine + ' has been sent!');
    if (this.attachment) {
      this.logger.info('Your attachment from ' + this.attachment + ' path called ' + this.fileName + ' has been sent.');
    }
  }
}

Send.description = 'sends emails to single or multiple recipients using Twilio SendGrid';
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
    }),
    attachment: flags.string({
      description: 'Path for the file that you want to attach'
    })
  },
  BaseCommand.flags
);
Send.args = [];
module.exports = Send;
