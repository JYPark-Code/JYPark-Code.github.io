// ============================================================================
// Project catalog, the data behind the Netflix-style browse rows + modal.
//
// FIRST-PASS DRAFT for the user to prune/retouch. Sanitization rules:
//   • Private repos (hhosting-*, pintos) carry NO code links and NO internal
//     architecture/topology, role / stack / outcome only. Real company name
//     (하나로호스팅 / Hanaro Hosting) is kept per the user's decision.
//   • Public repos link to their GitHub source.
// Excluded on purpose (sensitive): musinsa_rookie_2026 (recruitment task),
//   concierge (unreleased product). Excluded as low-signal: forks, roadmaps,
//   codesandbox toys, SW-AI-W02-05 / W06 templates, empty repos, algo auto-push.
// Years use GitHub push dates as placeholders, the user will correct the few
// that differ from reality.
// ============================================================================

export type PastelKey = "butter" | "sky" | "lavender" | "mint" | "peach" | "rose";

/** [tint-light, tint-mid, ink], mid drives the poster, ink drives readable text. */
export const PAS: Record<PastelKey, [string, string, string]> = {
  butter: ["#fff6da", "#ffe3a0", "#7a5610"],
  sky: ["#e6f1fe", "#bcd9fb", "#1d4b7d"],
  lavender: ["#efe8fe", "#d3c2f5", "#4a2f7a"],
  mint: ["#e7f7ef", "#bfe8d3", "#1f5d43"],
  peach: ["#ffeede", "#ffcdaa", "#8a4522"],
  rose: ["#ffe6ec", "#ffbccd", "#8a2745"],
};

/** Duotone poster gradient for a pastel key (matches the mockup's `poster()`). */
export function poster(k: PastelKey): string {
  const c = PAS[k] ?? PAS.sky;
  return (
    `radial-gradient(120% 85% at 18% 10%, #fff 0%, transparent 42%), ` +
    `radial-gradient(120% 80% at 85% 100%, ${c[1]}, transparent 60%), ` +
    `linear-gradient(150deg, ${c[0]}, ${c[1]} 145%)`
  );
}

export interface LangText {
  title: string;
  kicker: string;
  role: string;
  type: string;
  lede: string;
  desc: string;
  highlights: string[];
}

/** One narrative slide's text, bilingual. */
export interface NarrativeSlide {
  en: string;
  ko: string;
}

/**
 * The 5-part story shown as a slide deck in the modal. Keep each field TIGHT
 * (1–2 sentences, no lists): problem answers "so what?"; decision names the
 * tradeoff (where skill shows); implementation = 1–2 key judgments; result =
 * verifiable numbers, or design/problem-solving language when unmeasurable;
 * connection = one line tying it to the target role.
 */
export interface Narrative {
  problem: NarrativeSlide;
  decision: NarrativeSlide;
  implementation: NarrativeSlide;
  result: NarrativeSlide;
  connection: NarrativeSlide;
}

export interface Project {
  id: string;
  year: string;
  /** Optional build duration — used to show short, high-impact sprints. */
  duration?: { en: string; ko: string };
  pas: PastelKey;
  stack: string[];
  /** Omit or leave empty for private repos, the modal simply shows no links. */
  links: { live?: string; code?: string };
  /** Optional 5-slide story. When present, the modal shows the deck. */
  narrative?: Narrative;
  en: LangText;
  ko: LangText;
}

const GH = "https://github.com/JYPark-Code";

