const inquirer = require('inquirer');
const { Command, flags } = require('@oclif/command');
const { Config, ConfigData } = require('../services/config');
const { Logger, LoggingLevel } = require('../services/logging');
const { OutputFormats } = require('../services/output-formats');
const { SecureStorage } = require('../services/secure-storage');

class BaseCommand extends Command {
  constructor(argv, config, secureStorage) {
    super(argv, config);
    this.configFile = new Config('');
    this.userConfig = new ConfigData();
    this.inquirer = inquirer;
    this.secureStorage = secureStorage || new SecureStorage();
  }

  async run() {
    const { args, flags } = this.parse(this.constructor);
    this.args = args;
    this.flags = flags;
    await this.loadConfig();

    this.logger = new Logger({
      level: LoggingLevel[flags['log-level']]
    });

    this.logger.debug('Config File: ' + this.configFile.filePath);

    // Replace oclif's output commands
    this.log = this.logger.info;
    this.error = this.logger.error;
    this.warn = this.logger.warn;
  }

  async loadConfig() {
    this.configFile = new Config(this.config.configDir);
    this.userConfig = await this.configFile.load();
  }

  output(fullData, properties) {
    const dataArray = fullData.constructor === Array ? fullData : [fullData];
    const invalidPropertyNames = new Set();
    let limitedData = null;
    if (properties) {
      const propNames = properties.split(',').map(p => p.trim());
      limitedData = dataArray.map(fullItem => {
        const limitedItem = {};
        propNames.forEach(p => {
          if (fullItem[p] === undefined) {
            invalidPropertyNames.add(p);
          } else {
            limitedItem[p] = fullItem[p];
          }
        });
        return limitedItem;
      });

      if (invalidPropertyNames.size > 0) {
        const warn = this.logger.warn.bind(this.logger);
        invalidPropertyNames.forEach(p => {
          warn(`"${p}" is not a valid property name.`);
        });
      }
    }
    const processOutput = OutputFormats[this.flags['output-format']];
    process.stdout.write(processOutput(dataArray, limitedData || dataArray) + '\n');
  }
}

BaseCommand.flags = {
  'log-level': flags.enum({
    char: 'l',
    default: 'info',
    options: Object.keys(LoggingLevel),
    description: 'Level of logging messages'
  }),

  'output-format': flags.enum({
    char: 'o',
    default: 'columns',
    options: Object.keys(OutputFormats),
    description: 'Format of command output'
  })
};

module.exports = BaseCommand;
