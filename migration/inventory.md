# Notion Migration Inventory

조사 일시: 2026-09-09
범위: Notion workspace의 포트폴리오/프로젝트/게임 개발/연구 관련 후보를 읽기 전용으로 조사.

## Workspace Summary

- 조사한 포트폴리오 후보 최상위 영역: 4개
- 확인된 후보 페이지: 17개
- 확인된 후보 데이터베이스: 5개
- Portfolio mirror DB 검색 결과: 0건
- Notion 변경: 없음

## 후보 최상위 영역

### 한지우 | HJW

- type: page
- parent: top-level private page
- role: 현재 포트폴리오/프로필 루트 후보
- images: yes
- attachments: image/icon attachment observed
- tables: no
- code blocks: no
- callout: yes
- toggle: yes
- column layout: yes
- external links: yes
- child pages: unknown
- migration complexity: complex
- notes: 개인 소개, 기술 스택, 링크, 이미지가 포함되어 있으며 Notion column layout을 의미 기반 섹션으로 재구성해야 함.

### Game Design Hub

- type: page
- parent: top-level private page
- role: 게임 기획/아이디어/프로젝트/노트를 묶는 허브
- images: yes
- attachments: image/icon attachment observed
- tables: unknown at hub level
- code blocks: unknown at hub level
- callout: yes
- toggle: yes
- column layout: yes
- inline databases: yes
- external links or embeds: unknown/button block observed
- child pages: yes
- migration complexity: complex
- notes: 허브 자체를 한 프로젝트로 이전하기보다 하위 DB와 주요 기획 페이지를 선별 이전하는 것이 적합.

### 노션 자료실

- type: page
- parent: top-level private page
- role: 연구/자료성 콘텐츠 후보
- images: unknown
- attachments: unknown
- tables: unknown
- code blocks: unknown
- callout: yes in fetched research page
- toggle: yes in fetched research page
- unknown blocks: yes
- child pages: yes
- migration complexity: medium to complex
- notes: `생성형 AI 기반 AI NPC 게임에서의 동적 스토리텔링과 상호작용 효과성 연구(오석희)`가 research 후보로 확인됨.

### PARA Note

- type: page
- parent: top-level private page
- role: 개인 지식관리/프로젝트 DB 보관 영역
- images: not inspected
- attachments: unknown
- databases: yes
- migration complexity: complex
- notes: 전체 PARA 구조는 홈페이지 이전 대상이 아니며, 그중 `프로젝트` DB 일부 항목만 후보.

## 확인된 데이터베이스

### 게임 기획

- type: database
- parent: Game Design Hub / 데이터베이스
- candidate rows: 6
- key properties: 이름, 단계, 시작일, 종료일, 아이디어, 노트, 프로젝트, 작성자, 생성 일시, 최종 편집 일시, formula
- special properties: relation, formula, status, date, person
- migration complexity: complex
- candidate rows:
  - 세피리아 모드
  - 협력 투표 뱀서라이크 ver 2.0
  - 백룸
  - 협력 투표 뱀서라이크
  - 2D 멀티 시간제한 게임 (2인 협동)
  - 2D 멀티 시간제한 게임 (io 스타일)

### 게임 아이디어

- type: database
- parent: Game Design Hub / 데이터베이스
- candidate rows: at least 20
- key properties: 이름, 단계, 유형, 노트, 기획, 작성자, 생성 일시, 최종 편집 일시
- special properties: relation, rollup, formula, status, person
- migration complexity: complex
- notes: 독립 포트폴리오 항목보다는 관련 기획의 보조 자료로 묶는 것이 적합.

### 게임 프로젝트

- type: database
- parent: Game Design Hub / 데이터베이스
- candidate rows: 0
- key properties: 이름, 단계, 시작일, 종료일, 기획, 사람, 생성 일시, 최종 편집 일시, formula
- special properties: relation, status, date, person, formula
- migration complexity: medium
- notes: schema는 유용하지만 현재 rows 결과는 비어 있음.

### 노트