export const PROJECTS: Project[] = [
  // ---- Company / private (sanitized, no code links) --------------------------
  {
    id: "hhosting-website",
    narrative: {
      problem: {
        en: "The old site barely surfaced in search, and the company needed a content base to launch VPS products. B2B infra buyers (and increasingly AI answer engines) had no clean way to find or evaluate the company.",
        ko: "기존 사이트는 검색 노출이 거의 없었고, VPS 상품 런칭을 위한 콘텐츠 기반도 필요했습니다. B2B 인프라 구매자는 물론, 점점 늘어나는 AI 검색조차 회사를 찾거나 평가할 방법이 없었습니다.",
      },
      decision: {
        en: "I optimized for AI-search (GEO/AEO) alongside classic SEO (structured data plus an llms.txt), betting that answer engines will drive B2B discovery. The tradeoff: more upfront content modeling, but it compounds as AI search grows.",
        ko: "고전적 SEO와 함께 AI 검색(GEO/AEO)을 최적화했습니다. 구조화 데이터와 llms.txt를 더했고, 답변 엔진이 B2B 발견을 이끌 것이라 판단했습니다. 트레이드오프는 초기 콘텐츠 모델링 비용이 크지만 AI 검색이 커질수록 복리로 돌아온다는 점입니다.",
      },
      implementation: {
        en: "Split the app into public marketing / member / staff zones behind role-based access, and gave non-developers a Puck + tiptap editor so content changes never need a deploy.",
        ko: "앱을 공개 마케팅 / 회원 / 스태프 영역으로 나눠 역할 기반 접근 뒤에 두고, 비개발자가 배포 없이 콘텐츠를 바꾸도록 Puck + tiptap 에디터를 제공했습니다.",
      },
      result: {
        en: "In 3 weeks, solo, I shipped the full renewal: a marketing site tuned for SEO/GEO, a no-code CMS the team edits without deploys, and a commerce admin with hardened auth. It is the content and ops foundation the VPS launch now runs on.",
        ko: "3주 만에 단독으로 전면 리뉴얼을 배포했습니다. SEO/GEO에 맞춘 마케팅 사이트, 팀이 배포 없이 편집하는 노코드 CMS, 인증을 강화한 커머스 admin까지. 지금 VPS 런칭이 올라탈 콘텐츠·운영 기반입니다.",
      },
      connection: {
        en: "Owning a product end to end: deciding what to build, shipping the frontend and backend, and running the infra under it. That is the product-engineer work I want more of.",
        ko: "무엇을 만들지 정하고, 그것을 이루는 프론트엔드·백엔드와 그 아래 인프라까지 제품을 끝까지 책임집니다. 제가 더 하고 싶은 프로덕트 엔지니어의 일입니다.",
      },
    },
    year: "2026 – present",
    duration: { en: "3 weeks", ko: "3주" },
    pas: "butter",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "MySQL", "Drizzle ORM", "Better Auth (RBAC)"],
    links: {},
    en: {
      title: "Hhosting Website Renewal",
      kicker: "Featured",
      role: "Lead / full-stack",
      type: "Company web app",
      lede: "A full B2B hosting site renewal (marketing, a no-code CMS, and a commerce admin), designed and shipped solo in 3 weeks.",
      desc: "Hanaro Hosting (하나로호스팅) is an SK Broadband IDC–based B2B infrastructure provider. I rebuilt its site on Next.js 16 with two priorities: SEO + AI-search (GEO/AEO) optimization, and a content foundation for launching VPS products. It serves a public marketing area alongside member and staff spaces, each behind role-based access.",
      highlights: [
        "SEO + GEO/AEO optimization (structured data, llms.txt) so search engines and AI answer engines both surface the site",
        "Public marketing, member, and staff areas separated by role-based access control",
        "In-house website & rich-text editor (Puck + tiptap) so non-developers can update content",
      ],
    },
    ko: {
      title: "하나로호스팅 웹 리뉴얼",
      kicker: "대표작",
      role: "리드 / 풀스택",
      type: "회사 웹앱",
      lede: "B2B 호스팅사 웹사이트 전면 리뉴얼. 마케팅·노코드 CMS·커머스 admin까지 3주 만에 단독으로 설계하고 배포했습니다.",
      desc: "하나로호스팅은 SK브로드밴드 IDC 기반 B2B 인프라 기업입니다. Next.js 16으로 사이트를 재구축하며 ① SEO + AI 검색(GEO/AEO) 최적화, ② VPS 상품 런칭을 위한 콘텐츠 자산 확보를 최우선으로 삼았습니다. 공개 마케팅 영역과 회원·스태프 영역을 역할 기반 접근으로 분리해 운영합니다.",
      highlights: [
        "SEO + GEO/AEO 최적화(구조화 데이터, llms.txt), 검색엔진과 AI 답변 엔진 양쪽에 노출",
        "공개 마케팅·회원·스태프 영역을 역할 기반 접근 제어(RBAC)로 분리",
        "비개발자도 콘텐츠를 수정하는 사내 웹사이트·리치텍스트 에디터(Puck + tiptap)",
      ],
    },
  },
  {
    id: "hhosting-proxmox",
    year: "2026.02",
    duration: { en: "5 days", ko: "5일" },
    pas: "sky",
    stack: ["Java 21", "Spring Boot", "Prometheus", "Grafana", "Proxmox API", "Thymeleaf"],
    links: {},
    en: {
      title: "Proxmox Control Plane",
      kicker: "Company · Cloud",
      role: "Author",
      type: "Monitoring / control plane",
      lede: "A Proxmox VE monitoring dashboard growing into the control-plane seed for a self-serve VPS platform.",
      desc: "A Java 21 + Spring Boot service that ingests Prometheus / pve-exporter metrics and renders Grafana-equivalent visualizations, with authentication, customer (owner) mapping, and infra health checks layered on top. Designed to graduate into a headless provisioning service behind the customer MyPage.",
      highlights: [
        "Prometheus + prometheus-pve-exporter → web dashboards matching the Grafana Proxmox board",
        "Auth, owner (customer) mapping, and infra health checks on top of raw metrics",
        "Architected as a future headless control plane for VM ordering / self-provisioning",
      ],
    },
    ko: {
      title: "Proxmox 컨트롤 플레인",
      kicker: "회사 · 클라우드",
      role: "제작",
      type: "모니터링 / 컨트롤 플레인",
      lede: "Proxmox VE 모니터링 대시보드에서 셀프서비스 VPS 플랫폼의 컨트롤 플레인으로 성장 중인 프로젝트.",
      desc: "Java 21 + Spring Boot로 Prometheus / pve-exporter 메트릭을 수집해 Grafana와 동일한 시각화를 웹으로 제공하고, 인증·소유자(고객) 매핑·인프라 헬스체크를 얹었습니다. 고객 MyPage 뒤의 헤드리스 프로비저닝 서비스로 승격되도록 설계했습니다.",
      highlights: [
        "Prometheus + prometheus-pve-exporter → Grafana Proxmox 보드와 동일한 웹 대시보드",
        "원시 메트릭 위에 인증·소유자(고객) 매핑·인프라 헬스체크",
        "VM 주문 / 셀프 프로비저닝을 위한 미래 헤드리스 컨트롤 플레인으로 설계",
      ],
    },
  },
  {
    id: "hhosting-ai-devtoolkit",
    narrative: {
      problem: {
        en: "AI coding sessions kept re-reading the whole project and burning context on every task. Knowledge didn't persist across sessions or projects.",
        ko: "AI 코딩 세션마다 프로젝트 전체를 다시 읽으며 매 작업에 컨텍스트를 낭비했습니다. 지식이 세션·프로젝트 간에 남지 않았습니다.",
      },
      decision: {
        en: "I built a separate harness that captures knowledge read-only (never touching the source project) and serves it in small slices, instead of stuffing everything into each prompt. Tradeoff: a capture/retrieval layer to maintain, but sessions start informed instead of cold.",
        ko: "모든 걸 매 프롬프트에 밀어넣는 대신, 소스를 건드리지 않고(읽기 전용) 지식을 캡처해 작은 단위로 제공하는 별도 하네스를 만들었습니다. 트레이드오프는 캡처/검색 계층을 유지해야 하지만, 세션이 맨바닥이 아니라 맥락을 갖고 시작한다는 점입니다.",
      },
      implementation: {
        en: "Profile-aware quality gates (web/mobile/Flutter/Python/Spring) and an Obsidian-based retrieval memory agents query on demand, plus a plan-review step that checks AI plans against live source before any code.",
        ko: "프로파일별 품질 게이트(웹/모바일/Flutter/Python/Spring)와 에이전트가 필요할 때 질의하는 Obsidian 기반 검색 메모리, 그리고 코드 전에 AI 계획을 실제 소스와 대조하는 플랜 리뷰 단계.",
      },
      result: {
        en: "A reusable toolkit that makes AI-assisted development repeatable across projects, the same gate ladder and memory behind this very portfolio's build.",
        ko: "AI 보조 개발을 프로젝트마다 반복 가능하게 만드는 재사용 툴킷, 지금 이 포트폴리오 빌드에도 쓰인 같은 게이트 래더와 메모리.",
      },
      connection: {
        en: "Spotting a recurring workflow problem and productizing the fix, aimed squarely at my own team's velocity.",
        ko: "반복되는 워크플로 문제를 발견해 해결책을 제품으로 만든 것. 우리 팀의 속도를 정조준했습니다.",
      },
    },
    year: "2026 – present",
    pas: "mint",
    stack: ["Node.js", "JavaScript", "CLI", "Playwright", "Obsidian", "MCP"],
    links: {},
    en: {
      title: "AI Dev Toolkit",
      kicker: "Company · Tooling",
      role: "Author (solo)",
      type: "CLI / harness",
      lede: "A reusable harness that captures project knowledge and feeds it to AI coding agents in small, useful slices.",
      desc: "Built solo to make AI-assisted development repeatable across projects. It registers a project, captures read-only knowledge packs without touching the source, runs profile-aware quality gates, and exposes an Obsidian-based retrieval memory so agents can query context instead of re-reading everything each session.",
      highlights: [
        "Profile-aware quality gates for web, mobile, Flutter, Python, and Spring projects",
        "Obsidian-based retrieval memory, query captured knowledge instead of large per-session context dumps",
        "Plan-review workflow so AI-authored plans get checked against live source before implementation",
      ],
    },
    ko: {
      title: "AI 개발 툴킷",
      kicker: "회사 · 도구",
      role: "단독 제작",
      type: "CLI / 하네스",
      lede: "프로젝트 지식을 캡처해 AI 코딩 에이전트에게 작고 유용한 단위로 전달하는 재사용 가능한 하네스.",
      desc: "AI 보조 개발을 프로젝트마다 반복 가능하게 만들기 위해 단독으로 제작했습니다. 프로젝트를 등록하고, 소스를 건드리지 않은 채 읽기 전용 지식 팩을 캡처하며, 프로파일별 품질 게이트를 실행하고, Obsidian 기반 검색 메모리로 에이전트가 매 세션 전체를 다시 읽는 대신 필요한 맥락만 질의하게 합니다.",
      highlights: [
        "웹·모바일·Flutter·Python·Spring 프로파일별 품질 게이트",
        "Obsidian 기반 검색 메모리, 매 세션 대량 컨텍스트 덤프 대신 캡처된 지식을 질의",
        "AI가 작성한 계획을 구현 전 실제 소스와 대조하는 플랜 리뷰 워크플로",
      ],
    },
  },
  // ---- AI / orchestration ----------------------------------------------------
  {
    id: "multi-model-harness",
    narrative: {
      problem: {
        en: "Multi-agent frameworks (LangGraph/CrewAI) hide the loop that actually matters. I wanted to understand orchestration by owning it, not configuring it.",
        ko: "멀티에이전트 프레임워크(LangGraph/CrewAI)는 정작 중요한 루프를 감춥니다. 오케스트레이션을 '설정'이 아니라 '소유'해서 이해하고 싶었습니다.",
      },
      decision: {
        en: "I let my orchestrator own the loop and call models as stateless functions behind adapters, handing off structured artifacts, never raw chat. Tradeoff: I write the plumbing, but I get determinism and no agent-to-agent drift.",
        ko: "오케스트레이터가 루프를 소유하고 모델은 어댑터 뒤의 stateless 함수로 호출하게 했습니다. raw 채팅이 아니라 구조화된 산출물로 핸드오프합니다. 트레이드오프는 배선을 직접 짜야 하지만 결정성을 얻고 에이전트 간 드리프트가 없다는 점입니다.",
      },
      implementation: {
        en: "Deterministic tests are the ground truth that closes each turn, with a turn cap to force convergence; a fake adapter runs the whole loop with no API keys for fast, free iteration.",
        ko: "결정론적 테스트가 각 턴을 닫는 ground truth이고 턴 상한으로 수렴을 강제하며, fake 어댑터로 API 키 없이 전체 루프를 빠르고 무료로 반복합니다.",
      },
      result: {
        en: "A from-scratch orchestrator, adapters, MCP wiring, and verification loop where GPT plans/reviews and Claude implements, no framework, fully testable offline.",
        ko: "GPT가 기획·리뷰하고 Claude가 구현하는, 프레임워크 없이 오프라인에서 완전히 테스트 가능한 from-scratch 오케스트레이터·어댑터·MCP 배선·검증 루프.",
      },
      connection: {
        en: "Designing the process, not just the code: deciding who owns which decision and how we verify it. That systems thinking is core to how I build products.",
        ko: "코드만이 아니라 프로세스를 설계합니다. 누가 어떤 결정을 소유하고 어떻게 검증하는지까지 정하는 시스템적 사고를 AI 시스템에 적용했습니다.",
      },
    },
    year: "2026",
    pas: "lavender",
    stack: ["Python", "OpenAI", "Claude", "MCP", "pytest"],
    links: { code: `${GH}/multi-model-harness` },
    en: {
      title: "Multi-Model Harness",
      kicker: "AI · Orchestration",
      role: "Author",
      type: "Orchestration harness",
      lede: "GPT and Claude split the SDLC and collaborate through structured artifacts. An orchestrator built from scratch, no LangGraph/CrewAI.",
      desc: "The orchestrator owns the loop; models are called like stateless functions behind adapters, handing off spec / diff / test-report artifacts. Deterministic tests are the ground truth that closes the conversation, with turn caps to force convergence.",
      highlights: [
        "From-scratch orchestrator, adapters, MCP wiring, and verification loop, no agent framework",
        "Planning (GPT↔Claude critique) → development (Claude→GPT review) → deterministic test gate",
        "Fake adapter to exercise the whole loop with no API keys",
      ],
    },
    ko: {
      title: "멀티모델 하네스",
      kicker: "AI · 오케스트레이션",
      role: "제작",
      type: "오케스트레이션 하네스",
      lede: "GPT와 Claude가 SDLC를 나눠 맡아 구조화된 산출물로 협업합니다. LangGraph/CrewAI 없이 from scratch로 구현한 오케스트레이터입니다.",
      desc: "오케스트레이터가 루프를 소유하고, 모델은 어댑터 뒤의 stateless 함수처럼 호출되며 spec / diff / test-report 산출물로 핸드오프합니다. 결정론적 테스트가 ground truth로 대화를 닫고, 턴 상한으로 수렴을 강제합니다.",
      highlights: [
        "오케스트레이터·어댑터·MCP 배선·검증 루프를 from scratch로, 에이전트 프레임워크 미사용",
        "기획(GPT↔Claude 비평) → 개발(Claude→GPT 리뷰) → 결정론적 테스트 게이트",
        "API 키 없이 전체 루프를 검증하는 fake 어댑터",
      ],
    },
  },
  // ---- Backend / systems -----------------------------------------------------
  {
    id: "anycommerce",
    year: "2024",
    duration: { en: "2024.10–2025.02", ko: "2024.10~2025.02" },
    pas: "lavender",
    stack: ["Java", "Spring Boot", "Spring Security", "JPA", "MySQL", "JWT", "Docker", "GitHub Actions"],
    links: { code: `${GH}/anycommerce` },
    en: {
      title: "AnyCommerce (F-Lab)",
      kicker: "Backend · E-commerce",
      role: "Author (mentored)",
      type: "Spring Boot backend",
      lede: "A from-scratch e-commerce backend built over ~4 months of F-Lab Java-backend mentoring: signup, auth, catalog, cart, and orders.",
      desc: "A Spring Boot REST API covering the full commerce path. Signup uses terms-agreement entities (JPA composite keys), email dup-check, CoolSMS phone verification, and encrypted passwords; auth is JWT (access + refresh) behind a Spring Security filter. The domain spans products/options/collections, cart, and orders (items, payment, delivery, status), with centralized error codes, integration tests, and a CI/CD pipeline to AWS ECR.",
      highlights: [
        "JWT auth (access + refresh) via a Spring Security token filter",
        "Signup: composite-key terms agreement, CoolSMS phone verification, encrypted passwords",
        "Commerce domain (catalog / cart / orders) + centralized ErrorCode handling + integration tests",
        "CI/CD (GitHub Actions + SonarCloud + Docker) deploying to AWS ECR",
      ],
    },
    ko: {
      title: "AnyCommerce (F-Lab)",
      kicker: "백엔드 · 이커머스",
      role: "제작 (멘토링)",
      type: "Spring Boot 백엔드",
      lede: "약 4개월 F-Lab 자바 백엔드 멘토링으로 밑바닥부터 만든 이커머스 백엔드: 회원가입, 인증, 카탈로그, 장바구니, 주문.",
      desc: "커머스 전 과정을 다루는 Spring Boot REST API입니다. 회원가입은 약관 동의 엔티티(JPA 복합키), 이메일 중복 체크, CoolSMS 휴대폰 인증, 비밀번호 암호화로 구성했고, 인증은 Spring Security 필터 뒤의 JWT(액세스 + 리프레시)입니다. 도메인은 상품/옵션/컬렉션, 장바구니, 주문(주문항목·결제·배송·상태)에 걸쳐 있으며, 중앙화된 에러 코드, 통합 테스트, AWS ECR 배포 CI/CD를 갖췄습니다.",
      highlights: [
        "Spring Security 토큰 필터 기반 JWT 인증(액세스 + 리프레시)",
        "회원가입: 복합키 약관 동의, CoolSMS 휴대폰 인증, 비밀번호 암호화",
        "커머스 도메인(카탈로그 / 장바구니 / 주문) + 중앙화된 ErrorCode 처리 + 통합 테스트",
        "CI/CD(GitHub Actions + SonarCloud + Docker)로 AWS ECR 배포",
      ],
    },
  },
  {
    id: "event-driven-commerce",
    narrative: {
      problem: {
        en: "A live commerce order flow buckled under event-sale traffic: heavy post-payment work sat on the request path, so at peak the site slowed and orders dropped.",
        ko: "실서비스 주문 흐름이 이벤트 세일 트래픽에서 무너졌습니다. 결제 후 무거운 후속 작업이 요청 경로에 얹혀 있어, 피크에 사이트가 느려지고 주문이 유실됐습니다.",
      },
      decision: {
        en: "I moved the heavy work off the request path with Kafka (publish, return 202, consume asynchronously) and layered the read path CDN → Redis → Caffeine → MySQL. The tradeoff: eventual consistency and more moving parts, in exchange for peak stability and headroom.",
        ko: "무거운 작업을 Kafka로 요청 경로에서 분리하고(발행 후 202 반환, 비동기 소비), 읽기 경로를 CDN → Redis → Caffeine → MySQL로 계층화했습니다. 트레이드오프는 최종 일관성과 구성 복잡도를 감수하는 대신 피크 안정성과 여유를 얻는 것이었습니다.",
      },
      implementation: {
        en: "Idempotency with an order key + DB unique constraint, retries and a Dead Letter Queue for failure recovery, and cache invalidation on product change kept data correct under load.",
        ko: "orderKey + DB 유니크 제약으로 멱등성을, 재시도와 DLQ로 장애 복구를, 상품 변경 시 캐시 무효화로 부하 중 정합성을 지켰습니다.",
      },
      result: {
        en: "Event-product revenue reached 300–400% of prior sales periods; downtime dropped 80%; the system held 1000 TPS with response time cut 50%; order errors fell 30%; DLQ + retries cut failure-recovery time 70%.",
        ko: "이벤트 상품 매출이 기존 영업 기간 대비 300~400%에 도달했고, 다운타임 80% 감소, 1000 TPS를 응답시간 50% 단축하며 대응, 주문 오류율 30% 감소, DLQ + 재시도로 장애 복구 시간 70% 단축.",
      },
      connection: {
        en: "Backend systems that stay up when it matters most: at peak. That reliability under load is the work I want to keep owning.",
        ko: "가장 중요한 순간, 즉 피크에도 버티는 백엔드 시스템. 부하 속 안정성이 제가 계속 책임지고 싶은 일입니다.",
      },
    },
    year: "2024",
    duration: { en: "2024.05–12", ko: "2024.05~12" },
    pas: "rose",
    stack: ["Java", "Spring", "Kafka", "Redis", "Caffeine", "MySQL", "k6"],
    links: { code: `${GH}/event-driven-commerce` },
    en: {
      title: "Event-Driven Commerce",
      kicker: "Backend · Distributed",
      role: "Backend",
      type: "Order system (Kafka)",
      lede: "A live commerce order pipeline re-architected around Kafka async and layered caching to hold event-sale peaks.",
      desc: "A production order system I built at a hosting company. The internal code is private, so I re-implemented it publicly in 2026 (the linked repo) to keep the architecture and load tests reproducible.",
      highlights: [
        "Event-product revenue 300–400% of prior periods; downtime down 80%",
        "Held 1000 TPS with response time cut 50%; order errors down 30%",
        "Idempotency (order key + DB unique) + DLQ retries cut failure-recovery time 70%",
      ],
    },
    ko: {
      title: "이벤트 드리븐 커머스",
      kicker: "백엔드 · 분산",
      role: "백엔드",
      type: "주문 시스템 (Kafka)",
      lede: "이벤트 세일 피크를 버티도록 Kafka 비동기 + 다층 캐싱으로 재설계한 실서비스 주문 파이프라인.",
      desc: "호스팅사에서 만든 실서비스 주문 시스템입니다. 사내 코드는 비공개라, 아키텍처와 부하 테스트를 재현할 수 있도록 2026년에 공개용으로 다시 구현했습니다(링크된 레포).",
      highlights: [
        "이벤트 상품 매출 기존 대비 300~400%; 다운타임 80% 감소",
        "1000 TPS 대응하며 응답시간 50% 단축; 주문 오류율 30% 감소",
        "멱등(orderKey + DB 유니크) + DLQ 재시도로 장애 복구 시간 70% 단축",
      ],
    },
  },
  {
    id: "minisql",
    year: "2026",
    pas: "peach",
    stack: ["C11", "B+Tree", "HTTP/1.1", "pthread", "Trie"],
    links: { code: `${GH}/jungle_w8_minisql_server` },
    en: {
      title: "MiniSQL DBMS",
      kicker: "Systems · Database",
      role: "Solo",
      type: "DBMS in pure C",
      lede: "A file-based DBMS built up over three iterations in pure C: SQL parser → B+Tree index → multithreaded HTTP daemon.",
      desc: "Started as a file-based SQL processor, then added a B+Tree index + fixed-width binary storage, then wrapped the engine in a hand-written HTTP/1.1 server with a self-tuning thread pool and LRU dict cache, zero runtime deps beyond pthread.",
      highlights: [
        "B+Tree point lookup 2.18M ops/s, 1,842× over linear scan",
        "Insert 32ms → 3µs / record via a 5-stage cache over a slow FS layer",
        "C11 daemon: 4→16 dynamic workers, rwlock + atomic LRU cache absorbs read floods",
      ],
    },
    ko: {
      title: "MiniSQL DBMS",
      kicker: "시스템 · 데이터베이스",
      role: "개인",
      type: "순수 C DBMS",
      lede: "순수 C로 세 번의 반복을 거쳐 만든 파일 기반 DBMS: SQL 파서 → B+트리 인덱스 → 멀티스레드 HTTP 데몬.",
      desc: "파일 기반 SQL 처리기로 시작해 B+트리 인덱스 + 고정폭 바이너리 저장을 더하고, 엔진을 직접 작성한 HTTP/1.1 서버(자가조정 스레드풀 + LRU dict 캐시)로 감쌌습니다. pthread 외 런타임 의존성은 0입니다.",
      highlights: [
        "B+트리 단건 조회 2.18M ops/s, 선형 스캔 대비 1,842×",
        "5단계 캐시로 INSERT 32ms → 3µs/건",
        "C11 데몬: 4→16 동적 워커, rwlock + atomic LRU 캐시가 read 폭주를 흡수",
      ],
    },
  },
  {
    id: "mini-redis",
    year: "2026",
    pas: "rose",
    stack: ["Python", "Hash table", "TTL", "threading"],
    links: { code: `${GH}/jungle_w3_mini_redis` },
    en: {
      title: "Mini Redis",
      kicker: "Systems",
      role: "Solo",
      type: "In-memory store (Python)",
      lede: "An in-memory key-value store that reimplements Redis's core principles in Python, no built-in dict allowed.",
      desc: "Built a chaining hash table (256 buckets) by hand instead of Python's dict, to demonstrate TTL lazy deletion, concurrency control, cache-aside, and JSON snapshot persistence.",
      highlights: [
        "Array + chaining hash table (256 buckets), no built-in dict",
        "TTL lazy deletion, threading.Lock + setnx for single-winner reservation",
        "Cache-aside pattern + JSON snapshot persistence (recovers on restart)",
      ],
    },
    ko: {
      title: "미니 Redis",
      kicker: "시스템",
      role: "개인",
      type: "인메모리 저장소 (Python)",
      lede: "Python dict 없이 Redis의 핵심 원리를 재구현한 인메모리 키-값 저장소.",
      desc: "Python dict 대신 체이닝 해시테이블(256 버킷)을 직접 구현해 TTL Lazy Deletion, 동시성 제어, Cache-Aside, JSON 스냅샷 영속성을 시연했습니다.",
      highlights: [
        "배열 + 체이닝 해시테이블(256 버킷), 내장 dict 미사용",
        "TTL Lazy Deletion, threading.Lock + setnx로 단일 예약 보장",
        "Cache-Aside 패턴 + JSON 스냅샷 영속성(재시작 후 복구)",
      ],
    },
  },
  {
    id: "web-proxy",
    year: "2026",
    pas: "sky",
    stack: ["C", "Sockets", "Concurrency", "Caching"],
    links: { code: `${GH}/SW-AI-W08-Web-proxy-Lab` },
    en: {
      title: "Web Proxy",
      kicker: "Systems · Network",
      role: "Solo",
      type: "HTTP proxy (C)",
      lede: "A CS:APP-style HTTP proxy server built from the socket layer up, networking, concurrency, and caching.",
      desc: "Implemented the full socket interface (socket / bind / listen / accept / connect), then added concurrency and a cache to learn how a proxy really works.",
      highlights: [
        "Socket-level HTTP proxy in C (CS:APP Proxy Lab)",
        "Concurrency + response caching",
        "TCP/IP, file descriptors, and the client-server model hands-on",
      ],
    },
    ko: {
      title: "웹 프록시",
      kicker: "시스템 · 네트워크",
      role: "개인",
      type: "HTTP 프록시 (C)",
      lede: "소켓 계층부터 밑바닥으로 구현한 CS:APP 스타일 HTTP 프록시 서버, 네트워킹·동시성·캐싱.",
      desc: "소켓 인터페이스(socket / bind / listen / accept / connect)를 전부 구현한 뒤 동시성과 캐시를 더해 프록시의 실제 동작을 학습했습니다.",
      highlights: [
        "C로 소켓 레벨 HTTP 프록시 (CS:APP Proxy Lab)",
        "동시성 + 응답 캐싱",
        "TCP/IP·파일 디스크립터·클라이언트-서버 모델 실습",
      ],
    },
  },
  {
    id: "malloc",
    year: "2026",
    pas: "peach",
    stack: ["C", "Memory allocator", "Free list"],
    links: { code: `${GH}/SW-AI-W07-Malloc-Lab` },
    en: {
      title: "Malloc Lab",
      kicker: "Systems · Memory",
      role: "Solo",
      type: "Memory allocator (C)",
      lede: "A dynamic memory allocator (malloc / free / realloc from scratch in C), scoring 92/100 on the CS:APP Malloc Lab.",
      desc: "Built the allocator's free list, coalescing, and placement policy to balance utilization and throughput.",
      highlights: [
        "malloc / free / realloc implemented from scratch",
        "Perf index 92/100 (52 utilization + 40 throughput)",
        "Free-list design, coalescing, and placement tuning",
      ],
    },
    ko: {
      title: "Malloc Lab",
      kicker: "시스템 · 메모리",
      role: "개인",
      type: "메모리 할당기 (C)",
      lede: "C로 malloc / free / realloc을 밑바닥부터 구현한 동적 메모리 할당기, CS:APP Malloc Lab 92/100.",
      desc: "이용률과 처리량의 균형을 위해 free-list·병합(coalescing)·배치 정책을 직접 설계했습니다.",
      highlights: [
        "malloc / free / realloc 직접 구현",
        "성능 지수 92/100 (이용률 52 + 처리량 40)",
        "Free-list 설계·coalescing·배치 튜닝",
      ],
    },
  },
  {
    id: "pintos",
    year: "2026",
    pas: "lavender",
    stack: ["C", "OS kernel", "Threads", "Virtual memory"],
    links: {},
    en: {
      title: "Pintos OS Kernel",
      kicker: "Systems · OS",
      role: "Team",
      type: "OS kernel (C)",
      lede: "KAIST 64-bit Pintos, building an operating-system kernel through threads, user programs, and virtual memory.",
      desc: "Worked through the Pintos projects: thread scheduling and synchronization, user-program loading and system calls, and a demand-paged virtual-memory subsystem.",
      highlights: [
        "Threads: scheduling and synchronization primitives",
        "User programs: process loading, argument passing, system calls",
        "Virtual memory: demand paging, supplemental page table",
      ],
    },
    ko: {
      title: "Pintos OS 커널",
      kicker: "시스템 · OS",
      role: "팀",
      type: "OS 커널 (C)",
      lede: "KAIST 64비트 Pintos, 스레드·유저 프로그램·가상 메모리를 거쳐 운영체제 커널을 직접 구현.",
      desc: "Pintos 프로젝트를 순서대로 진행했습니다: 스레드 스케줄링·동기화, 유저 프로그램 로딩·시스템 콜, 요구 페이징 가상 메모리 서브시스템.",
      highlights: [
        "스레드: 스케줄링·동기화 프리미티브",
        "유저 프로그램: 프로세스 로딩·인자 전달·시스템 콜",
        "가상 메모리: 요구 페이징·보조 페이지 테이블",
      ],
    },
  },
  // ---- AI / ML ---------------------------------------------------------------
  {
    id: "minigpt",
    year: "2026",
    pas: "mint",
    stack: ["Python", "PyTorch", "Transformer"],
    links: { code: `${GH}/SW-AI-W1314-MINIGPT` },
    en: {
      title: "Mini GPT",
      kicker: "AI",
      role: "Team",
      type: "LLM from scratch (PyTorch)",
      lede: "A small GPT-style language model built with only PyTorch to understand the core components of an LLM.",
      desc: "Implemented the transformer building blocks (attention, blocks, training loop) step by step, turning failing tests green one TODO at a time.",
      highlights: [
        "Transformer core in PyTorch, attention, blocks, tokenizer, training loop",
        "Test-driven: implement each TODO to pass its test",
        "Following 'Build an LLM from Scratch'",
      ],
    },
    ko: {
      title: "미니 GPT",
      kicker: "AI",
      role: "팀",
      type: "밑바닥부터 LLM (PyTorch)",
      lede: "LLM의 핵심 컴포넌트를 이해하기 위해 PyTorch만으로 만든 작은 GPT 계열 언어 모델.",
      desc: "트랜스포머 구성요소(어텐션·블록·학습 루프)를 단계별로 구현하며 실패하는 테스트를 TODO 하나씩 통과시켰습니다.",
      highlights: [
        "PyTorch로 트랜스포머 핵심, 어텐션·블록·토크나이저·학습 루프",
        "테스트 주도: 각 TODO를 구현해 테스트 통과",
        "『밑바닥부터 만들면서 배우는 LLM』 기반",
      ],
    },
  },
  {
    id: "mnist",
    year: "2026",
    pas: "butter",
    stack: ["Python", "NumPy", "Neural network"],
    links: { code: `${GH}/SW-AI-W1314-MNIST` },
    en: {
      title: "MNIST from scratch",
      kicker: "AI · ML",
      role: "Solo",
      type: "Neural net in NumPy",
      lede: "A handwritten-digit classifier built with NumPy only (no PyTorch/TensorFlow), reaching 97%+ test accuracy.",
      desc: "Implemented the core neural-network components (forward / backprop, layers, optimizers) by hand to understand what the frameworks hide.",
      highlights: [
        "Forward + backprop, layers, and optimizers in pure NumPy",
        "97%+ MNIST test accuracy (target ≥95%)",
        "No deep-learning framework, math from first principles",
      ],
    },
    ko: {
      title: "밑바닥부터 MNIST",
      kicker: "AI · ML",
      role: "개인",
      type: "NumPy 신경망",
      lede: "PyTorch/TensorFlow 없이 NumPy만으로 만든 손글씨 숫자 분류기, 테스트 정확도 97%+.",
      desc: "프레임워크가 숨기는 부분을 이해하기 위해 신경망 핵심(순전파/역전파·레이어·옵티마이저)을 직접 구현했습니다.",
      highlights: [
        "순전파 + 역전파, 레이어, 옵티마이저를 순수 NumPy로",
        "MNIST 테스트 정확도 97%+ (목표 ≥95%)",
        "딥러닝 프레임워크 미사용, 밑바닥부터 수식으로",
      ],
    },
  },
  {
    id: "codex-dashboard",
    year: "2026",
    pas: "mint",
    stack: ["Python", "GitHub API", "OAuth", "Web"],
    links: { code: `${GH}/jungle_openai_codex_group_project` },
    en: {
      title: "Study Dashboard",
      kicker: "AI · Web",
      role: "Team",
      type: "Web app",
      lede: "A learning-analytics dashboard that turns a GitHub repo's issues, commits, and project board into algorithm-study progress.",
      desc: "GitHub OAuth login, repo sync, and per-problem status (todo / in-progress / done) to visualize what's solved and where the weak spots are.",
      highlights: [
        "GitHub OAuth + issue / commit / project-board sync",
        "Per-problem progress: todo / in-progress / done",
        "Surfaces weak areas and what to solve next",
      ],
    },
    ko: {
      title: "학습 분석 대시보드",
      kicker: "AI · 웹",
      role: "팀",
      type: "웹 앱",
      lede: "GitHub 저장소의 이슈·커밋·프로젝트 보드를 알고리즘 학습 진행으로 바꿔주는 학습 분석 대시보드.",
      desc: "GitHub OAuth 로그인, 저장소 동기화, 문제별 상태(미해결/진행 중/해결)로 무엇을 풀었고 어디가 약한지 시각화합니다.",
      highlights: [
        "GitHub OAuth + 이슈 / 커밋 / 프로젝트 보드 동기화",
        "문제별 진행: 미해결 / 진행 중 / 해결",
        "약점 영역과 다음에 풀 문제 제시",
      ],
    },
  },
  // ---- Company work (private originals + public extracts) --------------------
  {
    id: "hankook-chatbot",
    year: "2023",
    duration: { en: "2023.03–08", ko: "2023.03~08" },
    pas: "mint",
    stack: ["Python", "FastAPI", "LangChain", "OpenAI API", "Chroma", "Redis", "MySQL"],
    links: { code: `${GH}/Langchain_pdf_chroma` },
    en: {
      title: "In-house AI Chatbot",
      kicker: "AI · Backend",
      role: "Backend",
      type: "LLM chatbot (RAG)",
      lede: "A support chatbot that answers from the company's manuals, built to cut call-center load.",
      desc: "At Hankook Cloud I built the backend for a LangChain + ChatGPT-API chatbot with retrieval over internal docs: a FastAPI service, Redis-backed sessions, and async conversation logging to MySQL.",
      highlights: [
        "Call-center inflow down ~20%, and 2 external client leads generated",
        "Redis sessions: JWT auth, TTL expiry, AOF persistence for recovery",
        "Async chat-log write (Redis buffer → MySQL) to avoid data loss under load",
      ],
    },
    ko: {
      title: "사내 AI 챗봇",
      kicker: "AI · 백엔드",
      role: "백엔드",
      type: "LLM 챗봇 (RAG)",
      lede: "사내 매뉴얼을 근거로 답하는 지원 챗봇. 콜센터 유입을 줄이기 위해 만들었습니다.",
      desc: "한국클라우드에서 사내 문서 검색을 붙인 LangChain + ChatGPT API 챗봇의 백엔드를 만들었습니다. FastAPI 서버, Redis 기반 세션, 대화 로그 비동기 MySQL 적재.",
      highlights: [
        "콜센터 유입 약 20% 감소, 외부 고객사 도입 리드 2건 창출",
        "Redis 세션: JWT 인증, TTL 만료, AOF 영속화로 복구 지원",
        "대화 로그 비동기 저장(Redis 버퍼 → MySQL)으로 부하 중 데이터 유실 방지",
      ],
    },
  },
  // ---- Frontend --------------------------------------------------------------
  {
    id: "react-tetris",
    year: "2026",
    pas: "sky",
    stack: ["TypeScript", "Custom React", "Virtual DOM", "Fiber"],
    links: { code: `${GH}/jungle_w5_react_tetris` },
    en: {
      title: "Physics Tetris",
      kicker: "Frontend",
      role: "Solo",
      type: "Game (TypeScript)",
      lede: "A physics-based tetris running on a custom React implementation (Virtual DOM, Hooks, Fiber), pure TypeScript, no framework.",
      desc: "Reimplemented React's core mechanics from scratch, then proved they work by building a 360°-rotation, line-cutting physics tetris on top of them.",
      highlights: [
        "Custom Virtual DOM + Hooks + Fiber in pure TypeScript",
        "360° rotation + line-cut mechanics as the stress test",
        "Render metrics / flamegraph to show the reconciler working",
      ],
    },
    ko: {
      title: "물리 테트리스",
      kicker: "프론트엔드",
      role: "개인",
      type: "게임 (TypeScript)",
      lede: "커스텀 React 구현체(Virtual DOM, Hooks, Fiber) 위에서 동작하는 물리 기반 테트리스, 순수 TypeScript, 프레임워크 없음.",
      desc: "React의 핵심 메커니즘을 밑바닥부터 재구현하고, 이를 증명하기 위해 360° 회전 + 라인 절단 물리 테트리스를 그 위에 만들었습니다.",
      highlights: [
        "순수 TypeScript로 커스텀 Virtual DOM + Hooks + Fiber",
        "360° 회전 + 라인 절단 메커니즘으로 스트레스 테스트",
        "렌더링 메트릭 / 플레임그래프로 재조정 동작 시연",
      ],
    },
  },
  {
    id: "vdom-diff",
    year: "2026",
    pas: "lavender",
    stack: ["JavaScript", "Virtual DOM", "Diff / patch"],
    links: { code: `${GH}/jungle_w4_react_vdom_diff` },
    en: {
      title: "Mini React (VDOM)",
      kicker: "Frontend",
      role: "Solo",
      type: "Educational (JS)",
      lede: "\"Why is Instagram's like button so fast?\", a side-by-side of Vanilla JS / Mini React / Real React that proves why the Virtual DOM matters.",
      desc: "Implements a Virtual DOM, diff algorithm, and patching by hand, with a mapping table showing each piece matches real React's core.",
      highlights: [
        "Hand-built Virtual DOM, diff, and minimal-DOM patch",
        "Three-way comparison (Vanilla / Mini React / Real React)",
        "Mapping table tying each concept to real React internals",
      ],
    },
    ko: {
      title: "미니 React (VDOM)",
      kicker: "프론트엔드",
      role: "개인",
      type: "교육용 (JS)",
      lede: "\"인스타 좋아요 버튼은 왜 이렇게 빠를까?\", Vanilla JS / Mini React / Real React를 나란히 비교해 Virtual DOM이 왜 필요한지 증명.",
      desc: "Virtual DOM·diff 알고리즘·patch를 직접 구현하고, 각 조각이 실제 React 핵심과 동일함을 대응표로 보여줍니다.",
      highlights: [
        "Virtual DOM·diff·최소 DOM patch 직접 구현",
        "3-way 비교(Vanilla / Mini React / Real React)",
        "각 개념을 실제 React 내부와 잇는 대응표",
      ],
    },
  },
  // ---- Coursework / practice (minor) -----------------------------------------
  {
    id: "woowa-precourse",
    year: "2025",
    duration: { en: "Nov 2025", ko: "2025.11" },
    pas: "lavender",
    stack: ["Java", "JUnit", "TDD", "Clean Code"],
    links: { code: `${GH}/java-lotto-8` },
    en: {
      title: "Woowacourse Pre-course (Java)",
      kicker: "Coursework",
      role: "Solo",
      type: "Java practice",
      lede: "Woowa Tech Course 8th pre-course: small Java problems built test-first, with a focus on clean, refactorable code.",
      desc: "A set of Java assignments (lotto, racing car, calculator, …) for the Woowahan Tech Course pre-course, practicing TDD, small commits, and readable structure.",
      highlights: [
        "Test-driven, small-commit workflow",
        "Domain modeling + input validation",
        "Refactoring toward readable, single-responsibility code",
      ],
    },
    ko: {
      title: "우아한테크코스 프리코스 (Java)",
      kicker: "코스워크",
      role: "개인",
      type: "Java 연습",
      lede: "우아한테크코스 8기 프리코스. 테스트를 먼저 작성하며 작은 Java 문제를 풀고 깔끔하고 리팩터링 가능한 코드에 집중했습니다.",
      desc: "로또·자동차경주·계산기 등 Java 과제를 우아한테크코스 프리코스로 진행하며 TDD, 작은 커밋, 읽기 좋은 구조를 연습했습니다.",
      highlights: [
        "테스트 주도 · 작은 커밋 워크플로",
        "도메인 모델링 + 입력 검증",
        "단일 책임 · 가독성 중심 리팩터링",
      ],
    },
  },
  {
    id: "likelion-ml",
    year: "2021",
    duration: { en: "2021–22", ko: "2021~22" },
    pas: "peach",
    stack: ["Python", "Jupyter", "ML", "pandas"],
    links: { code: `${GH}/LikeLion_13th_ML_Course` },
    en: {
      title: "likelion ML Study",
      kicker: "Self-study",
      role: "Student",
      type: "ML coursework",
      lede: "Machine-learning coursework and a project write-up from LikeLion's 13th cohort, plus extra self-study.",
      desc: "Notebooks and a presentation from the LikeLion (멋쟁이사자처럼) ML track: data handling, model basics, and a wrap-up project.",
      highlights: [
        "Data wrangling + model basics in Python / Jupyter",
        "Cohort project write-up and presentation",
        "Extra self-study beyond the curriculum",
      ],
    },
    ko: {
      title: "멋사 ML 스터디",
      kicker: "자기주도 학습",
      role: "수강생",
      type: "ML 코스워크",
      lede: "멋쟁이사자처럼 13기 머신러닝 코스워크와 프로젝트 정리·발표, 그리고 추가 자기주도 학습.",
      desc: "멋쟁이사자처럼 ML 과정의 노트북과 발표 자료입니다. 데이터 처리, 모델 기초, 마무리 프로젝트를 진행했습니다.",
      highlights: [
        "Python / Jupyter로 데이터 처리 + 모델 기초",
        "기수 프로젝트 정리 및 발표",
        "커리큘럼 외 추가 자기주도 학습",
      ],
    },
  },
  {
    id: "php-cms",
    year: "2020",
    pas: "mint",
    stack: ["PHP", "MySQL", "OOP"],
    links: { code: `${GH}/php_Practice` },
    en: {
      title: "PHP CMS (self-study)",
      kicker: "Self-study",
      role: "Solo",
      type: "CMS (unfinished)",
      lede: "An early CMS built while learning object-oriented PHP and MySQL. Unfinished, but where a lot of the server-side fundamentals first clicked.",
      desc: "A hands-on CMS following an object-oriented PHP + MySQL course. I didn't complete it, but it was an honest early step into server-side and database work. (Repo is private for now.)",
      highlights: [
        "Object-oriented PHP + MySQL from a course",
        "Server-side rendering + basic CRUD",
        "Early fundamentals, kept honestly (unfinished)",
      ],
    },
    ko: {
      title: "PHP CMS (자기주도 학습)",
      kicker: "자기주도 학습",
      role: "개인",
      type: "CMS (미완성)",
      lede: "객체지향 PHP·MySQL을 배우며 만든 초기 CMS. 완주하진 못했지만 서버사이드 기초가 처음 잡힌 작업입니다.",
      desc: "객체지향 PHP + MySQL 강의를 따라 직접 만든 CMS입니다. 완성하진 못했지만 서버사이드와 데이터베이스에 처음 발을 들인 정직한 시도였습니다. (레포는 현재 비공개.)",
      highlights: [
        "강의로 익힌 객체지향 PHP + MySQL",
        "서버사이드 렌더링 + 기본 CRUD",
        "초기 기초, 미완성이지만 그대로 기록",
      ],
    },
  },
  {
    id: "static-profile",
    year: "2021",
    pas: "sky",
    stack: ["HTML", "CSS"],
    links: { code: `${GH}/static_profile_page_AppBrewery` },
    en: {
      title: "Static Profile Page",
      kicker: "Self-study",
      role: "Student",
      type: "HTML / CSS",
      lede: "An early hand-coded profile page from the Web Development Bootcamp: first steps in HTML and CSS.",
      desc: "A static profile page built during the App Brewery Web Development Bootcamp (Udemy), practicing semantic HTML and CSS layout.",
      highlights: [
        "Semantic HTML structure",
        "CSS layout and styling from scratch",
        "First hands-on front-end steps",
      ],
    },
    ko: {
      title: "정적 프로필 페이지",
      kicker: "자기주도 학습",
      role: "수강생",
      type: "HTML / CSS",
      lede: "웹 개발 부트캠프에서 손으로 만든 초기 프로필 페이지. HTML·CSS의 첫걸음입니다.",
      desc: "App Brewery 웹 개발 부트캠프(Udemy)에서 만든 정적 프로필 페이지로, 시맨틱 HTML과 CSS 레이아웃을 연습했습니다.",
      highlights: [
        "시맨틱 HTML 구조",
        "CSS 레이아웃·스타일링을 밑바닥부터",
        "프론트엔드 첫 실습",
      ],
    },
  },
  {
    id: "react-study",
    year: "2021",
    pas: "lavender",
    stack: ["React", "JavaScript"],
    links: { code: `${GH}/Dynamic_Conditional_Rendering` },
    en: {
      title: "React Practice",
      kicker: "Self-study",
      role: "Student",
      type: "React basics",
      lede: "A handful of small React practice repos from learning the basics: components, state, conditional rendering, and styling.",
      desc: "Tiny practice projects made while learning React: conditional rendering, styled-components, props/state exercises, and CodeSandbox mini-apps (a keeper card, a to-do).",
      highlights: [
        "Components, props, and state",
        "Dynamic and conditional rendering",
        "styled-components / CSS-in-JS",
      ],
    },
    ko: {
      title: "React 연습",
      kicker: "자기주도 학습",
      role: "수강생",
      type: "React 기초",
      lede: "React 기초를 배우며 만든 짤막한 연습 레포 모음. 컴포넌트, 상태, 조건부 렌더링, 스타일링.",
      desc: "React를 배우며 만든 작은 연습 프로젝트들: 조건부 렌더링, styled-components, props/state 연습, CodeSandbox 미니 앱(키퍼 카드, 투두).",
      highlights: [
        "컴포넌트, props, 상태",
        "동적·조건부 렌더링",
        "styled-components / CSS-in-JS",
      ],
    },
  },
  {
    id: "fastapi-study",
    year: "2022",
    pas: "mint",
    stack: ["Python", "FastAPI", "Pydantic"],
    links: { code: `${GH}/fast_api_tutorial_udemy` },
    en: {
      title: "FastAPI Study",
      kicker: "Self-study",
      role: "Student",
      type: "FastAPI course",
      lede: "A FastAPI course follow-along: async APIs, routing, and request/response models in Python.",
      desc: "Built while taking a FastAPI course (Udemy), practicing async endpoints, path/query params, and Pydantic models. The foundation for later FastAPI work (the chatbot backend).",
      highlights: [
        "Async API endpoints + routing",
        "Pydantic request/response models",
        "Groundwork for the later chatbot backend",
      ],
    },
    ko: {
      title: "FastAPI 학습",
      kicker: "자기주도 학습",
      role: "수강생",
      type: "FastAPI 강좌",
      lede: "FastAPI 강좌 실습. Python으로 비동기 API, 라우팅, 요청/응답 모델.",
      desc: "FastAPI 강좌(Udemy)를 들으며 비동기 엔드포인트, 경로/쿼리 파라미터, Pydantic 모델을 연습했습니다. 이후 FastAPI 작업(챗봇 백엔드)의 기반이 되었습니다.",
      highlights: [
        "비동기 API 엔드포인트 + 라우팅",
        "Pydantic 요청/응답 모델",
        "이후 챗봇 백엔드의 밑바탕",
      ],
    },
  },
];

