const { flags } = require('@oclif/command');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');
const os = require('os');

class send extends BaseCommand {
  async run() {
    await super.run();
    this.loadArguments();
    if (!process.env.SENDGRID_API_KEY) {
      this.logger.error('Make sure you have an environmental variable called SENDGRID_API_KEY set up with your SendGrid API key. Visit https://app.sendgrid.com/settings/api_keys to get an API key.');
      return this.exit(1);
    }
    console.log(os.homedir());
    this.fromEmail = await this.promptForFromEmail();
    const validFromEmail = this.validateEmail(this.fromEmail);
    const stringFromEmail = validFromEmail.toString();
    await this.promptForToEmail();
    const validToEmail = this.validateEmail(this.toEmail);
    this.subjectLine = await this.promptForSubject();
    await this.promptForText();
    const sendInfomation = { to: validToEmail, from: stringFromEmail, subject: this.subjectLine, text: this.emailText, html: '<p>' + this.emailText + '</p>' };
    const attachmentVerdict = await this.askAttachment();
    await this.promptAttachment(attachmentVerdict);
    if (this.attachment) {
      await this.promptFileName();
      const fileContent = this.readFile(this.attachment);
      const attachment = this.createAttachmentArray(fileContent);
      sendInfomation.attachments = attachment;
    }
    await this.sendEmail(sendInfomation);
  }

  loadArguments() {
    this.toEmail = this.flags.toEmail;
    this.fromEmail = this.flags.fromEmail;
    this.subjectLine = this.flags.subjectLine;
    this.emailText = this.flags.emailText;
    this.attachment = this.flags.attachment;
    this.fileName = this.flags.attachmentName;
  }

  async askAttachment() {
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
          message: send.flags.attachment.description + ':'
        }
      ]);
      this.attachment = file.path;
    }
  }

  async promptFileName() {
    if (!this.fileName) {
      const file = await this.inquirer.prompt([
        {
          name: 'name',
          message: send.flags.attachmentName.description + ':'
        }
      ]);
      this.fileName = file.name;
    }
  }

  readFile(FilePath) {
    if (FilePath.includes(os.homedir()) === false) {
      this.attachment = path.resolve(FilePath);
    }
    try {
      const files = fs.readFileSync(FilePath);
      const coded = Buffer.from(files).toString('base64');
      return coded;
    } catch (err) {
      this.logger.error(err);
      return this.exit(1);
    }
  }

  createAttachmentArray(fileContent) {
    const attachments = [];
    const attachment = {
      content: fileContent,
      type: 'plain/text',
      disposition: 'attachment',
      filename: this.fileName,
      contentId: 'attachmentText'
    };
    attachments[0] = attachment;
    return attachments;
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
      const emailVerdict = emailAddress.includes('@');
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

  async sendEmail(sendInfomation) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(sendInfomation);
    this.logger.info('Your email containing the message "' + this.emailText + '" sent from ' + this.fromEmail + ' to ' + this.toEmail + ' with the subject line ' + this.subjectLine + ' has been sent!');
    if (this.attachment) {
      this.logger.info('Your attachment from ' + this.attachment + ' path called ' + this.fileName + ' has been sent.');
    }
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
    }),
    attachment: flags.string({
      description: 'Path for the file that you want to attach'
    }),
    attachmentName: flags.string({
      description: 'Name of the file you want to send'
    })
  },
  BaseCommand.flags
);
send.args = [];
module.exports = send;
