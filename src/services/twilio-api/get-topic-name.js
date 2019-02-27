const { kebabCase } = require('../naming-conventions');

const getTopicName = (domainName, versionName, resourcePath) => {
  return domainName + '-' + versionName + '-' + kebabCase(resourcePath.replace(/[/{}]+/g, '-'));
};

module.exports = getTopicName;
