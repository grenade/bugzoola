#!/bin/bash

git clone "https://${GH_TOKEN}@${GH_REF}" pages_repo
rm -rf pages_repo/${GH_PAGES_SUBDIR}
cp -r dist pages_repo/${GH_PAGES_SUBDIR}
cd pages_repo
git config user.name "${GIT_NAME}"
git config user.email "${GIT_EMAIL}"
git add ${GH_PAGES_SUBDIR} -A
git commit -m "Travis CI publish ${TRAVIS_JOB_NUMBER} of https://github.com/${TRAVIS_REPO_SLUG}/commit/${TRAVIS_COMMIT}"
git push --quiet "https://${GH_TOKEN}@${GH_REF}" master:${GH_PAGES_BRANCH} > /dev/null 2>&1
