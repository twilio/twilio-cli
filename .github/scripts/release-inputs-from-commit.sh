#!/bin/bash
#
# Recovers the release inputs from an already-merged release-prep commit.
#
# The prep changes and the release no longer happen in one run (the prep must
# land via PR), so the dispatch inputs that drove the prep are gone by the time
# the release runs. Both of the ones the release needs are recoverable from the
# commit itself:
#
#   * change-log   = the lines the prep commit added to CHANGES.md
#   * cli-core-tag = the @twilio/cli-core version the prep commit pinned
#
# Emits to $GITHUB_OUTPUT: change-log, cli-core-tag.
set -euo pipefail

sha="${1:-HEAD}"
echo "Deriving release inputs from commit $sha"

changeLog=$(git diff "$sha^" "$sha" -- CHANGES.md | grep '^+' | grep -v '^+++' | sed 's/^+//' || true)
cliCoreTag=$(node -e "console.log(require('./package.json').dependencies['@twilio/cli-core'])")

if [ -z "$changeLog" ]; then
  echo "::warning::No CHANGES.md additions found in $sha; releasing with empty release notes."
fi

echo "Changelog: $changeLog"
echo "Cli-core tag: $cliCoreTag"

{
  echo "change-log<<__CLI_CHANGELOG_EOF__"
  echo "$changeLog"
  echo "__CLI_CHANGELOG_EOF__"
  echo "cli-core-tag=$cliCoreTag"
} >> "$GITHUB_OUTPUT"
