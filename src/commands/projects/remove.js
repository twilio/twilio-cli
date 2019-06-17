const { BaseCommand } = require('@twilio/cli-core').baseCommands;

class ProjectsRemove extends BaseCommand {
  async run() {
    await super.run();
    this.projectId = this.args.project;
    this.removeProjectStatus(this.projectId);
    const verdict = await this.confirmRemoveProject();
    this.callRemoveProject(this.projectId, verdict);
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info(configSavedMessage);
  }

  removeProjectStatus(projectId) {
    const deleteProject = this.userConfig.getProjectById(projectId);
    const activated = this.userConfig.getActiveProject();
    if (!deleteProject) {
      this.logger.error('The project "' + this.args.project + '" does not exist. Run "twilio projects:list" to see the list of configured projects.');
      this.exit(1);
    }
    if (activated.id === projectId) {
      this.logger.warn('Removing the active project. Run "twilio projects:use" to set another project as active.');
    }
    if (this.userConfig.projects.length === 1) {
      this.logger.warn('Removing last project. Run "twilio projects:add" to add another project.');
    }
  }

  callRemoveProject(projectId, verdict) {
    const deleteProject = this.userConfig.getProjectById(projectId);

    if (verdict === true) {
      this.userConfig.removeProject(deleteProject);
      this.logger.info('Deleted ' + projectId + '. The key still exists in the Twilio Platform.');
    }
    if (verdict === false) {
      this.logger.warn('Cancelled');
      this.exit(1);
    }
  }

  async confirmRemoveProject() {
    let affirmative = true;
    const confirm = await this.inquirer.prompt([{
      type: 'confirm',
      name: 'affirmative',
      message: 'Are you sure you want to remove ' +
                `the "${this.projectId}" project `,
      default: false
    }]);
    affirmative = confirm.affirmative;
    return affirmative;
  }
}

ProjectsRemove.description = 'select which Twilio project to remove';
ProjectsRemove.args = [
  {
    name: 'project',
    description: 'Shorthand identifier for your Twilio project',
    required: true
  }
];
ProjectsRemove.flags = BaseCommand.flags;

module.exports = ProjectsRemove;
