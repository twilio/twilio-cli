const { kebabCase } = require('../naming-conventions');

const getTopicName = actionDefinition => {
  return (
    actionDefinition.domainName +
    '-' +
    actionDefinition.versionName +
    '-' +
    kebabCase(actionDefinition.path.replace(/\/+|{.+?}/g, '-'))
  );
};

module.exports = getTopicName;
