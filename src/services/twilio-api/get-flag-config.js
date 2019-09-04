const { kebabCase } = require('@twilio/cli-core').services.namingConventions;
const { BASE_TOPIC_NAME } = require('./get-topic-name');

// AccountSid is a special snowflake
const ACCOUNT_SID_FLAG = 'AccountSid';

const getFlagName = paramName => {
  return kebabCase(
    paramName
      .replace('<', 'Before')
      .replace('>', 'After')
  );
};

/**
 * Converts a Twilio API parameter into a Twilio CLI flag.
 */
const getFlagConfig = (parameter, actionDefinition) => {
  const isCoreAccountSidFlag = (parameter.name === ACCOUNT_SID_FLAG && actionDefinition.domainName === BASE_TOPIC_NAME);

  return {
    name: getFlagName(parameter.name),
    description: parameter.description,
    // AccountSid on 'api:core' not required, we can get from the current profile
    required: isCoreAccountSidFlag ? false : parameter.required,
    multiple: parameter.schema.type === 'array',
    // Allow negated booleans ('-no' option)
    allowNo: true
  };
};

module.exports = {
  getFlagConfig,
  getFlagName
};
