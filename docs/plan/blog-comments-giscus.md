# 게시판(블로그 글 + GitHub 댓글) 구현 계획

> 상태: 계획(Draft) · 작성일 2026-07-09 · 대상 저장소 `JYPark-Code.github.io`

## 1. 목표 / 범위

정적 export(GitHub Pages) 환경에서 **"내가 쓴 글 + GitHub 인증 유저의 댓글"** 수준의 게시판을 붙인다.

| 항목 | 결정 |
|------|------|
| 게시글 작성 | **본인(소유자)만** — Markdown 파일을 커밋 → 빌드 시 정적 생성 |
| 댓글 작성 | **GitHub 로그인 유저만** (Giscus) |
| 익명 댓글 | **없음** (Giscus 구조상 로그인 필수 → 원천 차단) |
| 저장소(백엔드) | **GitHub Discussions** (별도 서버·DB·비용 0) |
| 호스팅 | 기존 그대로 정적 export → GitHub Pages |

명시적 비범위(Non-goals): 방문자 글 작성, 회원 DB, 서버리스 함수, 실시간 알림 커스텀.

## 2. 아키텍처

```
content/posts/*.md         ← 내가 쓰는 글(소스)
      │  (빌드 시 파싱)
      ▼
/blog            글 목록 페이지 (정적 생성)
/blog/[slug]     글 상세 페이지 (정적 생성, generateStaticParams)
      │
      └─ 하단 <Comments/> (client component)
                 │
                 └─ Giscus iframe ──▶ GitHub Discussions (댓글 저장·인증·스팸·알림)
```

- 게시글은 **빌드 타임**에 Markdown → HTML로 정적 생성 (서버 불필요, `output: "export"`와 호환).
- 댓글은 **클라이언트 런타임**에 Giscus iframe이 로드 (정적 사이트에서 정상 동작).

## 3. 현재 프로젝트 전제

- Next.js **16.2.10**, App Router, `src/app/` 구조.
- `next.config.ts`: `output: "export"`, `images.unoptimized`, `trailingSlash: true`.
- Tailwind v4, framer-motion 설치됨.
- ⚠️ `AGENTS.md` 지침: 이 Next.js는 breaking change가 있으므로 **구현 전 `node_modules/next/dist/docs/` 의 관련 가이드를 읽고** API를 확인한다 (특히 `generateStaticParams`, metadata, MDX/파일 라우팅).

## 4. 사용자(소유자)가 직접 해야 하는 선행 작업

코드로 대체 불가능한 GitHub 설정 — 아래 4개를 완료해야 댓글이 작동한다.

1. 저장소가 **public** 인지 확인 (user site면 기본 public).
2. **Settings → General → Features → Discussions 체크**.
3. **giscus GitHub App 설치**: <https://github.com/apps/giscus> → 해당 repo에 권한 부여.
4. <https://giscus.app> 에서 repo 입력 → 출력되는 **`repo`, `repo-id`, `category`, `category-id`** 4개 값 확보.

> 위 값은 코드에 하드코딩하지 않고 아래 5.3 방식(상수/환경변수)으로 주입한다.

## 5. 구현 작업 목록

### 5.1 의존성
- `gray-matter` (Markdown frontmatter 파싱)
- Markdown 렌더: `react-markdown` + `remark-gfm` (또는 Next 내장 MDX). 정적 export 호환 확인 후 택1.
- Giscus 연동: `@giscus/react` (client component에서 사용).

### 5.2 게시글 파이프라인
- [ ] `content/posts/` 디렉터리 + 예시 글 1개(`hello.md`, frontmatter: `title`, `date`, `summary`).
- [ ] `src/lib/posts.ts` — 글 목록/단건 로드 유틸(파일시스템 읽기, frontmatter 파싱, slug 정렬).
- [ ] `src/app/blog/page.tsx` — 글 목록(제목·날짜·요약, 최신순).
- [ ] `src/app/blog/[slug]/page.tsx` — 상세 페이지 + `generateStaticParams`로 slug 정적 생성 + `generateMetadata`.

### 5.3 댓글 컴포넌트
- [ ] `src/components/Comments.tsx` — `"use client"`, `@giscus/react` 래핑.
- [ ] 설정값은 `src/lib/giscus.ts` 상수(또는 `NEXT_PUBLIC_*` env)로 분리 → 4.4에서 받은 값 주입.
- [ ] **다크모드 연동**: 사이트 테마에 맞춰 giscus `theme` prop 전환(light/dark).
- [ ] 상세 페이지 하단에 `<Comments term={slug} />` 삽입 (`mapping="pathname"` 권장).

### 5.4 내비게이션 / 마무리
- [ ] 헤더/홈에 `블로그` 링크 추가.
- [ ] `layout.tsx`의 placeholder metadata(`title: "Create Next App"`) 실제 값으로 교체.

## 6. 검증 (Gate ladder)

CLAUDE.md 규칙에 따라 순서대로:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build` → `out/` 에 `/blog/`, `/blog/<slug>/` 정적 파일 생성 확인.
4. 브라우저(chrome-devtools MCP)에서 목록→상세 이동, Giscus iframe 로드, 다크모드 전환 확인.
5. (선택) devtoolkit `gate` 실행.

> 로컬에서는 Giscus 댓글이 GitHub App 설치 전이면 iframe 에러가 날 수 있음 → 4장 선행 작업 완료 후 실사이트에서 최종 확인.

## 7. 리스크 / 열린 질문

- **Markdown 렌더 라이브러리 선택**: `@next/mdx` vs `react-markdown` — 정적 export 및 Next 16 호환성 확인 필요(4장 문서 확인).
- **giscus 값 노출**: `repo-id`/`category-id`는 공개돼도 무방(공개 저장소 식별자)이나, 상수 파일로 관리해 가독성 확보.
- **첫 댓글 Discussion 자동 생성**: `mapping="pathname"` 사용 시 페이지별로 Discussion이 자동 생성됨 — 카테고리는 "Announcements" 유형(소유자만 새 글 작성 가능) 권장.

## 8. 진행 순서 요약

1. (사용자) 4장 GitHub 선행 작업 → 값 4개 전달.
2. (Claude) 5장 구현 → 6장 게이트 → 브라우저 확인.
3. 커밋 & 배포.
