#!/bin/bash
#
# Commits the current working tree onto a new branch, pushes it, opens a PR
# against the base branch and queues it for auto-merge.
#
# Direct pushes to main are rejected by the org-level "Twilio default branch
# protections" ruleset (GH013: "Changes must be made through a pull request"),
# so every release commit has to arrive as a PR.
#
# Auto-merge only *queues* the PR: the ruleset still requires an approving
# review, a code-owner review and last-push approval, and nothing in CI can
# bypass it. The PR therefore merges as soon as a human approves it.
#
# Usage: open-pr.sh <branch> <commit-message> <pr-title> <pr-body>
# Requires: GH_TOKEN with repo access; a checkout whose origin can be pushed to.
set -euo pipefail

branch="$1"
commitMessage="$2"
prTitle="$3"
prBody="$4"
baseBranch="${BASE_BRANCH:-main}"

git config --global user.email "team_interfaces+github@twilio.com"
git config --global user.name "twilio-dx"

git checkout -b "$branch"
git add -A
git commit -m "$commitMessage"
git push origin "$branch"

prUrl=$(gh pr create --base "$baseBranch" --head "$branch" --title "$prTitle" --body "$prBody")
echo "Opened $prUrl"

if gh pr merge "$branch" --squash --auto; then
  echo "Auto-merge enabled; the PR will merge once the required reviews are in."
else
  echo "::warning::Could not enable auto-merge on $prUrl - it must be merged manually."
fi

echo "$prUrl"
