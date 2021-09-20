/* eslint-disable import/no-extraneous-dependencies */
const { expect, test } = require('@oclif/test');
const { Command, flags } = require('@oclif/command');
const stripAnsi = require('strip-ansi');

const TwilioHelp = require('../../../src/services/twilio-help/custom-help');

class DummyCommand extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.id = 'api:core';
    this.docLink = 'https://twilio.com/docs/usage/api';
    this.description = 'This is a dummy description';
    this.args = [{ name: 'arg_1', description: 'argument description' }];
  }
}

const testHelp = test
  .loadConfig()
  .add('help', (ctx) => new TwilioHelp(ctx.config))
  .register('commandHelp', (args, isTopic = true, isCmd = false) => {
    return {
      async run(ctx) {
        const dummyHelpCommand = new DummyCommand(args, ctx.config);
        if (isCmd) {
          dummyHelpCommand.docLink = 'https://twilio.com/docs/dummyCmd';
        }
        if (!isTopic && !isCmd) {
          dummyHelpCommand.docLink = undefined;
          dummyHelpCommand.id = 'help';
        }
        const help = ctx.help.formatCommand(dummyHelpCommand);
        ctx.commandHelp = stripAnsi(help)
          .split('\n')
          .map((s) => s.trimRight())
          .join('\n');
      },
    };
  });

describe('should show help doc url correctly', () => {
  testHelp.commandHelp([]).it('Checks for a docLink for a topic', (ctx) => {
    expect(ctx.commandHelp).to.contain('api:core');
    expect(ctx.commandHelp).to.contain('MORE INFO');
    expect(ctx.commandHelp).to.contain('https://twilio.com/docs/usage/api');
  });
  testHelp
    .commandHelp([], false, false)
    .it('Checks when doc link is undefined, fetches default url from getDocLink method', (ctx) => {
      expect(ctx.commandHelp).to.contain('MORE INFO');
      expect(ctx.commandHelp).to.contain('https://twilio.com/docs');
    });
  testHelp.commandHelp([], false, true).it('Checks for the document link for a command', (ctx) => {
    expect(ctx.commandHelp).to.contain('api:core');
    expect(ctx.commandHelp).to.contain('MORE INFO');
    expect(ctx.commandHelp).to.contain('https://twilio.com/docs/dummyCmd');
  });
});
