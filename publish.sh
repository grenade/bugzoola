#!/bin/bash

git_commit_hash=$(git log -1 --format="%h")
git_remote=$(git config --get remote.origin.url)

git clone "https://${GH_TOKEN}@${GH_REF}" pages_repo
rm -rf pages_repo/${GIT_SUBDIR}
cp -r dist pages_repo/${GIT_SUBDIR}
cd pages_repo
git config user.name "${GIT_NAME}"
git config user.email "${GIT_EMAIL}"
git add ${GIT_SUBDIR} -A
git commit -m "Travis CI publish of ${git_remote/.git/}/${git_commit_hash}"
git push --quiet "https://${GH_TOKEN}@${GH_REF}" master:master > /dev/null 2>&1
