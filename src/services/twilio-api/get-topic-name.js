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
  ).replace(/api:v2010:accounts/, 'api'); // Chop the legacy API version down
};

module.exports = {
  getTopicName,
  TOPIC_SEPARATOR
};
