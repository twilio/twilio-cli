const { TwilioApiBrowser, isApi2010 } = require('./api-browser');
const { getTopicName, TOPIC_SEPARATOR, BASE_TOPIC_NAME, CORE_TOPIC_NAME } = require('./get-topic-name');
const { getActionDescription } = require('./get-action-description');

module.exports = {
  TwilioApiBrowser,
  isApi2010,
  getTopicName,
  TOPIC_SEPARATOR,
  BASE_TOPIC_NAME,
  CORE_TOPIC_NAME,
  getActionDescription
};
