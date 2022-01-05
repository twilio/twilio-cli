#!/bin/sh
echo "Running revert last commit script"
branch="$1"
echo "Git configurations :"
git config --global user.email "team_interfaces+github@twilio.com"
git config --global user.name "twilio-dx"
echo $branch
nCommit=$(git rev-parse --verify HEAD)
nCommitAuthor=$(git log -n 1 --pretty=format:'%an' $nCommit)
if [[ $nCommitAuthor == *"semantic-release-bot"* ]]; then
  echo "Reverting commit by semantic release bot:"
  echo $(git rev-parse --verify HEAD)
  git revert $(git rev-parse --verify HEAD)
  git push origin refs/heads/$1:refs/heads/$1
fi
nCommit=$(git rev-parse --verify HEAD)
nCommitAuthor=$(git log -n 1 --pretty=format:'%an' $nCommit)
if [[ $nCommitAuthor == *"twilio-dx"* ]]; then
  echo "Reverting commit for oai spec:"
  echo $(git rev-parse --verify HEAD)
  git revert $(git rev-parse --verify HEAD)
  git push origin refs/heads/$1:refs/heads/$1
fi

