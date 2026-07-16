"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 3D "constellation" — the 2D night-sky network evolved into a rotating
 * point cloud with real depth. Nodes live in a sphere of 3D space, links join
 * near neighbors (distance is rotation-invariant, so it's measured in world
 * space), and everything is perspective-projected to 2D each frame. The cloud
 * auto-spins slowly and tilts toward the cursor for parallax; nearer nodes are
 * larger/brighter, the farther ones recede. No dependencies — hand-rolled
 * 3D→2D projection on a 2D canvas, so it adds 0 KB over the old version.
 *
 * Sits under the hero readability gradient (::after), which dims the left/text
 * side and leaves the orb reading strongest in the open right half of the card.
 * Hidden in light theme via CSS. Respects prefers-reduced-motion by rendering a
 * single static, gently-tilted frame with no spin or cursor interaction.
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
    let R = 1; // cloud radius (device px)
    let cx = 0; // projection center (shifted toward the open right side)
    let cy = 0;
    let cam = 1; // camera distance from origin
    let raf = 0;

    // Node in unit sphere space [-1,1]; drifts slowly, twinkles on its own phase.
    type Node = {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      r: number; c: string; tint: boolean; tw: number;
      // per-frame projection scratch
      sx: number; sy: number; s: number; d: number;
    };
    let nodes: Node[] = [];

    // Rotation: auto-spin around Y, plus an eased tilt driven by the cursor.
    let spin = 0;
    const TILT0 = 0.2;
    let rotX = TILT0;
    let rotY = 0;
    let tgtX = TILT0;
    let tgtY = 0;
    const mouse = { x: -9999, y: -9999, on: false };

    function size() {
      const r = host!.getBoundingClientRect();
      W = cv!.width = Math.max(1, Math.round(r.width * DPR));
      H = cv!.height = Math.max(1, Math.round(r.height * DPR));
      cv!.style.width = r.width + "px";
      cv!.style.height = r.height + "px";
      R = 0.46 * Math.min(W, H);
      cx = W * 0.6;
      cy = H * 0.5;
      cam = R * 2.7;

      const n = Math.max(26, Math.min(58, Math.floor((r.width * r.height) / 12000)));
      nodes = [];
      for (let i = 0; i < n; i++) {
        // Uniform-ish point inside the unit ball (reject-free: normalize a
        // gaussian-lite vector, then pull toward center by a random cube root).
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        let z = Math.random() * 2 - 1;
        const len = Math.hypot(x, y, z) || 1;
        const rad = Math.cbrt(Math.random());
        x = (x / len) * rad;
        y = (y / len) * rad;
        z = (z / len) * rad;
        const tint = Math.random() < 0.24;
        nodes.push({
          x, y, z,
          vx: (Math.random() - 0.5) * 0.0016,
          vy: (Math.random() - 0.5) * 0.0016,
          vz: (Math.random() - 0.5) * 0.0016,
          r: (tint ? 1.9 : 1.15) * DPR * (0.7 + Math.random() * 0.6),
          c: tint ? TINT[(Math.random() * TINT.length) | 0] : "#e8ecf2",
          tint,
          tw: Math.random() * 6.283,
          sx: 0, sy: 0, s: 1, d: 0,
        });
      }
    }

    const LINK = 0.64; // link threshold in unit-ball space
    const MLINK = 150 * DPR; // cursor link reach in screen space

    function frame(t: number) {
      if (!reduce) {
        spin += 0.0019;
        rotX += (tgtX - rotX) * 0.05;
        rotY += (tgtY - rotY) * 0.05;
      }
      const ay = rotY + spin;
      const ax = rotX;
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);

      // 1) advance + project every node into screen space.
      for (const p of nodes) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy; p.z += p.vz;
          if (p.x < -1 || p.x > 1) p.vx *= -1;
          if (p.y < -1 || p.y > 1) p.vy *= -1;
          if (p.z < -1 || p.z > 1) p.vz *= -1;
        }
        // scale to device px, rotate Y then X.
        const X = p.x * R, Y = p.y * R, Z = p.z * R;
        const x1 = X * cosY + Z * sinY;
        const z1 = -X * sinY + Z * cosY;
        const y2 = Y * cosX - z1 * sinX;
        const z2 = Y * sinX + z1 * cosX;
        const s = cam / (cam - z2); // perspective: nearer (z2>0) → larger
        p.s = s;
        p.d = z2; // depth for sorting
        p.sx = cx + x1 * s * 1.08; // slight x-stretch to fill the wide card
        p.sy = cy + y2 * s;
      }

      ctx!.clearRect(0, 0, W, H);
      const sMin = cam / (cam + R);
      const sMax = cam / (cam - R);
      const depthOf = (s: number) => (s - sMin) / (sMax - sMin || 1); // 0 far..1 near

      // 2) links between near neighbors (world-space distance, rotation-invariant).
      ctx!.lineWidth = DPR * 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j];
          const dx = p.x - q.x, dy = p.y - q.y, dz = p.z - q.z;
          const d = Math.hypot(dx, dy, dz);
          if (d < LINK) {
            const depth = (depthOf(p.s) + depthOf(q.s)) * 0.5;
            ctx!.globalAlpha = (1 - d / LINK) * (0.09 + 0.22 * depth);
            ctx!.strokeStyle = "#aab3c2";
            ctx!.beginPath();
            ctx!.moveTo(p.sx, p.sy);
            ctx!.lineTo(q.sx, q.sy);
            ctx!.stroke();
          }
        }
      }

      // 3) cursor links — screen-space line to nearby nodes (skip in reduced motion).
      if (!reduce && mouse.on) {
        ctx!.lineWidth = DPR * 0.7;
        for (const p of nodes) {
          const md = Math.hypot(p.sx - mouse.x, p.sy - mouse.y);
          if (md < MLINK) {
            ctx!.globalAlpha = (1 - md / MLINK) * 0.3;
            ctx!.strokeStyle = p.tint ? p.c : "#9fb4ff";
            ctx!.beginPath();
            ctx!.moveTo(p.sx, p.sy);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
          }
        }
      }

      // 4) nodes, drawn far→near so nearer points layer on top.
      const order = nodes.slice().sort((a, b) => a.d - b.d);
      for (const p of order) {
        const depth = depthOf(p.s);
        const tw = reduce ? 1 : 0.62 + 0.38 * Math.sin(t / 900 + p.tw);
        ctx!.globalAlpha = Math.min(1, (0.36 + 0.64 * depth) * tw);
        ctx!.fillStyle = p.c;
        if (depth > 0.82) {
          ctx!.shadowColor = p.c;
          ctx!.shadowBlur = 6 * DPR * depth;
        } else {
          ctx!.shadowBlur = 0;
        }
        ctx!.beginPath();
        ctx!.arc(p.sx, p.sy, Math.max(0.4, p.r * p.s), 0, 6.283);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;
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
      mouse.on = true;
      // parallax tilt: map cursor position over the card to a small rotation.
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tgtY = nx * 0.7;
      tgtX = TILT0 - ny * 0.5;
    };
    const onLeave = () => {
      mouse.on = false;
      mouse.x = mouse.y = -9999;
      tgtX = TILT0;
      tgtY = 0;
    };

    size();
    addEventListener("resize", onResize);
    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(frame);
    } else {
      frame(0);
    }

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas className="hero-constellation" aria-hidden="true" ref={ref} />;
}
