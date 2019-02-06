const keytar = require('keytar');
const TWILIO_CLI_IDENTIFIER = 'twilio-cli';

class SecureStorage {
  async saveCredentials(projectId, username, password) {
    await keytar.setPassword(TWILIO_CLI_IDENTIFIER, projectId, username + '|' + password);
  }

  async getCredentials(projectId) {
    let credentials = null;
    try {
      credentials = await keytar.getPassword('twilio-cli', projectId);
    } catch (e) {
      return { apiKey: 'error', apiSecret: e.message };
    }

    const [apiKey, apiSecret] = credentials ? credentials.split('|') : ['error', 'error'];

    return {
      apiKey,
      apiSecret
    };
  }
}

module.exports = {
  SecureStorage
};
