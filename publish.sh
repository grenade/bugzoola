#!/bin/bash

git_commit_hash=$(git log -1 --format="%h")
git_remote=$(git config --get remote.origin.url)
git_remote=${git_remote/git:/https:}

echo "Publishing ${git_remote/.git/}/commit/${git_commit_hash} to https://${GH_REF/.git/}/tree/${GH_PAGES_BRANCH}/${GH_PAGES_SUBDIR}"

git clone "https://${GH_TOKEN}@${GH_REF}" pages_repo
rm -rf pages_repo/${GH_PAGES_SUBDIR}
cp -r dist pages_repo/${GH_PAGES_SUBDIR}
cd pages_repo
git config user.name "${GIT_NAME}"
git config user.email "${GIT_EMAIL}"
git add ${GH_PAGES_SUBDIR} -A
git commit -m "Travis CI publish of ${git_remote/.git/}/commit/${git_commit_hash}"
git push --quiet "https://${GH_TOKEN}@${GH_REF}" master:${GH_PAGES_BRANCH} > /dev/null 2>&1
