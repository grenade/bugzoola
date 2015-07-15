#!/bin/bash

git clone "https://${GH_TOKEN}@${GH_REF}" pages_repo
rm -rf pages_repo/bugzoolla
cp dist pages_repo/bugzoolla
cd pages_repo
git config user.name "${GIT_NAME}"
git config user.email "${GIT_EMAIL}"
git add bugzoolla -A
git commit -m "Travis CI publish"
git push --quiet "https://${GH_TOKEN}@${GH_REF}" master:master > /dev/null 2>&1
