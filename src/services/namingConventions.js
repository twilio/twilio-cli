const kebabCase = input => {
  return input
    .trim()
    .replace(/[ _]/g, '-') // from snake_case (or spaces)
    .replace(/([a-z])([A-Z])/g, '$1-$2') // from PascalCase or camelCase
    .toLowerCase()
    .replace(/-+/g, '-'); // remove duplicate dashes
};

const camelCase = input => {
  return input
    .trim()
    .replace(/^[A-Z]/, g => g[0].toLowerCase()) // from PascalCase
    .replace(/[-_ ]([a-z])/g, g => g[1].toUpperCase()) // from kebab-case or snake_case (or spaces)
    .replace(/ /g, ''); // remove any remaining spaces
};

module.exports = {
  kebabCase,
  camelCase
};
