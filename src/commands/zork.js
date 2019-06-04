const path = require('path');
const { BaseCommand } = require('@twilio/cli-core').baseCommands;
const Plugins = require('@oclif/plugin-plugins').default;

class Zork extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);
    const zorkPath = path.join(config.configDir, 'node_modules', 'zorkjs');

    // We don't have a direct dependency on the zorkjs module,
    // but eslint tries to make sure you don't reference packages
    // that aren't in your package.json. The comment below is how
    // you disable specific linter rules for a single line of code.

    // eslint-disable-next-line node/no-extraneous-require,node/no-missing-require
    this.findZork = () => require(zorkPath);
  }

  async run() {
    await super.run();

    try {
      this.runZork();
    } catch (error) {
      this.logger.warn('Standby, loading the dungeon...');

      try {
        this.plugins = this.plugins || new Plugins(this.config);
        await this.plugins.install('zorkjs', { tag: 'latest', force: false });
        this.runZork();
      } catch (error) {
        this.logger.debug(JSON.stringify(error));
        this.logger.error('I don\'t know the word "zork".');
        this.exit(1);
      }
    }
  }

  runZork() {
    const launchZork = this.findZork();
    launchZork();
  }
}

Zork.description = 'what could this be?';
Zork.flags = BaseCommand.flags;
Zork.hidden = true;

module.exports = Zork;
