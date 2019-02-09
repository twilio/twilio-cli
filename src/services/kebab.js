module.exports = input => {
  return input
    .trim()
    .replace(/[ _]/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/-+/g, '-');
};
