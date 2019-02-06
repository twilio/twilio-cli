/* eslint no-unused-expressions: 0 */
const sinon = require('sinon');
const { expect, test, constants } = require('../test');
const TwilioClientCommand = require('../../src/base-commands/twilio-client-command');
const { ConfigData } = require('../../src/services/config');

describe('base-commands', () => {
  describe('twilio-client-command', () => {
    const setUpTest = (args = [], setUpUserConfig = undefined, mockSecureStorage = true) => {
      return test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          if (setUpUserConfig) {
            setUpUserConfig(ctx.userConfig);
          } else {
            ctx.userConfig.addProject('default', constants.FAKE_ACCOUNT_SID);
          }
        })
        .twilioCliEnv()
        .stderr()
        .do(async ctx => {
          ctx.testCmd = new TwilioClientCommand(
            args,
            ctx.fakeConfig,
            mockSecureStorage ?
              {
                async getCredentials(projectId) {
                  return {
                    apiKey: constants.FAKE_API_KEY,
                    apiSecret: constants.FAKE_API_SECRET + projectId
                  };
                }
              } :
              undefined
          );
        });
    };

    setUpTest(['-l', 'debug']).it('should create a client for the default project', async ctx => {
      await ctx.testCmd.run();
      expect(ctx.stderr).to.contain('Using project: default');
      expect(ctx.testCmd.twilioClient.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
      expect(ctx.testCmd.twilioClient.username).to.equal(constants.FAKE_API_KEY);
      expect(ctx.testCmd.twilioClient.password).to.equal(constants.FAKE_API_SECRET + 'default');
    });

    setUpTest(['-l', 'debug'], () => 0).it('should fail for a non-existant default project', async ctx => {
      ctx.testCmd.exit = sinon.fake();
      await ctx.testCmd.run();
      expect(ctx.stderr).to.contain('Using project: default');
      expect(ctx.stderr).to.contain('No project "default" configured');
      expect(ctx.stderr).to.contain('To add project, run: twilio login');
      expect(ctx.testCmd.exit.calledWith(1)).to.be.true;
    });

    setUpTest(['-p', 'alt', '-l', 'debug']).it('should fail for a non-existant project', async ctx => {
      ctx.testCmd.exit = sinon.fake();
      await ctx.testCmd.run();
      expect(ctx.stderr).to.contain('Using project: alt');
      expect(ctx.stderr).to.contain('No project "alt" configured');
      expect(ctx.stderr).to.contain('To add project, run: twilio login -p alt');
      expect(ctx.testCmd.exit.calledWith(1)).to.be.true;
    });

    setUpTest(['-p', 'twilio-cli-unit-testing'], userConfig => {
      userConfig.addProject('twilio-cli-unit-testing', constants.FAKE_ACCOUNT_SID);
    }).it('should create a client for a non-default project', async ctx => {
      await ctx.testCmd.run();
      expect(ctx.testCmd.twilioClient.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
      expect(ctx.testCmd.twilioClient.username).to.equal(constants.FAKE_API_KEY);
      expect(ctx.testCmd.twilioClient.password).to.equal(constants.FAKE_API_SECRET + 'twilio-cli-unit-testing');
    });

    setUpTest(
      ['-p', 'twilio-cli-unit-testing'],
      userConfig => {
        userConfig.addProject('twilio-cli-unit-testing', constants.FAKE_ACCOUNT_SID);
      },
      false
    ).it('should handle a secure storage error', async ctx => {
      ctx.testCmd.exit = sinon.fake();
      await ctx.testCmd.run();
      expect(ctx.stderr).to.contain('Could not get credentials for project "twilio-cli-unit-testing"');
      expect(ctx.stderr).to.contain('To reconfigure project, run: twilio login -p twilio-cli-unit-testing');
      expect(ctx.testCmd.exit.calledWith(1)).to.be.true;
    });

    describe('parseProperties', () => {
      setUpTest().it('should ignore empty PropertyFlags', async ctx => {
        await ctx.testCmd.run();
        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties).to.be.null;
      });

      setUpTest().it('should ignore empty command flags', async ctx => {
        await ctx.testCmd.run();
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {}
        };

        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties).to.be.null;
      });

      setUpTest().it('should parse options into API resource properties', async ctx => {
        await ctx.testCmd.run();
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {}
        };
        ctx.testCmd.flags = {
          'friendly-name': 'Casper',
          'sms-url': 'https://localhost:5000/sms'
        };

        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties.friendlyName).to.equal('Casper');
        expect(updatedProperties.smsUrl).to.equal('https://localhost:5000/sms');
      });
    });

    describe('updateResource', () => {
      setUpTest().it('should return nothing to update if no properties passed', async ctx => {
        await ctx.testCmd.run();
        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const results = await ctx.testCmd.updateResource(null, resourceSid);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Nothing to update');
        expect(ctx.stderr).to.contain('Nothing to update');
      });

      setUpTest().it('should return success if resource was updated', async ctx => {
        await ctx.testCmd.run();

        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const updatedProperties = {
          friendlyName: 'Casper'
        };

        const fakeResource = sid => {
          expect(sid).to.equal(resourceSid);
          return {
            async update(props) {
              expect(props).to.eql(updatedProperties);
            }
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid, updatedProperties);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Success');
      });

      setUpTest().it('should return success if resource was updated from flags', async ctx => {
        await ctx.testCmd.run();
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {}
        };
        ctx.testCmd.flags = {
          'friendly-name': 'Casper',
          'sms-url': 'https://localhost:5000/sms'
        };

        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const fakeResource = sid => {
          expect(sid).to.equal(resourceSid);
          return {
            async update(props) {
              expect(props.friendlyName).to.equal('Casper');
              expect(props.smsUrl).to.equal('https://localhost:5000/sms');
            }
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Success');
      });

      setUpTest().it('should report an error if API call fails', async ctx => {
        await ctx.testCmd.run();

        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const fakeResource = sid => {
          expect(sid).to.equal(resourceSid);
          return {
            async update() {
              const err = { message: 'A fake API error' };
              throw err;
            }
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid, {});
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Error');
        expect(ctx.stderr).to.contain('A fake API error');
      });
    });
  });
});
