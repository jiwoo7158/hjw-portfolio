# HJW Portfolio

Astro 기반 개인 포트폴리오/지식 홈페이지입니다. 콘텐츠의 원본은 Git 저장소의 Markdown과 같은 폴더에 둔 이미지이며, Notion은 런타임 CMS가 아니라 mirror로만 사용합니다.

## Stack

- Astro `7.3.x`
- TypeScript
- Astro Content Collections
- GitHub Actions -> GitHub Pages
- Notion MCP for interactive mirror work only

## Local Setup

```bash
npm install
npm run dev
```

첫 설치 후 생성되는 `package-lock.json`은 GitHub Actions의 `npm ci` 배포를 위해 함께 커밋해야 합니다.

검증과 정적 빌드:

```bash
npm run check
npm run build
npm run preview
```

현재 프로젝트는 Notion 연결 없이도 `check`와 `build`가 성공해야 합니다.

## Content

프로젝트 하나는 다음 구조를 따릅니다.

```text
src/content/projects/<category>/<slug>/
├─ index.md
├─ cover.png
└─ screenshot-01.png
```

초기 카테고리:

- `game`
- `web`
- `research`
- `security`
- `etc`

`index.md` frontmatter 예시:

```yaml
---
title: "프로젝트 제목"
slug: "project-slug"
category: "research"
description: "목록 카드에 표시되는 설명"
year: 2026
dateRange: "2026.09"
team: "개인"
tags:
  - Example
cover:
  image: "cover.png"
featured: false
draft: true
links:
  github: ""
  demo: ""
  youtube: ""
  paper: ""
order: 100
---
```

`draft: true`인 콘텐츠는 홈 목록과 상세 페이지 생성에서 제외됩니다.

## Images And Documents

- 프로젝트 이미지는 해당 프로젝트 폴더에 둡니다.
- Markdown에서는 상대경로를 사용합니다. 예: `![설명](screenshot-01.png)`
- PDF와 첨부 문서는 `public/docs`에 둡니다.
- Notion temporary/signed URL은 Markdown에 저장하지 않습니다.
- 큰 영상 파일은 Git에 넣지 않고 YouTube 등 외부 URL을 사용합니다.

## Notion Mirror

Notion은 mirror입니다. 사이트 런타임과 GitHub Actions는 Notion API나 MCP를 호출하지 않습니다.

로컬 Codex 세션에서 Notion MCP를 쓸 때의 기준 속성:

- `Name`: title
- `Slug`: Git Markdown의 `slug`
- `Category`: category
- `Year`: year
- `Tags`: tags
- `Status`: Draft / Published / Archived
- `Description`: description
- `GitHub URL`: optional
- `Site URL`: optional
- `Updated At`: sync 시각

Upsert 규칙:

1. Markdown을 먼저 수정합니다.
2. `Slug`로 Notion Portfolio DB 페이지를 찾습니다.
3. 0개면 생성, 1개면 갱신, 2개 이상이면 중단합니다.

최초 인증:

```bash
codex mcp login notion
```

## GitHub Pages

`.github/workflows/deploy.yml`은 `main` push와 수동 실행을 지원합니다.

GitHub에서 해야 할 설정:

1. Repository Settings -> Pages
2. Source를 `GitHub Actions`로 설정
3. 필요하면 repository variable 또는 workflow 환경으로 `SITE_URL`, `BASE_PATH`를 설정

Project Pages를 쓸 경우 `BASE_PATH`를 저장소 이름 기반 경로로 설정할 수 있습니다. 예:

```text
BASE_PATH=/hjw-portfolio/
```

커스텀 도메인을 쓸 때만 `SITE_URL`과 `public/CNAME`을 추가합니다.

## Development Samples

현재 샘플 콘텐츠 2개가 있습니다.

- `sample-procedural-grid`: 게시 샘플
- `sample-portfolio-system`: draft 제외 검증 샘플

실제 콘텐츠 마이그레이션 뒤에는 삭제하거나 draft 상태로 바꿔도 됩니다.
