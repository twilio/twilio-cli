const BaseCommand = require('../base-commands/base-command');

class Zork extends BaseCommand {
  async run() {
    await super.run();

    let launchZork = null;
    try {
      launchZork = require('zorkjs');
    } catch (error) {
      // We'll need to load the zorkjs module
    }

    if (!launchZork) {
      this.logger.warn('Standby, loading the dungeon...');
      const exec = require('await-exec');
      await exec('npm install zorkjs');

      try {
        launchZork = require('zorkjs');
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
