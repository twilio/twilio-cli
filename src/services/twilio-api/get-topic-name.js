const { kebabCase } = require('@twilio/cli-core').services.namingConventions;

const TOPIC_SEPARATOR = ':';
const BASE_TOPIC_NAME = 'api';
const CORE_TOPIC_NAME = 'core';

const getTopicName = (actionDefinition) => {
  return (
    (
      actionDefinition.domainName +
      kebabCase(
        actionDefinition.path
          .replace(/\.json$/, '') // Drop the JSON extension
          .replace(/\/{.+?}/g, '') // Drop every {PathParameter}
          .replace(/\/+/g, TOPIC_SEPARATOR), // Separate paths with topic separator
      )
    )
      // Chop the legacy API version down
      .replace(/api:2010-04-01:accounts(?=:)/, CORE_TOPIC_NAME) // First non-account level APIs
      .replace(/api:2010-04-01/, CORE_TOPIC_NAME) // Then account APIs (i.e., modifying Twilio accounts or subaccounts)
  );
};

module.exports = {
  getTopicName,
  TOPIC_SEPARATOR,
  BASE_TOPIC_NAME,
  CORE_TOPIC_NAME,
};
