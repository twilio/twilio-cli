/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const { getNextRelease } = require('./next-release');

/**
 * Guards against version drift between preparing a release and publishing it.
 *
 * The version is decided when the release PR is opened, but semantic-release
 * recomputes it at publish time. If anything else merged in between, the two
 * disagree, and publishing would ship a version that package.json does not
 * claim -- silently reintroducing the mismatch this flow prevents.
 *
 * Fails the release in that case; rebasing or reopening the release PR fixes it.
 */
const verifyReleaseVersion = async () => {
  const next = await getNextRelease();
  if (!next) {
    console.log('semantic-release reports nothing to release; leaving the check to the release itself.');
    return;
  }

  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const { version: committed } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (committed !== next.version) {
    throw new Error(
      `Version drift: package.json is ${committed} but semantic-release now computes ${next.version}. ` +
        'Something merged to main after the release PR was opened. Re-run the prepare stage to open a fresh release PR.',
    );
  }

  console.log(`package.json (${committed}) matches the computed release version.`);
};

module.exports = { verifyReleaseVersion };
