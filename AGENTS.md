# AGENTS.md

이 파일은 이 저장소에서 작업하는 Codex의 최상위 프로젝트 지침이다.

## 1. 프로젝트 목표

개인 포트폴리오/지식 홈페이지를 구축한다.

운영 경험은 `205sla/205-portfolio`의 방식을 참고한다.

핵심은 다음과 같다.

1. Astro 정적 사이트를 사용한다.
2. 각 콘텐츠는 Markdown 파일 하나와 같은 폴더의 이미지들로 관리한다.
3. GitHub `main` 브랜치 push 시 GitHub Actions가 사이트를 빌드하고 GitHub Pages에 배포한다.
4. Notion은 홈페이지 런타임 데이터 소스가 아니다.
5. Notion은 Markdown 콘텐츠의 mirror/지식관리용 사본이다.
6. 콘텐츠의 최종 원본(Source of Truth)은 Git 저장소다.
7. 사용자는 가능하면 직접 파일을 편집하지 않고 Codex에게 자연어로 작업을 요청한다.

## 2. 절대로 바꾸지 말아야 할 기본 원칙

### Source of Truth

```text
Local Markdown / GitHub = canonical
Notion = mirror
Static Website = generated output
```

초기 마이그레이션이 끝난 뒤에는 Notion → GitHub 자동 역동기화를 구현하지 않는다.

Notion과 GitHub의 양방향 동기화도 구현하지 않는다.

사용자가 명시적으로 설계를 변경해 달라고 하지 않는 한 이 원칙을 유지한다.

### 홈페이지 빌드는 Notion에 의존하지 않는다

`npm run build` 및 GitHub Actions 배포는 Notion API/MCP 연결 없이도 항상 성공해야 한다.

빌드 중 Notion에 요청하지 않는다.

Notion 장애, OAuth 만료, MCP 장애가 홈페이지 배포를 막아서는 안 된다.

### Notion MCP의 역할

Notion MCP는 Codex가 작업 세션 중 다음을 할 때만 사용한다.

- 기존 Notion 콘텐츠 읽기
- 최초 마이그레이션
- Markdown 콘텐츠를 Notion mirror에 생성
- 기존 mirror 페이지 갱신

무인 CI/CD에서 Notion MCP를 호출하는 구조를 만들지 않는다.

## 3. 참고 저장소 사용 원칙

참고 저장소:
https://github.com/205sla/205-portfolio

참고할 것:

- Astro Content Collections 기반 콘텐츠 관리
- 프로젝트별 `index.md`
- 프로젝트 폴더에 이미지 colocate
- Git push → GitHub Actions → GitHub Pages
- frontmatter 기반 카드/분류/메타데이터
- 콘텐츠 수에 따라 정적 상세 페이지 자동 생성

그대로 복사하지 말 것:

- 원본 HTML/CSS
- 디자인 에셋
- 문구
- 개인 데이터
- 저장소 내부 구현 코드의 대량 복제

같은 운영 구조를 이 저장소의 요구사항에 맞춰 독립적으로 구현한다.

## 4. 목표 디렉터리 구조

구현이 끝나면 대략 다음 구조를 갖는다.

```text
.
├─ .codex/
│  └─ config.toml
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ docs/
├─ public/
│  ├─ assets/
│  └─ docs/
├─ src/
│  ├─ components/
│  ├─ content/
│  │  └─ projects/
│  │     ├─ game/
│  │     ├─ web/
│  │     ├─ research/
│  │     ├─ security/
│  │     └─ etc/
│  ├─ layouts/
│  ├─ pages/
│  │  ├─ index.astro
│  │  └─ projects/
│  │     └─ [...slug].astro
│  ├─ styles/
│  └─ content.config.ts
├─ scripts/
├─ AGENTS.md
├─ README.md
├─ astro.config.mjs
├─ package.json
└─ tsconfig.json
```

카테고리는 실제 기존 Notion 자료를 분석한 뒤 조정 가능하다.
카테고리 변경은 콘텐츠를 확인한 뒤 한 번에 정리하고, 무분별하게 늘리지 않는다.

## 5. 콘텐츠 규칙

프로젝트 하나는 원칙적으로 다음 형태다.

```text
src/content/projects/<category>/<slug>/
├─ index.md
├─ cover.png
├─ screenshot-01.png
└─ screenshot-02.png
```

`slug`는 다음 규칙을 지킨다.

- 영문 소문자
- 숫자 허용
- 단어 구분은 `-`
- 공백 금지
- 한글 파일명 지양
- 한 번 공개된 slug는 가능하면 변경하지 않음

모든 콘텐츠는 최소 다음 frontmatter를 가진다.

```yaml
---
title: "제목"
slug: "stable-slug"
category: "research"
description: "카드에 표시할 요약"
year: 2026
tags: ["Tag1", "Tag2"]
draft: false
---
```

