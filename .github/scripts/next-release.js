/* eslint-disable no-console */
const semanticRelease = require('semantic-release');

/**
 * Asks semantic-release what the next release would be, without releasing it.
 *
 * dryRun is essential here, not just cautious: semantic-release creates and
 * pushes the git tag itself, before the publish plugins run. A non-dry run
 * during the prepare phase would therefore tag the commit that does *not* yet
 * contain the new version, which is the defect this whole flow exists to fix.
 *
 * Returns { version, notes } or null when there is nothing to release.
 */
const getNextRelease = async () => {
  const result = await semanticRelease({ dryRun: true, ci: true });
  if (!result || !result.nextRelease) {
    return null;
  }
  const { version, notes } = result.nextRelease;
  return { version, notes: notes || '' };
};

module.exports = { getNextRelease };
