const chalk = require('chalk');
const BaseCommand = require('../../base-commands/base-command');

class ProjectList extends BaseCommand {
  async run() {
    await super.run();
    if (this.userConfig.projects.length > 0) {
      this.output(this.userConfig.projects);
    } else {
      this.logger.warn('No projects have been configured. Run ' + chalk.whiteBright('twilio login') + ' to add one!');
    }
  }
}

ProjectList.description = 'Show what Twilio projects you have configured.';
ProjectList.flags = BaseCommand.flags;

module.exports = ProjectList;
