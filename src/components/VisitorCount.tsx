"use client";

import { useEffect, useState } from "react";
import { T } from "./T";

// Static export has no backend, so counts live in a tiny Cloudflare Worker + KV
// (see /worker). Set the deployed Worker URL in NEXT_PUBLIC_COUNTER_URL; until
// then this component renders nothing, so the site stays clean pre-deploy.
const ENDPOINT = process.env.NEXT_PUBLIC_COUNTER_URL ?? "";

type Counts = { today: number; total: number };

/** Today's date in Asia/Seoul (YYYY-MM-DD) — used only for the once-a-day guard. */
function seoulDay(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}

// Memoized across every VisitorCount instance (nav + footer share ONE request),
// so the page increments at most once — not once per placement.
let countsPromise: Promise<Counts | null> | null = null;

function loadCounts(): Promise<Counts | null> {
  if (countsPromise) return countsPromise;
  countsPromise = (async () => {
    if (!ENDPOINT) return null;

    const flag = `visited:${seoulDay()}`;
    let firstToday = false;
    try {
      firstToday = !localStorage.getItem(flag);
    } catch {
      /* localStorage blocked (private mode) — just read, never dedup */
    }

    try {
      // Only the first load of the day increments; later loads read the tally.
      const res = await fetch(firstToday ? `${ENDPOINT}?hit=1` : ENDPOINT);
      const d = await res.json();
      if (firstToday) {
        try {
          localStorage.setItem(flag, "1");
        } catch {
          /* ignore */
        }
      }
      if (typeof d?.total === "number") {
        return { today: Number(d.today) || 0, total: d.total };
      }
      return null;
    } catch {
      return null; // offline or Worker down — show nothing
    }
  })();
  return countsPromise;
}

export default function VisitorCount({
  variant = "footer",
  demo = false,
}: {
  variant?: "footer" | "nav";
  /** Prototype-only: show placeholder counts when no live endpoint is wired, so
   * the counter's placement/look can be previewed. Real counts override it. */
  demo?: boolean;
}) {
  const [c, setC] = useState<Counts | null>(null);

  useEffect(() => {
    let alive = true;
    loadCounts().then((v) => {
      if (alive && v) setC(v);
    });
    return () => {
      alive = false;
    };
  }, []);

  const shown = c ?? (demo ? { today: 42, total: 3128 } : null);
  if (!shown) return null;

  const cls = variant === "nav" ? "nav-visits" : "foot-visits mono";

  return (
    <span className={cls} aria-label="Visitor counter" title="Visitors: today · total">
      <span>
        <T en="Today" ko="오늘" /> <b>{shown.today.toLocaleString()}</b>
      </span>
      <span className="dot" aria-hidden="true">
        ·
      </span>
      <span>
        <T en="Total" ko="누적" /> <b>{shown.total.toLocaleString()}</b>
      </span>
    </span>
  );
}
