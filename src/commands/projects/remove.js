const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;

class ProjectsRemove extends TwilioClientCommand {
  async runCommand() {
    this.projectId = this.args.project;
    this.projectDelete = this.userConfig.getProjectById(this.projectId);

    this.removeProjectStatus(this.projectDelete, this.projectId);
    const verdict = await this.confirmRemoveProject();
    if (verdict === true) {
      const keyVerdict = await this.confirmRemoveKey();
      const apiKey = await this.deleteLocalKey(this.projectDelete);
      await this.deleteRemoteKey(this.projectDelete, keyVerdict, apiKey);
    }
    this.callRemoveProject(this.projectDelete, verdict);
    const configSavedMessage = await this.configFile.save(this.userConfig);
    this.logger.info(configSavedMessage);
  }

  removeProjectStatus(deleteProject, projectId) {
    const activated = this.userConfig.getActiveProject();
    if (!deleteProject) {
      throw new TwilioCliError('The project "' + projectId + '" does not exist. Run "twilio projects:list" to see the list of configured projects.');
    }
    if (activated.id === deleteProject.id) {
      this.logger.warn('Removing the active project. Run "twilio projects:use" to set another project as active.');
    }
    if (this.userConfig.projects.length === 1) {
      this.logger.warn('Removing last project. Run "twilio projects:add" to add another project.');
    }
  }

  callRemoveProject(deleteProject, verdict) {
    if (verdict === true) {
      this.userConfig.removeProject(deleteProject);
      this.logger.info('Deleted ' + deleteProject.id + ' project.');
    }
    if (verdict === false) {
      throw new TwilioCliError('Cancelled');
    }
  }

  async deleteLocalKey(projectDelete) {
    const apiKey = this.secureStorage.getCredentials(projectDelete.id);
    const removed = await this.secureStorage.removeCredentials(projectDelete.id);
    if (removed === true) {
      this.logger.info('Deleted local key.');
    } else {
      this.logger.warn('Could not delete local key.');
    }
    return apiKey;
  }

  async deleteRemoteKey(projectDelete, keyVerdict, apiKey) {
    if (keyVerdict === true) {
      try {
        await this.twilioClient.api.keys(apiKey.apiKey).remove();
        this.logger.info('The key has been deleted from twilio console.');
      } catch (err) {
        this.logger.error('Could not delete the API Key. See: https://www.twilio.com/console/runtime/api-keys to delete the API key from the console.');
        this.logger.error(err.message);
        // throw new TwilioCliError(err);
      }
    }
    if (keyVerdict === false) {
      this.logger.warn(' The key for ' + projectDelete.id + ' project still exists in the Twilio Console.');
    }
  }

  async confirmRemoveProject() {
    const confirm = await this.inquirer.prompt([{
      type: 'confirm',
      name: 'affirmative',
      message: 'Are you sure you want to remove ' +
        `the "${this.projectId}" project? `,
      default: false
    }]);
    return confirm.affirmative;
  }

  async confirmRemoveKey() {
    const confirm = await this.inquirer.prompt([{
      type: 'confirm',
      name: 'affirmative',
      message: 'Are you sure you want to delete ' +
        `the "${this.projectId}" project's remote key?`,
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
