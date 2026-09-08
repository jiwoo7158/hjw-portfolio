# Portfolio + Notion MCP + Codex Blueprint

이 폴더는 개인 홈페이지를 다음 구조로 구축하기 위한 **설계 및 Codex 인수인계 패키지**다.

- 참고 운영 방식: `205sla/205-portfolio`
- 홈페이지 엔진: Astro 정적 사이트
- 콘텐츠 저장소(Source of Truth): 로컬/GitHub의 Markdown + 이미지
- 보조 지식베이스/열람본: Notion
- 편집 주체: Codex
- Notion 연결: 공식 Notion MCP
- 배포: GitHub Actions → GitHub Pages

> 중요: `205sla/205-portfolio`의 아키텍처와 운영 방식은 참고하되, 해당 저장소의 코드/디자인/에셋을 그대로 복사하지 않는다. 이 설계는 같은 운영 철학을 새 코드로 구현하는 것을 목표로 한다.

## 가장 중요한 결정

**초기 1회**
```text
기존 Notion
  ↓
Codex + Notion MCP
  ↓
Markdown / 이미지 로컬화
  ↓
GitHub
  ↓
Astro
  ↓
GitHub Pages
```

**초기 마이그레이션 완료 후**
```text
사용자
  ↓
Codex
  ↓
로컬 Markdown + 이미지  ← 진짜 원본
  ├────────────→ Notion mirror
  │
  └→ Git commit → Git push
                    ↓
              GitHub Actions
                    ↓
              GitHub Pages
```

Notion에서 사람이 직접 콘텐츠를 수정한 뒤 GitHub로 다시 가져오는 양방향 동기화는 하지 않는다.

## 이 패키지를 받은 뒤 Codex에 처음 시킬 말

`CODEX_BOOTSTRAP_PROMPT.md`의 내용을 통째로 Codex에 전달한다.

그 전에 Notion MCP를 연결한다.

```toml
# .codex/config.toml
[mcp_servers.notion]
url = "https://mcp.notion.com/mcp"
```

인증:

```bash
codex mcp login notion
```

## 파일 안내

- `AGENTS.md`
  - Codex가 항상 지켜야 하는 프로젝트 규칙
- `CODEX_BOOTSTRAP_PROMPT.md`
  - 처음 프로젝트를 구현할 때 Codex에 전달할 실행 프롬프트
- `docs/00-DECISIONS.md`
  - 변경하면 안 되는 핵심 설계 결정
- `docs/01-ARCHITECTURE.md`
  - 전체 기술 아키텍처
- `docs/02-CONTENT-MODEL.md`
  - Markdown/frontmatter/Notion DB 모델
- `docs/03-NOTION-MCP.md`
  - Notion MCP 사용 규칙
- `docs/04-INITIAL-MIGRATION.md`
  - 기존 Notion 자료 최초 이전 절차
- `docs/05-DAILY-WORKFLOW.md`
  - 이후 일상적인 콘텐츠 추가/수정 절차
- `docs/06-DEPLOYMENT.md`
  - GitHub Pages 배포 구조
- `docs/07-ASSET-POLICY.md`
  - 이미지/PDF/영상 처리 규칙
- `docs/08-IMPLEMENTATION-PLAN.md`
  - Codex 구현 순서
- `docs/09-ACCEPTANCE-CHECKLIST.md`
  - 완료 판정 기준
- `docs/10-CODEX-PROMPTS.md`
  - 실제 운영 시 사용할 프롬프트 예시
- `templates/project-index.md`
  - 프로젝트 콘텐츠 템플릿
- `templates/deploy.yml`
  - GitHub Pages workflow 참고 템플릿
- `project.config.json`
  - Codex가 빠르게 읽을 수 있는 기계 판독용 설계 요약

## 공식 문서

- Notion MCP overview: https://developers.notion.com/guides/mcp/overview
- Notion MCP 연결: https://developers.notion.com/guides/mcp/get-started-with-mcp
- Notion MCP supported tools: https://developers.notion.com/guides/mcp/mcp-supported-tools
- 참고 저장소: https://github.com/205sla/205-portfolio
