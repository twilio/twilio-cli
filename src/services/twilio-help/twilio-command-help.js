/* eslint-disable import/no-extraneous-dependencies */
const CommandHelp = require('@oclif/plugin-help/lib/command.js');
const list = require('@oclif/plugin-help/lib/list');
const chalk = require('chalk');
const indent = require('indent-string');
const util = require('@oclif/plugin-help/lib/util');

const { getDocLink } = require('../twilio-api');
/**
 * Extended functionality from @oclif/plugin-help.
 * Link: https://github.com/oclif/plugin-help
 * author: onuzbee
 */
class TwilioCommandHelp extends CommandHelp.default {
  // Override parent functionality
  flags(flags) {
    if (flags.length === 0) return '';

    const optionalFlags = flags.filter((f) => !f.required);
    const optionalBody = this.generateFlagsOutput(optionalFlags);
    const requiredFlags = flags.filter((f) => f.required);
    const requiredBody = this.generateFlagsOutput(requiredFlags);

    const returnList = [chalk.bold('OPTIONS')];

    if (requiredFlags.length > 0) {
      returnList.push(chalk.bold('REQUIRED FLAGS'));
      returnList.push(indent(requiredBody, 2));
    }

    returnList.push(chalk.bold('OPTIONAL FLAGS'));
    returnList.push(indent(optionalBody, 2));
    return returnList.join('\n');
  }

  // overriding to include help document link
  examples(examples) {
    if ((examples === undefined || !examples || examples.length === 0) && this.command.docLink === '') return '';
    const listOfDetails = [];
    if (examples !== undefined && examples.length !== 0) {
      const body = util
        .castArray(examples)
        .map((a) => this.render(a))
        .join('\n');
      listOfDetails.push(chalk.bold(`EXAMPLE${examples.length > 1 ? 'S' : ''}`), indent(body, 2));
    }
    listOfDetails.join('\n\n');
    const helpDoc = this.command.docLink || this.getHelpDocForTopic(this.command.id);
    if (helpDoc !== undefined) {
      listOfDetails.push(chalk.bold('MORE INFO'));
      listOfDetails.push(indent(helpDoc, 2));
    }
    return listOfDetails.join('\n\n');
  }

  getHelpDocForTopic(key) {
    return getDocLink(key);
  }

  /**
   *   Forked and refactored from oclif default implementation.
   *   Link: https://github.com/oclif/plugin-help/blob/master/src/command.ts#L125-L154
   */
  generateFlagsOutput(flags) {
    return list.renderList(
      flags.map((flag) => {
        let left = flag.helpLabel;
        if (!left) {
          const label = [];
          if (flag.char) label.push(`-${flag.char[0]}`);
          if (flag.name) {
            if (flag.type === 'boolean' && flag.allowNo) {
              label.push(`--[no-]${flag.name.trim()}`);
            } else {
              label.push(`--${flag.name.trim()}`);
            }
          }
          left = label.join(', ');
        }
        if (flag.type === 'option') {
          let value = flag.helpValue || flag.name;
          if (!flag.helpValue && flag.options) {
            value = flag.options.join('|');
          }
          if (!value.includes('|')) value = chalk.underline(value);
          left += `=${value}`;
        }
        let right = flag.description || '';
        if (flag.type === 'option' && flag.default) {
          right = `[default: ${flag.default}] ${right}`;
        }
        return [left, chalk.dim(right.trim())];
      }),
      { stripAnsi: this.opts.stripAnsi, maxWidth: this.opts.maxWidth - 2 },
    );
  }
}

module.exports = TwilioCommandHelp;
