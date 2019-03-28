const { capitalize } = require('../naming-conventions');

const getActionDescription = actionDefinition => {
  if (actionDefinition.action.description) {
    return actionDefinition.action.description;
  }

  const actionName = capitalize(actionDefinition.actionName);
  const pathParts = actionDefinition.path.replace(/\/{.+?}$/g, '').split('/');
  const resourceName = capitalize(pathParts[pathParts.length - 1]);

  if (actionName === 'List') {
    return `${actionName} multiple ${resourceName} resources.`;
  }

  const article = /^[AEIOU]/.test(resourceName) ? 'an' : 'a';
  return `${actionName} ${article} ${resourceName} resource.`;
};

module.exports = {
  getActionDescription
};
