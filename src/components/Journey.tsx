"use client";

import { useRef } from "react";
import { T } from "./T";
import { MILESTONES, PAS } from "@/data/projects";

export default function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="journey" className="journey">
      <div className="journey-head">
        <div className="sec-lead reveal">
          <span className="eyebrow">Journey</span>
          <h2>The path so far.</h2>
          <p>From graduation to today, the milestones along the way.</p>
        </div>
        <div className="arrows">
          <button onClick={() => scroll(-1)} aria-label="Scroll left">
            ‹
          </button>
          <button onClick={() => scroll(1)} aria-label="Scroll right">
            ›
          </button>
        </div>
      </div>
      <div className="tl-scroll" id="timeline" ref={trackRef}>
        {MILESTONES.map((m, i) => {
          const c = PAS[m.pas] ?? PAS.sky;
          return (
            <div className="ms" key={i}>
              <span
                className="node"
                style={{ background: c[1], boxShadow: `0 0 0 4px ${c[0]}22, 0 0 16px 2px ${c[1]}` }}
              />
              <span className="yr">{m.yr}</span>
              <span className="badge" style={{ background: c[1] }}>
                <T en={m.en.tag} ko={m.ko.tag} />
              </span>
              <h4>
                <T en={m.en.title} ko={m.ko.title} />
              </h4>
              <p>
                <T en={m.en.desc} ko={m.ko.desc} />
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
