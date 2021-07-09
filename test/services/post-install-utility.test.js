/* eslint-disable no-console */
const tmp = require('tmp');
const chalk = require('chalk');
const { expect, test, constants } = require('@twilio/cli-test');
const sinon = require('sinon');
const { ConfigData } = require('@twilio/cli-core').services.config;

const { PostInstallDisplayManager, PORT_WARNING } = require('../../src/services/post-install-utility');

describe('services', () => {
  describe('post-install-utility', () => {
    beforeEach(() => {
      tempConfigDir = tmp.dirSync({ unsafeCleanup: true });
      warnSpy = sinon.spy(console, 'warn');
      logSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
      tempConfigDir.removeCallback();
      warnSpy.restore();
      logSpy.restore();
    });

    test.it('should display grid when no profiles or projects configured', () => {
      const configData = new ConfigData();
      const displayManager = new PostInstallDisplayManager(tempConfigDir.name, configData);

      displayManager.displayMessage();
      expect(displayManager.userConfig).to.not.be.undefined;
      expect(console.log.calledWith('* To get started, please create a twilio-cli profile:                   *')).to.be
        .true;
      expect(console.log.calledWith('*     twilio profiles:create                                            *')).to.be
        .true;
      expect(console.log.calledWith('*     OR                                                                *')).to.be
        .true;
      expect(console.log.calledWith('*     twilio login                                                      *')).to.be
        .true;
    });

    test.it('should display port warning if projects set', () => {
      const configData = new ConfigData();
      configData.addProject('DUMMY_PROJECT', constants.FAKE_ACCOUNT_SID);
      const displayManager = new PostInstallDisplayManager(tempConfigDir.name, configData);

      displayManager.displayMessage();
      expect(console.warn.calledOnce).to.be.true;
      expect(console.warn.calledWith(chalk.yellowBright(` » ${PORT_WARNING}`))).to.be.true;
      expect(console.log.called).to.be.false; // Grid shouldn't be displayed
    });

    test.it('should not display port warning if profiles set, but projects not set', () => {
      const configData = new ConfigData();
      configData.addProfile(
        'DUMMY_PROJECT',
        constants.FAKE_ACCOUNT_SID,
        '',
        constants.FAKE_API_KEY,
        constants.FAKE_API_SECRET,
      );

      const displayManager = new PostInstallDisplayManager(tempConfigDir.name, configData);

      displayManager.displayMessage();
      expect(console.warn.called).to.be.false;
      expect(console.warn.calledWith(chalk.yellowBright(` » ${PORT_WARNING}`))).to.be.false;
      expect(console.log.called).to.be.false;
    });

    test.it('should initialise as per system defaults', async () => {
      const displayManager = new PostInstallDisplayManager();
      expect(displayManager.configDir).to.equal(process.env.TWILIO_CONFIG_DIR);
      expect(displayManager.userConfig).to.be.undefined;
      await displayManager.displayMessage();
      expect(displayManager.userConfig).to.not.be.undefined; // Should load from config directory
    });
  });
});
