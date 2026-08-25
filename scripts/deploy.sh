#!/usr/bin/env bash
# Builds the site and publishes it to the gh-pages branch, which is what
# GitHub Pages serves.
#
# Why a branch rather than a workflow: adding .github/workflows/ needs an
# OAuth token with the `workflow` scope, which this machine's gh does not
# have. The branch route needs no special scope. If you ever add the
# workflow, switch Pages' source back to "GitHub Actions" or it will keep
# serving this branch and ignore the workflow entirely.
set -euo pipefail

cd "$(dirname "$0")/.."
REPO_URL=$(git remote get-url origin)
STAGING=$(mktemp -d)
trap 'rm -rf "$STAGING"' EXIT

echo "building..."
npm run build

# The build must carry the /portfolio/ base or every asset 404s at the
# domain root. Fail loudly rather than publishing a page that cannot boot.
if ! grep -q '"/portfolio/assets/' dist/index.html; then
  echo "ERROR: dist/index.html is not built for the /portfolio/ base." >&2
  echo "       Check the base option in vite.config.ts." >&2
  exit 1
fi

cp -R dist/. "$STAGING/"
# Jekyll skips anything beginning with an underscore; this turns it off.
touch "$STAGING/.nojekyll"

cd "$STAGING"
git init -q
git checkout -qb gh-pages
git add -A
git -c user.email="$(git -C - config user.email 2>/dev/null || echo lee_lionel_96@hotmail.com)" \
    -c user.name="$(git -C - config user.name 2>/dev/null || echo lee-lionel)" \
    commit -q -m "Deploy $(git -C "$OLDPWD" rev-parse --short HEAD 2>/dev/null || date -u +%Y-%m-%dT%H:%MZ)"
git remote add origin "$REPO_URL"

echo "publishing to gh-pages..."
git push -qf origin gh-pages

echo "done — https://lee-lionel.github.io/portfolio/"
echo "Pages rebuilds on its own; give it a minute."
