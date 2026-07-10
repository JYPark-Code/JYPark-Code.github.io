"use client";

import { useEffect } from "react";

// Nav targets in document order. The active one gets `.active` on its nav link.
const IDS = ["browse", "journey", "about", "contact"];

/** Highlights the current section's nav tab as you scroll. */
export default function ScrollSpy() {
  useEffect(() => {
    const links = new Map<string, Element>();
    document.querySelectorAll(".nav-links a[href^='#']").forEach((a) => {
      const id = a.getAttribute("href")!.slice(1);
      if (IDS.includes(id)) links.set(id, a);
    });
    if (!links.size) return;

    const sections = IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35; // reading line, 35% from the top
      let active = "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) active = s.id; // last one past the line
      }
      // Near the very bottom the last (short) section can't reach the line — force it.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        active = IDS[IDS.length - 1];
      }
      links.forEach((a, key) => a.classList.toggle("active", key === active));
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

  return null;
}
