# 02. 콘텐츠 모델

## 권장 frontmatter

```yaml
---
title: "Townscaper Grid의 3차원 확장"
slug: "townscaper-3d-grid"
category: "research"
description: "Townscaper의 irregular grid 아이디어를 3차원 공간으로 확장한 실험 기록"
year: 2026
dateRange: "2026.09"
team: "개인"
tags:
  - Procedural Generation
  - Grid
  - Computational Geometry
cover:
  image: "cover.png"
featured: false
draft: false
links:
  github: ""
  demo: ""
  youtube: ""
  paper: ""
order: 100
---

## 개요

본문...
```

## 필수 필드

- `title`
- `slug`
- `category`
- `description`
- `draft`

## 선택 필드

- `year`
- `dateRange`
- `team`
- `tags`
- `cover.image`
- `featured`
- `links`
- `order`

필드는 실제 홈페이지 요구가 생길 때 확장한다.

처음부터 너무 많은 필드를 만들지 않는다.

## 카테고리

초기 후보:

- `game`
- `web`
- `research`
- `security`
- `etc`

기존 Notion inventory를 보고 실제 분류가 명확하면 변경 가능하다.

## URL

권장:

```text
/projects/<category>/<slug>/
```

slug가 안정적으로 유지되는 한 URL도 안정적이다.

## Notion DB 대응

권장 데이터베이스 이름:
`Portfolio`

속성:

| Notion 속성 | Git 값 | 비고 |
|---|---|---|
| Name | title | title property |
| Slug | slug | 고유 식별자 |
| Category | category | select |
| Description | description | text |
| Year | year | number/text |
| Tags | tags | multi-select |
| Status | draft | Draft/Published |
| GitHub URL | 계산/입력 | optional |
| Site URL | 계산/입력 | optional |
| Updated At | sync 시각 | optional |

## 본문 변환

Markdown → Notion mirror 시 의미를 유지한다.

- `##` → heading
- paragraph → paragraph
- list → bulleted/numbered list
- checkbox → todo
- blockquote → quote/callout에 가까운 표현
- Markdown table → Notion에서 가능한 표
- image → 영구 URL 또는 별도 File Upload API 설계 후 업로드
- code fence → code block
- link → rich text link

Notion 레이아웃과 홈페이지 레이아웃을 1:1 픽셀 동기화하려 하지 않는다.
