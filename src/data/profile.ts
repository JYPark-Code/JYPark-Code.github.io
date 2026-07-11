// ============================================================================
// Profile content, hero copy, stats, about/currently/stack, contact.
// Prose lives in the components (via <T>); this file holds the structured,
// list-shaped data. Values are truthful and low-risk. No fabricated tenure.
// TODO(user): confirm/replace hero stats, LinkedIn, and résumé PDF when ready.
// ============================================================================

export const CONTACT = {
  email: "toboy93@gmail.com",
  github: "https://github.com/JYPark-Code",
  linkedin: "https://www.linkedin.com/in/%EC%A7%80%EC%9A%A9-%EB%B0%95-4078ba195/?locale=en",
} as const;

export interface HeroStat {
  /** Big value. Numeric strings count up on load; text values render as-is. */
  value: string;
  unit?: string;
  en: string;
  ko: string;
}

// Qualitative + honest (no invented years of experience).
export const HERO_STATS: HeroStat[] = [
  { value: "Full‑stack", en: "Scope", ko: "범위" },
  { value: "Java", unit: "/Py/TS", en: "Primary stack", ko: "주력 스택" },
  { value: "Web", unit: "·Infra", en: "Focus", ko: "중점 분야" },
];

export interface StackColumn {
  en: string;
  ko: string;
  items: string[];
}

// Evidenced by the repos: TS/Next + Java/Spring + Python/FastAPI + C/C++;
// MySQL/Postgres/Redis/Kafka/Docker; load testing & CI from the commerce demo.
export const STACK_COLUMNS: StackColumn[] = [
  { en: "Languages", ko: "언어", items: ["Java", "TypeScript", "Python", "C"] },
  { en: "Frameworks", ko: "프레임워크", items: ["Next.js / React", "Spring Boot", "Node.js", "FastAPI"] },
  { en: "Infra & Data", ko: "인프라·데이터", items: ["MySQL / Postgres", "Redis", "Kafka", "Docker"] },
  { en: "Practices", ko: "개발 방식", items: ["AI-assisted dev (Claude Code · Codex)", "Testing", "CI / CD", "Load testing", "Code review"] },
];

export interface CurrentlyItem {
  en: string;
  ko: string;
}

export const CURRENTLY: CurrentlyItem[] = [
  { en: "Backend & full-stack at a B2B hosting company", ko: "B2B 호스팅사에서 백엔드 · 풀스택" },
  { en: "LLM product mentor at Codeit (part-time)", ko: "코드잇에서 LLM 프로덕트 멘토 (파트타임)" },
  { en: "Building internal AI dev tooling", ko: "사내 AI 개발 도구 제작 중" },
  { en: "Open to interesting problems", ko: "흥미로운 문제에 열려 있음" },
];

export interface Cert {
  en: string;
  ko: string;
}

// Curated from the user's LinkedIn certifications. Credential links TBD (the
// user will provide them); Inflearn/Fast Campus courses are grouped to stay tidy.
export const CERTS: Cert[] = [
  { en: "Woowa Tech Course Pre-course · 2025", ko: "우아한테크코스 프리코스 · 2025" },
  { en: "F-Lab Java Backend Mentoring · 2025", ko: "F-Lab 자바 백엔드 멘토링 · 2025" },
  { en: "Spring · JPA · Inflearn (Younghan Kim) · '22–'25", ko: "스프링 · JPA · 인프런(김영한) · '22–'25" },
  { en: "LLM · NLP · Fast Campus · 2023", ko: "LLM · NLP · 패스트캠퍼스 · 2023" },
  { en: "AWS Certified Cloud Practitioner · 2019", ko: "AWS Cloud Practitioner · 2019" },
  { en: "Engineer Information Processing · 2019", ko: "정보처리기사 · 2019" },
];
