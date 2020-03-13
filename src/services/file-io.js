const { TwilioCliError } = require('@twilio/cli-core').services.error;
const { logger } = require('@twilio/cli-core').services.logging;
const fs = require('fs');
const path = require('path');

async function readFileOrStdIn(filePath) {
  if (filePath) {
    return readFile(filePath);
  }

  const pipedInput = await readStream();
  if (pipedInput) {
    return {
      filename: 'piped.txt', // placeholder filename for attachment
      content: pipedInput
    };
  }
}

function readFile(filePath) {
  try {
    return {
      filename: path.basename(filePath),
      content: fs.readFileSync(filePath, 'base64')
    };
  } catch (error) {
    logger.debug(error);
    throw new TwilioCliError('Unable to read the file: ' + filePath);
  }
}

async function readStream() {
  const input = await getStdin();
  return Buffer.from(input).toString('base64');
}

function getStdin() {
  return new Promise(resolve => {
    if (process.stdin.isTTY) {
      resolve('');
    } else {
      process.stdin.setEncoding('utf8');
      process.stdin.once('data', data => resolve(data));
    }
  });
}

module.exports = {
  readFileOrStdIn,
  readFile
};
