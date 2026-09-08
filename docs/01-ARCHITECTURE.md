# 01. 전체 아키텍처

## 구성 요소

### 1. Local Repository

Codex가 실제 콘텐츠와 코드를 수정하는 장소다.

```text
src/content/projects/
```

가 콘텐츠 원본이다.

### 2. GitHub Repository

- 버전 관리
- 원격 백업
- GitHub Actions trigger
- 정적 자산 원본

역할을 한다.

### 3. Astro

GitHub의 Markdown을 읽어 다음을 생성한다.

- 메인 페이지
- 프로젝트 카드
- 프로젝트 상세 페이지
- 카테고리/태그 정보
- 정적 HTML

### 4. GitHub Actions

main push를 감지한다.

```text
checkout
→ npm ci
→ check/build
→ dist artifact
→ GitHub Pages deploy
```

### 5. Notion MCP

Codex가 Notion workspace를 다룰 때 사용한다.

```text
Codex
  ↓ MCP
Notion hosted MCP
  ↓
Notion workspace
```

사이트 자체는 이 경로를 사용하지 않는다.

## 데이터 흐름

### 초기 마이그레이션

```text
Notion pages/databases
       ↓
Codex + Notion MCP
       ↓
Inventory
       ↓
Semantic conversion
       ↓
Markdown + local assets
       ↓
Astro validation
       ↓
Git commit
```

### 일상적인 신규 콘텐츠

```text
사용자 자연어 요청
       ↓
Codex
       ↓
index.md + images
       ↓
npm run check/build
       ↓
Notion page upsert by Slug
       ↓
git commit/push
       ↓
GitHub Pages
```

## 실패 격리

### Notion이 장애인 경우

로컬 개발과 사이트 빌드는 정상 동작해야 한다.

### GitHub Pages가 장애인 경우

Git 및 Notion 콘텐츠는 남아 있어야 한다.

### 이미지 mirror가 실패한 경우

GitHub/홈페이지의 canonical 이미지 파일은 영향을 받지 않아야 한다.

## 동기화 상태 개념

복잡한 sync engine은 만들지 않는다.

필요한 상태는 다음 정도로 충분하다.

- local changed
- local validated
- notion mirrored
- committed
- pushed
- deployed

Codex가 작업 완료 보고에서 이 상태를 사용자에게 알려준다.
