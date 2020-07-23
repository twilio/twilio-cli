const { kebabCase } = require('@twilio/cli-core').services.namingConventions;

const { TOPIC_SEPARATOR, BASE_TOPIC_NAME, CORE_TOPIC_NAME } = require('./get-topic-name');

// AccountSid is a special snowflake
const ACCOUNT_SID_FLAG = 'AccountSid';

const UPDATE_PHONE_NUMBER_COMMAND = [BASE_TOPIC_NAME, CORE_TOPIC_NAME, 'incoming-phone-numbers', 'update'].join(
  TOPIC_SEPARATOR,
);

const getFlagName = (paramName) => {
  return kebabCase(paramName.replace('<', 'Before').replace('>', 'After'));
};

/**
 * Converts a Twilio API parameter into a Twilio CLI flag.
 *
 * @param {Object} parameter - Twilio API parameter
 * @param {Object} actionDefinition - action containing topic, command, and domain names
 * @returns {Object} - Twilio CLI flag configuration
 */
const getFlagConfig = (parameter, actionDefinition) => {
  let flagName = getFlagName(parameter.name);
  let flagDescription = parameter.description || '';

  const commandId = [actionDefinition.topicName, actionDefinition.commandName].join(TOPIC_SEPARATOR);
  const isCoreAccountSidFlag = parameter.name === ACCOUNT_SID_FLAG && actionDefinition.domainName === BASE_TOPIC_NAME;

  if (isCoreAccountSidFlag && commandId === UPDATE_PHONE_NUMBER_COMMAND) {
    if (parameter.in === 'query') {
      // Turn 'account-sid' into 'target-account-sid'
      flagName = `target-${flagName}`;
      /*
       * Converting something like this:
       * "The SID of the Account that created the IncomingPhoneNumber resource to update."
       * to:
       * "The SID of the Account that you wish to own the number."
       */
      flagDescription = flagDescription.replace(/that created.*?\./, 'that you wish to own the number.');
    }
  }

  return {
    name: flagName,
    description: flagDescription,
    // AccountSid on 'api:core' not required, we can get from the current profile
    required: isCoreAccountSidFlag ? false : parameter.required,
    multiple: parameter.schema && parameter.schema.type === 'array',
    // Allow negated booleans ('-no' option)
    allowNo: true,
  };
};

module.exports = {
  getFlagConfig,
  getFlagName,
};
