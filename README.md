# JYPark-Code.github.io

Personal resume & portfolio site for **Ji Yong Park (박지용)**, deployed to GitHub Pages as a user site served at the domain root: **https://jypark-code.github.io**.

Built as a single scrolling page (bento hero → Netflix-style project browse → journey timeline → about/contact) with EN/KO language toggle and light/dark themes.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) with **static export** (`output: "export"`)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **[Framer Motion](https://www.framer.com/motion/)** for animation
- **[Pretendard](https://github.com/orioncactus/pretendard)** (via jsDelivr CDN) for Korean typography

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it. Edits to files under `src/` hot-reload.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Produce the static export in `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Gate ladder before shipping: **typecheck → lint → build → verify in browser**.

## Deployment (GitHub Pages)

This is a **static export**, not a Vercel/server deployment. `npm run build` writes a fully static site to `out/` (gitignored). Key config in [`next.config.ts`](./next.config.ts):

- `output: "export"` — emits static HTML/CSS/JS
- `images: { unoptimized: true }` — the export target has no image optimization server
- `trailingSlash: true` — so Pages serves `/section/` paths cleanly

Because this is a **user site** (`<user>.github.io`) served at the domain root, **no `basePath`/`assetPrefix` is needed**.

Deployment is automated by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml): every push to `main` runs `npm ci && npm run build` and publishes `out/` to GitHub Pages via `upload-pages-artifact` + `deploy-pages`.

**One-time setup:** in **Settings → Pages → Source**, select **GitHub Actions** (the repo currently uses the legacy branch source). After that, pushes to `main` deploy automatically.

### Visitor counter

The nav shows a today / total visitor count. A static site has no backend, so the tally lives in a tiny **Cloudflare Worker + KV** under [`worker/`](./worker). Set `NEXT_PUBLIC_COUNTER_URL` to the deployed Worker URL to enable it; until then it renders nothing. Deploy and hardening steps are in [`worker/README.md`](./worker/README.md).

## Project layout

```
src/
  app/          # App Router entry (layout, page, globals.css)
  components/   # UI sections (Hero, Browse, Journey, Footer, …) + client widgets
  data/         # Content model: profile, projects, milestones
worker/         # Cloudflare Worker + KV for the visitor counter
```
