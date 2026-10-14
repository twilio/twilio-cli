// Fails if package-lock.json pins a version published less than MIN_DAYS ago that was not already
// in the lockfile on the base ref. Internal Artifactory blocks such versions for CI
const fs = require('fs');
const { execFileSync } = require('child_process');

const baseRef = process.argv[2] || 'origin/main';
const minDays = Number(process.argv[3] || 2);
const cutoff = Date.now() - minDays * 24 * 3600 * 1000;

const versionsOf = text => {
  const out = new Map();
  for (const [path, info] of Object.entries(JSON.parse(text).packages || {})) {
    if (!path || !info.version) continue;
    out.set(path, info.version);
  }
  return out;
};

const nameOf = path => path.slice(path.lastIndexOf('node_modules/') + 'node_modules/'.length);

let base = new Map();
try {
  base = versionsOf(execFileSync('git', ['show', `${baseRef}:package-lock.json`], { encoding: 'utf8', maxBuffer: 1 << 28 }));
} catch (e) {
  console.warn(`could not read package-lock.json from ${baseRef}; checking every package`);
}
const current = versionsOf(fs.readFileSync('package-lock.json', 'utf8'));

const changed = [...current].filter(([path, version]) => base.get(path) !== version);
console.log(`${changed.length} package(s) added or changed vs ${baseRef}`);

const tooNew = [];
const times = new Map();
for (const [path, version] of changed) {
  const name = nameOf(path);
  if (!times.has(name)) {
    try {
      times.set(name, JSON.parse(execFileSync('npm', ['view', name, 'time', '--json', '--registry', 'https://registry.npmjs.org/'], { encoding: 'utf8', maxBuffer: 1 << 26 })));
    } catch (e) {
      console.warn(`could not look up ${name}; skipping`);
      times.set(name, {});
    }
  }
  const published = times.get(name)[version];
  if (published && Date.parse(published) > cutoff) tooNew.push({ path, version, published });
}

if (tooNew.length) {
  console.error(`\nThese lockfile entries were published less than ${minDays} days ago and will be blocked in CI:`);
  for (const t of tooNew) console.error(`  ${nameOf(t.path)}@${t.version}  (${t.published})  at ${t.path}`);
  console.error('\nRegenerate the lockfile with: npm install --before="<date 2 days ago>"');
  process.exit(1);
}
console.log(`ok: nothing newer than ${minDays} days`);
