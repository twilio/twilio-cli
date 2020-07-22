/* eslint-disable no-console */
const chalk = require('chalk');
const { Command } = require('@oclif/command');

class Feedback extends Command {
  async run() {
    const link =
      chalk.bold('>>>>>  ') + chalk.underline.bold('https://twil.io/twilio-cli-feedback') + chalk.bold('  <<<<<');
    console.log();
    console.log('***********************************************************************');
    console.log('* Ahoy! Thank you for using twilio-cli!                               *');
    console.log('* We are always striving to make twilio-cli better.                   *');
    console.log('* Visit the link below to share your feedback with our team.          *');
    console.log('*                                                                     *');
    console.log(`*          ${link}          *`);
    console.log('***********************************************************************');
    console.log();
  }
}

Feedback.description = 'provide feedback to the CLI team';

module.exports = Feedback;
