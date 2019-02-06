const chalk = require('chalk');

const LoggingLevel = {
  debug: -1,
  info: 0,
  warn: 1,
  error: 2,
  none: 10
};

const LoggingLevelStyle = {
  [LoggingLevel.debug]: msg => chalk.gray('[DEBUG] ' + msg),
  [LoggingLevel.info]: msg => chalk.white(msg),
  [LoggingLevel.warn]: msg => ' ' + chalk.yellowBright('»') + ' ' + chalk.white(msg),
  [LoggingLevel.error]: msg => ' ' + chalk.red('»') + ' ' + chalk.whiteBright(msg)
};

class Logger {
  constructor(config) {
    this.config = config;
  }

  debug(msg) {
    this.log(msg, LoggingLevel.debug);
  }

  info(msg) {
    this.log(msg, LoggingLevel.info);
  }

  warn(msg) {
    this.log(msg, LoggingLevel.warn);
  }

  error(msg) {
    this.log(msg, LoggingLevel.error);
  }

  log(msg, level) {
    level = level || LoggingLevel.info;

    if (level >= this.config.level) {
      const message = typeof msg === 'string' ? msg : JSON.stringify(msg);
      process.stderr.write(LoggingLevelStyle[level](message) + '\n');
    }
  }
}

module.exports = {
  Logger,
  LoggingLevel
};
