# 포트폴리오 프로젝트 다이어트 피드백

> 상태: 리뷰 완료 · 작성일 2026-07-11 · 기준 커밋 `d12241f`  
> 대상: `src/data/projects.ts`의 프로젝트 카탈로그와 홈 `Browse` 구성

## 1. 리뷰 목적

프로젝트를 많이 보여주는 것보다, 방문자가 짧은 시간 안에 다음 세 가지를 확실히 기억하도록 만든다.

1. 최근 회사에서 실제 제품을 끝까지 만든 풀스택 경험
2. Java/Spring 중심의 백엔드 및 시스템 설계 깊이
3. AI 도구를 단순 사용하지 않고 직접 제품화·오케스트레이션한 차별점

이 문서는 프로젝트 데이터를 즉시 삭제하라는 지시가 아니다. 우선 홈에서 노출하는 프로젝트만 큐레이션하고, 원본 데이터는 보존하는 저위험 접근을 권장한다.

## 2. 현재 상태 진단

| 항목 | 현재 값 |
| --- | ---: |
| `PROJECTS`의 고유 프로젝트 | 23개 |
| 홈 프로젝트 행 | 6개 |
| 행에 배치된 카드 합계 | 28개 |
| 중복 노출 | 5회 |
| 5단계 서사가 작성된 프로젝트 | 5개 |
| 권장 홈 노출 | 8~10개 |

현재 `Featured`의 5개 프로젝트가 각각 `Company work` 또는 `Backend & Systems`에 다시 등장한다. 따라서 사용자는 새로운 정보를 28개 보는 것이 아니라, 23개를 보면서 강한 프로젝트 5개를 반복해서 본다.

또한 최근 실무 프로젝트, 공개 백엔드 프로젝트, 교육용 랩, 오래된 입문 강좌 결과물이 모두 같은 크기와 상호작용을 가진 카드로 표현된다. 이 구조에서는 프로젝트 수가 경력의 폭을 보여주기보다 **무엇이 가장 강한지 판단하는 비용**을 높인다.

## 3. 다이어트 원칙

### 3.1 포함 기준

홈에 남기는 프로젝트는 아래 신호 중 최소 두세 가지를 분명하게 가져야 한다.

- **실제 영향:** 회사·사용자·운영 환경에서 쓰였는가
- **주도권:** 본인이 문제 정의, 설계, 구현을 얼마나 소유했는가
- **기술 깊이:** 단순 CRUD나 튜토리얼 이상의 판단이 보이는가
- **검증 가능성:** 공개 코드, 라이브 링크, 구체적 결과가 있는가
- **최근성:** 현재 지원 직무의 역량을 대표하는가
- **차별성:** 다른 프로젝트가 이미 보여주는 신호와 겹치지 않는가
- **목표 직무 적합성:** backend-strong full-stack이라는 포지셔닝을 강화하는가

### 3.2 제외 또는 이동 기준

- 동일한 역량을 더 강한 프로젝트가 이미 보여준다.
- 강좌·랩의 지시사항을 수행한 결과가 중심이다.
- 오래된 입문 단계 프로젝트라 현재 역량을 낮게 보이게 할 수 있다.
- 미완성 상태 자체가 핵심 설명에 포함된다.
- 팀 프로젝트인데 본인의 기여와 결과를 구체적으로 분리하기 어렵다.
- 비공개이며 설명도 짧아 검토자가 역량을 검증하기 어렵다.

### 3.3 한 카드, 한 신호

남긴 프로젝트마다 “이 프로젝트가 아니면 전달되지 않는 신호”가 하나 있어야 한다.

예:

- Hhosting Website → 실무 제품을 3주 만에 단독으로 끝까지 출시
- AnyCommerce → Java/Spring 백엔드의 가장 깊은 공개 근거
- AI Dev Toolkit → AI 보조 개발 방식을 직접 제품화
- MiniSQL → 프레임워크 밖의 시스템 기초와 C 구현력

두 카드의 핵심 신호를 같은 문장으로 설명할 수 있다면 하나만 남기는 것이 좋다.

