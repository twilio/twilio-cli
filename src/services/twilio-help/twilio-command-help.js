/* eslint-disable import/no-extraneous-dependencies */
const CommandHelp = require('@oclif/plugin-help/lib/command.js');
const list = require('@oclif/plugin-help/lib/list');
const chalk = require('chalk');
const indent = require('indent-string');
const util = require('@oclif/plugin-help/lib/util');
const stripAnsi = require('strip-ansi');

const urlUtil = require('../hyperlink-utility');
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

  // To add the API help document url
  docs() {
    const listOfDetails = [];
    const helpDoc = this.command.docLink || getDocLink(this.command.id);
    if (!helpDoc) {
      return '';
    }
    const hyperLink = urlUtil.convertToHyperlink('MORE INFO', helpDoc);
    // if the terminal doesn't support hyperlink, mention complete url under More Info
    if (hyperLink.isSupported) {
      listOfDetails.push(chalk.bold(hyperLink.url));
    } else {
      listOfDetails.push(chalk.bold('MORE INFO'));
      listOfDetails.push(indent(helpDoc, 2));
    }
    return listOfDetails.join('\n');
  }

  // overriding to include docs()
  generate() {
    const cmd = this.command;
    const flags = util.sortBy(
      Object.entries(cmd.flags || {})
        .filter(([, v]) => !v.hidden)
        .map(([k, v]) => {
          v.name = k;
          return v;
        }),
      (f) => [!f.char, f.char, f.name],
    );
    const args = (cmd.args || []).filter((a) => !a.hidden);
    let output = util
      .compact([
        this.usage(flags),
        this.args(args),
        this.flags(flags),
        this.description(),
        this.aliases(cmd.aliases),
        this.examples(cmd.examples || cmd.example),
        this.docs(),
      ])
      .join('\n\n');
    if (this.opts.stripAnsi) output = stripAnsi(output);
    return output;
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
