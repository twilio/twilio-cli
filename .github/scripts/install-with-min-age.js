// Installs dependencies without resolving any third-party version younger than MIN_DAYS, because
// internal Artifactory blocks fresh versions for CI. Our own @twilio/* packages are exempt: they are
// released by us and are always newer than the cutoff right after a release.
// Stage 1: resolve everything except @twilio/* with `npm install --before=<cutoff>`.
// Stage 2: full install without --before, which adds @twilio/* and keeps the locked versions.
const fs = require('fs');
const { execFileSync } = require('child_process');

const minDays = Number(process.env.MIN_AGE_DAYS || 2);
const cutoff = new Date(Date.now() - minDays * 24 * 3600 * 1000).toISOString();
const npm = (...args) => execFileSync('npm', ['install', '--omit=optional', ...args], { stdio: 'inherit' });

const original = fs.readFileSync('package.json', 'utf8');
const pkg = JSON.parse(original);
for (const field of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
  for (const name of Object.keys(pkg[field] || {})) if (name.startsWith('@twilio/')) delete pkg[field][name];
}

try {
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  console.log(`stage 1: third-party packages only, --before=${cutoff}`);
  npm(`--before=${cutoff}`);
} finally {
  fs.writeFileSync('package.json', original);
}
console.log('stage 2: full install including @twilio/* (no --before)');
npm();
