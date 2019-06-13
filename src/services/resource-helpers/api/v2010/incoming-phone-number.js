const { TwilioCliError } = require('@twilio/cli-core').services.error;

class IncomingPhoneNumberHelper {
  constructor(twilioClient) {
    this.twilioClient = twilioClient;
  }

  async findPhoneNumber(userInput) {
    let response = null;
    let sid = userInput.startsWith('PN') ? userInput : null;

    if (sid) {
      try {
        response = await this.twilioClient.incomingPhoneNumbers(sid).fetch();
      } catch (err) {
        const errorMessage = err.code === 20404 ? 'Could not find phone number ' + userInput : err.message;
        throw new TwilioCliError(errorMessage);
      }
      return response;
    }

    let matches;
    try {
      matches = await this.twilioClient.incomingPhoneNumbers.list({ phoneNumber: userInput });
    } catch (err) {
      throw new TwilioCliError(err.message);
    }

    if (matches && matches.length > 0) return matches[0];

    throw new TwilioCliError('Could not find phone number ' + userInput);
  }
}

module.exports = IncomingPhoneNumberHelper;
