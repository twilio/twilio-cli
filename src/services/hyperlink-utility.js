function supportsHyperlink() {
  const { env } = process;
  const supports = require('supports-hyperlinks');
  if (supports.stdout) {
    return true;
  }
  // support for Windows terminal
  if ('WT_SESSION' in env) {
    return true;
  }
  return false;
}

function convertToHyperlink(text, link, params) {
  if (supportsHyperlink()) {
    const hyperlinker = require('hyperlinker');
    return { url: hyperlinker(text, link, params), isSupported: true };
  }
  return { url: link, isSupported: false };
}
module.exports = { convertToHyperlink, supportsHyperlink };
