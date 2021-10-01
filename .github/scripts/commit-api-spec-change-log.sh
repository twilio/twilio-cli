#!/bin/sh
echo "Running update changelog script"
changeLog="$1"
versionType="$2"
echo "$changeLog"
node .github/scripts/update-change-log.js "$changeLog"
echo "Git configurations"
git config --global user.email "team_interfaces+github@twilio.com"
git config --global user.name "twilio-dx"
git add -A
if [ -n "$(git status --porcelain)" ]; then
  branch=$(git branch --show-current)
  echo "Current branch: $branch"
  echo "There are changes to commit.";
  commitMessage=''
  if [ "$versionType" == 0 ] || [ "$versionType" == 1 ]
  then
    commitMessage='oaiFeat: Updated api definitions changelog in CHANGES.md'
  elif [ "$versionType" == 2 ]
  then
    commitMessage='oaiFix: Updated api definitions changelog in CHANGES.md'
  else
    echo "Invalid versionType: $versionType";
    exit
  fi
  echo "Commit message:$commitMessage"
  git commit -m "$commitMessage"
  git push origin "$branch"
else
  echo "No changes to commit";
fi
