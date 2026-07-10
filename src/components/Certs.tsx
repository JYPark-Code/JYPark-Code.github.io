import { CERT_GROUPS, INFLEARN_BADGE, type CertItem } from "@/data/certs";

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

export default function Certs() {
  return (
    <section id="certs" className="certs-section">
      <div className="certs-head">
        <div className="sec-lead reveal">
          <span className="eyebrow">Certifications</span>
          <h2>Credentials &amp; learning.</h2>
          <p>Certifications, mentoring, and course credentials. Linked titles open the certificate.</p>
        </div>
        <a
          className="cert-badge reveal"
          href={INFLEARN_BADGE.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${INFLEARN_BADGE.title} · ${INFLEARN_BADGE.sub}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={INFLEARN_BADGE.src} alt="Inflearn 2025 Master badge" loading="lazy" />
          <span className="cb-cap">{INFLEARN_BADGE.sub}</span>
        </a>
      </div>

      <div className="cert-cols">
        {CERT_GROUPS.map((g) => (
          <div className="cgroup reveal" key={g.label}>
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
        ))}
      </div>
    </section>
  );
}
