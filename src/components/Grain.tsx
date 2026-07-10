"use client";

import { useEffect, useRef } from "react";

/**
 * Fine film-grain texture for light theme — a monochrome, static noise that sits
 * behind all content (styling in globals.css `.grainbg`). It adds a subtle
 * paper/film tactility without any pattern or colour, so it never competes with
 * the résumé or the pastel cards; cards paint over it, so grain only shows in the
 * empty background. Shown only in light theme (dark keeps the Starfield).
 *
 * A small noise tile is generated once to a canvas and repeated via
 * background-image — no per-frame cost, no external asset.
 */
export default function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const S = 180;
    const c = document.createElement("canvas");
    c.width = c.height = S;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(S, S);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const g = (Math.random() * 255) | 0; // neutral grey
      d[i] = d[i + 1] = d[i + 2] = g;
      d[i + 3] = (Math.random() * 20) | 0; // very low, sparse alpha
    }
    ctx.putImageData(img, 0, 0);
    el.style.backgroundImage = `url(${c.toDataURL()})`;
  }, []);

  return <div className="grainbg" aria-hidden="true" ref={ref} />;
}
