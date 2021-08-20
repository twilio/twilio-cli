/* eslint-disable import/no-extraneous-dependencies */
const { expect, test } = require('@oclif/test');
const { Command, flags } = require('@oclif/command');
const stripAnsi = require('strip-ansi');

const TwilioHelp = require('../../../src/services/twilio-help/custom-help');

class DummyCommand extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.id = 'api:testHelp';
    this.flags = {
      app: flags.string({ char: 'a', hidden: true }),
      force: flags.boolean({ description: 'force  it '.repeat(4), allowNo: true }),
      ss: flags.boolean({ description: 'newliney\n'.repeat(4) }),
      remote: flags.string({ char: 'r' }),
      def: flags.string({ char: 'd', default: 'default' }),
    };
    this.description = 'description of apps:create';
    this.aliases = ['app:init', 'create'];
    this.args = [{ name: 'app_name', description: 'app to use'.repeat(35) }];
  }
}

const testHelp = test
  .loadConfig()
  .add('help', (ctx) => new TwilioHelp(ctx.config))
  .register('commandHelp', (args, addReqFlag) => {
    return {
      async run(ctx) {
        const dummyHelpCommand = new DummyCommand(args, ctx.config);
        if (addReqFlag) {
          dummyHelpCommand.flags.foo = flags.string({ char: 'f', description: 'foobar'.repeat(15), required: true });
        }

        const help = ctx.help.formatCommand(dummyHelpCommand);
        ctx.commandHelp = stripAnsi(help)
          .split('\n')
          .map((s) => s.trimRight())
          .join('\n');
      },
    };
  });

describe('Should display required flags', () => {
  testHelp.commandHelp([], true).it('should log help', (ctx) => {
    expect(ctx.commandHelp).to.contain('api:testHelp');
    expect(ctx.commandHelp).to.contain('OPTIONS');
    expect(ctx.commandHelp).to.contain('REQUIRED FLAGS\n  -f, --foo=foo');
    expect(ctx.commandHelp).to.contain('OPTIONAL FLAGS');
    expect(ctx.commandHelp).to.contain('USAGE');
  });
});

describe('Should not display required flags if not configured', () => {
  testHelp.commandHelp([], false).it('should log help', (ctx) => {
    expect(ctx.commandHelp).to.contain('api:testHelp');
    expect(ctx.commandHelp).to.contain('OPTIONS');
    expect(ctx.commandHelp).to.not.contain('REQUIRED FLAGS');
    expect(ctx.commandHelp).to.contain('OPTIONAL FLAGS');
    expect(ctx.commandHelp).to.contain('USAGE');
  });
});
