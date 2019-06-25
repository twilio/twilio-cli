const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;

class ProjectsRemove extends TwilioClientCommand {
  async runCommand() {
    const deleteProject = this.userConfig.getProjectById(this.args.project);
    this.removeProjectStatus(deleteProject, this.args.project);
    const verdict = await this.confirmRemoveProject();
    if (verdict === true) {
      const keyVerdict = await this.confirmRemoveKey();
      const credentials = await this.deleteLocalKey(deleteProject);
      await this.deleteRemoteKey(deleteProject, keyVerdict, credentials);
      this.logger.info('Deleted ' + deleteProject.id + ' project.');
      this.userConfig.removeProject(deleteProject);
    } else {
      throw new TwilioCliError('Cancelled');
    }
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info(configSavedMessage);
  }

  removeProjectStatus(deleteProject, projectId) {
    const activeProject = this.userConfig.getActiveProject();
    if (!deleteProject) {
      throw new TwilioCliError('The project "' + projectId + '" does not exist. Run "twilio projects:list" to see the list of configured projects.');
    }
    if (activeProject.id === deleteProject.id) {
      this.logger.warn('Are you sure you want to remove the active project? Run "twilio projects:use" to set another project as active.');
    }
    if (this.userConfig.projects.length === 1) {
      this.logger.warn('Are you sure you want to remove the last project? Run "twilio projects:add" to add another project.');
    }
  }

  async deleteLocalKey(projectDelete) {
    const credentials = this.secureStorage.getCredentials(projectDelete.id);
    const removed = await this.secureStorage.removeCredentials(projectDelete.id);
    if (removed === true) {
      this.logger.info('Deleted local key.');
    } else {
      this.logger.warn('Could not delete local key.');
    }
    return credentials;
  }

  async deleteRemoteKey(projectDelete, keyVerdict, credentials) {
    if (keyVerdict === true) {
      try {
        await this.twilioClient.api.keys(credentials.apiKey).remove();
        this.logger.info('The API Key has been deleted from The Twilio console.');
      } catch (err) {
        this.logger.error('Could not delete the API Key. See: https://www.twilio.com/console/runtime/api-keys to delete the API key from The Twilio Console.');
        this.logger.debug(err.message);
      }
    }
    if (keyVerdict === false) {
      this.logger.warn('The API Key for ' + projectDelete.id + ' project still exists in The Twilio console.');
    }
  }

  async confirmRemoveProject() {
    const confirm = await this.inquirer.prompt([{
      type: 'confirm',
      name: 'affirmative',
      message: 'Are you sure you want to remove ' +
        `the "${this.args.project}" project?`,
      default: false
    }]);
    return confirm.affirmative;
  }

  async confirmRemoveKey() {
    const confirm = await this.inquirer.prompt([{
      type: 'confirm',
      name: 'affirmative',
      message: 'Would you like to attempt to delete the API Key?',
      default: false
    }]);
    return confirm.affirmative;
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
ProjectsRemove.flags = TwilioClientCommand.flags;

module.exports = ProjectsRemove;
