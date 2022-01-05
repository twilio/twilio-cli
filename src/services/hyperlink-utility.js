const ENV_VTE = 'VTE_VERSION';
const ENV_WIN = 'WT_SESSION';
function supportsHyperlink() {
  const { env } = process;
  const supports = require('supports-hyperlinks');
  // disbaling for Ubuntu terminal
  if (ENV_VTE in env) {
    return false;
  }

  if (supports.stdout) {
    return true;
  }
  // support for Windows terminal
  if (ENV_WIN in env) {
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
