const BaseCommand = require('../../base-commands/base-command');

class ProjectList extends BaseCommand {
  async run() {
    await super.run();
    this.output(this.userConfig.projects);
  }
}

ProjectList.description = 'Show what Twilio projects you have configured.';
ProjectList.flags = BaseCommand.flags;

module.exports = ProjectList;
