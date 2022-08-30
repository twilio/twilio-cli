/* eslint-disable import/no-extraneous-dependencies */
const { CommandHelp } = require('@oclif/core');
// const list = require('@oclif/plugin-help/lib/list');
const chalk = require('chalk');
const indent = require('indent-string');
const stripAnsi = require('strip-ansi');
const { compact } = require('@oclif/core/lib/config/util');

const urlUtil = require('../hyperlink-utility');
const { getDocLink } = require('../twilio-api');

const { dim } = chalk;

class TwilioCommandHelp extends CommandHelp {
  flags(flags) {
    if (flags.length === 0) return '';
    return flags.map((flag) => {
      const left = this.flagHelpLabel(flag);
      let right = flag.summary || flag.description || '';
      if (flag.type === 'option' && flag.default) {
        right = `[default: ${flag.default}] ${right}`;
      }
      if (flag.required) right = `${right}`;
      if (flag.type === 'option' && flag.options && !flag.helpValue && !this.opts.showFlagOptionsInTitle) {
        right += `\n<options: ${flag.options.join('|')}>`;
      }
      return [left, dim(right.trim())];
    });
  }

  /**
   * Extended functionality from @oclif/core/plugin-help.
   * Link: https://github.com/oclif/core/blob/29f76feb04e067b084009946e54cd840da683932/src/help/command.ts#L75
   */
  sections() {
    return [
      {
        header: this.opts.usageHeader || 'USAGE',
        generate: () => this.usage(),
      },
      {
        header: 'ARGUMENTS',
        generate: ({ args }, header) => [{ header, body: this.args(args) }],
      },
      {
        header: 'FLAGS',
        generate: ({ flags }, header) => {
          const { mainFlags, flagGroups } = this.groupFlags(flags);
          const flagSections = [];
          const optionalFlags = flags.filter((f) => !f.required);
          const optionalBody = this.flags(optionalFlags);
          const requiredFlags = flags.filter((f) => f.required);
          const requiredBody = this.flags(requiredFlags);

          if (requiredFlags.length > 0) {
            flagSections.push({ header: chalk.bold('REQUIRED FLAGS'), body: requiredBody });
          }
          flagSections.push({ header: chalk.bold('OPTIONAL FLAGS'), body: optionalBody });

          for (const [name, flags1] of Object.entries(flagGroups)) {
            const body = this.flags(flags1);
            if (body) flagSections.push({ header: `${name.toUpperCase()} ${header}`, body });
          }
          return (0, compact)(flagSections);
        },
      },
      {
        header: 'DESCRIPTION',
        generate: () => this.description(),
      },
      {
        header: 'ALIASES',
        generate: ({ cmd }) => this.aliases(cmd.aliases),
      },
      {
        header: 'EXAMPLES',
        generate: ({ cmd }) => {
          const examples = cmd.examples || cmd.example;
          return this.examples(examples);
        },
      },
      {
        header: 'FLAG DESCRIPTIONS',
        generate: ({ flags }) => this.flagsDescriptions(flags),
      },
      {
        header: 'MORE INFO',
        generate: ({ docs }) => this.docs(),
      },
    ];
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
      listOfDetails.push(indent(helpDoc, 2));
    }
    return listOfDetails.join('\n');
  }
}

module.exports = TwilioCommandHelp;
