"use client";

import { useEffect } from "react";

/**
 * Adds `.in` to every `.reveal` element as it scrolls into view (the CSS handles
 * the fade/rise). Ported from the mockup's IntersectionObserver — kept instead of
 * a Framer Motion wrapper because several `.reveal` nodes are bento-grid children
 * and wrapping them would break the grid layout.
 */
export default function RevealInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("in");
            io.unobserve(x.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return null;
}
