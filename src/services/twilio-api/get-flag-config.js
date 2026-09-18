const { kebabCase } = require('@twilio/cli-core').services.namingConventions;
const { logger } = require('@twilio/cli-core').services.logging;

const urlUtil = require('../hyperlink-utility');
const { TOPIC_SEPARATOR, BASE_TOPIC_NAME, CORE_TOPIC_NAME } = require('./get-topic-name');

// AccountSid is a special snowflake
const ACCOUNT_SID_FLAG = 'AccountSid';

const UPDATE_PHONE_NUMBER_COMMAND = [BASE_TOPIC_NAME, CORE_TOPIC_NAME, 'incoming-phone-numbers', 'update'].join(
  TOPIC_SEPARATOR,
);

/*
 * some specs (e.g. Monitor v2 Alarms) whose
 * operation parameters are left as an unresolved `$ref` into
 * `components.parameters` rather than the inline parameter object every other
 * spec provides. Resolve it here, in place, so every downstream reader of this
 * same parameter object (this function's caller included) sees the real thing.
 */
const resolveParameterRef = (parameter, actionDefinition) => {
  if (!parameter || !parameter.$ref) {
    return parameter;
  }

  const refName = parameter.$ref.split('/').pop();
  const componentParameters = ((actionDefinition.domain || {}).components || {}).parameters || {};
  const resolved = componentParameters[refName];

  if (!resolved) {
    logger.debug(`Could not resolve parameter ref '${parameter.$ref}'; falling back to '${refName}'`);
    return Object.assign(parameter, { name: refName, schema: { type: 'string' } });
  }

  delete parameter.$ref;
  return Object.assign(parameter, resolved);
};

const getFlagName = (paramName) => {
  return kebabCase(paramName.replace('<', 'Before').replace('>', 'After'));
};

const scanForUrl = (description) => {
  // regex : [checks for any char](checks for https:// | http://, followed by w,d,?,=,#,-)
  const regex = /\[((.*?)\w+)\]\(((https?:\/\/)[\w\d./?=#/-]+)\)/g;
  const matches = description.match(regex);
  if (!matches) {
    return description;
  }

  // for all urls in the description
  for (match of matches) {
    const details = match.split(']('); // splitting to find out the text and url
    const text = details[0].substr(1); // takes out text from [text]
    const url = details[1].substr(0, details[1].indexOf(')')); // takes out url from (url)

    const hyperLink = urlUtil.convertToHyperlink(text, url);
    description = description.replace(match, hyperLink.url);
  }

  return description;
};
/**
 * Converts a Twilio API parameter into a Twilio CLI flag.
 *
 * @param {Object} parameter - Twilio API parameter
 * @param {Object} actionDefinition - action containing topic, command, and domain names
 * @returns {Object} - Twilio CLI flag configuration
 */
const getFlagConfig = (parameter, actionDefinition) => {
  parameter = resolveParameterRef(parameter, actionDefinition);
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
  if (urlUtil.supportsHyperlink()) {
    flagDescription = scanForUrl(flagDescription);
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