## 4. 프로젝트별 권장 분류

### 4.1 홈 유지 — 핵심 9개

| 프로젝트 | 권장 위치 | 남겨야 하는 이유 | 보완점 |
| --- | --- | --- | --- |
| `hhosting-website` | Featured 1순위 | 최근 실무, 단독 주도, 3주 출시, 풀스택·제품 판단을 동시에 증명 | 현재 서사 유지, 가능하면 공개 가능한 결과 지표 추가 |
| `anycommerce` | Featured | Java/Spring, 동시성·캐시·부하 테스트 등 백엔드 깊이의 공개 근거 | 멘토링 프로젝트임을 현재처럼 투명하게 유지 |
| `hhosting-ai-devtoolkit` | Featured | AI 활용을 주장에 그치지 않고 내부 도구로 만든 차별점 | 실제 사용 범위나 절약한 반복 작업을 검증 가능한 표현으로 보강 |
| `event-driven-commerce` | Featured | Kafka 기반 분산 주문 시스템으로 백엔드 설계 폭을 보여줌 | AnyCommerce와 다른 신호인 이벤트·복구·일관성 판단을 앞세움 |
| `hhosting-proxmox` | Featured 또는 Selected 첫 카드 | 최근 회사 업무, 인프라 도메인, 5일 구현 속도 | Featured 유지 시 5단계 `narrative` 추가 권장 |
| `multi-model-harness` | Selected | 프레임워크 의존 없이 오케스트레이션을 설계한 AI 시스템 사고 | AI Dev Toolkit과 겹치지 않게 결정성·어댑터·테스트 루프를 강조 |
| `minisql` | Selected | 순수 C DBMS로 시스템 기초와 저장 계층 이해를 보여주는 공개 코드 | 학습 랩보다 직접 구현한 DBMS 판단을 중심으로 설명 |
| `hankook-chatbot` | Selected | 2023년 실제 회사 AI/RAG 경험으로 최근 AI 관심이 일시적이지 않음을 보여줌 | 공개 저장소와 회사 프로젝트의 관계 및 공개 가능한 범위를 재확인 |
| `react-tetris` | Selected | 시각적으로 확인 가능한 결과물이며 프론트엔드 폭을 한 장으로 증명 | 가능하면 라이브 데모를 제공, 없으면 코드/짧은 GIF 고려 |

이 9개만으로도 실무 4개, 백엔드 대표작 2개, 시스템·AI·프론트엔드 깊이를 고르게 보여줄 수 있다.

### 4.2 조건부 유지 — 목표 직무에 따라 교체

| 프로젝트 | 유지할 조건 | 기본 권장 |
| --- | --- | --- |
| `pintos` | OS·시스템 직무를 강하게 겨냥하고 본인 기여를 구체적으로 설명할 수 있을 때 | Archive |
| `mini-redis` | Redis 프로토콜, 만료, 자료구조 등 MiniSQL과 다른 구현 판단이 충분할 때 | Archive |
| `minigpt` | AI/ML 엔지니어 지원용 변형 포트폴리오를 만들 때 | Archive |
| `vdom-diff` | 프론트엔드 직무 지원 시 React 내부 원리 이해를 강조할 때 | Archive |
| `woowa-precourse` | 신입 Java 채용 또는 우아한테크코스 경험을 강조할 때 | 프로젝트 행에서는 제거하고 Journey/Certifications에서 유지 |
| `codex-dashboard` | 본인 기여, 실제 사용자, 결과 지표를 보강할 수 있을 때 | Archive |

조건부 프로젝트는 기본 홈에는 넣지 않고, 지원 직무별로 Selected 카드와 교체할 수 있는 후보군으로 둔다.

### 4.3 홈에서 제외 — Archive 또는 학습 이력으로 이동

