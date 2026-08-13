# landonkea-docker

Docker learning projects, small, self-contained examples used to learn Docker fundamentals (images, containers, multi-service `compose.yaml` setups, networking between containers).

## What's here

- **`welcome-to-docker/`**: Docker Inc.'s own official "getting started" tutorial image (see its `MAINTAINERS.md`, this is their upstream template, copied in for learning, not original code written here). Left as-is rather than rewritten, since it's their tutorial content, not this repo owner's.
- **`multi-container-app/`**: A standard Node.js + MongoDB "todo app" tutorial demonstrating a multi-container `compose.yaml` setup (an app service talking to a database service over Docker's internal network, see `app/config/keys.js`'s `mongoProdURI`, which points at the `todo-database` service name, not a real external host).
- **`docker-compose.yaml`** (repo root): top-level compose file.
- **`FEATURE_IDEAS.md`**: a running list of what this repo could grow into next.
- **`RELEASING.md`**: how tagged releases work here, and the difference between the pre-release and stable channels.

## Why this repo gets a lighter touch

Unlike this owner's own original projects, the code under `welcome-to-docker/` is a third-party tutorial template (Docker's own), so it wasn't rewritten/re-commented line-by-line the way this owner's own repos were. That would mean editing someone else's official example rather than their own work. Both subfolders were checked for accidentally-committed secrets (npm registry tokens, database credentials, API keys). None were found; the only "credentials-looking" value is the internal Docker Compose service hostname above, which isn't a real secret.
