"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "daylight aurora" backdrop for light theme — two or three large, very
 * pale washes of the signature colours that drift slowly, like soft morning
 * light (styling in globals.css `.aurora`). Shown only in light theme; dark uses
 * the Starfield canvas instead.
 *
 * The washes are strongest around the hero and fade toward a quiet floor as you
 * scroll into the emptier sections below, so wide stretches of white space don't
 * feel heavy. Pure CSS drift + a cheap rAF scroll-linked opacity.
 */
export default function Aurora() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      // Full near the top; ease to a low floor across the next ~1.6 viewports.
      const t = Math.min(1, Math.max(0, (window.scrollY - vh * 0.3) / (vh * 1.6)));
      el.style.opacity = String(1 - t * (1 - 0.22));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="aurora" aria-hidden="true" ref={ref}>
      <i />
      <i />
      <i />
    </div>
  );
}
