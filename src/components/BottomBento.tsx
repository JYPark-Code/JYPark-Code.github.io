import { T } from "./T";
import { CONTACT, CURRENTLY, STACK_COLUMNS } from "@/data/profile";

export default function BottomBento() {
  return (
    <section className="bento-bottom wrap">
      <div className="bcell about reveal" id="about">
        <span className="eyebrow">About</span>
        <h3 className="h">Pragmatic engineer, product-minded.</h3>
        <p>
          <T
            en={
              <>
                I build reliable web systems end-to-end, from the <b>data model to the screen</b>. I care
                about clear schemas, honest error handling, and interfaces that don&apos;t fight the user.
              </>
            }
            ko={
              <>
                저는 안정적인 웹 시스템을 <b>데이터 모델부터 화면까지</b>{" "}처음부터 끝까지 만듭니다. 명확한
                스키마, 정직한 에러 처리, 사용자를 방해하지 않는 인터페이스를 중요하게 생각합니다.
              </>
            }
          />
        </p>
        <p>
          <T
            en={
              <>
                Lately I work across the stack at a <b>B2B hosting company</b>: the marketing site, internal
                tooling, and the order and back-office systems behind it.
              </>
            }
            ko={
              <>
                최근에는 <b>B2B 호스팅사</b>에서 풀스택으로 일합니다. 마케팅 사이트, 사내 도구, 그리고 그 뒤의
                주문·백오피스 시스템까지 다룹니다.
              </>
            }
          />
        </p>
      </div>

      <div className="bcell curr reveal">
        <span className="eyebrow">Currently</span>
        <ul>
          {CURRENTLY.map((c, i) => (
            <li key={i}>
              <T en={c.en} ko={c.ko} />
            </li>
          ))}
        </ul>
      </div>

      <div className="bcell stack reveal" id="stack">
        <span className="eyebrow">Stack</span>
        <div className="stack-cols">
          {STACK_COLUMNS.map((col, i) => (
            <div key={i}>
              <h4>{col.en}</h4>
              <ul>
                {col.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bcell contact reveal" id="contact">
        <div>
          <span className="k">Contact</span>
          <h3>Let&apos;s build something.</h3>
          <span className="mail">{CONTACT.email}</span>
        </div>
        <div className="cbtns">
          <a href={CONTACT.github} className="cbtn" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={CONTACT.linkedin} className="cbtn" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${CONTACT.email}`} className="cbtn solid">
            Email me →
          </a>
        </div>
      </div>
    </section>
  );
}
