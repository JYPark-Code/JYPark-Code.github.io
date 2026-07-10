import { CERT_GROUPS, INFLEARN_BADGE, type CertItem } from "@/data/certs";

function Chip({ it }: { it: CertItem }) {
  const inner = (
    <>
      <span className="cn">{it.name}</span>
      <span className="cy">{it.year}</span>
    </>
  );
  return it.url ? (
    <a className="cert-chip link" href={it.url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <span className="cert-chip">{inner}</span>
  );
}

export default function Certs() {
  return (
    <section id="certs" className="certs-section wrap">
      <div className="sec-lead reveal">
        <span className="eyebrow">Certifications</span>
        <h2>Credentials &amp; learning.</h2>
        <p>Certifications, mentoring programs, and course credentials. Linked chips open the certificate.</p>
      </div>

      <div className="cert-layout">
        <div className="cert-groups">
          {CERT_GROUPS.map((g) => (
            <div className="cert-group reveal" key={g.label}>
              <h4>{g.label}</h4>
              <div className="cert-items">
                {g.items.map((it) => (
                  <Chip it={it} key={it.name} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Easter egg: the cute Inflearn 2025 "Master" badge. */}
        <a
          className="cert-badge reveal"
          href={INFLEARN_BADGE.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${INFLEARN_BADGE.title} · ${INFLEARN_BADGE.sub}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={INFLEARN_BADGE.src} alt="Inflearn 2025 Master badge" loading="lazy" />
          <span className="cb-cap">
            {INFLEARN_BADGE.title}
            <br />
            {INFLEARN_BADGE.sub}
          </span>
        </a>
      </div>
    </section>
  );
}
