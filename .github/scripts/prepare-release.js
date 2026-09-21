/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const { getNextRelease } = require('./next-release');

const changelogFile = 'CHANGES.md';

/**
 * Writes the next version into package.json and prepends its notes to
 * CHANGES.md, so the commit that gets published is the commit that contains
 * the version.
 *
 * This replaces @semantic-release/changelog and the version half of
 * @semantic-release/npm's prepare step, which cannot be used here: they run
 * inside a release, after the tag has already been created.
 *
 * Emits to $GITHUB_OUTPUT: version, prepared.
 */
const prepareRelease = async () => {
  const next = await getNextRelease();

  if (!next) {
    console.log('No relevant changes; nothing to prepare.');
    appendOutput({ version: '', prepared: 'false' });
    return;
  }

  const { version, notes } = next;
  console.log(`Next release is ${version}`);

  setVersion('package.json', version, (json) => {
    json.version = version;
  });

  // The lockfile carries the root version in two places, and npm ci treats a
  // mismatch with package.json as a broken lockfile.
  setVersion('package-lock.json', version, (json) => {
    json.version = version;
    if (json.packages && json.packages['']) {
      json.packages[''].version = version;
    }
  });

  if (notes) {
    const existing = fs.existsSync(changelogFile) ? fs.readFileSync(changelogFile, 'utf8') : '';
    if (existing.includes(notes)) {
      console.log('Notes are already in the changelog; leaving it alone.');
    } else {
      fs.writeFileSync(changelogFile, `${notes}\n\n${existing}`, 'utf8');
      console.log(`Prepended release notes to ${changelogFile}`);
    }
  }

  appendOutput({ version, prepared: 'true' });
};

const setVersion = (file, version, mutate) => {
  const filePath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.log(`${file} not found; skipping.`);
    return;
  }
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  mutate(json);
  fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
  console.log(`Set ${file} version to ${version}`);
};

const appendOutput = ({ version, prepared }) => {
  if (!process.env.GITHUB_OUTPUT) return;
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\nprepared=${prepared}\n`);
};

module.exports = { prepareRelease };
