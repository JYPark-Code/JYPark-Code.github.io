"use client";

import { useState } from "react";

// Read the current language from <html data-lang> (set pre-paint by the no-FOUC
// script). During static prerender there's no document, so default to English.
function initialLang(): "en" | "ko" {
  if (typeof document === "undefined") return "en";
  return document.documentElement.getAttribute("data-lang") === "ko" ? "ko" : "en";
}

/**
 * Language + theme toggles. Both preferences live on <html> as data-lang /
 * data-theme (the no-FOUC script in layout.tsx sets them before paint) and the
 * CSS keys off those attributes — so toggling is just an attribute flip +
 * localStorage write. Only the language button needs React state, to show the
 * "switch to" label (KO/EN).
 */
export default function PrefToggles() {
  const [lang, setLang] = useState<"en" | "ko">(initialLang);

  const toggleLang = () => {
    const d = document.documentElement;
    const next = d.getAttribute("data-lang") === "ko" ? "en" : "ko";
    d.setAttribute("data-lang", next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
    setLang(next);
  };

  const toggleTheme = () => {
    const d = document.documentElement;
    const next = d.getAttribute("data-theme") === "dark" ? "light" : "dark";
    d.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <>
      <button className="icon-btn" onClick={toggleLang} aria-label="Toggle language" suppressHydrationWarning>
        {lang === "en" ? "KO" : "EN"}
      </button>
      <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
        ◐
      </button>
    </>
  );
}
