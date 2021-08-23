/* eslint-disable import/no-extraneous-dependencies */
const CommandHelp = require('@oclif/plugin-help/lib/command.js');
const list = require('@oclif/plugin-help/lib/list');
const chalk = require('chalk');
const indent = require('indent-string');

/**
 * Extended functionality from @oclif/plugin-help.
 * Link: https://github.com/oclif/plugin-help/blob/master/src/command.ts
 * author: abadhwar
 */
class TwilioCommandHelp extends CommandHelp.default {
  // Override parent flags() functionality
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

  /**
   *   Forked from oclif default implementation and indentation.
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