- type: database
- parent: Game Design Hub / 노트 수집함
- candidate rows: at least 20
- key properties: 이름, 아이디어, 기획, 작성자, 생성 일시, 최종 편집 일시
- special properties: relation, person, timestamps
- migration complexity: medium to complex
- notes: 단독 이전보다는 연결된 기획/아이디어의 참고 섹션으로 병합하는 방식이 적합.

### 프로젝트

- type: database
- parent: PARA Note / 데이터베이스
- candidate rows: 3
- key properties: 이름, 상태, 시작일, 종료일, 영역 · 자원, 노트, 생성 일시, 최종 편집 일시, formula
- special properties: relation, status, date, formula
- migration complexity: medium
- candidate rows:
  - GDH_VamSur
  - 아포칼립스 생존 게임
  - 겜엔기 7조 TPSGame

## 발견한 Notion 기능

- Heading
- Paragraph
- Bulleted list
- Quote
- Callout
- Toggle
- Column layout
- Image
- External image cover
- Attachment/file icon metadata
- Inline database
- Child page links
- Table
- Code fence
- Relation property
- Rollup property
- Formula property
- Status property
- Date property
- Person property
- Unknown/button/copy-indicator style blocks
- External links

## Migration 분류

### A. 바로 이전하기 좋은 콘텐츠

- count: 1
- examples:
  - `기획 요약`
- notes: Heading과 list 중심이라 Markdown으로 바로 옮기기 쉬움.

### B. 일부 변환 규칙이 필요한 콘텐츠

- count: 4
- examples:
  - `백룸`
  - `스탯과 계산식 기획`
  - `생성형 AI 기반 AI NPC 게임에서의 동적 스토리텔링과 상호작용 효과성 연구(오석희)`
  - `겜엔기 7조 TPSGame`
- notes: callout, toggle, table, code fence, 긴 본문, unknown block 일부를 Markdown 규칙으로 정해야 함.

### C. 복잡한 콘텐츠

- count: 5
- examples:
  - `한지우 | HJW`
  - `Game Design Hub`
  - `세피리아 모드`
  - `협력 투표 뱀서라이크 ver 2.0`
  - `게임 아이디어`
- notes: column layout, inline DB, 하위 페이지, relation/rollup/formula 등 구조 변환 설계가 필요.

### D. 홈페이지 이전 대상이 아닌 것으로 보이는 콘텐츠

- count: 2
- examples:
  - `사진`
  - `PARA Note` 전체 구조
- notes: 포트폴리오와 직접 관련된 일부 DB 항목만 선별하고, 사적인/운영용 영역은 깊게 읽지 않는 것이 적합.

## Migration 고려사항

- Notion signed/temporary image URL은 Markdown에 저장하지 않는다.
- 이미지가 필요한 페이지는 다음 단계의 샘플 migration 때 로컬 다운로드 여부를 실제 확인한다.
- Notion MCP 직접 파일 업로드는 가정하지 않는다.
- DB row는 frontmatter와 본문 사이에서 역할을 나눠야 한다.
- relation/rollup/formula는 대부분 홈페이지 본문에 직접 노출하지 않고 notes 또는 migration metadata로 정리하는 편이 안전하다.
- column layout은 Markdown에서는 의미 순서 기반 섹션으로 재배치한다.
- callout과 toggle은 `blockquote`, 일반 heading, 또는 접을 필요 없는 섹션으로 변환하는 규칙이 필요하다.
- unknown/button/copy-indicator block은 자동 변환하지 말고 샘플 단계에서 수동 판단한다.

## 추천 샘플 Migration 후보

1. `기획 요약`
   - reason: 텍스트, heading, list 중심이라 기본 변환 규칙을 검증하기 좋음.
   - expected complexity: low

2. `백룸`
   - reason: 게임 기획서 형태이고 callout/toggle이 많아 Notion block을 Markdown 섹션으로 푸는 규칙을 검증하기 좋음.
   - expected complexity: medium

3. `스탯과 계산식 기획`
   - reason: table과 code fence가 많아 표/코드 변환 품질을 검증하기 좋음.
   - expected complexity: medium
