#!/usr/bin/env node
/* eslint-disable no-console, no-process-exit */
/**
 * Guard against a silent ejs regression.
 *
 * ejs 3.x carries CVE-2023-29827 (CVSS 9.8) with no fixed 3.x release, and is
 * blocked by our dependency curation policy. It is not a direct dependency
 * here: it arrives transitively through @oclif/core, whose 1.x/2.x lines still
 * declare `ejs: ^3.x`. The floor is held only by the `overrides` block in
 * package.json, which is easy to drop by accident during a dependency bump,
 * a lockfile regeneration, or a merge.
 *
 * This script asserts the floor from three independent angles so that a
 * regression fails CI loudly instead of shipping:
 *
 *   1. package.json   — the `overrides.ejs` declaration still exists.
 *   2. package-lock.json — every resolved ejs entry satisfies the floor.
 *   3. node_modules   — what is actually on disk satisfies the floor
 *                       (skipped when dependencies are not installed).
 *
 * Checks 1 and 2 need no install, so this runs as a fail-fast step before
 * `npm ci` as well as after it.
 *
 * Usage: node .github/scripts/verify-ejs-override.js
 * Exits 0 when the floor holds, 1 otherwise.
 */

const fs = require('fs');
const path = require('path');

/*
 * The floor the override must hold. ejs 6 is the first line that is both free
 * of the 3.x advisory and permitted by dependency curation.
 */
const PACKAGE = 'ejs';
const EXPECTED_OVERRIDE = '^6.0.1';
const MIN_VERSION = [6, 0, 1];
const MAX_MAJOR_EXCLUSIVE = 7;
const ADVISORY = 'CVE-2023-29827';

const repoRoot = path.join(__dirname, '..', '..');
const isGitHubActions = Boolean(process.env.GITHUB_ACTIONS);

const problems = [];
const checks = [];

function fail(message) {
  problems.push(message);
}

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(String(version));
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function compare(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  }
  return 0;
}

