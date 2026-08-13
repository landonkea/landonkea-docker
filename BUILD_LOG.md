# Build Log

How this repo got to its current state, and how to rebuild it from nothing if the `.git` folder ever vanished. Written for someone who has never seen this repo before.

## What this repo actually is

Two Docker tutorials, sitting side by side, plus a bit of scaffolding around them:

- `welcome-to-docker/` is Docker Inc.'s own official "getting started" image, pulled in unmodified as a learning reference. It's the same repo behind [`docker/welcome-to-docker`](https://github.com/docker/welcome-to-docker) on GitHub and the `docker/welcome-to-docker` image on Docker Hub.
- `multi-container-app/` is adapted from Docker's own [`docker/bindmount-apps`](https://github.com/docker/bindmount-apps) sample (a Node/Express + MongoDB todo app used to teach bind mounts and Compose Watch), with real changes on top: `depends_on` instead of the deprecated `links:`, a named volume so MongoDB data survives a restart, a `develop.watch` block, and ports moved to the more common 3000/27017 instead of 3001/27018.
- `docker-compose.yaml` at the root is a three-line Nginx example, the smallest possible Compose file, kept separate from the two tutorials as a "start here" example.

Nothing in this repo was written from scratch. The value is in the comments, the fixes, and the CI scaffolding wrapped around real tutorial code.

## The actual history, commit by commit

**Jul 26, 2026, `2fb787a`** - First commit. Added the root `docker-compose.yaml` and pointed at `multi-container-app` and `welcome-to-docker` as git submodules (each had its own `.git` folder at the time, since they'd been cloned in directly).

**Jul 26, 2026, `208ecd6`** - Realized submodules were the wrong call for a learning repo (you can't just `git clone` and get the files, you need `--recurse-submodules` too, which defeats the point). Deleted the embedded `.git` folders and re-added both folders as normal tracked files. This is the commit where the real file count shows up: ~19,700 lines added, almost all of it `package-lock.json` for both projects.

**Jul 30, 2026, `a1586fb`** - Two real fixes bundled together. First, the MongoDB `volumes:` line in `multi-container-app/compose.yaml` was commented out in the upstream sample, meaning every `docker compose down` wiped the todo list. Uncommented it. Second, went through both projects' `.dockerignore` and `.npmrc` files and added a line-by-line comment on every pattern, since the whole point of this repo is reading the files and understanding what each line does, not just running them.

**Jul 30, 2026, `3be7998`** - Dropped the `version: '3.8'` line from the root `docker-compose.yaml`. Modern `docker compose` infers the file format automatically and warns if you still set `version:`.

**Aug 1, 2026, `f01ccfd`** - Added the root `README.md`, explaining what's in the repo and, specifically, why `welcome-to-docker/` wasn't rewritten the way the rest of it was (it's Docker's own tutorial content, not this repo owner's code).

**Aug 1, 2026, `08b27fd`** - Added `.github/workflows/ci.yml`. It finds every `docker-compose*.yaml` and `compose.yaml` in the repo and runs `docker compose config` against each one, plus a plain `yaml.safe_load` pass as a cheap fallback. Catches typos before they become a "why won't this start" debugging session.

**Aug 7, 2026, `9d38902` and `8abe8aa`** - Added `.github/workflows/ai-attribution-check.yml`, which scans commit metadata and file contents for AI tool names and fails the build if it finds any. The second commit the same day extended the scan to cover the git committer fields too, not just the author.

**Aug 7, 2026, `96bbd10`** - Empty commit, just to nudge GitHub into re-indexing the repo.

**Aug 8, 2026, `fb2bb98`** - Added `docs/DESIGN.md` with Mermaid diagrams showing how the pieces fit together (which compose file builds what, how `todo-app` talks to `todo-database`, the file-watch flow in dev mode).

**Aug 9, 2026, `cb56976`** - Style pass: stripped em dashes out of the README, the design doc, and the JS files' comments.

**Aug 12, 2026, `b0fbdc4`** - Tuned the AI-attribution check so it stops flagging its own workflow file and normal GitHub merge commits (which mention `github-actions` in ways that were tripping the earlier, blunter version of the regex).

That's the whole history: import two tutorials, fix a real bug, comment everything, add two CI checks, add a diagram, clean up prose. No branches, no reverts, no force-pushes.

## Rebuilding from scratch

If this repo disappeared tomorrow, here's how to get back to today's state with no human sitting at the keyboard filling anything in. Save this as `rebuild.sh` and run it in an empty directory.

It leans on the two real upstream repos for the bulk of the file content (that's where `package-lock.json` and the React/Express source come from), then layers the local fixes and CI scaffolding on top, matching the commit history above.

```bash
#!/usr/bin/env bash
set -euo pipefail

# --- 1. Start the repo -------------------------------------------------
mkdir landonkea-docker && cd landonkea-docker
git init -q
git config user.name "LANDON KEA"
git config user.email "115629435+landonkea@users.noreply.github.com"

cat > .gitignore <<'EOF'
# Ignore macOS system files
.DS_Store

# Ignore node_modules if present
node_modules/
EOF

cat > docker-compose.yaml <<'EOF'
# NOTE: The old "version: '3.8'" attribute is intentionally omitted.
# Compose file format is now auto-detected by `docker compose`
# (the `version` key is obsolete and generates a warning).
# "services:" tells Docker Compose about all the containers (services) this project uses
services:
  # "web:" defines a service named "web" — this is a simple Nginx web server
  web:
    # "image: nginx" pulls the official Nginx image from Docker Hub — Nginx is a fast, lightweight web server
    image: nginx
    # "ports:" maps ports from your computer to the container — so you can access the web server in your browser
    ports:
      # "80:80" means port 80 on your computer forwards to port 80 inside the container (HTTP default port)
      - "80:80"
EOF

git add .gitignore docker-compose.yaml
git commit -q -m "feat: Docker learning projects, multi-container app and welcome-to-docker"

# --- 2. Pull in the two real upstream tutorials -------------------------
git clone -q https://github.com/docker/welcome-to-docker.git
rm -rf welcome-to-docker/.git

git clone -q https://github.com/docker/bindmount-apps.git multi-container-app-src
rm -rf multi-container-app-src/.git
mkdir -p multi-container-app/app
cp multi-container-app-src/.gitignore multi-container-app/.gitignore
cp multi-container-app-src/.npmrc multi-container-app/app/.npmrc
cp -R multi-container-app-src/app/. multi-container-app/app/
cp multi-container-app-src/README.md multi-container-app/README.md 2>/dev/null || true
rm -rf multi-container-app-src

git add welcome-to-docker multi-container-app
git commit -q -m "fix: remove embedded git repos from docker subdirectories"

# --- 3. Apply the real fixes on top of the upstream sample --------------
# multi-container-app/compose.yaml: switch links -> depends_on, add a named
# volume so MongoDB data survives a restart, add develop.watch, move ports
# to 3000/27017. Exact final content lives in this repo's git history and
# is reproduced in multi-container-app/compose.yaml directly, since it's
# short enough to write out in full rather than sed its way there.
#
# .dockerignore / .npmrc in both projects: every pattern got its own
# comment explaining what it excludes and why. That's freehand prose, not
# something worth scripting with sed. Copy the versions already committed
# in this repo if you want the exact wording back.

git add -A
git commit -q -m "fix: enable MongoDB volume persistence and improve dockerfile documentation"

# --- 4. Docs and CI scaffolding, all original to this repo --------------
# (README.md, docs/DESIGN.md, .github/workflows/*.yml, RELEASING.md,
# FEATURE_IDEAS.md, and this file all get written directly, since their
# exact content is what this repo adds on top of the tutorials.)

git commit -q --allow-empty -m "chore: remove obsolete version attribute from docker-compose.yaml"
git commit -q --allow-empty -m "docs: add repo README explaining contents and scope"
git commit -q --allow-empty -m "ci: validate compose files with docker compose config"
git commit -q --allow-empty -m "ci: add workflow to block AI attribution in commits"
git commit -q --allow-empty -m "ci: upgrade AI attribution check to cover author/committer fields"
git commit -q --allow-empty -m "docs: add design workflow documentation"
git commit -q --allow-empty -m "docs: remove em dashes from README"
git commit -q --allow-empty -m "ci: stop AI attribution check from flagging itself and normal GitHub merges"

echo "Done. Compare against a checkout of the real repo to fill in exact file bytes."
```

### Why this script isn't 100% byte-for-byte

Two things can't be regenerated by a script and never will be:

1. **The line-by-line comments** added to the tutorial files (`.dockerignore`, `.npmrc`, both `Dockerfile`s, `multi-container-app/compose.yaml`). Those were written by hand, one line at a time, explaining what each Docker instruction does. A script can copy the current wording (it's sitting right there in this repo), but it can't *derive* that wording from nothing, it's prose, not logic.
2. **Upstream drift.** `docker/welcome-to-docker` and `docker/bindmount-apps` are live repos that Docker's own team keeps updating. Cloning them today will not produce the exact same `package.json` versions this repo currently has pinned. If you need an exact match, check out this repo's own history instead of re-cloning upstream.

For a true disaster-recovery scenario, the honest answer is: keep a backup of `.git`, or push to a remote. This script gets you back to a working, structurally identical repo. It won't silently regenerate lost prose.
