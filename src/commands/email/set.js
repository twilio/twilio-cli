const { flags } = require('@oclif/command');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;

class set extends BaseCommand {
  async run() {
    await super.run();
    this.reminderCurrentData();
    const email = await this.promptSetDefaultEmail();
    const subject = await this.promptSetDefaultSubject();
    this.validateEmail(email);
    this.setDefaults(email, subject);
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info(configSavedMessage);
  }

  reminderCurrentData() {
    if (this.userConfig.email.fromEmail) {
      this.logger.info('Current default sending email: ' + this.userConfig.email.fromEmail);
    }
    if (this.userConfig.email.subjectLine) {
      this.logger.info('Current default subject line: ' + this.userConfig.email.subjectLine);
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const verdict = re.test(String(email).toLowerCase());
    if (verdict === false) {
      this.logger.error('Please use a valid email.');
      this.exit(1);
    }
  }

  setDefaults(email, subject) {
    this.userConfig.email.fromEmail = email;
    this.userConfig.email.subjectLine = subject;
    this.logger.info('Default sending email address has been set to: ' + this.userConfig.email.fromEmail);
    this.logger.info('Default subject line has been set to: ' + this.userConfig.email.subjectLine);
  }

  async promptSetDefaultEmail() {
    if (!this.flags.from) {
      const answer = await this.inquirer.prompt([
        {
          name: 'from',
          message: set.flags.from.description + ':',
          default: this.userConfig.email.fromEmail
        }
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
          message: set.flags.subject.description + ':',
          default: this.userConfig.email.subjectLine
        }
      ]);
      return answer.subject;
    }
    return this.flags.subject;
  }
}

set.description = 'sets a default sending email address and subject line';

set.flags = {
  from: flags.string({
    description: 'Default email address of the sender'
  }),
  subject: flags.string({
    description: 'Default subject line for all emails'
  })
};

module.exports = set;
