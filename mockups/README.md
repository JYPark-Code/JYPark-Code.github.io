# Design mockups

Static HTML design mockups produced while deciding the portfolio's visual direction.
These are **reference/source-of-truth for the port to Next.js** — not the deployed site.
They were originally in an ephemeral scratchpad, so they're preserved here.

## v5 — the locked design (mono + iridescent gradient)

- **`portfolio-mono-final.html`** — **the definitive v5.** Same design as
  `portfolio-mono.html` plus the refinements reviewed and locked in browser:
  - hero **constellation / particle-network** animation (dark hero only, brand-tinted
    nodes, subtle line-to-cursor), gated by `prefers-reduced-motion`
  - **Pretendard** actually loaded (fixes thin Korean fallback)
  - Korean typography fixes (mono UI chrome routed to sans for Hangul), em-dashes removed
- **`portfolio-mono.html`** — the base v5 (before the constellation + KO fixes above).

### Locked direction (summary)

- Bento grid frame + Netflix-style horizontal project browse (category rows → detail modal),
  data-driven `PROJECTS` array so projects are appended one at a time.
- Horizontal journey timeline (2017 grad → now) with gradient line + glowing nodes.
- Color: ink chrome (near-black / off-white) + iridescent signature gradient
  `#22d3ee → #6366f1 → #c084fc → #f472b6` (cyan→indigo→violet→pink) on chrome/motion,
  pastel duotone project tiles.
- i18n EN/KO, default English (in the port: React state + Context dictionary, not the
  mockup's `data-lang` CSS toggle).

Open either file directly in a browser to view. Toggle theme/lang via the in-page controls.
