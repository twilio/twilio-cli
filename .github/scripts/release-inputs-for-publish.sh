#!/bin/bash
#
# Finds the release inputs belonging to the release being published.
#
# The release now happens on the release PR's merge commit, one or two commits
# after the prep commit, so these are not in the commit being released:
#
#   * change-log   = the lines the prep commit added to CHANGES.md
#   * cli-core-tag = the @twilio/cli-core version currently pinned
#
# The prep commit is the most recent oaiFeat:/oaiFix:/cli-core-bump commit since
# the previous tag.
#
# Requires full history (fetch-depth: 0).
# Emits to $GITHUB_OUTPUT: change-log, cli-core-tag.
set -euo pipefail

prevTag=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || true)
range="HEAD"
if [ -n "$prevTag" ]; then
  range="${prevTag}..HEAD"
  echo "Looking for a release-prep commit in ${range}"
else
  echo "No previous tag found; searching all history"
fi

sha=$(git log --format='%H %s' "$range" \
  | grep -m1 -E '^[0-9a-f]+ (oai(Feat|Fix):|chore: update cli-core version)' \
  | cut -d' ' -f1 || true)

changeLog=''
if [ -n "$sha" ]; then
  echo "Found release-prep commit $sha: $(git log -1 --format='%s' "$sha")"
  changeLog=$(git diff "$sha^" "$sha" -- CHANGES.md | grep '^+' | grep -v '^+++' | sed 's/^+//' || true)
else
  echo "No release-prep commit in this release; release notes will come from the commit messages alone."
fi

cliCoreTag=$(node -e "console.log(require('./package.json').dependencies['@twilio/cli-core'])")
echo "Cli-core tag: $cliCoreTag"

{
  echo "change-log<<__CLI_CHANGELOG_EOF__"
  echo "$changeLog"
  echo "__CLI_CHANGELOG_EOF__"
  echo "cli-core-tag=$cliCoreTag"
} >> "$GITHUB_OUTPUT"
