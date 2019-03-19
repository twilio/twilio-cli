const exec = require('../../src/services/await-exec');
const { expect, test } = require('@twilio/cli-test');

describe('utility', () => {
  describe('await-exec', () => {
    test.it('runs the expected command', async () => {
      const result = await exec('node -e "console.log(\'hi\')"');
      expect(result.stdout).to.contain('hi');
    });

    test.it('runs the expected command with an error', async () => {
      try {
        await exec('node -e "throw \'hi\'"');
      } catch (error) {
        expect(error.stderr).to.contain('hi');
      }
    });
  });
});
