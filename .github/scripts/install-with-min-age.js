// Installs dependencies without resolving any third-party version younger than MIN_DAYS, because
// internal Artifactory blocks fresh versions for CI. Our own @twilio/* packages are exempt: they are
// released by us and are always newer than the cutoff right after a release.
// Stage 1: resolve everything except @twilio/* with `npm install --before=<cutoff>`.
// Stage 2: full install that adds @twilio/*, with --before set to the newest @twilio/* release it resolves, so
// their own dependencies are not resolved past that release (and stay on the locked versions where possible).
const fs = require('fs');
const { execFileSync } = require('child_process');

const minDays = Number(process.env.MIN_AGE_DAYS || 2);
const cutoff = new Date(Date.now() - minDays * 24 * 3600 * 1000).toISOString();
const npm = (...args) => execFileSync('npm', ['install', '--omit=optional', ...args], { stdio: 'inherit' });

const npmView = (spec, field) => JSON.parse(execFileSync('npm', ['view', spec, field, '--json'], { encoding: 'utf8' }));

const original = fs.readFileSync('package.json', 'utf8');
const pkg = JSON.parse(original);
const twilioPackages = {};
for (const field of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
  for (const [name, range] of Object.entries(pkg[field] || {})) {
    if (!name.startsWith('@twilio/')) continue;
    twilioPackages[name] = range;
    delete pkg[field][name];
  }
}

// The cutoff for stage 2: the publish time of the newest version each @twilio/* range resolves to, but never
// earlier than the stage 1 cutoff.
const stage2Cutoff = () => {
  let latest = new Date(cutoff).getTime();
  for (const [name, range] of Object.entries(twilioPackages)) {
    const matching = [].concat(npmView(`${name}@${range}`, 'version'));
    const published = npmView(name, 'time')[matching[matching.length - 1]];
    latest = Math.max(latest, new Date(published).getTime());
  }
  return new Date(latest).toISOString();
};

try {
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  console.log(`stage 1: third-party packages only, --before=${cutoff}`);
  // Skip lifecycle scripts: postinstall (welcome.js) needs @twilio/cli-core, which stage 1 leaves out.
  npm('--ignore-scripts', `--before=${cutoff}`);
} finally {
  fs.writeFileSync('package.json', original);
}
const before = stage2Cutoff();
console.log(`stage 2: full install including @twilio/*, --before=${before}`);
npm(`--before=${before}`);
