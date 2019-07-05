const { flags } = require('@oclif/command');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;

class set extends BaseCommand {
  async run() {
    await super.run();
    this.reminderCurrentData();
    await this.promptSetDefaultEmail();
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

  async promptSetDefaultEmail() {
    const answer = await this.inquirer.prompt([
      {
        name: 'from',
        message: set.flags['from-email'].description + ':'
      },
      {
        name: 'subject',
        message: set.flags['subject-line'].description + ':'
      }
    ]);
    const validEmail = answer.from.includes('@');
    if (validEmail === true) {
      this.userConfig.email.fromEmail = answer.from;
      this.userConfig.email.subjectLine = answer.subject;
      this.logger.info('Default sending email address has been set to: ' + this.userConfig.email.fromEmail);
      this.logger.info('Default subject line has been set to: ' + this.userConfig.email.subjectLine);
    } else {
      this.logger.error('Please use valid email.');
      this.exit(1);
    }
  }
}

set.description = 'sets a default sending email address and subject line';

set.flags = {
  'from-email': flags.string({
    description: 'Default email of the sender'
  }),
  'subject-line': flags.string({
    description: 'Default subject line for all emails'
  })
};

module.exports = set;
