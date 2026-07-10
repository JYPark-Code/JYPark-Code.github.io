import type { ReactNode } from "react";

/**
 * Bilingual inline text. Renders BOTH languages; the inactive one is hidden by
 * CSS (`:root[data-lang="…"] [lang="…"]{display:none}`). Rendering both keeps
 * the static export hydration-safe and lets language switch instantly by just
 * flipping the <html data-lang> attribute — no React re-render of copy needed.
 */
export function T({ en, ko }: { en: ReactNode; ko: ReactNode }) {
  return (
    <>
      <span lang="en">{en}</span>
      <span lang="ko">{ko}</span>
    </>
  );
}
