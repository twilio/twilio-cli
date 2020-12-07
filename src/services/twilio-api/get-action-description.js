const { capitalize } = require('@twilio/cli-core').services.namingConventions;

// The (upper-case) name of any maturity levels that we should ignore when building command descriptions.
const IGNORED_MATURITY = new Set(['GA']);
const DESCRIPTION_SEPARATOR = '\n\n';

const getSummaryDescription = (actionDefinition) => {
  if (actionDefinition.action.description) {
    return actionDefinition.action.description;
  }

  const { actionName } = actionDefinition;
  const pathParts = actionDefinition.path
    .replace(/\.json$/, '')
    .replace(/\/{.+?}/g, '')
    .split('/');
  const resourceName = capitalize(pathParts[pathParts.length - 1]);

  if (actionName === 'list') {
    return `${actionName} multiple ${resourceName} resources`;
  }

  const article = /^[AEIOU]/.test(resourceName) ? 'an' : 'a';
  return `${actionName} ${article} ${resourceName} resource`;
};

const getActionDescription = (actionDefinition) => {
  let summaryDescription = getSummaryDescription(actionDefinition);
  if (actionDefinition.action['x-maturity']) {
    // Get the list of maturity levels that we care about.
    const maturity = actionDefinition.action['x-maturity'].filter(
      (maturityName) => !IGNORED_MATURITY.has(maturityName.toUpperCase()),
    );

    // Build maturity IDs and prepend them to the summary description.
    const maturityIds = maturity.map((maturityName) => `[${maturityName.toUpperCase()}]`).join(' ');

    summaryDescription = `${maturityIds} ${summaryDescription}`;

    if (actionDefinition.domain['x-maturity']) {
      /*
       * Build the maturity descriptions and append them to the summary description.
       * We map from domain maturity to action maturity (rather the the other way
       * around) in order to maintain the ordering of the maturity levels. It also
       * allows to not fail when there's an unaccounted for action maturity levels.
       */
      const maturitySet = new Set(maturity);
      const maturityDescriptions = actionDefinition.domain['x-maturity']
        .filter((m) => maturitySet.has(m.name))
        .map((m) => m.description)
        .join(DESCRIPTION_SEPARATOR);

      summaryDescription = `${summaryDescription}${DESCRIPTION_SEPARATOR}${maturityDescriptions}`;
    }
  }

  return summaryDescription.trim();
};

module.exports = {
  getActionDescription,
};
