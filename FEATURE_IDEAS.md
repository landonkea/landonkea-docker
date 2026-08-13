# Feature Ideas

Things this repo could grow into next. Nothing here is required, it's a menu, not a roadmap. Ideas are grouped roughly by which existing piece they build on.

## Building on `multi-container-app/` (the todo app)

1. **Add a Redis cache as a third service.** The todo app currently talks to exactly one other container (MongoDB). Adding Redis for session storage or a simple view-count cache would be the first example of a compose file with three services instead of two, and would force learning `depends_on` chains (app depends on both database and cache).
2. **Add MongoDB healthchecks and `depends_on: condition: service_healthy`.** Right now `todo-app` starts as soon as `todo-database`'s container exists, not when Mongo is actually ready to accept connections. A `healthcheck:` block on `todo-database` plus the `condition: service_healthy` form of `depends_on` is a genuinely common real-world gotcha worth demonstrating.
3. **Add a non-root `USER` instruction to `multi-container-app/app/Dockerfile`.** The Dockerfile currently runs as root inside the container, which is the default and also the thing every Docker security guide tells you to fix first. Adding a `USER node` line (the official Node image ships a `node` user already) with a comment explaining why is a natural next lesson.
4. **Add a multi-stage build to the Express Dockerfile.** Right now it's a single `FROM node` stage. Splitting into a `deps` stage and a slim runtime stage, and comparing `docker image ls` output before and after, would teach image-size optimization concretely instead of abstractly.
5. **Add a `/healthz` route to `server.js`.** Pairs with idea 2: give the app itself something for Docker's `HEALTHCHECK` (or Compose's `healthcheck:`) to poll, rather than only checking that Mongo is up.
6. **Add a `compose.override.yaml` example.** Docker Compose auto-merges `compose.override.yaml` on top of `compose.yaml` for local-only tweaks (extra ports, debug env vars) without touching the checked-in file. Good next step after `develop.watch`, which is already in place.

## Building on `welcome-to-docker/` (kept as upstream, but referenced from new material)

7. **A short "diffing against upstream" doc.** Since `welcome-to-docker/` is intentionally left unmodified, a small script or doc showing how to diff this copy against the current `docker/welcome-to-docker` GitHub repo would teach a real skill: tracking whether a vendored tutorial has drifted from its source.
8. **A second, from-scratch "hello world" Dockerfile written by hand.** `welcome-to-docker/` is upstream and deliberately untouched. A tiny sibling folder with an original single-file Dockerfile (three or four lines, heavily commented) would give the repo one example that's fully this owner's own work end to end, not adapted from someone else's tutorial.

## Building on the root `docker-compose.yaml` (the three-line Nginx example)

9. **Grow it one concept at a time in a documented sequence.** Right now it's the smallest possible Compose file. A `docs/nginx-progression.md` walking through the same file gaining a bind-mounted `index.html`, then an environment variable, then a healthcheck, one commit or one section per concept, would make it a teaching ladder rather than a single static example.
10. **Put a static HTML page behind it.** The Nginx service currently serves Nginx's default page. Bind-mounting a one-page site from a new `static-site/` folder would turn "you can reach port 80" into "you can see something you wrote," which is a better first win for a total beginner.

## Building on the CI workflows already in `.github/workflows/`

11. **Add `hadolint` as a CI check.** `ci.yml` already validates Compose files; it doesn't lint either Dockerfile. `hadolint` catches exactly the kind of mistake (missing `--no-cache-dir`, using `latest`, running as root) this repo is trying to teach people to avoid.
12. **Make CI actually build the images, not just validate the YAML.** `docker compose config` checks syntax but never confirms the Dockerfiles build. Adding a `docker compose build` step (with layer caching via `actions/cache` to keep it fast) would catch a broken `Dockerfile` before it's just a mystery on someone's laptop.
13. **Add a Trivy scan for known CVEs in the base images.** `mongo:6` and whatever Node base image the app Dockerfile pins will accumulate CVEs over time. A weekly scheduled workflow (`on: schedule`) that scans and opens an issue on findings teaches "images aren't a one-time build, they age."

## New standalone material

14. **A `TROUBLESHOOTING.md`.** A running list of real errors hit while working through these tutorials ("port is already allocated," "Cannot connect to the Docker daemon," "exec format error" on Apple Silicon) paired with the actual fix. This is the single most useful thing a learning repo can accumulate over time, since it's the stuff that isn't in the official docs.
15. **A `Makefile` or `justfile` with the handful of commands used across both projects.** `up`, `down`, `logs`, `clean` (prune volumes), `rebuild`. Small, but it's also its own lesson: wrapping Docker commands in a task runner is a real pattern, not just a shortcut.
16. **A `docs/CHEATSHEET.md` of the commands actually used in this repo.** Not a generic Docker cheatsheet copied from elsewhere, specifically the dozen or so commands this repo's own tutorials rely on (`compose up -d --watch`, `compose down -v`, `exec -it todo-database mongosh`), with one line each on what they do and why you'd reach for them here.
17. **A reverse proxy example tying the root Compose file to `multi-container-app`.** Put Nginx (or Traefik) in front of the todo app instead of exposing port 3000 directly. This connects the two existing pieces of the repo instead of leaving them as two unrelated folders, and it's a genuinely common real deployment pattern.
18. **Resource limits example.** Add `cpus:` and `mem_limit:` (or the newer `deploy.resources.limits` block) to `multi-container-app/compose.yaml` with a comment on why you'd bother on a laptop (nothing) versus in production (everything). Cheap to add, and it's a compose feature nobody stumbles onto by accident.
19. **A `docs/PORTS.md` listing every port every service in the repo uses.** Small, but with two Compose files and a scattering of `EXPOSE` lines across two Dockerfiles, "what's already using 3000/27017/8088/80" stops being obvious once a third project gets added.
20. **GHCR image publishing tied to the release workflow.** Once `.github/workflows/release.yml` exists (see `RELEASING.md`), a natural follow-up is building and pushing the `multi-container-app` image to GitHub Container Registry on stable tags only, so a tagged release is something you can actually `docker pull`, not just a git ref.
