"use client";

import { useEffect, useRef } from "react";

/**
 * Hero "night-sky" particle network — brand-tinted nodes, links between near
 * neighbors, and a line-to-cursor. Ported from the mockup canvas IIFE. Respects
 * prefers-reduced-motion (renders a single static frame instead of animating).
 */
export default function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const host = cv.parentElement;
    const ctx = cv.getContext("2d");
    if (!host || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const TINT = ["#22d3ee", "#6366f1", "#c084fc", "#f472b6"];
    let W = 1;
    let H = 1;
    let pts: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      c: string;
      tw: number;
    }[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    function size() {
      const r = host!.getBoundingClientRect();
      W = cv!.width = Math.max(1, Math.round(r.width * DPR));
      H = cv!.height = Math.max(1, Math.round(r.height * DPR));
      cv!.style.width = r.width + "px";
      cv!.style.height = r.height + "px";
      const n = Math.max(24, Math.min(56, Math.floor((r.width * r.height) / 13000)));
      pts = [];
      for (let i = 0; i < n; i++) {
        const tint = Math.random() < 0.22;
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.11 * DPR,
          vy: (Math.random() - 0.5) * 0.11 * DPR,
          r: (tint ? 1.7 : 1.05) * DPR * (0.7 + Math.random() * 0.6),
          c: tint ? TINT[(Math.random() * TINT.length) | 0] : "#e8ecf2",
          tw: Math.random() * 6.283,
        });
      }
    }

    const LINK = 118 * DPR;
    const MLINK = 165 * DPR;

    function frame(t: number) {
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx!.globalAlpha = (1 - d / LINK) * 0.15;
            ctx!.strokeStyle = "#aab3c2";
            ctx!.lineWidth = DPR * 0.6;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }
        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const mdist = Math.hypot(mx, my);
        if (mdist < MLINK) {
          ctx!.globalAlpha = (1 - mdist / MLINK) * 0.28;
          ctx!.strokeStyle = p.c;
          ctx!.lineWidth = DPR * 0.7;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }
      for (let k = 0; k < pts.length; k++) {
        const s = pts[k];
        const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(t / 900 + s.tw);
        ctx!.globalAlpha = 0.85 * tw;
        ctx!.fillStyle = s.c;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, 6.283);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      cancelAnimationFrame(raf);
      size();
      if (!reduce) raf = requestAnimationFrame(frame);
      else frame(0);
    };
    const onMove = (e: PointerEvent) => {
      const r = host!.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * DPR;
      mouse.y = (e.clientY - r.top) * DPR;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    size();
    addEventListener("resize", onResize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    if (reduce) frame(0);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas className="hero-constellation" aria-hidden="true" ref={ref} />;
}
