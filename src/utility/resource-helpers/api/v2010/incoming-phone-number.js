class IncomingPhoneNumberHelper {
  constructor(command) {
    this.command = command;
    this.logger = command.logger;
    this.twilioClient = command.twilioClient;
  }

  async findPhoneNumber(userInput) {
    let response = null;
    let sid = userInput.startsWith('PN') ? userInput : null;

    if (sid) {
      try {
        response = await this.twilioClient.incomingPhoneNumbers(sid).fetch();
      } catch (err) {
        const errorMessage = err.code === 20404 ? 'Could not find phone number ' + userInput : err.message;
        this.logger.error(errorMessage);
        this.command.exit(1);
      }
      return response;
    }

    let matches;
    try {
      matches = await this.twilioClient.incomingPhoneNumbers.list({ phoneNumber: userInput });
    } catch (err) {
      this.logger.error(err.message);
      this.command.exit(1);
    }

    if (matches.length > 0) return matches[0];

    this.logger.error('Could not find phone number ' + userInput);
    this.command.exit(1);
  }
}

module.exports = IncomingPhoneNumberHelper;
