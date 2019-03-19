const { BaseCommand } = require('@twilio/cli-core').baseCommands;

class Zork extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);
    this.exec = require('../services/await-exec');

    // We don't have a direct dependency on the zorkjs module,
    // but eslint tries to make sure you don't reference packages
    // that aren't in your package.json. The comment below is how
    // you disable specific linter rules for a single line of code.

    // eslint-disable-next-line node/no-extraneous-require,node/no-missing-require
    this.findZork = () => require('zorkjs');
  }

  async run() {
    await super.run();

    try {
      this.runZork();
    } catch (error) {
      this.logger.warn('Standby, loading the dungeon...');

      try {
        await this.exec('npm install --no-save zorkjs');
        this.runZork();
      } catch (error) {
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

Zork.description = 'What could this be?';
Zork.flags = BaseCommand.flags;
Zork.hidden = true;

module.exports = Zork;
