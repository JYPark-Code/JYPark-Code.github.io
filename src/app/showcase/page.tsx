"use client";

// ============================================================================
// /showcase — scroll-choreography PROTOTYPE (2026 direction).
// Isolated from the locked live design (/). Purpose: prove the "slide" feel —
// a single scroll that flies through three scenes with the background morphing
// between them, and the project reel moving HORIZONTALLY as you scroll DOWN.
// Netflix framing (Browse/▶/poster/track) is intentionally dropped for an
// editorial magazine-spread language. Reuses the brand tokens from globals.css
// (--grad, --mono, --sans, pastel PAS) so it stays coherent with the site DNA.
// ============================================================================

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { T } from "@/components/T";
import PrefToggles from "@/components/PrefToggles";
import VisitorCount from "@/components/VisitorCount";
import Starfield from "@/components/Starfield";
import { useDialog } from "@/components/useDialog";
import {
  byId,
  PAS,
  poster,
  MILESTONES,
  ROWS,
  type Project,
  type Narrative,
} from "@/data/projects";
import { CONTACT, CURRENTLY, STACK_COLUMNS } from "@/data/profile";
import { CERTS_MAIN, CERTS_COURSES } from "@/data/certs";
import styles from "./showcase.module.css";

// The reel features the curated home set (Featured + Selected), in order.
const REEL_IDS = ROWS.flatMap((r) => r.ids);

export default function ShowcasePage() {
  const reduce = useReducedMotion();
  // Page-wide scroll drives the ambient background hue/drift between scenes.
  const { scrollYProgress } = useScroll();
  const bgShift = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.6 });

  return (
    <main className={styles.page}>
      <Starfield />
      <AmbientBackdrop progress={bgShift} reduce={!!reduce} />
      <ScrollRail progress={scrollYProgress} />
      <PrototypeTag />
      <div className={styles.prefs}>
        <VisitorCount variant="nav" />
        <PrefToggles />
      </div>

      <HeroScene reduce={!!reduce} />
      <ReelScene reduce={!!reduce} />
      <ProofScene reduce={!!reduce} />
      <JourneyScene reduce={!!reduce} />
      <AboutScene reduce={!!reduce} />
      <CertsScene reduce={!!reduce} />
      <ContactScene reduce={!!reduce} />

      <footer className={styles.foot}>
        <div className={styles.footLeft}>
          <span className="mono">Prototype · scroll-choreography direction</span>
        </div>
        <Link href="/" className={styles.backLink}>
          ← <T en="Previous version" ko="이전 버전 사이트" />
        </Link>
      </footer>
    </main>
  );
}

/* ---------------------------------------------------------------------------
   Ambient backdrop — one aurora that shifts hue + drifts as the page scrolls,
   so the three scenes read as one continuous descent (not stacked sections).
--------------------------------------------------------------------------- */
function AmbientBackdrop({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  // Hue rotates cyan→violet→magenta across the scroll; blobs drift opposite ways.
  const hue = useTransform(progress, [0, 0.5, 1], [0, 40, 85]);
  const filter = useTransform(hue, (h) => `hue-rotate(${reduce ? 0 : h}deg)`);
  const y1 = useTransform(progress, [0, 1], ["0%", reduce ? "0%" : "34%"]);
  const y2 = useTransform(progress, [0, 1], ["0%", reduce ? "0%" : "-28%"]);

  return (
    <motion.div className={styles.backdrop} style={{ filter }} aria-hidden="true">
      <motion.i className={styles.blobA} style={{ y: y1 }} />
      <motion.i className={styles.blobB} style={{ y: y2 }} />
      <motion.i className={styles.blobC} style={{ y: y1 }} />
      <div className={styles.grain} />
    </motion.div>
  );
}

/* Vertical progress rail on the right edge. */
function ScrollRail({ progress }: { progress: MotionValue<number> }) {
  const h = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className={styles.rail} aria-hidden="true">
      <motion.span style={{ height: h }} />
    </div>
  );
}

