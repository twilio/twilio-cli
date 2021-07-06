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
          `This command will port API keys from keytar` +
          ` to config file at location ${this.configFile.filePath}. Continue?`,
        default: false,
      },
    ]);

    if (!query.confirmation) {
      this.logger.warn('Abort!');
      return;
    }

    const { projects } = this.userConfig;

    if (this.args.profile) {
      const sanitizedProfileId = this.args.profile.trim();
      const project = projects.find((p) => p.id === sanitizedProfileId);

      if (!project) {
        this.logger.error(
          `Unable to port keys for profile ${sanitizedProfileId} since it doesn't exist or has already been ported!`,
        );
        return;
      }

      await this.portProfile(project);
    } else {
      if (projects.length === 0) {
        this.logger.info('No profiles have keys in keytar. Nothing to do.');
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
      cli.action.stop('Failed: Unable to retrieve credentials from keytar.');
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

ProfilesPort.description =
  'Port API keys from keytar to config file. This command ports ALL keys by default,' +
  ' although to only port a specific key append the profile-id as additional argument.';
ProfilesPort.args = [
  {
    name: 'profile',
    description: 'Profile-id for porting keys standalone',
  },
];
ProfilesPort.flags = BaseCommand.flags;

module.exports = ProfilesPort;
