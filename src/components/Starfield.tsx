"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "starlight headliner" — a fixed, full-page field of tiny pinpoints that
 * each twinkle on their own slow phase, like the fibre-optic star ceiling in a
 * Rolls-Royce. Purely decorative: no links, no motion drift, no cursor. Sits
 * behind all content (z-index:-1) over the solid page background, so it shows
 * through the dark negative space of every section below the hero. Dark theme
 * only (hidden in light via CSS). Respects prefers-reduced-motion by drawing a
 * single static frame.
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
    // Mostly cool white; a sparse few carry the signature tints.
    const TINT = ["#22d3ee", "#6366f1", "#c084fc", "#f472b6"];
    let W = 1;
    let H = 1;
    let raf = 0;
    let stars: {
      x: number;
      y: number;
      r: number;
      c: string;
      base: number; // baseline brightness
      amp: number; // twinkle amplitude
      spd: number; // twinkle speed
      ph: number; // phase offset
      glow: number; // soft-glow radius for the rare bright ones
    }[] = [];

    function build() {
      W = cv!.width = Math.round(window.innerWidth * DPR);
      H = cv!.height = Math.round(window.innerHeight * DPR);
      cv!.style.width = window.innerWidth + "px";
      cv!.style.height = window.innerHeight + "px";
      // Fibre-optic density: many tiny points, capped for calm + perf.
      const n = Math.max(60, Math.min(150, Math.floor((W * H) / (9000 * DPR))));
      stars = [];
      for (let i = 0; i < n; i++) {
        const tint = Math.random() < 0.14;
        const bright = Math.random() < 0.1; // a handful get a soft halo
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: (bright ? 1.5 : 0.9) * DPR * (0.6 + Math.random() * 0.7),
          c: tint ? TINT[(Math.random() * TINT.length) | 0] : "#dfe7f2",
          base: 0.12 + Math.random() * 0.28,
          amp: 0.18 + Math.random() * 0.34,
          spd: 0.0006 + Math.random() * 0.0012, // slow, unsynced
          ph: Math.random() * 6.283,
          glow: bright ? (2.5 + Math.random() * 2) * DPR : 0,
        });
      }
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, W, H);
      for (const s of stars) {
        const tw = reduce ? 1 : 0.5 + 0.5 * Math.sin(t * s.spd + s.ph);
        const a = Math.min(1, s.base + s.amp * tw);
        ctx!.globalAlpha = a;
        ctx!.fillStyle = s.c;
        if (s.glow) {
          ctx!.shadowColor = s.c;
          ctx!.shadowBlur = s.glow;
        } else {
          ctx!.shadowBlur = 0;
        }
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, 6.283);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      cancelAnimationFrame(raf);
      build();
      if (!reduce) raf = requestAnimationFrame(frame);
      else frame(0);
    };

    build();
    addEventListener("resize", onResize);
    if (reduce) frame(0);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas className="starfield" aria-hidden="true" ref={ref} />;
}