/** True when `version` is >= MIN_VERSION and below the next major. */
function satisfiesFloor(version) {
  const parsed = parseVersion(version);
  if (!parsed) return false;
  return compare(parsed, MIN_VERSION) >= 0 && parsed[0] < MAX_MAJOR_EXCLUSIVE;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// --- 1. package.json declares the override -----------------------------------
const packageJsonPath = path.join(repoRoot, 'package.json');
const packageJson = readJson(packageJsonPath);
const declared = packageJson.overrides && packageJson.overrides[PACKAGE];

if (declared === EXPECTED_OVERRIDE) {
  checks.push(`package.json overrides.${PACKAGE} = "${declared}"`);
} else if (declared) {
  // A different range is not automatically wrong, but it must not drop the floor.
  const floorOfDeclared = parseVersion(declared.replace(/^[^\d]*/, ''));
  if (!floorOfDeclared || compare(floorOfDeclared, MIN_VERSION) < 0 || floorOfDeclared[0] >= MAX_MAJOR_EXCLUSIVE) {
    fail(
      `package.json pins "overrides.${PACKAGE}": "${declared}", which does not hold the ${EXPECTED_OVERRIDE} floor.`,
    );
  } else {
    checks.push(`package.json overrides.${PACKAGE} = "${declared}" (holds the ${EXPECTED_OVERRIDE} floor)`);
  }
} else {
  fail(
    `package.json is missing the "overrides.${PACKAGE}" entry. ` +
      `Restore it as "${PACKAGE}": "${EXPECTED_OVERRIDE}" — without it, @oclif/core pulls ${PACKAGE} 3.x back in.`,
  );
}

// --- 2. every resolved lockfile entry satisfies the floor --------------------
const lockfilePath = path.join(repoRoot, 'package-lock.json');
if (fs.existsSync(lockfilePath)) {
  const lockfile = readJson(lockfilePath);
  const entries = Object.entries(lockfile.packages || {}).filter(
    ([key]) => key === `node_modules/${PACKAGE}` || key.endsWith(`/node_modules/${PACKAGE}`),
  );

  if (entries.length === 0) {
    /*
     * ejs vanishing entirely is fine (nothing pulls it), but surface it: it
     * more likely means the lockfile is stale or partially written.
     */
    checks.push(`package-lock.json resolves no ${PACKAGE} entries`);
  }

  for (const [key, entry] of entries) {
    if (satisfiesFloor(entry.version)) {
      checks.push(`package-lock.json ${key} = ${entry.version}`);
    } else {
      fail(
        `package-lock.json resolves ${key} to ${PACKAGE}@${entry.version}, below the ${EXPECTED_OVERRIDE} floor ` +
          `(${ADVISORY}). Regenerate the lockfile with the override in place.`,
      );
    }
  }
} else {
  fail('package-lock.json not found — cannot verify the resolved ejs version.');
}

// --- 3. what is actually installed on disk ----------------------------------
const nodeModulesPath = path.join(repoRoot, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  const installed = [];

  /*
   * Walk node_modules looking for every physical copy of the package, including
   * nested ones that a lockfile edit could leave behind.
   */
  (function walk(dir, depth) {
    if (depth > 8) return;
    let dirents;
    try {
      dirents = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const dirent of dirents) {
      if (!dirent.isDirectory() && !dirent.isSymbolicLink()) continue;
      if (dirent.name === '.bin' || dirent.name === '.package-lock.json') continue;
      const full = path.join(dir, dirent.name);
      if (dirent.name === PACKAGE) {
        const pkg = path.join(full, 'package.json');
        if (fs.existsSync(pkg)) {
          try {
            installed.push({ dir: full, version: readJson(pkg).version });
          } catch {
            installed.push({ dir: full, version: null });
          }
        }
        continue;
      }
      // Recurse into scopes (@foo) and nested node_modules only.
      if (dirent.name.startsWith('@') || dirent.name === 'node_modules') {
        walk(full, depth + 1);
      } else {
        const nested = path.join(full, 'node_modules');
        if (fs.existsSync(nested)) walk(nested, depth + 1);
      }
    }
  })(nodeModulesPath, 0);

  if (installed.length === 0) {
    checks.push(`no ${PACKAGE} copy installed on disk`);
  }

  for (const copy of installed) {
    const relative = path.relative(repoRoot, copy.dir);
    if (satisfiesFloor(copy.version)) {
      checks.push(`installed ${relative} = ${copy.version}`);
    } else {
      fail(`installed ${relative} is ${PACKAGE}@${copy.version}, below the ${EXPECTED_OVERRIDE} floor (${ADVISORY}).`);
    }
  }
} else {
  checks.push('node_modules not present — skipped the on-disk check');
}

// --- report ------------------------------------------------------------------
if (problems.length === 0) {
  console.log(`✔ ${PACKAGE} override holds at ${EXPECTED_OVERRIDE}`);
  for (const check of checks) console.log(`  · ${check}`);
  process.exit(0);
}

const headline = `${PACKAGE} has regressed below ${EXPECTED_OVERRIDE} — ${ADVISORY} would be reintroduced`;

console.error('');
console.error(`✖ ${headline}`);
console.error('');
for (const problem of problems) {
  console.error(`  - ${problem}`);
  if (isGitHubActions) console.error(`::error file=package.json::${problem}`);
}
console.error('');
console.error('  To fix:');
console.error(`    1. Ensure package.json contains: "overrides": { "${PACKAGE}": "${EXPECTED_OVERRIDE}" }`);
console.error('    2. Regenerate the lockfile:      rm -f package-lock.json && npm install --omit=optional');
console.error(`    3. Confirm a single resolution:  npm ls ${PACKAGE}`);
console.error('');
if (checks.length > 0) {
  console.error('  Checks that did pass:');
  for (const check of checks) console.error(`    · ${check}`);
  console.error('');
}
process.exit(1);
