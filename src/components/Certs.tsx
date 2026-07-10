"use client";

import { useState } from "react";
import { CERTS_MAIN, CERTS_COURSES, INFLEARN_BADGE, type CertGroup, type CertItem } from "@/data/certs";

function Row({ it }: { it: CertItem }) {
  const inner = (
    <>
      <span className="cn">{it.name}</span>
      <span className="cy">{it.year}</span>
    </>
  );
  return (
    <li>
      {it.url ? (
        <a className="crow link" href={it.url} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <span className="crow">{inner}</span>
      )}
    </li>
  );
}

function Group({ g }: { g: CertGroup }) {
  return (
    <div className="cgroup">
      <h4>
        {g.label}
        <span className="cnt">{g.items.length}</span>
      </h4>
      <ul className="clist">
        {g.items.map((it) => (
          <Row it={it} key={it.name} />
        ))}
      </ul>
    </div>
  );
}

export default function Certs() {
  const [open, setOpen] = useState(false);
  const courseCount = CERTS_COURSES.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="certs" className="certs-section">
      <div className="certs-head">
        <div className="sec-lead reveal">
          <span className="eyebrow">Certifications</span>
          <h2>Credentials &amp; learning.</h2>
          <p>The essentials up top. My online-course certificates are folded in below.</p>
        </div>
        <a
          className="cert-badge reveal"
          href={INFLEARN_BADGE.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${INFLEARN_BADGE.recap} · ${INFLEARN_BADGE.grade} · ${INFLEARN_BADGE.hours}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={INFLEARN_BADGE.src} alt="Inflearn 2025 annual recap, Master grade" loading="lazy" />
          <span className="cb-cap">
            <b>{INFLEARN_BADGE.recap}</b>
            <br />
            {INFLEARN_BADGE.grade} · {INFLEARN_BADGE.hours}
          </span>
        </a>
      </div>

      <div className="cert-cols cert-main-cols reveal">
        {CERTS_MAIN.map((g) => (
          <Group g={g} key={g.label} />
        ))}
      </div>

      <button className="cert-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Hide course certificates" : `Show ${courseCount} course certificates`}
        <span className="chev" aria-hidden="true">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open ? (
        <div className="cert-cols cert-course-cols">
          {CERTS_COURSES.map((g) => (
            <Group g={g} key={g.label} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
