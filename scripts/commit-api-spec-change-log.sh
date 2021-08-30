#!/bin/sh
echo "Running update changelog script"
changeLog="$1"
echo "$changeLog"
node scripts/update-change-log.js "$changeLog"
echo "Git configurations"
git config --global user.email "team_interfaces+github@twilio.com"
git config --global user.name "twilio-dx"
git add -A
if [ -n "$(git status --porcelain)" ]; then
  branch=$(git branch --show-current)
  echo "Current branch: $branch"
  echo "There are changes to commit.";
  commitMessage=''
  if [ "$2" == 0 ] || [ "$2" == 1 ]
  then
    commitMessage='feat: Updated api definitions changelog in CHANGES.md'
  elif [ "$2" == 2 ]
  then
    commitMessage='fix: Updated api definitions changelog in CHANGES.md'
  else
    echo "Invalid versionType: $2";
    exit
  fi
  echo "Commit message:$commitMessage"
  git commit -m "$commitMessage"
  git push origin "$branch"
else
  echo "No changes to commit";
fi
