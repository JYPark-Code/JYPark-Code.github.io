"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { T } from "./T";
import { useDialog } from "./useDialog";
import { ROWS, byId, PAS, poster, type Narrative, type Project, type Row } from "@/data/projects";

// Slide order + bilingual labels for the narrative deck.
const DECK: { key: keyof Narrative; en: string; ko: string }[] = [
  { key: "problem", en: "Problem & Context", ko: "문제 · 맥락" },
  { key: "decision", en: "My Decision", ko: "나의 결정" },
  { key: "implementation", en: "How I Built It", ko: "구현" },
  { key: "result", en: "Outcome", ko: "결과" },
  { key: "connection", en: "Why It Matters", ko: "연결" },
];

export default function Browse() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <section id="browse" className="browse" aria-label="Project catalog">
      <div className="sec-lead reveal">
        <span className="eyebrow">Selected work</span>
        <h2>Browse the projects.</h2>
        <p>Scroll each row, then open a title for the full story: problem, role, stack, and links.</p>
      </div>

      {ROWS.map((row, ri) => (
        <RowView
          key={ri}
          row={row}
          isLast={ri === ROWS.length - 1}
          reduceRef={reduceRef}
          onOpen={setOpenId}
        />
      ))}

      {openId ? <ProjectModal project={byId[openId]} onClose={() => setOpenId(null)} /> : null}
    </section>
  );
}

function RowView({
  row,
  isLast,
  reduceRef,
  onOpen,
}: {
  row: Row;
  isLast: boolean;
  reduceRef: React.RefObject<boolean>;
  onOpen: (id: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const onTileMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    t.style.transform = `perspective(650px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-6px) scale(1.04)`;
  };
  const onTileLeave = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <div className="row">
      <div className="row-head">
        <h3>{row.en}</h3>
        <span className="count">{row.ids.length}</span>
        <div className="arrows">
          <button onClick={() => scroll(-1)} aria-label="Scroll left">
            ‹
          </button>
          <button onClick={() => scroll(1)} aria-label="Scroll right">
            ›
          </button>
        </div>
      </div>
      <div className="track" ref={trackRef}>
        {row.ids.map((id) => {
          const p = byId[id];
          if (!p) return null;
          const c = PAS[p.pas] ?? PAS.sky;
          return (
            <button
              key={id}
              className="tile"
              aria-label={p.en.title}
              style={{ ["--ink2"]: c[2], ["--pc1"]: c[1] } as CSSProperties}
              onClick={() => onOpen(id)}
              onPointerMove={onTileMove}
              onPointerLeave={onTileLeave}
            >
              <div className="poster" style={{ background: poster(p.pas) }} />
              <span className="glyph">
                <T en={p.en.kicker} ko={p.ko.kicker} />
              </span>
              <span className="num">{p.en.title.charAt(0)}</span>
              <div className="cap">
                <div className="t">
                  <T en={p.en.title} ko={p.ko.title} />
                </div>
                <div className="s">
                  <T en={p.en.type} ko={p.ko.type} />
                </div>
              </div>
              <div className="hover-actions">
                <span className="mini acc">
                  <T en="Details" ko="자세히" />
                </span>
                <span className="mini">
                  {p.links.live ? (
                    <T en="↗ Live" ko="↗ 라이브" />
                  ) : p.links.code ? (
                    <T en="</> Code" ko="</> 코드" />
                  ) : (
                    <T en="Private" ko="비공개" />
                  )}
                </span>
              </div>
            </button>
          );
        })}
        {isLast ? (
          <div className="tile ghost" aria-hidden="true">
            <div>
              <div className="plus">+</div>
              <span>
                <T en="more coming" ko="더 추가 예정" />
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const c = PAS[p.pas] ?? PAS.sky;
  const panelRef = useDialog<HTMLDivElement>(onClose);

  const hasLinks = Boolean(p.links.live || p.links.code);

  return (
    <div className="modal open" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel" ref={panelRef} tabIndex={-1} style={{ ["--mink"]: c[2] } as CSSProperties}>
        <div className="modal-hero">
          <div className="poster" style={{ background: poster(p.pas) }} />
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
          <div className="htitle">
            <div className="k">
              <T en={p.en.kicker} ko={p.ko.kicker} />
            </div>
            <h3 id="modalTitle">
              <T en={p.en.title} ko={p.ko.title} />
            </h3>
          </div>
        </div>
        <div className="modal-body">
          <div>
            <p className="lede">
              <T en={p.en.lede} ko={p.ko.lede} />
            </p>
            {p.narrative ? (
              <NarrativeDeck n={p.narrative} />
            ) : (
              <>
                <p>
                  <T en={p.en.desc} ko={p.ko.desc} />
                </p>
                <h4>
                  <T en="Highlights" ko="핵심 성과" />
                </h4>
                <ul className="hl" lang="en">
                  {p.en.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <ul className="hl" lang="ko">
                  {p.ko.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </>
            )}
            {hasLinks ? (
              <div className="modal-actions">
                {p.links.live ? (
                  <a className="btn primary" href={p.links.live} target="_blank" rel="noopener noreferrer">
                    ▶ <T en="Live site" ko="라이브 사이트" />
                  </a>
                ) : null}
                {p.links.code ? (
                  <a className="btn" href={p.links.code} target="_blank" rel="noopener noreferrer">
                    &lt;/&gt; <T en="Source code" ko="소스 코드" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
          <div>
            <div className="meta-row">
              <span className="l">
                <T en="Year" ko="연도" />
              </span>
              <span className="v">{p.year}</span>
            </div>
            {p.duration ? (
              <div className="meta-row">
                <span className="l">
                  <T en="Duration" ko="기간" />
                </span>
                <span className="v">
                  <T en={p.duration.en} ko={p.duration.ko} />
                </span>
              </div>
            ) : null}
            <div className="meta-row">
              <span className="l">
                <T en="Role" ko="역할" />
              </span>
              <span className="v">
                <T en={p.en.role} ko={p.ko.role} />
              </span>
            </div>
            <div className="meta-row">
              <span className="l">
                <T en="Type" ko="유형" />
              </span>
              <span className="v">
                <T en={p.en.type} ko={p.ko.type} />
              </span>
            </div>
            <h4>
              <T en="Stack" ko="스택" />
            </h4>
            <div className="tags">
              {p.stack.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NarrativeDeck({ n }: { n: Narrative }) {
  const [i, setI] = useState(0);
  const last = DECK.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((v) => Math.min(last, v + 1));
      else if (e.key === "ArrowLeft") setI((v) => Math.max(0, v - 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [last]);

  const meta = DECK[i];
  const slide = n[meta.key];

  return (
    <div className="deck">
      <div className="deck-stage">
        <div className="deck-slide" key={i}>
          <span className="slabel">
            <T en={meta.en} ko={meta.ko} />
          </span>
          <p className="sbody">
            <T en={slide.en} ko={slide.ko} />
          </p>
        </div>
      </div>
      <div className="deck-nav">
        <button
          className="arw"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <div className="deck-dots">
          {DECK.map((s, idx) => (
            <button
              key={s.key}
              className={idx === i ? "deck-dot on" : "deck-dot"}
              onClick={() => setI(idx)}
              aria-label={s.en}
            />
          ))}
        </div>
        <button
          className="arw"
          onClick={() => setI((v) => Math.min(last, v + 1))}
          disabled={i === last}
          aria-label="Next slide"
        >
          ›
        </button>
        <span className="deck-count">
          {i + 1} / {DECK.length}
        </span>
      </div>
    </div>
  );
}
