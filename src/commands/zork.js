const BaseCommand = require('../base-commands/base-command');

class Zork extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);
    this.exec = require('await-exec');
    this.findZork = () => require('zorkjs'); // eslint-disable-line node/no-extraneous-require
  }

  async run() {
    await super.run();

    let launchZork = null;
    try {
      launchZork = this.findZork();
    } catch (error) {
      // We'll need to load the zorkjs module
    }

    if (!launchZork) {
      this.logger.warn('Standby, loading the dungeon...');
      await this.exec('npm install --no-save zorkjs');

      try {
        launchZork = this.findZork();
      } catch (error) {
        // I guess it didn't work :(
      }
    }

    if (launchZork) {
      launchZork();
    } else {
      this.logger.error('I don\'t know the word "zork".');
      this.exit(1);
    }
  }
}

Zork.description = 'What could this be?';
Zork.flags = BaseCommand.flags;
Zork.hidden = true;

module.exports = Zork;
