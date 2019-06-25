const kebabCase = input => {
  return input
    .trim()
    .replace(/[ _]/g, '-') // from snake_case (or spaces)
    .replace(/([a-z\d])([A-Z])/g, '$1-$2') // from PascalCase or camelCase
    .toLowerCase()
    .replace(/-+/g, '-') // remove duplicate dashes
    .replace(/^-|-$/g, ''); // remove leading and trailing dashes
};

const camelCase = input => {
  return input
    .trim()
    .replace(/^[A-Z]/, g => g[0].toLowerCase()) // from PascalCase
    .replace(/[A-Z]{2,}/g, g => g.toLowerCase()) // consecutive caps (e.g. "AWS")  TODO: What about AWSRoute53?
    .replace(/[-_ ]([a-z])/g, g => g[1].toUpperCase()) // from kebab-case or snake_case (or spaces)
    .replace(/ /g, ''); // remove any remaining spaces
};

const capitalize = input => {
  return input.trim().replace(/^[a-z]/, g => g[0].toUpperCase()); // upper the first character
};

module.exports = {
  kebabCase,
  camelCase,
  capitalize
};
