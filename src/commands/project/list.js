const chalk = require('chalk');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;

class ProjectList extends BaseCommand {
  async run() {
    await super.run();
    if (this.userConfig.projects.length > 0) {
      // If none of the projects have a region, delete it from all of them so it doesn't show up in the output.
      if (!this.userConfig.projects.some(p => p.region)) {
        this.userConfig.projects.forEach(p => delete p.region);
      }
      let activeProject = this.userConfig.projects[0];
      if (this.userConfig.activeProject) {
        const project = this.userConfig.getProjectById(this.userConfig.activeProject);
        if (project) {
          activeProject = project;
        }
      }
      activeProject.active = true;
      this.output(this.userConfig.projects);
    } else {
      this.logger.warn('No projects have been configured. Run ' + chalk.whiteBright('twilio project:add') + ' to add one!');
    }
  }
}

ProjectList.description = 'show what Twilio projects you have configured';
ProjectList.flags = BaseCommand.flags;

module.exports = ProjectList;
