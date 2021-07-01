const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const { cli } = require('cli-ux');

class ProfilesPort extends BaseCommand {
  async run() {
    await super.run();

    const query = await this.inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message:
          `This command will port profile(s) from keytar` +
          ` to config file at location ${this.configFile.filePath}. Continue?`,
      },
    ]);

    if (!query.confirmation) {
      this.logger.warn('Abort!');
      return;
    }

    const { projects } = this.userConfig;

    if (this.args.profile) {
      const sanitizedProfile = this.args.profile.trim();
      const project = this.userConfig.projects.filter((p) => p.id === sanitizedProfile);

      if (project.length === 0) {
        this.logger.error(
          `Unable to port profile ${sanitizedProfile} since it doesn't exist or has already been ported!`,
        );
        return;
      }

      await this.portProfile(project[0]);
    } else {
      if (projects.length === 0) {
        this.logger.info('All profiles already ported to config file!');
        return;
      }

      for (const project of projects) {
        await this.portProfile(project);
      }

      this.logger.info('Profiles port process complete!');
    }
  }

  async portProfile(project) {
    cli.action.start(`Porting ${project.id}`);

    const creds = await this.secureStorage.getCredentials(project.id);
    if (creds.apiKey === 'error') {
      cli.action.stop('Failed: Unable to retrieve credentials from Keytar.');
      return;
    }

    // Also removes from `projects` along with adding to `profiles`
    this.userConfig.addProfile(project.id, project.accountSid, project.region, creds.apiKey, creds.apiSecret);
    await this.configFile.save(this.userConfig);
    const removed = await this.secureStorage.removeCredentials(project.id);
    if (!removed) {
      this.logger.warn(`Unable to clean-up credentials from keytar for profile ${project.id}`);
      // But still mark the action as Done!
    }

    cli.action.stop('Done!');
  }
}

ProfilesPort.description = 'Port profiles from KeyTar to config file.';
ProfilesPort.args = [
  {
    name: 'profile',
    description: 'Profile to be ported',
  },
];
ProfilesPort.flags = BaseCommand.flags;

module.exports = ProfilesPort;
