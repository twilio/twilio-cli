const { Flags: flags } = require('@oclif/core');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;

const emailUtilities = require('../../services/email-utility');

class Set extends BaseCommand {
  async run() {
    await super.run();
    this.reminderCurrentData();
    const email = await this.promptSetDefaultEmail();
    const subject = await this.promptSetDefaultSubject();
    const verdict = emailUtilities.validateEmail(email);
    if (verdict === false) {
      throw new TwilioCliError('Please use a valid email.');
    }
    this.setDefaults(email, subject);
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info(configSavedMessage);
  }

  reminderCurrentData() {
    if (this.userConfig.email.fromEmail) {
      this.logger.info(`Current default sending email: ${this.userConfig.email.fromEmail}`);
    }
    if (this.userConfig.email.subjectLine) {
      this.logger.info(`Current default subject line: ${this.userConfig.email.subjectLine}`);
    }
  }

  setDefaults(email, subject) {
    this.userConfig.email.fromEmail = email;
    this.userConfig.email.subjectLine = subject;
    this.logger.info(`Default sending email address has been set to: ${this.userConfig.email.fromEmail}`);
    this.logger.info(`Default subject line has been set to: ${this.userConfig.email.subjectLine}`);
  }

  async promptSetDefaultEmail() {
    if (!this.flags.from) {
      const answer = await this.inquirer.prompt([
        {
          name: 'from',
          message: `${Set.flags.from.description}:`,
          default: this.userConfig.email.fromEmail,
        },
      ]);
      return answer.from;
    }
    return this.flags.from;
  }

  async promptSetDefaultSubject() {
    if (!this.flags.subject) {
      const answer = await this.inquirer.prompt([
        {
          name: 'subject',
          message: `${Set.flags.subject.description}:`,
          default: this.userConfig.email.subjectLine,
        },
      ]);
      return answer.subject;
    }
    return this.flags.subject;
  }
}

Set.description = 'sets a default sending email address and subject line';

Set.flags = {
  from: flags.string({
    description: 'Default email address of the sender',
  }),
  subject: flags.string({
    description: 'Default subject line for all emails',
  }),
};

module.exports = Set;