export const byId: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p]),
);

export interface Row {
  en: string;
  ko: string;
  ids: string[];
}

// Category rows (a project can appear in more than one). The dashed "+ more"
// ghost tile renders on the last row only.
// Cards are newest-first (most recent on the left) within each row, EXCEPT:
// Featured is curated (strongest first), and large flagship projects lead their
// category row regardless of date.
export const ROWS: Row[] = [
  {
    en: "Featured",
    ko: "대표작",
    ids: ["anycommerce", "hhosting-website", "event-driven-commerce", "hhosting-ai-devtoolkit", "hhosting-proxmox"],
  },
  {
    en: "Company work",
    ko: "회사 프로젝트",
    ids: ["hhosting-website", "hhosting-ai-devtoolkit", "hhosting-proxmox", "hankook-chatbot"],
  },
  {
    en: "Backend & Systems",
    ko: "백엔드 · 시스템",
    ids: ["anycommerce", "event-driven-commerce", "pintos", "minisql", "web-proxy", "malloc", "mini-redis"],
  },
  { en: "AI & ML", ko: "인공지능", ids: ["multi-model-harness", "minigpt", "mnist", "codex-dashboard"] },
  { en: "Frontend", ko: "프론트엔드", ids: ["react-tetris", "vdom-diff"] },
  {
    en: "Coursework & Self-study",
    ko: "코스워크 · 자기주도 학습",
    ids: ["woowa-precourse", "fastapi-study", "likelion-ml", "static-profile", "react-study", "php-cms"],
  },
];

