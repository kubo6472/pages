# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
This repo (`pages`) is a collection of independent **static websites** (plain HTML/CSS + a few images). There is no build system, no package manager, no tests, and no lint config. Each top-level directory is a self-contained site:

- `tojemoc/` — deployed to Cloudflare Pages project `tjm-sk` (also has a `_redirects` file).
- `jakubdobos/` — deployed to Cloudflare Pages project `jakubdobos-eu` (has `assets/`).
- `nixies/` — deployed to Cloudflare Pages project `nixietubeclock-eu`.
- `bluenation/`, `lanserver/` — additional static sites not wired into the deploy workflow.

### Deployment
Deployment is automatic: pushing to `master` triggers `.github/workflows/main.yml`, which runs `wrangler pages deploy <dir>` for `tojemoc`, `jakubdobos`, and `nixies`. This requires the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets. These are **not** needed for local development.

### Running a site locally (dev)
Use Cloudflare Pages local dev (matches the deploy tooling and honors `_redirects`). `wrangler` is not installed globally; run it via `npx`:

```
npx --yes wrangler pages dev <dir> --port <port> --ip 0.0.0.0
```

Example: `npx --yes wrangler pages dev tojemoc --port 8788 --ip 0.0.0.0`, then open `http://localhost:8788/`. Run one command per site on distinct ports to serve several at once. A plain static server (e.g. `python3 -m http.server` from inside a site dir) also works but does not apply `_redirects`.

### Lint / test / build
There is nothing to lint, test, or build — the "app" is static HTML served as-is. Do not add build/test tooling unless explicitly asked.

### Notes / gotchas
- `npm install -g ...` fails in this environment (npm global prefix is `/`, not writable). Use `npx` instead of global installs.
- There is no `package.json`; do not run `npm install` at the repo root (it has nothing to install).
