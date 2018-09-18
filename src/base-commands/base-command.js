const inquirer = require('inquirer');
const { Command, flags } = require('@oclif/command');
const { Config, ConfigData } = require('../utility/config');
const { Logger, LoggingLevel } = require('../utility/logging');
const { OutputFormats } = require('../utility/output-formats');

class BaseCommand extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.configFile = new Config('');
    this.userConfig = new ConfigData();
  }

  async run() {
    const { flags } = this.parse(this.constructor);
    this.flags = flags;
    await this.loadConfig();

    this.logger = new Logger({
      level: LoggingLevel[flags.logLevel]
    });

    this.logger.debug('Config File: ' + this.configFile.filePath);

    this.inquirer = inquirer;

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
      limitedData = fullData.map(fullItem => {
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
    process.stdout.write(OutputFormats[this.flags.outputFormat](dataArray, limitedData || dataArray) + '\n');
  }
}

BaseCommand.flags = {
  logLevel: flags.enum({
    default: 'info',
    options: Object.keys(LoggingLevel),
    description: 'Level of logging messages.'
  }),

  outputFormat: flags.enum({
    default: 'columns',
    options: Object.keys(OutputFormats),
    description: 'Format of command output.'
  })
};

module.exports = BaseCommand;
