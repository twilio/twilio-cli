const { BaseCommand } = require('@twilio/cli-core').baseCommands;

class ProjectsUse extends BaseCommand {
  async run() {
    await super.run();

    const project = this.userConfig.getProjectById(this.args.project);
    if (!project) {
      this.logger.error('The project "' + this.args.project + '" does not exist. Run "twilio projects:list" to see the list of configured projects.');
      this.exit(1);
    }
    this.userConfig.activeProject = this.args.project;
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info('set ' + this.args.project + ' as active project');
    this.logger.info(configSavedMessage);
  }
}
ProjectsUse.description = 'select which project to use';

ProjectsUse.args = [
  {
    name: 'project',
    description: 'Shorthand identifier for your Twilio project',
    required: true
  }
];
ProjectsUse.flags = BaseCommand.flags;

module.exports = ProjectsUse;