function PrototypeTag() {
  return (
    <div className={styles.protoTag}>
      <span className={styles.dot} />
      <span className="mono">SHOWCASE · v6 prototype</span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SCENE 1 — Hero. Pinned: content parallaxes, scales and fades as you scroll
   past it, so scene 1 "recedes" into scene 2 rather than scrolling off flat.
--------------------------------------------------------------------------- */
function HeroScene({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const words = ["Ji", "Yong", "Park"];

  return (
    <section ref={ref} className={styles.heroWrap}>
      <div className={styles.heroPin}>
        <motion.div className={styles.heroInner} style={{ y, scale, opacity }}>
          <div className={styles.heroTag}>
            <span className={styles.dot} />
            <span className="mono">
              <T en="Available for new work" ko="새로운 팀을 찾고 있습니다" />
            </span>
          </div>

          <h1 className={styles.heroTitle} aria-label="Ji Yong Park">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className={styles.word}
                initial={{ y: reduce ? 0 : "0.9em", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <span lang="ko" className={styles.heroSubname}>
            박지용
          </span>

          <p className={styles.heroRole}>
            <span className={styles.gt}>Software Engineer</span>
          </p>

          <p className={styles.heroLead}>
            <T
              en={
                <>
                  I build <b>reliable web systems</b> end to end. My strength is the
                  backend, and I use AI tooling to ship across the full stack.
                </>
              }
              ko={
                <>
                  <b>안정적인 웹 시스템</b>을 처음부터 끝까지 만듭니다. 백엔드가 가장
                  단단한 강점이고, 필요한 곳에는 AI 도구를 더해 풀스택까지 챙깁니다.
                </>
              }
            />
          </p>
        </motion.div>

        <motion.div className={styles.scrollCue} style={{ opacity: cueOpacity }} aria-hidden="true">
          <span className="mono">
            <T en="scroll" ko="스크롤" />
          </span>
          <span className={styles.cueLine} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENE 2 — Work reel. THE signature move: the section pins for its full
   height and vertical scroll is mapped to HORIZONTAL travel through the
   project panels. Editorial spreads, no Netflix poster grid.
--------------------------------------------------------------------------- */
function ReelScene({ reduce }: { reduce: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0); // px the track must travel
  const [openId, setOpenId] = useState<string | null>(null);

  // Shared across both render branches: the animated card→modal deck reuses the
  // live site's narrative content (problem/decision/build/result/why-it-matters).
  const modal = (
    <AnimatePresence>
      {openId ? (
        <ProjectModal key={openId} p={byId[openId]} onClose={() => setOpenId(null)} />
      ) : null}
    </AnimatePresence>
  );

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300); // after fonts settle
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const panels = REEL_IDS.map((id) => byId[id]).filter(Boolean);
  // Less scroll per card = quicker card-to-card feedback.
  const scrollVh = Math.max(2, panels.length) * 58;

  const { scrollYProgress } = useScroll({ target: wrapRef });
  // Bind x directly to scroll (no spring) so the cards track the wheel 1:1 with
  // no lag — the earlier useSpring made the horizontal feedback feel delayed.
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const barW = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  // Reduced motion: fall back to a normal horizontal-scroll strip (no pin).
  if (reduce) {
    return (
      <>
        <section className={styles.reelFallback} aria-label="Selected work">
          <SceneHead eyebrow="Selected work" titleEn="What I've built." titleKo="대표 프로젝트" />
          <div className={styles.reelStrip}>
            {panels.map((p, i) => (
              <ReelPanel key={p.id} p={p} i={i} onOpen={setOpenId} />
            ))}
          </div>
        </section>
        {modal}
      </>
    );
  }

  return (
    <>
      <section
        ref={wrapRef}
        className={styles.reelWrap}
        style={{ height: `${scrollVh}vh` }}
        aria-label="Selected work"
      >
        <div className={styles.reelPin}>
          <div className={styles.reelHead}>
            <SceneHead eyebrow="Selected work" titleEn="What I've built." titleKo="대표 프로젝트" />
            <div className={styles.reelProgress} aria-hidden="true">
              <motion.span style={{ width: barW }} />
            </div>
          </div>
          <motion.div ref={trackRef} className={styles.reelTrack} style={{ x }}>
            {panels.map((p, i) => (
              <ReelPanel key={p.id} p={p} i={i} onOpen={setOpenId} />
            ))}
            <div className={styles.reelEnd}>
              <span className="mono">
                <T en="+ more on GitHub" ko="+ more on GitHub" />
              </span>
              <a
                href="https://github.com/JYPark-Code"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.endLink}
              >
                JYPark-Code ↗
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      {modal}
    </>
  );
}

function ReelPanel({
  p,
  i,
  onOpen,
}: {
  p: Project;
  i: number;
  onOpen: (id: string) => void;
}) {
  const c = PAS[p.pas] ?? PAS.sky;
  const open = () => onOpen(p.id);
  return (
    <motion.article
      layoutId={`proj-${p.id}`}
      className={styles.panel}
      style={
        {
          ["--pc" as string]: c[1],
          ["--pink" as string]: c[2],
          ["--wash" as string]: poster(p.pas),
        } as React.CSSProperties
      }
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 34 }}
    >
      <div className={styles.panelWash} aria-hidden="true" />
      <div className={styles.panelIndex}>{String(i + 1).padStart(2, "0")}</div>
      <span className={styles.openHint} aria-hidden="true">
        ↗
      </span>
      <div className={styles.panelBody}>
        <span className={styles.panelKicker}>
          <T en={p.en.kicker} ko={p.ko.kicker} />
        </span>
        <h3 className={styles.panelTitle}>
          <T en={p.en.title} ko={p.ko.title} />
        </h3>
        <p className={styles.panelLede}>
          <T en={p.en.lede} ko={p.ko.lede} />
        </p>
        <div className={styles.panelStack}>
          {p.stack.slice(0, 5).map((s) => (
            <span key={s} className={styles.chip}>
              {s}
            </span>
          ))}
        </div>
        <div className={styles.panelFoot}>
          <span className="mono">{p.year}</span>
          <StatusMark p={p} />
        </div>
      </div>
    </motion.article>
  );
}

/* Card lifecycle marker: living projects get an animated pill; everything else
   shows a subtle "open me" affordance since the whole card opens the modal. */
function StatusMark({ p }: { p: Project }) {
  if (p.status === "ongoing") {
    return (
      <span className={styles.ongoingTag}>
        <span className={styles.ongoingDot} aria-hidden="true" />
        <T en="Ongoing" ko="진행 중" />
      </span>
    );
  }
  if (p.status === "evolving") {
    return (
      <span className={styles.evolvingTag}>
        <span className={styles.evolvingDot} aria-hidden="true" />
        <T en="Evolving" ko="계속 발전 중" />
      </span>
    );
  }
  return (
    <span className={styles.detailsHint}>
      <T en="Details →" ko="자세히 →" />
    </span>
  );
}

/* Slide order + bilingual labels for the reused narrative deck. */
const DECK: { key: keyof Narrative; en: string; ko: string }[] = [
  { key: "problem", en: "Problem & Context", ko: "문제 · 맥락" },
  { key: "decision", en: "My Decision", ko: "나의 결정" },
  { key: "implementation", en: "How I Built It", ko: "구현" },
  { key: "result", en: "Outcome", ko: "결과" },
  { key: "connection", en: "Why It Matters", ko: "연결" },
];

/* Animated card → modal. layoutId matches the reel card, so the card visually
   grows into this panel; the body content (reused verbatim from the live site)
   fades in once the box has settled. */
function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const c = PAS[p.pas] ?? PAS.sky;
  const panelRef = useDialog<HTMLDivElement>(onClose);
  const hasLinks = Boolean(p.links.live || p.links.code);

  return (
    <div
      className={styles.modalRoot}
      role="dialog"
      aria-modal="true"
      aria-labelledby="showcaseModalTitle"
    >
      <motion.div
        className={styles.modalBackdrop}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        layoutId={`proj-${p.id}`}
        ref={panelRef}
        tabIndex={-1}
        className={styles.modalPanel}
        style={
          {
            ["--pc" as string]: c[1],
            ["--mink" as string]: c[2],
            ["--wash" as string]: poster(p.pas),
          } as React.CSSProperties
        }
        transition={{ type: "spring", stiffness: 240, damping: 30 }}
      >
        <div className={styles.modalHero}>
          <div className={styles.modalWash} aria-hidden="true" />
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            ✕
          </button>
          <div className={styles.modalHtitle}>
            <span className={styles.modalKicker}>
              <T en={p.en.kicker} ko={p.ko.kicker} />
            </span>
            <h3 id="showcaseModalTitle" className={styles.modalTitle}>
              <T en={p.en.title} ko={p.ko.title} />
            </h3>
          </div>
        </div>

        <motion.div
          className={styles.modalBody}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.3 }}
        >
          <div className={styles.modalMain}>
            <p className={styles.modalLede}>
              <T en={p.en.lede} ko={p.ko.lede} />
            </p>
            {p.narrative ? (
              <NarrativeDeck n={p.narrative} />
            ) : (
              <>
                <p className={styles.modalDesc}>
                  <T en={p.en.desc} ko={p.ko.desc} />
                </p>
                <h4 className={styles.modalH4}>
                  <T en="Highlights" ko="핵심 성과" />
                </h4>
                <ul className={styles.hl} lang="en">
                  {p.en.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
                <ul className={styles.hl} lang="ko">
                  {p.ko.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </>
            )}
            {hasLinks ? (
              <div className={styles.modalActions}>
                {p.links.live ? (
                  <a
                    className={`${styles.cbtn} ${styles.cbtnSolid}`}
                    href={p.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <T en="Live site ↗" ko="라이브 사이트 ↗" />
                  </a>
                ) : null}
                {p.links.code ? (
                  <a className={styles.cbtn} href={p.links.code} target="_blank" rel="noopener noreferrer">
                    <T en="Source code ↗" ko="소스 코드 ↗" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className={styles.modalMeta}>
            <MetaRow l={<T en="Year" ko="연도" />} v={p.year} />
            {p.duration ? (
              <MetaRow
                l={<T en="Duration" ko="기간" />}
                v={<T en={p.duration.en} ko={p.duration.ko} />}
              />
            ) : null}
            <MetaRow l={<T en="Role" ko="역할" />} v={<T en={p.en.role} ko={p.ko.role} />} />
            <MetaRow l={<T en="Type" ko="유형" />} v={<T en={p.en.type} ko={p.ko.type} />} />
            <h4 className={styles.modalH4}>
              <T en="Stack" ko="스택" />
            </h4>
            <div className={styles.tags}>
              {p.stack.map((s) => (
                <span key={s} className={styles.tag}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MetaRow({ l, v }: { l: React.ReactNode; v: React.ReactNode }) {
  return (
    <div className={styles.metaRow}>
      <span className={styles.metaL}>{l}</span>
      <span className={styles.metaV}>{v}</span>
    </div>
  );
}

function NarrativeDeck({ n }: { n: Narrative }) {
  const [idx, setIdx] = useState(0);
  const last = DECK.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIdx((v) => Math.min(last, v + 1));
      else if (e.key === "ArrowLeft") setIdx((v) => Math.max(0, v - 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [last]);

  const meta = DECK[idx];
  const slide = n[meta.key];

  return (
    <div className={styles.deck}>
      <div className={styles.deckStage}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className={styles.deckSlide}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.slabel}>
              <T en={meta.en} ko={meta.ko} />
            </span>
            <p className={styles.sbody}>
              <T en={slide.en} ko={slide.ko} />
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.deckNav}>
        <button
          className={styles.deckArw}
          onClick={() => setIdx((v) => Math.max(0, v - 1))}
          disabled={idx === 0}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <div className={styles.deckDots}>
          {DECK.map((s, j) => (
            <button
              key={s.key}
              className={j === idx ? `${styles.deckDot} ${styles.deckDotOn}` : styles.deckDot}
              onClick={() => setIdx(j)}
              aria-label={s.en}
            />
          ))}
        </div>
        <button
          className={styles.deckArw}
          onClick={() => setIdx((v) => Math.min(last, v + 1))}
          disabled={idx === last}
          aria-label="Next slide"
        >
          ›
        </button>
        <span className={styles.deckCount}>
          {idx + 1} / {DECK.length}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SCENE 3 — Journey. Vertical timeline whose gradient spine draws in and whose
   milestones reveal in sequence as they cross the reading line.
--------------------------------------------------------------------------- */
function JourneyScene({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const spineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className={styles.journeyWrap} aria-label="Journey">
      <SceneHead eyebrow="Journey" titleEn="The path so far." titleKo="이력" />
      <div ref={ref} className={styles.timeline}>
        <div className={styles.spineTrack} aria-hidden="true">
          <motion.span className={styles.spineFill} style={{ height: reduce ? "100%" : spineH }} />
        </div>
        {MILESTONES.map((m, i) => {
          const c = PAS[m.pas] ?? PAS.sky;
          return (
            <motion.div
              key={i}
              className={styles.tlItem}
              initial={{ opacity: 0, y: reduce ? 0 : 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -18% 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className={styles.tlNode}
                style={{ background: c[1], boxShadow: `0 0 0 4px ${c[0]}22, 0 0 20px 3px ${c[1]}` }}
              />
              <div className={styles.tlCard}>
                <div className={styles.tlHead}>
                  <span className={styles.tlYear}>{m.yr}</span>
                  <span className={styles.tlBadge} style={{ background: c[1], color: c[2] }}>
                    <T en={m.en.tag} ko={m.ko.tag} />
                  </span>
                </div>
                <h4 className={styles.tlTitle}>
                  <T en={m.en.title} ko={m.ko.title} />
                </h4>
                <p className={styles.tlDesc}>
                  <T en={m.en.desc} ko={m.ko.desc} />
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* Small scroll-reveal wrapper for the lower editorial scenes. */
function Reveal({
  children,
  reduce,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  reduce: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -14% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   PROOF — quantified outcomes above the fold for a skimming reviewer, plus the
   "built from scratch" signal. Every figure comes straight from the project
   data (src/data/projects.ts); nothing here is invented.
--------------------------------------------------------------------------- */
const PROOF_STATS: { k: string; en: string; ko: string; src: string }[] = [
  {
    k: "300 ~ 400%",
    en: "Event-sale revenue vs. prior periods",
    ko: "이벤트 세일 매출, 기존 대비",
    src: "Event-Driven Commerce",
  },
  {
    k: "1,000 TPS",
    en: "Held at peak, response time −50%",
    ko: "피크에서 대응, 응답시간 −50%",
    src: "Event-Driven Commerce",
  },
  {
    k: "~20% ↓",
    en: "Call-center inflow, in-house AI chatbot",
    ko: "콜센터 유입 감소, 사내 AI 챗봇",
    src: "AI Chatbot · RAG",
  },
  {
    k: "3 weeks",
    en: "Marketing site, no-code CMS, commerce admin",
    ko: "마케팅 사이트 · 노코드 CMS · 커머스 admin",
    src: "Hhosting · solo",
  },
];

function ProofScene({ reduce }: { reduce: boolean }) {
  return (
    <section className={styles.proofWrap} aria-label="By the numbers">
      <Reveal reduce={reduce}>
        <SceneHead
          eyebrow="By the numbers"
          titleEn="Shipped, measured, proven."
          titleKo="만들고, 측정하고, 증명한 것"
        />
      </Reveal>

      <div className={styles.proofGrid}>
        {PROOF_STATS.map((s, i) => (
          <Reveal reduce={reduce} delay={i * 0.06} key={s.k} className={styles.proofStat}>
            <div className={styles.proofK}>{s.k}</div>
            <div className={styles.proofL}>
              <T en={s.en} ko={s.ko} />
            </div>
            <div className={styles.proofSrc}>{s.src}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENE 4 — About: who I am, what I'm doing now, and the stack. Reuses the
   live site's approved copy (voice already signed off by the user).
--------------------------------------------------------------------------- */
function AboutScene({ reduce }: { reduce: boolean }) {
  return (
    <section className={styles.aboutWrap} aria-label="About">
      <Reveal reduce={reduce}>
        <SceneHead
          eyebrow="About"
          titleEn="Pragmatic engineer, product-minded."
          titleKo="프로덕트 관점으로 일하는 실용적인 엔지니어"
        />
      </Reveal>

      <div className={styles.aboutGrid}>
        <Reveal reduce={reduce} className={styles.aboutLede}>
          <p>
            <T
              en={
                <>
                  I build reliable web systems end-to-end, from the{" "}
                  <b>data model to the screen</b>. I care about clear schemas, honest error
                  handling, and interfaces that don&apos;t fight the user.
                </>
              }
              ko={
                <>
                  저는 안정적인 웹 시스템을 <b>데이터 모델부터 화면까지</b> 처음부터 끝까지
                  만듭니다. 명확한 스키마, 정직한 에러 처리, 사용자를 방해하지 않는 인터페이스를
                  중요하게 생각합니다.
                </>
              }
            />
          </p>
          <p>
            <T
              en={
                <>
                  Lately I work across the stack at a <b>B2B hosting company</b>: the marketing
                  site, internal tooling, and the order and back-office systems behind it.
                </>
              }
              ko={
                <>
                  최근에는 <b>B2B 호스팅사</b>에서 풀스택으로 일합니다. 마케팅 사이트, 사내 도구,
                  그리고 그 뒤의 주문·백오피스 시스템까지 다룹니다.
                </>
              }
            />
          </p>
        </Reveal>

        <Reveal reduce={reduce} delay={0.08} className={styles.aboutSide}>
          <div>
            <span className={styles.eyebrow}>Currently</span>
            <ul className={styles.currList}>
              {CURRENTLY.map((c, i) => (
                <li key={i}>
                  <T en={c.en} ko={c.ko} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal reduce={reduce} delay={0.06} className={styles.stackBlock}>
        <span className={styles.eyebrow}>Stack</span>
        <div className={styles.stackCols}>
          {STACK_COLUMNS.map((col, i) => (
            <div key={i}>
              <h4 className={styles.stackHead}>{col.en}</h4>
              <ul>
                {col.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENE 5 — Certifications: calm typographic index, essentials up top, the
   online-course certificates folded behind a toggle.
--------------------------------------------------------------------------- */
function CertsScene({ reduce }: { reduce: boolean }) {
  const [open, setOpen] = useState(false);
  const courseCount = CERTS_COURSES.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className={styles.certsWrap} aria-label="Certifications">
      <Reveal reduce={reduce}>
        <SceneHead
          eyebrow="Certifications"
          titleEn="Credentials & learning."
          titleKo="자격증과 학습"
        />
      </Reveal>

      <Reveal reduce={reduce} delay={0.06} className={styles.certGrid}>
        {CERTS_MAIN.map((g) => (
          <div className={styles.certGroup} key={g.label}>
            <h4>
              {g.label}
              <span className={styles.certCount}>{g.items.length}</span>
            </h4>
            <ul>
              {g.items.map((it) => (
                <li key={it.name} className={styles.certRow}>
                  <span>{it.name}</span>
                  <span className={styles.certYear}>{it.year}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>

      <button
        className={styles.certToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? (
          <T en="Hide course certificates" ko="강의 수료증 접기" />
        ) : (
          <T
            en={`Show ${courseCount} course certificates`}
            ko={`강의 수료증 ${courseCount}개 보기`}
          />
        )}
        <span aria-hidden="true">{open ? "▲" : "▼"}</span>
      </button>

      {open ? (
        <div className={styles.certGrid}>
          {CERTS_COURSES.map((g) => (
            <div className={styles.certGroup} key={g.label}>
              <h4>
                {g.label}
                <span className={styles.certCount}>{g.items.length}</span>
              </h4>
              <ul>
                {g.items.map((it) =>
                  it.url ? (
                    <li key={it.name}>
                      <a
                        className={`${styles.certRow} ${styles.certLink}`}
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{it.name}</span>
                        <span className={styles.certYear}>{it.year}</span>
                      </a>
                    </li>
                  ) : (
                    <li key={it.name} className={styles.certRow}>
                      <span>{it.name}</span>
                      <span className={styles.certYear}>{it.year}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENE 6 — Contact: the closing CTA. Big gradient headline, email, links.
--------------------------------------------------------------------------- */
function ContactScene({ reduce }: { reduce: boolean }) {
  return (
    <section className={styles.contactWrap} aria-label="Contact">
      <Reveal reduce={reduce} className={styles.contactPanel}>
        <span className={styles.eyebrow}>Contact</span>
        <h2 className={styles.contactTitle}>
          <T en="Let's build something." ko="Let's build something." />
        </h2>
        <a href={`mailto:${CONTACT.email}`} className={styles.contactMail}>
          {CONTACT.email}
        </a>
        <div className={styles.contactBtns}>
          <a href={CONTACT.github} className={styles.cbtn} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a
            href={CONTACT.linkedin}
            className={styles.cbtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a href={`mailto:${CONTACT.email}`} className={`${styles.cbtn} ${styles.cbtnSolid}`}>
            <T en="Email me →" ko="Email me →" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function SceneHead({
  eyebrow,
  titleEn,
  titleKo,
}: {
  eyebrow: string;
  titleEn: React.ReactNode;
  titleKo: React.ReactNode;
}) {
  return (
    <div className={styles.sceneHead}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.sceneTitle}>
        <T en={titleEn} ko={titleKo} />
      </h2>
    </div>
  );
}
