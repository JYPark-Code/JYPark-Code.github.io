"use client";

import { useState } from "react";
import { T } from "./T";
import { useDialog } from "./useDialog";

/**
 * Footer colophon: the "built with Claude Code + AI Dev Toolkit" line is a
 * button that opens a short, honest story of how this site was actually built.
 * Turns the AI-tooling claim into evidence the reviewer is already standing in.
 */
export default function Colophon() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="foot-colophon mono"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        title="How this site was built"
      >
        <T
          en="© 2026 Ji Yong Park · designed & built with Claude Code + my own AI Dev Toolkit"
          ko="© 2026 박지용 · Claude Code와 직접 만든 AI Dev Toolkit으로 제작"
        />
        <span className="foot-colophon-hint" aria-hidden="true">
          {" ⓘ"}
        </span>
      </button>
      {open ? <ColophonModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function ColophonModal({ onClose }: { onClose: () => void }) {
  const panelRef = useDialog<HTMLDivElement>(onClose);

  return (
    <div className="modal open" role="dialog" aria-modal="true" aria-labelledby="colophonTitle">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel" ref={panelRef} tabIndex={-1}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal-body solo">
          <div>
            <span className="eyebrow">Colophon</span>
            <h3 id="colophonTitle" className="colophon-title">
              <T en="How this site was built" ko="이 사이트를 만든 방법" />
            </h3>
            <p className="lede">
              <T
                en="Designed and built in a human-directed pair with Claude Code (Opus), run through my own AI Dev Toolkit. I make the calls; the agent does the typing — against a strict verification loop, not a vibe."
                ko="제가 방향을 잡고 Claude Code(Opus)와 페어로, 직접 만든 AI Dev Toolkit을 얹어 설계·구현했습니다. 판단은 제가, 타이핑은 에이전트가 — 감이 아니라 엄격한 검증 루프 위에서."
              />
            </p>

            <h4>
              <T en="Workflow" ko="워크플로" />
            </h4>
            <ul className="colophon-list">
              <li>
                <T
                  en="Every change clears a gate ladder — typecheck → lint → build → observed in a real browser (chrome-devtools MCP) — before it counts as done."
                  ko="모든 변경은 게이트 래더를 통과해야 완료로 칩니다 — 타입체크 → 린트 → 빌드 → 실제 브라우저에서 확인(chrome-devtools MCP)."
                />
              </li>
              <li>
                <T
                  en="The AI Dev Toolkit captures read-only project knowledge and serves it in small slices, so sessions start informed instead of re-reading the whole repo."
                  ko="AI Dev Toolkit이 읽기 전용으로 프로젝트 지식을 캡처해 작은 단위로 제공해, 세션이 레포 전체를 다시 읽는 대신 맥락을 갖고 시작합니다."
                />
              </li>
              <li>
                <T
                  en="A plan-review step checks the agent's plan against live source before a single line of code is written."
                  ko="플랜 리뷰 단계가 코드 한 줄 쓰기 전에 에이전트의 계획을 실제 소스와 대조합니다."
                />
              </li>
              <li>
                <T
                  en="An Obsidian-based memory persists decisions and preferences across sessions."
                  ko="Obsidian 기반 메모리가 결정과 선호를 세션 간에 이어줍니다."
                />
              </li>
            </ul>

            <h4>
              <T en="Tooling" ko="사용 도구" />
            </h4>
            <div className="tags">
              <span className="tag">Claude Code (Opus)</span>
              <span className="tag">AI Dev Toolkit</span>
              <span className="tag">Next.js 16</span>
              <span className="tag">chrome-devtools MCP</span>
              <span className="tag">Obsidian memory</span>
              <span className="tag">Framer Motion</span>
            </div>

            <p className="colophon-note">
              <T
                en="Design decisions, copy, and every judgment call are mine. AI is the tool, not the author — the same way I ship at work."
                ko="디자인 결정과 카피, 모든 판단은 제 몫입니다. AI는 저자가 아니라 도구입니다 — 회사에서 일하는 방식 그대로."
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
