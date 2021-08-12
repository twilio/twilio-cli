/* eslint-disable no-console */
const sinon = require('sinon');
const { expect, test } = require('@twilio/cli-test');

const pluginFunc = require('../../../src/hooks/postrun/plugin-postrun');

const pluginUpdate = {
  Command: {
    id: 'plugins:update',
  },
};

const update = {
  Command: {
    id: 'update',
  },
};

const pluginInstall = {
  Command: {
    id: 'plugins:install',
  },
};

const pluginAvailable = {
  Command: {
    id: 'plugins:available',
  },
};

const autocomplete = {
  Command: {
    id: 'autocomplete',
  },
  argv: [],
};

const autocompleteBash = {
  Command: {
    id: 'autocomplete',
  },
  argv: ['bash'],
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

      test.it('no warning when other plugin commands are run', () => {
        pluginFunc(pluginAvailable);
        expect(console.warn.calledOnce).to.be.false;
      });

      test.it('warning when plugin is updated', () => {
        pluginFunc(pluginUpdate);
        expect(console.warn.calledOnce).to.be.true;
        expect(console.warn.calledWith(sinon.match('twilio autocomplete'))).to.be.true;
      });

      test.it('warning when cli is updated', () => {
        pluginFunc(update);
        expect(console.warn.calledWith(sinon.match('twilio autocomplete'))).to.be.true;
      });

      test.it('warning when plugin is installed', () => {
        pluginFunc(pluginInstall);
        expect(console.warn.calledWith(sinon.match('twilio autocomplete'))).to.be.true;
      });

      test.it('warning when autocorrect has no arguments', () => {
        pluginFunc(autocomplete);
        expect(console.warn.calledWith(sinon.match('twilio autocomplete bash'))).to.be.true;
        expect(console.warn.calledWith(sinon.match('twilio autocomplete zsh'))).to.be.true;
      });

      test.it('no warning autocorrect has arguments', () => {
        pluginFunc(autocompleteBash);
        expect(console.warn.calledOnce).to.be.false;
      });
    });
  });
});
