/* eslint-disable no-console */
const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');

const pluginFunc = require('../../../src/hooks/prerun/install-prerun');

const update = {
  Command: {
    id: 'update',
  },
};
const pluginAvailable = {
  Command: {
    id: 'plugins:available',
  },
};

describe('hooks', () => {
  describe('postrun', () => {
    describe('plugin-postrun', () => {
      before(() => {
        warnSpy = sinon.spy(console, 'warn');
      });

      after(() => {
        warnSpy.restore();
      });

      test.it('no warning when other commands are run', () => {
        pluginFunc(pluginAvailable);
        expect(console.warn.calledWith(sinon.match('npm update'))).to.be.false;
      });

      test.it('warning when update command is run', () => {
        pluginFunc(update);
        expect(console.warn.calledWith(sinon.match('npm update'))).to.be.true;
      });
    });
  });
});
