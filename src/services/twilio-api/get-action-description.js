const { capitalize } = require('@twilio/cli-core').services.namingConventions;

// The (upper-case) name of any tags that we should ignore when building command descriptions.
const IGNORED_TAGS = new Set(['GA']);
const DESCRIPTION_SEPARATOR = '\n\n';

const getSummaryDescription = actionDefinition => {
  if (actionDefinition.action.description) {
    return actionDefinition.action.description;
  }

  const actionName = actionDefinition.actionName;
  const pathParts = actionDefinition.path.replace(/\.json$/, '').replace(/\/{.+?}/g, '').split('/');
  const resourceName = capitalize(pathParts[pathParts.length - 1]);

  if (actionName === 'list') {
    return `${actionName} multiple ${resourceName} resources`;
  }

  const article = /^[AEIOU]/.test(resourceName) ? 'an' : 'a';
  return `${actionName} ${article} ${resourceName} resource`;
};

const getActionDescription = actionDefinition => {
  let summaryDescription = getSummaryDescription(actionDefinition);

  if (actionDefinition.action.tags) {
    // Get the list of tags that we care about.
    const tags = actionDefinition.action.tags
      .filter(tagName => !IGNORED_TAGS.has(tagName.toUpperCase()));

    // Build tag IDs and prepend them to the summary description.
    const tagIds = tags
      .map(tagName => `[${tagName.toUpperCase()}]`)
      .join(' ');

    summaryDescription = `${tagIds} ${summaryDescription}`;

    if (actionDefinition.domain.tags) {
      // Build the tag descriptions and append them to the summary description.
      // We map from domain tags to action tags (rather the the other way
      // around) in order to maintain the ordering of the domain tags. It also
      // allows to not fail when there's an unaccounted for action tag.
      const tagSet = new Set(tags);
      const tagDescriptions = actionDefinition.domain.tags
        .filter(tag => tagSet.has(tag.name))
        .map(tag => tag.description)
        .join(DESCRIPTION_SEPARATOR);

      summaryDescription = `${summaryDescription}${DESCRIPTION_SEPARATOR}${tagDescriptions}`;
    }
  }

  return summaryDescription.trim();
};

module.exports = {
  getActionDescription
};