| 프로젝트 | 권장 처리 | 이유 |
| --- | --- | --- |
| `web-proxy` | Archive | C 네트워크 랩 신호가 MiniSQL과 다른 시스템 대표작보다 약함 |
| `malloc` | Archive | 교육용 랩 성격이 강하고 시스템 기초 신호가 중복됨 |
| `mnist` | Archive | NumPy 기반 기초 신경망은 현재 AI·백엔드 수준을 낮춰 보일 수 있음 |
| `likelion-ml` | Certifications/Journey로 이동 | 수강 이력은 이미 별도 학습 섹션이 더 잘 표현함 |
| `fastapi-study` | Certifications로 이동 | 강좌 결과물이며 현재 백엔드 역량을 대표하지 않음 |
| `static-profile` | 홈 제외 | 오래된 HTML/CSS 입문 프로젝트, 현재 풀스택 역량과 큰 격차 |
| `react-study` | 홈 제외 | React 기초 강좌 결과물, 현재 Next.js 실무 경험보다 신호가 약함 |
| `php-cms` | 홈 제외 | 오래됐고 `unfinished` 표기가 첫인상에 직접적인 감점 요소가 됨 |

삭제가 부담스럽다면 `PROJECTS` 데이터에는 그대로 두고 `ROWS`에서만 제거한다. GitHub 저장소 자체가 전체 학습 기록 역할을 할 수 있으므로 포트폴리오 홈이 모든 기록을 대신할 필요는 없다.

## 5. 권장 홈 구성

### 안 A — 가장 권장: 2개 행, 9개 고유 프로젝트

```ts
Featured
1. hhosting-website
2. anycommerce
3. hhosting-ai-devtoolkit
4. event-driven-commerce
5. hhosting-proxmox

Selected technical work
1. multi-model-harness
2. minisql
3. hankook-chatbot
4. react-tetris
```

장점:

- 카드 배치가 28개에서 9개로 약 68% 감소한다.
- 중복이 완전히 사라진다.
- 모바일에서 프로젝트 행이 6개에서 2개로 줄어든다.
- 강한 실무·백엔드 프로젝트가 먼저 나오고, 두 번째 행에서 기술 폭을 보여준다.
- 현재 `Browse` 컴포넌트와 데이터 타입을 바꾸지 않고 `ROWS` 수정만으로 1차 적용할 수 있다.

### 안 B — 직무별 분류: 3개 행, 10개 고유 프로젝트

```ts
Featured
- hhosting-website
- anycommerce
- hhosting-ai-devtoolkit
- event-driven-commerce

Backend & Systems
- hhosting-proxmox
- minisql
- mini-redis 또는 pintos

AI & Selected Builds
- multi-model-harness
- hankook-chatbot
- react-tetris
```

장점은 기술 분류가 더 명확하다는 것이다. 단점은 행이 하나 늘고, `AI & Selected Builds`라는 이름이 다소 넓다는 점이다.

현재 포트폴리오가 단일 페이지이고 모바일 스크롤 길이가 이미 긴 편이므로 기본 추천은 **안 A**다.

## 6. Featured 선정과 순서 피드백

현재 Featured 첫 카드는 `anycommerce`다. 백엔드 지원에는 합리적이지만, 전체 포지셔닝이 “현재 회사에서 제품을 끝까지 만드는 backend-strong full-stack”이라면 최근 실무 대표작인 `hhosting-website`가 첫 카드인 편이 자연스럽다.

권장 순서:

1. `hhosting-website` — 현재성과 실제 제품 영향
2. `anycommerce` — 공개 코드로 검증 가능한 백엔드 깊이
3. `hhosting-ai-devtoolkit` — 개인 차별점
4. `event-driven-commerce` — 분산 시스템 설계
5. `hhosting-proxmox` — 인프라 도메인과 빠른 실행력

단, 특정 백엔드 공고에 제출하는 별도 버전이라면 `anycommerce`를 첫 카드로 되돌리는 식의 타깃별 순서 변경은 유효하다.

## 7. 서사 품질 정렬

현재 5단계 `narrative`가 있는 프로젝트는 다음 5개다.

- `hhosting-website`
- `hhosting-ai-devtoolkit`
- `multi-model-harness`
- `anycommerce`
- `event-driven-commerce`

