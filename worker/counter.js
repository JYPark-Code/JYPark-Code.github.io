// Tiny visitor counter for the portfolio (static site → no backend of its own).
// Cloudflare Worker + KV. One GET returns { today, total }; add ?hit=1 to count.
//
//   GET  https://<worker>.workers.dev/          → read tally (no increment)
//   GET  https://<worker>.workers.dev/?hit=1     → increment, then return tally
//
// The client (src/components/VisitorCount.tsx) only sends ?hit=1 on the first
// load of the day per browser, so "today" ≈ unique daily visitors.
//
// NOTE: KV read-modify-write is not atomic, so heavy concurrent traffic can
// slightly undercount. That's fine for a portfolio. If you ever need exact
// counts, move the state into a Durable Object.

// Locked to the portfolio origin so only this site can read/increment the counter.
const ALLOW_ORIGIN = "https://jypark-code.github.io";

// Cloudflare runs on UTC; Korea is UTC+9 with no DST. Bucket "today" by KST.
function seoulDay() {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": ALLOW_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Vary": "Origin",
      "Cache-Control": "no-store",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    // CORS only stops other sites from READING the response; it does not stop a
    // non-browser client from triggering increments. So gate the increment on a
    // matching Origin header. The real site's fetch (cross-origin to workers.dev)
    // always sends Origin; other sites' browser JS can't forge it. Reads stay open.
    const fromSite = request.headers.get("Origin") === ALLOW_ORIGIN;

    const url = new URL(request.url);
    const hit = url.searchParams.get("hit") === "1" && fromSite;
    const dayKey = `day:${seoulDay()}`;

    let total = parseInt((await env.COUNTER.get("total")) || "0", 10);
    let today = parseInt((await env.COUNTER.get(dayKey)) || "0", 10);

    if (hit) {
      total += 1;
      today += 1;
      await env.COUNTER.put("total", String(total));
      // Day buckets self-expire after 48h so old dates don't accumulate in KV.
      await env.COUNTER.put(dayKey, String(today), { expirationTtl: 60 * 60 * 48 });
    }

    return new Response(JSON.stringify({ today, total }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
