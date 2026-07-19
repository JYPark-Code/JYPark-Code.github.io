# JYPark-Code.github.io

Personal resume & portfolio site for **Ji Yong Park (박지용)**, deployed to GitHub Pages as a user site served at the domain root: **https://jypark-code.github.io**.

Built as a single scrolling page (bento hero → Netflix-style project browse → journey timeline → about/contact) with EN/KO language toggle and light/dark themes.

## Design evolution

The site runs two design directions off one shared content model (`src/data/`), so copy and projects stay in sync between them. **v6 is live at [`/showcase`](https://jypark-code.github.io/showcase/)** alongside the untouched v5 at `/`, so the two can be compared side by side.

| | **v5 — live** (`/`) | **v6 — prototype** (`/showcase`) |
| --- | --- | --- |
| Framing | Netflix-style catalog: bento hero, horizontal poster rows, a "Browse ▶" modal deck | Editorial magazine spreads; the Netflix signatures (Browse / ▶ / poster / track) are dropped |
| Motion | Reveal-on-scroll, aurora, 3D constellation, tile tilt | One scroll *choreographed* across the scenes — pinned hero parallax → **horizontal work reel driven by vertical scroll** → a company-metrics proof band → sequential timeline reveal |
| Project detail | Click a card → a modal pops open instantly | Click a card → it **animates (grows) into the modal** via Framer Motion shared layout (`layoutId`); the same 5-slide narrative content is reused verbatim |
| Signals | Year + Live/Code/Private label per card | Adds **lifecycle markers** — `Ongoing` (in progress, not yet live) and `Evolving` (shipped and still growing) — plus an above-the-fold company-metrics proof band |
| Background | Fixed starfield / nebula | The same starfield, layered under one ambient aurora that shifts hue (cyan → violet → magenta) across the scroll to tie the scenes together |
| Styling | `src/app/globals.css` (locked, single source) | Isolated `src/app/showcase/showcase.module.css` (CSS Module, reuses the same brand tokens) — the locked design cannot drift |

**Why v6:** the goal is to demonstrate front-end range and land a current (2026) feel, by *composing* effects into a single scroll narrative rather than stacking more of them — while keeping the substance (the same projects, copy, and 5-slide case studies) and only re-skinning how it's presented. The reel binds 1:1 to scroll (no easing lag, no scroll-jacking); scenes sit transparently over the persistent starfield so the cosmic backdrop carries the whole descent. The live `/` design is untouched; whether v6 is promoted to `/` is an open decision.

Both directions share one content model (`src/data/`) and keep the EN/KO toggle, light/dark themes, and the visitor counter (top-right + footer on `/showcase`, mirroring the live nav).

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
  app/            # App Router entry (layout, page, globals.css)
    showcase/     # v6 scroll-choreography prototype (isolated page + CSS Module)
  components/     # UI sections (Hero, Browse, Journey, Footer, …) + client widgets
  data/           # Content model: profile, projects, milestones (shared by both designs)
worker/           # Cloudflare Worker + KV for the visitor counter
```
