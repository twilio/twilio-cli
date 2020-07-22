const fs = require('fs');
const path = require('path');

const { TwilioCliError } = require('@twilio/cli-core').services.error;
const { logger } = require('@twilio/cli-core').services.logging;

function getStdin() {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) {
      resolve('');
    } else {
      process.stdin.setEncoding('utf8');
      process.stdin.once('data', (data) => resolve(data));
    }
  });
}

function readFile(filePath, encoding) {
  try {
    return {
      filename: path.basename(filePath),
      content: fs.readFileSync(filePath, encoding),
    };
  } catch (error) {
    logger.debug(error);
    throw new TwilioCliError(`Unable to read the file: ${filePath}`);
  }
}

async function readStream(encoding) {
  const input = await getStdin();
  return Buffer.from(input).toString(encoding);
}

async function readFileOrStdIn(filePath, encoding) {
  if (filePath) {
    return readFile(filePath, encoding);
  }

  const pipedInput = await readStream(encoding);
  if (pipedInput) {
    return {
      filename: 'piped.txt', // placeholder filename for attachment
      content: pipedInput,
    };
  }

  return undefined;
}

module.exports = {
  readFileOrStdIn,
  readFile,
};
