/* eslint-disable no-console */
const chalk = require('chalk');
const supportsHyperlinks = require('supports-hyperlinks');
const hyperlinker = require('hyperlinker');
const { Command } = require('@oclif/core');

class Feedback extends Command {
  async run() {
    const link =
      chalk.bold('>>>>>  ') +
      chalk.greenBright.underline.bold('https://airtable.com/shrcFDU1gmKWOqZXe') +
      chalk.bold('  <<<<<');
    console.log();
    console.log('***********************************************************************');
    console.log('* Ahoy! Thank you for using twilio-cli!                               *');
    console.log('* We are always striving to make twilio-cli better.                   *');
    console.log('* Visit the link below to share your feedback with our team.          *');
    console.log('*                                                                     *');
    if (supportsHyperlinks.stdout) {
      console.log(
        hyperlinker(
          '* Click Here to provide feedback                                      *',
          'https://airtable.com/shrcFDU1gmKWOqZXe',
        ),
      );
    } else {
      console.log(`*        ${link}         *`);
    }
    console.log('***********************************************************************');
    console.log();
  }
}

Feedback.description = 'provide feedback to the CLI team';

module.exports = Feedback;
