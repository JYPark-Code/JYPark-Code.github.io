"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient backdrop behind the whole page (sits at z-index:-1 over the body
 * background; the opaque hero panel masks it up top). Theme-aware:
 *
 *  - dark  → "starlight headliner": tiny crisp pinpoints, each twinkling on its
 *            own slow phase, like a fibre-optic star ceiling.
 *  - light → "daylight motes": the same points rendered as soft pastel bokeh
 *            discs that gently breathe in brightness — the light-mode twin.
 *
 * Purely decorative (no links, drift, or cursor). Respects prefers-reduced-motion
 * by holding a single static frame. Bokeh is drawn from pre-rendered sprites so
 * per-frame cost stays flat.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const TINT = ["#22d3ee", "#6366f1", "#c084fc", "#f472b6"];

    let theme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    let W = 1;
    let H = 1;
    let raf = 0;
    let stars: {
      x: number;
      y: number;
      r: number; // dark: dot radius
      br: number; // light: bokeh radius
      c: string; // dark: dot colour (mostly cool white)
      ti: number; // tint index for the light bokeh sprite
      base: number;
      amp: number;
      spd: number;
      ph: number;
      glow: number; // dark: soft halo for the rare bright ones
    }[] = [];

    // One soft radial sprite per tint, drawn once and re-used for every bokeh.
    const sprites = TINT.map((col) => {
      const s = document.createElement("canvas");
      s.width = s.height = 64;
      const g = s.getContext("2d")!;
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, col);
      grd.addColorStop(0.45, col + "80");
      grd.addColorStop(1, col + "00");
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      return s;
    });

    function build() {
      W = cv!.width = Math.round(window.innerWidth * DPR);
      H = cv!.height = Math.round(window.innerHeight * DPR);
      cv!.style.width = window.innerWidth + "px";
      cv!.style.height = window.innerHeight + "px";
      const n = Math.max(60, Math.min(150, Math.floor((W * H) / (9000 * DPR))));
      stars = [];
      for (let i = 0; i < n; i++) {
        const tint = Math.random() < 0.14;
        const bright = Math.random() < 0.1;
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: (bright ? 1.5 : 0.9) * DPR * (0.6 + Math.random() * 0.7),
          br: (bright ? 26 : 15) * DPR * (0.7 + Math.random() * 0.7),
          c: tint ? TINT[(Math.random() * TINT.length) | 0] : "#dfe7f2",
          ti: (Math.random() * TINT.length) | 0,
          base: 0.12 + Math.random() * 0.28,
          amp: 0.18 + Math.random() * 0.34,
          spd: 0.0006 + Math.random() * 0.0012,
          ph: Math.random() * 6.283,
          glow: bright ? (2.5 + Math.random() * 2) * DPR : 0,
        });
      }
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, W, H);
      if (theme === "light") {
        // Soft pastel bokeh — very faint, breathing brightness.
        for (const s of stars) {
          const tw = reduce ? 1 : 0.5 + 0.5 * Math.sin(t * s.spd + s.ph);
          ctx!.globalAlpha = 0.05 + 0.08 * tw;
          const d = s.br * 2;
          ctx!.drawImage(sprites[s.ti], s.x - s.br, s.y - s.br, d, d);
        }
      } else {
        // Crisp starlight pinpoints.
        for (const s of stars) {
          const tw = reduce ? 1 : 0.5 + 0.5 * Math.sin(t * s.spd + s.ph);
          ctx!.globalAlpha = Math.min(1, s.base + s.amp * tw);
          ctx!.fillStyle = s.c;
          ctx!.shadowColor = s.glow ? s.c : "transparent";
          ctx!.shadowBlur = s.glow;
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r, 0, 6.283);
          ctx!.fill();
        }
        ctx!.shadowBlur = 0;
      }
      ctx!.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      cancelAnimationFrame(raf);
      build();
      if (!reduce) raf = requestAnimationFrame(frame);
      else frame(0);
    };

    // Re-theme live so the toggle cross-fades instead of snapping.
    const mo = new MutationObserver(() => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      if (next !== theme) {
        theme = next;
        if (reduce) frame(0);
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    build();
    addEventListener("resize", onResize);
    if (reduce) frame(0);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      mo.disconnect();
    };
  }, []);

  return <canvas className="starfield" aria-hidden="true" ref={ref} />;
}
