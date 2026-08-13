# Releasing

This repo doesn't ship a package or a built artifact, it's a set of Docker tutorials. A "release" here just means: tag a point in time as a checkpoint, worth pinning if you want to come back to exactly what this repo taught then. That's useful because `welcome-to-docker/` tracks an upstream repo that changes on its own, and because the tutorials here will keep gaining fixes (see `FEATURE_IDEAS.md`).

## Two channels

**Stable**, tag `vX.Y.Z`, for example `v1.0.0`.
Published as a normal GitHub Release. Shows up as "Latest release" on the repo's Releases page.

**Pre-release**, tag `vX.Y.Z-alpha.N`, `vX.Y.Z-beta.N`, or `vX.Y.Z-rc.N`, for example `v1.1.0-beta.1`.
Published as a GitHub *pre-release*. Still visible on the Releases page, but flagged so it doesn't get mistaken for the current stable checkpoint.

The `.github/workflows/release.yml` workflow decides which channel a tag belongs to by checking whether the tag name ends in `-alpha`, `-beta`, or `-rc` (optionally followed by a number, like `-beta.2` or `-rc1`). Anything else is treated as stable.

## Cutting a release

1. Make sure `main` is in the state you want to tag (all the changes you want included are already merged/committed).
2. Tag it and push the tag:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

   Or for a pre-release:

   ```bash
   git tag v1.1.0-beta.1
   git push origin v1.1.0-beta.1
   ```

3. That push triggers `.github/workflows/release.yml`, which runs `gh release create` with `--generate-notes`. GitHub builds the release notes itself, from the commits between this tag and the previous one, so there's nothing to fill in by hand.
4. Check the repo's Releases page. The release should show up within a minute or so, marked "Pre-release" if the tag matched one of the suffixes above, otherwise as a normal release.

## Deleting or fixing a bad tag

Tags aren't set in stone. If you push one by mistake:

```bash
git push --delete origin v1.0.0   # remove the tag from GitHub
git tag -d v1.0.0                 # remove it locally
gh release delete v1.0.0          # remove the GitHub Release it created, if any
```

Then tag again once things are right.

## Why no version numbers appear anywhere else in the repo

There's no `package.json` at the repo root and nothing here gets published to a registry, so there's no single file that "the version" lives in. The git tag is the only source of truth for what release you're looking at.
