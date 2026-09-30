/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Only these two are needed to work out the next version and its notes.
// Loading the publishing plugins as well would make this step depend on npm
// and GitHub auth, which it has no business needing: it publishes nothing, and
// the npm trusted publisher is bound to the workflow that actually publishes,
// not to this one.
const ANALYSIS_PLUGINS = ['@semantic-release/commit-analyzer', '@semantic-release/release-notes-generator'];

const pluginName = (plugin) => (Array.isArray(plugin) ? plugin[0] : plugin);

/**
 * Takes the analysis plugins, with their options, straight from .releaserc.json
 * so the version computed here matches the one the real release computes.
 */
const loadAnalysisPlugins = () => {
  const configPath = path.resolve(process.cwd(), '.releaserc.json');
  if (!fs.existsSync(configPath)) {
    return ANALYSIS_PLUGINS;
  }
  const { plugins = [] } = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const picked = plugins.filter((plugin) => ANALYSIS_PLUGINS.includes(pluginName(plugin)));
  return picked.length > 0 ? picked : ANALYSIS_PLUGINS;
};

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
  // semantic-release is ESM-only from v22. Requiring it from CommonJS yields
  // the module namespace, so the callable sits on .default.
  const semanticReleaseModule = require('semantic-release');
  const semanticRelease = semanticReleaseModule.default || semanticReleaseModule;

  if (typeof semanticRelease !== 'function') {
    throw new Error(`Could not load semantic-release: expected a function, got ${typeof semanticRelease}`);
  }

  const result = await semanticRelease({
    dryRun: true,
    ci: true,
    plugins: loadAnalysisPlugins(),
  });

  if (!result || !result.nextRelease) {
    return null;
  }
  const { version, notes } = result.nextRelease;
  return { version, notes: notes || '' };
};

module.exports = { getNextRelease, loadAnalysisPlugins };
