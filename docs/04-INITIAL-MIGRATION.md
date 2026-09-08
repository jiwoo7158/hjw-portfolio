# 04. 기존 Notion → Git 최초 마이그레이션

## 목표

현재 Notion에 흩어져 있는 포트폴리오/기록을 GitHub 기반 콘텐츠 구조로 한 번 이전한다.

## Phase A. Inventory

Codex가 Notion MCP로 먼저 읽기만 한다.

정리할 항목:

- 최상위 페이지
- 하위 페이지 수
- 데이터베이스 목록
- DB 속성
- 주요 카테고리
- 이미지 개수
- PDF/첨부 개수
- 외부 링크
- embed
- column layout
- table
- code block
- toggle
- callout
- relation/rollup 등 특수 DB 속성

결과를 로컬에:

```text
migration/
├─ inventory.md
├─ page-map.csv
└─ issues.md
```

형태로 남긴다.

## Phase B. 분류/slug 설계

각 콘텐츠마다 stable slug를 만든다.

예:

```text
한글 페이지: Townscaper 좌표 저장 방식
slug: townscaper-grid-storage
category: research
```

`page-map.csv` 예시:

```csv
notion_title,slug,category,status
Townscaper 좌표 저장 방식,townscaper-grid-storage,research,pending
세피리아 모드,sephiria-mod,game,pending
```

## Phase C. 샘플 이전

대표적인 형태를 가진 페이지 2~3개만 먼저 이전한다.

샘플에는 가능하면:

- 텍스트 많은 페이지
- 이미지 많은 페이지
- 표/코드/콜아웃 포함 페이지

를 섞는다.

검증:

- Markdown 가독성
- 이미지 다운로드
- 이미지 상대경로
- frontmatter
- build
- detail page
- mobile view

## Phase D. Asset 다운로드

Notion의 temporary/signed URL을 최종 Markdown에 남기지 않는다.

각 이미지를 다운로드해:

```text
src/content/projects/<category>/<slug>/
```

에 저장한다.

파일명 정규화:

```text
IMG_1234 (최종).PNG
→ screenshot-01.png
```

권장 규칙:

- lowercase
- ascii
- hyphen
- 의미 있으면 의미 있는 파일명

## Phase E. 전체 변환

샘플 규칙이 확정된 뒤 전체 변환한다.

변환 후 자동 검사 권장:

- frontmatter parse error
- duplicate slug
- missing image
- external Notion signed asset URL
- broken relative link
- unsupported HTML
- 너무 큰 Git 파일

## Phase F. Freeze point

전체 이전이 완료된 날짜를 기록한다.

예:

```text
MIGRATION_COMPLETED_AT=2026-09-XX
```

이 날짜 이후 canonical 수정은 Git에서 시작한다.

## 원본 Notion 처리

삭제하지 않는다.

선택지:

1. 기존 Notion을 `Legacy Archive`로 보존
2. 새로운 Portfolio DB를 mirror 전용으로 운영
3. 기존 DB를 정리해서 mirror DB로 전환

가장 안전한 것은 1 + 2다.
