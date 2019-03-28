const { kebabCase } = require('../naming-conventions');

const TOPIC_SEPARATOR = ':';

const getTopicName = actionDefinition => {
  return (
    actionDefinition.domainName +
    TOPIC_SEPARATOR +
    actionDefinition.versionName +
    TOPIC_SEPARATOR +
    kebabCase(
      actionDefinition.path.replace(/\/+|{.+?}/g, TOPIC_SEPARATOR) // Separate paths with topic separator
    )
  ).replace(new RegExp(TOPIC_SEPARATOR + '+', 'g'), TOPIC_SEPARATOR); // Remove duplicate separators;
};

module.exports = {
  getTopicName,
  TOPIC_SEPARATOR
};
