# Visitor counter (Cloudflare Worker + KV)

The portfolio is a static export (GitHub Pages), so it has no server to keep a
tally. This tiny Worker holds `today` / `total` counts in a KV namespace and the
site fetches them from the footer.

## Deploy (once)

```sh
cd worker
npm i -g wrangler          # if you don't have it
wrangler login             # opens a browser to your Cloudflare account

# 1. Create the KV namespace and copy the printed id into wrangler.toml
wrangler kv namespace create COUNTER

# 2. Ship it
wrangler deploy
```

`wrangler deploy` prints the public URL, e.g.
`https://portfolio-counter.<your-subdomain>.workers.dev`.

## Wire it into the site

Set the Worker URL as a public build-time env var, then rebuild:

- **Local:** create `.env.local` in the repo root:
  ```
  NEXT_PUBLIC_COUNTER_URL=https://portfolio-counter.<your-subdomain>.workers.dev
  ```
- **GitHub Actions (Pages deploy):** add the same `NEXT_PUBLIC_COUNTER_URL`
  as a repo variable / env in the build step.

Until this is set, `VisitorCount.tsx` renders nothing, so the footer stays clean.

## Lock it down (recommended)

After you confirm it works, edit `counter.js` and change
`ALLOW_ORIGIN` from `"*"` to `"https://jypark-code.github.io"`, then
`wrangler deploy` again — so only your site can increment the counter.

## Notes

- `today` is bucketed in KST (UTC+9); day buckets expire after 48h.
- The client only sends `?hit=1` on the first visit of the day per browser
  (localStorage guard), so `today` ≈ unique daily visitors, not raw reloads.
- KV writes aren't atomic; under heavy concurrent traffic counts can drift
  slightly. For a portfolio that's fine — upgrade to a Durable Object if you
  ever need exact numbers.
