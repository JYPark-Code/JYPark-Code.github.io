"use client";

import { useEffect, useState } from "react";
import { T } from "./T";

// Static export has no backend, so counts live in a tiny Cloudflare Worker + KV
// (see /worker). Set the deployed Worker URL in NEXT_PUBLIC_COUNTER_URL; until
// then this component renders nothing, so the site stays clean pre-deploy.
const ENDPOINT = process.env.NEXT_PUBLIC_COUNTER_URL ?? "";

/** Today's date in Asia/Seoul (YYYY-MM-DD) — used only for the once-a-day guard. */
function seoulDay(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}

export default function VisitorCount({ variant = "footer" }: { variant?: "footer" | "nav" }) {
  const [c, setC] = useState<{ today: number; total: number } | null>(null);

  useEffect(() => {
    if (!ENDPOINT) return;

    const flag = `visited:${seoulDay()}`;
    let firstToday = false;
    try {
      firstToday = !localStorage.getItem(flag);
    } catch {
      /* localStorage blocked (private mode) — just read, never dedup */
    }

    // Only the first load of the day increments; later loads read the tally.
    fetch(firstToday ? `${ENDPOINT}?hit=1` : ENDPOINT)
      .then((r) => r.json())
      .then((d) => {
        if (firstToday) {
          try {
            localStorage.setItem(flag, "1");
          } catch {
            /* ignore */
          }
        }
        if (typeof d?.total === "number") {
          setC({ today: Number(d.today) || 0, total: d.total });
        }
      })
      .catch(() => {
        /* offline or Worker down — show nothing */
      });
  }, []);

  if (!c) return null;

  const cls = variant === "nav" ? "nav-visits" : "foot-visits mono";

  return (
    <span className={cls} aria-label="Visitor counter" title="Visitors — today · total">
      <span>
        <T en="Today" ko="오늘" /> <b>{c.today.toLocaleString()}</b>
      </span>
      <span className="dot" aria-hidden="true">
        ·
      </span>
      <span>
        <T en="Total" ko="누적" /> <b>{c.total.toLocaleString()}</b>
      </span>
    </span>
  );
}
