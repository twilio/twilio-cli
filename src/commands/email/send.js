const { Flags: flags } = require('@oclif/core');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const sgMail = require('@sendgrid/mail');
const FileType = require('file-type');

const emailUtilities = require('../../services/email-utility');
const { readFileOrStdIn, readFile } = require('../../services/file-io');

const DEFAULT_ENCODING = 'base64';
const FLAGS = {
  attachment: 'attachment',
  noAttachment: 'no-attachment',
};

class Send extends BaseCommand {
  async run() {
    await super.run();

    if (!process.env.SENDGRID_API_KEY) {
      throw new TwilioCliError(
        'Make sure you have the environment variable SENDGRID_API_KEY set up with your Twilio SendGrid API key. ' +
          'Visit https://app.sendgrid.com/settings/api_keys to get an API key.',
      );
    }

    await this.promptForFromEmail();
    await this.promptForToEmail();
    await this.promptForSubject();
    await this.promptForText();

    if (!process.stdin.isTTY && (!this.flags.to || !this.flags.text || !this.subjectLine || !this.fromEmail)) {
      throw new TwilioCliError('No terminal input available. Please provide --to, --from, --subject, and --text');
    }

    const validFromEmail = this.validateEmail(this.fromEmail);
    const validToEmail = this.validateEmail(this.toEmail);

    const sendInformation = {
      to: validToEmail,
      from: validFromEmail[0],
      subject: this.subjectLine,
      text: this.emailText,
      html: `<p>${this.emailText}</p>`,
    };

    if (!this.flags[FLAGS.noAttachment]) {
      const fileInfo = await readFileOrStdIn(this.flags[FLAGS.attachment], DEFAULT_ENCODING);

      if (fileInfo) {
        sendInformation.attachments = await this.createAttachmentArray(fileInfo);
      } else {
        const attachmentVerdict = await this.askAttachment();
        const attachment = await this.promptAttachment(attachmentVerdict);

        if (attachment) {
          sendInformation.attachments = await this.createAttachmentArray(readFile(attachment, DEFAULT_ENCODING));
        }
      }
    }

    await this.sendEmail(sendInformation);
  }

  async askAttachment() {
    const verdict = await this.inquirer.prompt([
      {
        type: 'confirm',
        name: 'sendAttachment',
        message: 'Would you like to send an attachment?',
        default: false,
      },
    ]);
    return verdict.sendAttachment;
  }

  async promptAttachment(verdict) {
    if (verdict === true) {
      const file = await this.inquirer.prompt([
        {
          name: 'path',
          message: this.getPromptMessage(Send.flags.attachment.description),
        },
      ]);
      return file.path;
    }

    return undefined;
  }

  async createAttachmentArray(fileInfo) {
    // readFile and readFileOrStdIn return a base64 encoded string
    const type = await FileType.fromBuffer(Buffer.from(fileInfo.content, DEFAULT_ENCODING));

    return [
      {
        content: fileInfo.content,
        filename: fileInfo.filename,
        type: (type && type.mime) || 'text/plain',
        disposition: 'attachment',
        contentId: 'attachmentText',
      },
    ];
  }

  validateEmail(email) {
    let emailList;
    let validEmail = true;

    if (email.includes(',')) {
      emailList = email.split(',').map((item) => item.trim());
    } else {
      emailList = [email];
    }

    emailList.forEach((emailAddress) => {
      if (!emailUtilities.validateEmail(emailAddress)) {
        this.logger.error(`"${emailAddress}" is not a valid email.`);
        validEmail = false;
      }
    });

    if (!validEmail) {
      throw new TwilioCliError('Email could not be sent, please re-run the command with valid email addresses.');
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

    if (process.stdin.isTTY && !this[key]) {
      const answer = await this.inquirer.prompt([
        {
          name: flagKey,
          message: this.getPromptMessage(Send.flags[flagKey].description),
        },
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

    const messageParts = [
      `Your email containing the message "${sendInformation.text}"`,
      `sent from "${sendInformation.from}" to "${sendInformation.to}"`,
      `with the subject line "${sendInformation.subject}"`,
    ];
    if (sendInformation.attachments) {
      messageParts.push(`with a "${sendInformation.attachments[0].type}"`);
      messageParts.push(`"attachment "${sendInformation.attachments[0].filename}"`);
    }
    messageParts.push('has been sent!');

    this.logger.info(messageParts.join(' '));
  }
}

Send.description = 'sends emails to single or multiple recipients using Twilio SendGrid';
Send.flags = {
  to: flags.string({
    description: 'Email address of recipient (for multiple email addresses separate each email with a comma).',
  }),
  from: flags.string({
    description: 'Email address of the sender.',
  }),
  subject: flags.string({
    description: 'The subject line for an email.',
  }),
  text: flags.string({
    description: 'Text to send within the email body.',
  }),
  [FLAGS.attachment]: flags.string({
    description: 'Path for the file that you want to attach.',
    exclusive: [FLAGS.noAttachment],
  }),
  [FLAGS.noAttachment]: flags.boolean({
    description: 'Do not include or prompt for an attachment.',
    default: false,
    exclusive: [FLAGS.attachment],
  }),
  ...BaseCommand.flags,
};
Send.args = [];

module.exports = Send;