Featured에 들어간 `hhosting-proxmox`에는 narrative가 없고, Featured 밖의 `multi-model-harness`에는 narrative가 있다. 반드시 모든 카드에 narrative가 필요하지는 않지만, 같은 Featured 행에서 상세 경험의 깊이가 달라 보일 수 있다.

권장 기준:

- Featured 프로젝트에는 가능한 한 narrative를 제공한다.
- Selected 프로젝트는 짧은 설명과 highlights만으로도 충분하다.
- 결과를 수치화할 수 없으면 숫자를 만들지 말고, 본인이 내린 결정과 트레이드오프를 구체화한다.
- 회사 프로젝트의 내부 구조와 고객 정보는 현재처럼 공개 가능한 수준으로 제한한다.

## 8. 구현 계획을 짤 때의 저위험 순서

### 1단계 — 노출만 축소

- `PROJECTS` 데이터는 삭제하지 않는다.
- `ROWS`를 권장 안 A 또는 B로 변경한다.
- 모든 id가 존재하는지 확인한다.
- 첫 카드 순서를 조정한다.

이 단계만으로 가장 큰 효과를 얻을 수 있고 되돌리기도 쉽다.

### 2단계 — 강한 카드 보강

- `hhosting-proxmox`를 Featured에 유지한다면 narrative를 추가한다.
- 공개 가능한 프로젝트에는 라이브 링크나 README 품질을 보강한다.
- 각 카드의 lede가 서로 다른 핵심 신호를 전달하는지 확인한다.
- 회사 프로젝트의 공개 범위를 다시 검토한다.

### 3단계 — Archive 필요성 판단

다음 중 실제 요구가 있을 때만 Archive UI를 추가한다.

- 방문자가 전체 프로젝트를 보고 싶다는 피드백이 반복된다.
- 지원 직무별 필터링이 필요하다.
- 숨긴 프로젝트에도 설명 가능한 가치가 충분하다.

그 전에는 별도 Archive 페이지를 만들지 않고 GitHub 링크가 전체 기록의 출구 역할을 하게 두는 편이 간결하다.

### 4단계 — 데이터 모델 정리(선택)

지원 직무별 구성을 자주 바꿔야 한다면 이후에만 다음 필드를 검토한다.

```ts
visibility?: "featured" | "selected" | "archive";
targets?: ("backend" | "fullstack" | "ai" | "systems")[];
```

현재는 9~10개 정적 목록이면 충분하므로 처음부터 필터 시스템을 만들 필요는 없다.

## 9. 완료 조건

- [ ] 홈에 노출되는 고유 프로젝트가 8~10개다.
- [ ] 같은 프로젝트가 둘 이상의 행에 중복되지 않는다.
- [ ] Featured는 최대 5개다.
- [ ] 최근 실무 대표작이 첫 화면의 첫 프로젝트 카드다.
- [ ] 오래된 입문·미완성 프로젝트가 홈에 노출되지 않는다.
- [ ] 학습 이력은 프로젝트와 Certifications/Journey에서 중복 강조되지 않는다.
- [ ] 남긴 카드마다 서로 다른 핵심 역량을 한 문장으로 설명할 수 있다.
- [ ] 비공개 회사 프로젝트는 공개 가능한 정보만 포함한다.
- [ ] 모바일에서 2~3개 프로젝트 행만 스크롤하면 다음 섹션으로 이동한다.
- [ ] 영문·한글에서 행 제목과 카드 설명이 모두 자연스럽다.
- [ ] `npm run typecheck` → `npm run lint` → `npm run build`가 통과한다.

## 10. 이번 다이어트의 비범위

- GitHub 저장소 삭제 또는 비공개 전환
- 사실 확인 없이 성과 수치 추가
- 모든 프로젝트에 장문의 narrative 작성
- 복잡한 검색·필터·태그 UI 추가
- 지원 직무별 별도 사이트를 즉시 구축

핵심은 프로젝트를 버리는 것이 아니라, **현재 지원자 수준을 가장 잘 증명하는 근거만 홈의 앞줄에 세우는 것**이다.
