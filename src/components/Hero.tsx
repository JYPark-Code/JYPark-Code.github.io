import { T } from "./T";
import Constellation from "./Constellation";
import { HERO_STATS, CONTACT } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="hero-bento wrap">
      <div className="cell hero-main">
        <div className="aurora" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <Constellation />
        <div className="hero-copy">
          <span className="bb-tag">
            <span className="dot" />{" "}
            <span className="mono">
              <T en="available for new work" ko="새로운 팀을 찾고 있습니다" />
            </span>
          </span>
          <h1>
            <T en="Ji Yong Park" ko="박지용" />
          </h1>
          <p className="role">
            <T en="Software Engineer" ko="소프트웨어 엔지니어" />
          </p>
          <p className="lead">
            <T
              en={
                <>
                  I build <b>reliable web systems</b>{" "}end to end.
                  <br />
                  My strength is the backend, and I use AI tooling to ship across the full stack, fast and
                  carefully.
                </>
              }
              ko={
                <>
                  <b>안정적인 웹 시스템</b>을 처음부터 끝까지 만듭니다.
                  <br />
                  백엔드가 가장 단단한 강점이고, 필요한 곳에는 AI{" "}도구를 더해 풀스택 전반까지 꼼꼼히
                  챙깁니다.
                </>
              }
            />
          </p>
          <div className="cta-row">
            <a href="#browse" className="btn primary">
              ▶ <T en="Browse work" ko="작업 둘러보기" />
            </a>
            <a href={CONTACT.github} className="btn" target="_blank" rel="noopener noreferrer">
              <T en="GitHub" ko="GitHub" /> <span className="arw">↗</span>
            </a>
          </div>
        </div>
      </div>

      {HERO_STATS.map((s, i) => (
        <div className="cell stat" key={i}>
          <div className="k">
            {s.value}
            {s.unit ? <span className="u">{s.unit}</span> : null}
          </div>
          <div className="l">
            <T en={s.en} ko={s.ko} />
          </div>
        </div>
      ))}
    </section>
  );
}
