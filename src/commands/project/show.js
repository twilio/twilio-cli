const BaseCommand = require('../../base-commands/base-command');

class ProjectShow extends BaseCommand {
  async run() {
    await super.run();
    this.output(this.userConfig.projects);
  }
}

ProjectShow.description = 'Show what Twilio projects you have configured.';

module.exports = ProjectShow;
