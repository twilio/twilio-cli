const { kebabCase } = require('@twilio/cli-core').services.namingConventions;

const TOPIC_SEPARATOR = ':';
const BASE_TOPIC_NAME = 'api';
const CORE_TOPIC_NAME = 'core';

const getTopicName = actionDefinition => {
  return (
    actionDefinition.domainName +
    kebabCase(
      actionDefinition.path
        .replace(/\.json$/, '') // Drop the JSON extension
        .replace(/\/{.+?}/g, '') // Drop every {PathParameter}
        .replace(/\/+/g, TOPIC_SEPARATOR) // Separate paths with topic separator
    )
  ).replace(/api:2010-04-01:accounts/, CORE_TOPIC_NAME); // Chop the legacy API version down
};

module.exports = {
  getTopicName,
  TOPIC_SEPARATOR,
  BASE_TOPIC_NAME,
  CORE_TOPIC_NAME
};
