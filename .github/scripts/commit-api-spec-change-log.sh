#!/bin/bash
#
# Prepares a release: folds the api-definitions changelog into CHANGES.md and
# pins the freshly released @twilio/cli-core version in package.json, then
# proposes both as a single PR.
#
# This used to make two commits and push them straight to main. That is now
# rejected by the org-level "Twilio default branch protections" ruleset
# (GH013: "Changes must be made through a pull request"), so the changes land
# as a PR and the release itself runs afterwards, off the merge commit (see
# release-on-prep-merge.yml).
#
# The two commits are combined into one because a squash-merged PR produces a
# single commit anyway. The message keeps the oaiFeat:/oaiFix: prefix whenever
# there are api changes, since that is what semantic-release reads to decide
# between a minor and a patch release.
#
# Usage: commit-api-spec-change-log.sh <change-log> <version-type>
# Requires: CLI_CORE_TAG, GH_TOKEN.
# Emits to $GITHUB_OUTPUT: prep-pr-opened.
set -euo pipefail

changeLog="$1"
versionType="${2:-}"

echo "Running update changelog script"
echo "$changeLog"
node .github/scripts/update-change-log.js "$changeLog"
node .github/scripts/update-cli-core-release-version.js
make install

prepPrOpened=false
if [ -n "$(git status --porcelain)" ]; then
  echo "There are changes to commit."
  if [ -n "$changeLog" ]; then
    case "$versionType" in
      0|1) commitMessage='oaiFeat: Updated api definitions changelog in CHANGES.md' ;;
      2)   commitMessage='oaiFix: Updated api definitions changelog in CHANGES.md' ;;
      *)   echo "Invalid versionType: $versionType"; exit 1 ;;
    esac
  else
    commitMessage='chore: update cli-core version'
  fi
  echo "Commit message:$commitMessage"

  prBody=$(cat <<BODY
Release prep for twilio-cli.

- api-definitions changelog folded into \`CHANGES.md\`
- \`@twilio/cli-core\` pinned to \`${CLI_CORE_TAG:-unknown}\`

Merging this PR triggers the twilio-cli release for these changes.

_Opened by the [Cli Release workflow](${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY:-twilio/twilio-cli}/actions/runs/${GITHUB_RUN_ID:-})._
BODY
)
  bash .github/scripts/open-pr.sh \
    "release-prep-${GITHUB_RUN_ID:-manual}" \
    "$commitMessage" \
    "$commitMessage" \
    "$prBody"
  prepPrOpened=true
else
  echo "No changes to commit"
fi

echo "prep-pr-opened=$prepPrOpened" >> "$GITHUB_OUTPUT"
