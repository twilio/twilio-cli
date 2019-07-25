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
      this.logger.error(
        'Make sure you have an environment variable called SENDGRID_API_KEY set up with your SendGrid API key. Visit https://app.sendgrid.com/settings/api_keys to get an API key.'
      );
      return this.exit(1);
    }

    const pipedInput = await this.readStream();
    if (pipedInput) {
      this.processData(pipedInput);
    }

    this.isTTY = process.stdin.isTTY || this.flags['force-tty'];

    await this.promptForFromEmail();
    await this.promptForToEmail();
    await this.promptForSubject();
    await this.promptForText();

    if (!this.isTTY && (!this.flags.to || !this.flags.text || !this.subjectLine || !this.fromEmail)) {
      this.logger.error('No terminal input available. Please provide --to, --from, --subject, and --text');
      return this.exit(1);
    }

    const validFromEmail = this.validateEmail(this.fromEmail);
    const validToEmail = this.validateEmail(this.toEmail);

    const sendInformation = {
      to: validToEmail,
      from: validFromEmail[0],
      subject: this.subjectLine,
      text: this.emailText,
      html: '<p>' + this.emailText + '</p>'
    };

    if (this.pipedInfo) {
      const attachment = this.createAttachmentArray(this.pipedInfo);
      sendInformation.attachments = attachment;
    } else {
      const attachmentVerdict = await this.askAttachment();
      await this.promptAttachment(attachmentVerdict);
      if (this.attachment) {
        const fileContent = this.readFile(this.attachment);
        const attachment = this.createAttachmentArray(fileContent);
        sendInformation.attachments = attachment;
      }
    }
    await this.sendEmail(sendInformation);
  }

  myGetStdin() {
    const { stdin } = process;
    let result = '';

    return new Promise(resolve => {
      if (stdin.isTTY) {
        resolve(result);
        return;
      }

      stdin.setEncoding('utf8');

      stdin.once('data', data => {
        resolve(data);
      });
    });
  }

  async readStream() {
    const input = await this.myGetStdin();
    const base64data = Buffer.from(input).toString('base64');
    return base64data;
  }

  processData(input) {
    this.fileName = 'piped.txt'; // placeholder filename for attachement
    this.pipedInfo = input;
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
      this.logger.error('Unable to read the file: ' + filePath);
      this.logger.debug(err);
      return this.exit(1);
    }
  }

  createAttachmentArray(fileContent) {
    return [
      {
        content: fileContent,
        type: 'plain/text',
        disposition: 'attachment',
        filename: this.fileName,
        contentId: 'attachmentText'
      }
    ];
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

  async promptForValue(key, flagKey, configKey) {
    if (configKey && this.userConfig.email[configKey]) {
      this[key] = this.userConfig.email[configKey];
    }

    if (this.flags[flagKey]) {
      this[key] = this.flags[flagKey];
    }

    if (this.isTTY && !this[key]) {
      const answer = await this.inquirer.prompt([
        {
          name: flagKey,
          message: Send.flags[flagKey].description + ':'
        }
      ]);
      this[key] = answer[flagKey];
    }
  }

  async promptForFromEmail() {
    return this.promptForValue('fromEmail', 'from', 'fromEmail');
  }

  async promptForToEmail() {
    return this.promptForValue('toEmail', 'to');
  }

  async promptForSubject() {
    return this.promptForValue('subjectLine', 'subject', 'subjectLine');
  }

  async promptForText() {
    return this.promptForValue('emailText', 'text');
  }

  async sendEmail(sendInformation) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(sendInformation);
    this.logger.info(
      'Your email containing the message "' +
        this.emailText +
        '" sent from ' +
        this.fromEmail +
        ' to ' +
        this.toEmail +
        ' with the subject line ' +
        this.subjectLine +
        ' has been sent!'
    );
    if (this.attachment) {
      this.logger.info('Your attachment from ' + this.attachment + ' path called ' + this.fileName + ' has been sent.');
    }
    if (this.pipedInfo) {
      this.logger.info('Your piped data attachment has been sent.');
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
    }),
    'force-tty': flags.boolean({
      default: false,
      hidden: true
    })
  },
  BaseCommand.flags
);
Send.args = [];
module.exports = Send;
