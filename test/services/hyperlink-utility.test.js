/* eslint-disable import/no-extraneous-dependencies */
const { expect, test } = require('@twilio/cli-test');
const { Command } = require('@oclif/command');
const flush = require('flush-cache');

const ORIG_ENV = { ...process.env };
const { supportsHyperlink, convertToHyperlink } = require('../../src/services/hyperlink-utility');
const TwilioHelp = require('../../src/services/twilio-help/custom-help');

class TestCommand extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.id = 'api:core';
    this.description = 'This is a dummy description';
    this.args = [{ name: 'arg_1', description: 'argument description' }];
  }
}
const testThisConfig = ({ platform, env, argv, stream }) => {
  platform = platform || 'darwin';
  env = env || {};
  argv = argv || [];
  // back up the original env
  const oldPlatform = process.platform;
  const oldEnv = process.env;
  const oldArgv = process.argv;

  // Inject new env properties from args
  Object.defineProperties(process, {
    platform: { value: platform },
    env: { value: env },
    argv: { value: [process.argv[0], ...argv] },
  });
  const result = supportsHyperlink(stream);
  // restore the original env
  Object.defineProperties(process, {
    platform: { value: oldPlatform },
    env: { value: oldEnv },
    argv: { value: oldArgv },
  });
  return result;
};

const testLink = test
  .loadConfig()
  .add('help', (ctx) => new TwilioHelp(ctx.config))
  .register('cmdTestLink', (args) => {
    return {
      async run(ctx) {
        const dummyHelpCommand = new TestCommand(args, ctx.config);
        dummyHelpCommand.docLink = 'https://twilio.com/docs/dummyCmd';
        const help = ctx.help.formatCommand(dummyHelpCommand);
        ctx.cmdTestLink = help
          .split('\n')
          .map((s) => s.trimRight())
          .join('\n');
      },
    };
  });

describe('supportsHyperlink', () => {
  describe('test hyperlink generation', () => {
    describe('test for Mac terminals', () => {
      afterEach(() => {
        flush();
      });
      test.it('not supported in Mac Terminal', () => {
        expect(
          testThisConfig({
            env: {
              TERM_PROGRAM: '',
            },
            stream: {
              isTTY: false,
            },
          }),
        ).to.be.false;
      });
    });

    describe('test for iTerm terminals', () => {
      beforeEach(flush);
      afterEach(() => {
        process.env = ORIG_ENV;
      });
      test.it('testing convertToHyperlink, supported iTerm.app 3.1, tty stream', (done) => {
        const result = testThisConfig({
          argv: ['--hyperlink=true'],
          env: {
            TERM_PROGRAM: 'iTerm.app',
            TERM_PROGRAM_VERSION: '3.1.0',
          },
        });
        expect(result).to.be.true;
        expect(convertToHyperlink('MORE INFO', 'https://twilio.com/docs/dummyCmd').isSupported).to.be.true;
      });
      test.it('supported in iTerm.app 3.1, tty stream', () => {
        const result = testThisConfig({
          env: {
            FORCE_HYPERLINK: '1',
            TERM_PROGRAM: 'iTerm.app',
            TERM_PROGRAM_VERSION: '3.1.0',
          },
          stream: {
            isTTY: true,
          },
        });
        expect(result).to.be.true;
      });
    });

    describe('test for Windows', () => {
      afterEach(() => {
        flush();
      });
      test.it('supported in Windows Terminal', () => {
        expect(
          testThisConfig({
            env: {
              WT_SESSION: '',
            },
            stream: {
              isTTY: false,
            },
          }),
        ).to.be.true;
      });
    });
  });
});

describe('convertToHyperlink', () => {
  describe('test for iTerm', () => {
    describe('test hyperlink generation for dummyURL and dummyText on macOS', () => {
      beforeEach(() => {
        flush();
        process.env.TERM_PROGRAM = 'iTerm.app';
        process.env.TERM_PROGRAM_VERSION = '3.1.0';
        process.argv = ['--hyperlink=true'];
      });
      afterEach(() => {
        process.argv = [];
        process.env = ORIG_ENV;
      });
      testLink.cmdTestLink([]).it('verify the contents of dummy Command', (ctx) => {
        const result = convertToHyperlink('MORE INFO', 'https://twilio.com/docs/dummyCmd').isSupported;
        expect(result).to.be.true;
      });
    });
  });
});
