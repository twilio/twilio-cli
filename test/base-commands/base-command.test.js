const path = require('path');
const { expect, test } = require('../test');
const BaseCommand = require('../../src/base-commands/base-command');
const { Logger, LoggingLevel } = require('../../src/services/logging');

const baseCommandTest = test.twilioCliEnv().do(async ctx => {
  ctx.testCmd = new BaseCommand([], ctx.fakeConfig);
  await ctx.testCmd.run();
});

describe('base-commands', () => {
  describe('base-command', () => {
    baseCommandTest.stderr().it('should initialize properly', async ctx => {
      expect(ctx.testCmd.flags['output-format']).to.equal('columns');
      expect(ctx.testCmd.logger).to.be.an.instanceOf(Logger);
      expect(ctx.testCmd.logger.config.level).to.equal(LoggingLevel.info);
      expect(ctx.testCmd.inquirer).to.not.equal(undefined);
      expect(ctx.stderr).to.equal('');
    });

    test
      .twilioCliEnv()
      .stderr()
      .do(async ctx => {
        ctx.testCmd = new BaseCommand(['-l', 'debug'], ctx.fakeConfig);
        await ctx.testCmd.run();
      })
      .it('should debug log the config file path', async ctx => {
        expect(ctx.testCmd.logger.config.level).to.equal(LoggingLevel.debug);
        const expectedConfigFile = path.join(ctx.fakeConfig.configDir, 'config.json');
        expect(ctx.stderr).to.contain(`[DEBUG] Config File: ${expectedConfigFile}`);
      });

    describe('output', () => {
      const outputTest = baseCommandTest.stdout();

      outputTest.it('should output a single object', async ctx => {
        ctx.testCmd.output({ foo: 'foo', bar: 'bar' });
        expect(ctx.stdout).to.contain('Foo  Bar\nfoo  bar');
      });

      outputTest.it('should output an array of objects', async ctx => {
        ctx.testCmd.output([{ foo: 'foo', bar: 'bar' }, { foo: '2', bar: '2' }]);
        expect(ctx.stdout).to.contain('Foo  Bar\nfoo  bar\n2    2');
      });

      outputTest.it('should output requested properties', async ctx => {
        ctx.testCmd.output([{ foo: 'foo', bar: 'bar', baz: 'baz' }, { foo: '2', bar: '2', baz: '2' }], 'foo, bar');
        expect(ctx.stdout).to.contain('Foo  Bar\nfoo  bar\n2    2');
      });

      outputTest.stderr().it('should warn if invalid property name passed', async ctx => {
        ctx.testCmd.output([{ foo: 'foo', bar: 'bar', baz: 'baz' }, { foo: '2', bar: '2', baz: '2' }], 'foo, barn');
        expect(ctx.stdout).to.contain('Foo\nfoo\n2');
        expect(ctx.stderr).to.contain('"barn" is not a valid property name.');
      });

      test
        .twilioCliEnv()
        .do(async ctx => {
          ctx.testCmd = new BaseCommand(['-o', 'json'], ctx.fakeConfig);
          await ctx.testCmd.run();
        })
        .stdout()
        .it('should output an array of objects as JSON', async ctx => {
          const testData = [{ foo: 'foo', bar: 'bar' }, { foo: '2', bar: '2' }];
          ctx.testCmd.output(testData);
          const outputObject = JSON.parse(ctx.stdout);
          expect(outputObject[0].foo).to.equal(testData[0].foo);
        });

      test
        .twilioCliEnv()
        .do(async ctx => {
          ctx.testCmd = new BaseCommand(['-o', 'tsv'], ctx.fakeConfig);
          await ctx.testCmd.run();
        })
        .stdout()
        .it('should output an array of objects as TSV', async ctx => {
          const testData = [{ FOO: 'foo', BAR: 'bar' }, { FOO: '2', BAR: '2' }];
          ctx.testCmd.output(testData);
          expect(ctx.stdout).to.contain('FOO\tBAR\nfoo\tbar\n2\t2');
        });
    });
  });
});
