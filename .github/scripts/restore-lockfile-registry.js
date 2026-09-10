// Rewrites internal Artifactory URLs in the lockfile back to public registry URLs.
// Keeps committed lockfiles usable by external contributors while CI uses Artifactory.
const fs = require('fs');
const path = require('path');
const isYarn = fs.existsSync(path.join(__dirname, '..', '..', 'yarn.lock'));
const lockfile = path.join(__dirname, '..', '..', isYarn ? 'yarn.lock' : 'package-lock.json');
const publicRegistry = isYarn ? 'https://registry.yarnpkg.com' : 'https://registry.npmjs.org';
if (!fs.existsSync(lockfile)) process.exit(0);
const original = fs.readFileSync(lockfile, 'utf8');
const updated = original.replace(
  /https:\/\/[^/]+\/{1,2}artifactory\/api\/npm\/[^/]+(\/[^\s"]+)/g,
  `${publicRegistry}$1`
);
if (updated !== original) fs.writeFileSync(lockfile, updated, 'utf8');
