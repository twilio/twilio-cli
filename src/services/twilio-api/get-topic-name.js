const { kebabCase } = require('../naming-conventions');

const TOPIC_SEPARATOR = ':';

const getTopicName = actionDefinition => {
  return (
    actionDefinition.domainName +
    TOPIC_SEPARATOR +
    actionDefinition.versionName +
    kebabCase(
      actionDefinition.path
        .replace(/\/{.+?}/g, '') // Drop every {PathParameter}
        .replace(/\/+/g, TOPIC_SEPARATOR) // Separate paths with topic separator
    )
  );
};

module.exports = {
  getTopicName,
  TOPIC_SEPARATOR
};