세부 스키마는 `docs/02-CONTENT-MODEL.md`를 따른다.

## 6. Notion mirror 식별 규칙

Notion 포트폴리오 데이터베이스에는 반드시 `Slug` 속성을 둔다.

GitHub의 `slug`와 Notion의 `Slug`는 항상 동일하다.

Notion 페이지를 업데이트할 때:

1. `Slug`로 기존 페이지를 찾는다.
2. 0개이면 새 페이지 생성.
3. 1개이면 해당 페이지 갱신.
4. 2개 이상이면 자동으로 임의 선택하지 말고 중단하고 중복 상황을 사용자에게 알린다.

Notion page ID를 공개 Git 저장소의 필수 키로 사용하지 않는다.
가능하면 `Slug`로 해결한다.

## 7. 이미지와 파일 규칙

### GitHub/홈페이지

- 일반 이미지: 프로젝트 폴더에 저장
- 공통 이미지: `public/assets`
- PDF/첨부 문서: `public/docs`
- 큰 영상: Git에 넣지 않고 YouTube 등 외부 URL 사용
- Notion의 임시 signed URL을 Markdown에 저장하지 않음

### Notion

현재 Notion MCP만으로 이미지/파일을 직접 업로드한다고 가정하지 않는다.

Notion mirror의 이미지 처리는 이후 별도로 설계한다.
우선순위는:
- 별도의 Notion File Upload API 사용 검토
- 홈페이지/GitHub의 영구 asset URL 링크
- Notion에는 대표 이미지 없이 원본 링크 제공
중 하나다.

Notion 이미지 URL을 홈페이지의 영구 asset URL로 재사용하지 않는다.

## 8. 작업 모드

### Draft mode

사용자가 "초안", "로컬에서만", "배포하지 마"라고 하면:

1. 로컬 Markdown/코드 수정
2. 검사
3. 로컬 빌드
4. 결과 보고
5. Git push 금지
6. Notion 수정은 사용자가 요구한 경우에만 수행

### Publish mode

사용자가 "반영", "게시", "배포", "GitHub와 Notion 모두 업데이트"라고 하면:

1. 로컬 파일 수정
2. `npm run check` 또는 동등한 검증
3. `npm run build`
4. 변경사항 검토
5. Notion mirror 동기화
6. Git commit
7. Git push
8. GitHub Actions 성공 여부 확인 가능하면 확인
9. 배포 URL 확인 가능하면 확인

사용자가 Git push를 명시적으로 금지하면 절대 push하지 않는다.

## 9. 콘텐츠 수정 순서

항상 Markdown을 먼저 수정한다.

금지되는 순서:

```text
Notion 수정
→ 나중에 Markdown에 맞추기
```

허용되는 순서:

```text
Markdown 수정
→ 로컬 검증
→ Notion mirror
→ GitHub publish
```

## 10. 최초 마이그레이션

최초 마이그레이션은 예외적으로 Notion이 입력 소스가 된다.

반드시 다음을 지킨다.

- 원본 Notion은 삭제/대규모 수정하지 않는다.
- 먼저 inventory를 작성한다.
- 페이지/DB/이미지/첨부파일 개수를 파악한다.
- 한 번에 전체를 덮어쓰지 않는다.
- 작은 샘플 2~3개로 변환 규칙을 검증한다.
- 이미지가 로컬로 실제 다운로드되었는지 확인한다.
- Markdown 링크가 Notion signed URL을 가리키지 않는지 검사한다.
- 사용자 승인 없이 원본 Notion 페이지를 삭제하지 않는다.

자세한 절차는 `docs/04-INITIAL-MIGRATION.md`.

## 11. 코드 품질 기준

- TypeScript 우선
- 단순한 정적 사이트에 불필요한 프레임워크 추가 금지
- 서버 DB 추가 금지
- CMS 추가 금지
- 빌드 시 네트워크 의존 최소화
- 콘텐츠와 프레젠테이션 분리
- 중복된 frontmatter 파싱 로직 생성 금지
- 스키마 검증 사용
- 접근성 있는 HTML
- 반응형 레이아웃
- 이미지 최적화
- 깨진 내부 링크 방지

## 12. 구현 전 행동

큰 작업을 시작할 때:

1. 이 `AGENTS.md` 읽기
2. `project.config.json` 읽기
3. 관련 `docs/` 읽기
4. 현재 저장소 상태 확인
5. 기존 구현이 있으면 파괴적으로 재작성하지 않고 재사용 가능한 부분 파악
6. 작업 계획 수립
7. 구현
8. 실제 명령으로 검증

## 13. 완료 보고 형식

Codex는 작업 완료 시 다음을 간단히 보고한다.

- 변경한 파일
- 구현한 기능
- 실행한 검증 명령과 결과
- Notion 동기화 여부
- Git commit/push 여부
- 남아 있는 TODO
- 사용자가 다음에 할 한 가지 행동