export interface Milestone {
  yr: string;
  pas: PastelKey;
  en: { tag: string; title: string; desc: string };
  ko: { tag: string; title: string; desc: string };
}

// Timeline from the user's résumé + LinkedIn (docs/resume). The 2024 Hhosting
// role is a REJOIN: Hhosting (2017–2020) → Hankook Cloud (2022–2023) → back.
export const MILESTONES: Milestone[] = [
  {
    yr: "2012",
    pas: "lavender",
    en: { tag: "Education", title: "B.S. Computer Science", desc: "University at Albany (SUNY) · 2012–2017." },
    ko: { tag: "학력", title: "컴퓨터공학 학사", desc: "뉴욕주립대 알바니(SUNY) · 2012–2017." },
  },
  {
    yr: "2017",
    pas: "sky",
    en: {
      tag: "Work",
      title: "Hhosting · Cloud Engineer",
      desc: "Design Architect & Cloud Engineer · 2017–2020.",
    },
    ko: {
      tag: "경력",
      title: "하나로호스팅 · 클라우드",
      desc: "디자인 아키텍트 · 클라우드 엔지니어 · 2017–2020.",
    },
  },
  {
    yr: "2022",
    pas: "mint",
    en: {
      tag: "Work",
      title: "Hankook Cloud · AI Engineer",
      desc: "AI Software Engineer · Python/FastAPI LLM chatbot (LangChain, OpenAI) · 2022–2023.",
    },
    ko: {
      tag: "경력",
      title: "한국클라우드 · AI 엔지니어",
      desc: "AI 소프트웨어 엔지니어 · Python/FastAPI LLM 챗봇 (LangChain, OpenAI) · 2022–2023.",
    },
  },
  {
    yr: "2024",
    pas: "butter",
    en: {
      tag: "Work",
      title: "Rejoined Hhosting",
      desc: "Software Engineer · commerce backend, web, and cloud infra · since May 2024.",
    },
    ko: {
      tag: "경력",
      title: "하나로호스팅 재입사",
      desc: "소프트웨어 엔지니어 · 커머스 백엔드·웹·클라우드 인프라 · 2024.05~.",
    },
  },
  {
    yr: "2026",
    pas: "peach",
    en: {
      tag: "Learning",
      title: "CS from first principles",
      desc: "Pintos OS, a B+Tree DB engine, and CS:APP labs, built from scratch.",
    },
    ko: {
      tag: "학습",
      title: "밑바닥부터 CS",
      desc: "Pintos OS, B+Tree DB 엔진, CS:APP 랩, 직접 구현.",
    },
  },
  {
    yr: "2026",
    pas: "sky",
    en: {
      tag: "Mentoring",
      title: "Codeit · LLM Product Mentor",
      desc: "Mentoring LLM product building (part-time) · since July 2026.",
    },
    ko: {
      tag: "멘토링",
      title: "코드잇 · LLM 프로덕트 멘토",
      desc: "LLM 프로덕트 만들기 멘토링(파트타임) · 2026년 7월부터.",
    },
  },
  {
    yr: "Now",
    pas: "rose",
    en: { tag: "Now", title: "Open to work", desc: "Looking for the next interesting problem." },
    ko: { tag: "현재", title: "구직 중", desc: "다음 흥미로운 문제를 찾는 중." },
  },
];
