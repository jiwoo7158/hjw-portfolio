# 00. Architecture Decisions

## ADR-001: Git Markdown is canonical

결정:
`src/content/projects/**/index.md` 및 로컬 asset이 콘텐츠의 유일한 기준 데이터다.

이유:
- Git history가 남는다.
- 정적 빌드가 외부 서비스 장애에 영향을 받지 않는다.
- Codex가 파일 작업과 검증을 쉽게 수행한다.
- GitHub Pages와 자연스럽게 연결된다.
- Notion ↔ GitHub 충돌 해결 로직을 만들 필요가 없다.

## ADR-002: Notion is a mirror

Notion은:
- 사람이 보기 쉬운 지식베이스
- 최초 기존 콘텐츠 가져오기 소스
- Codex가 결과를 복제해 주는 보조 저장소

Notion은:
- 홈페이지 runtime API
- build dependency
- canonical source
가 아니다.

## ADR-003: One-way sync after migration

초기 1회:
`Notion → Git`

이후:
`Git → Notion`

초기 마이그레이션 완료 시점을 문서에 기록한다.

## ADR-004: Notion MCP is interactive tooling

Notion MCP는 OAuth 인증된 Codex 세션에서 사용한다.

GitHub Actions가 Notion MCP 인증을 요구하도록 만들지 않는다.

현재 공식 Notion MCP는 대화형 OAuth 연결을 전제로 하므로 CI/CD의 필수 단계로 적합하지 않다.

## ADR-005: Static deployment

Astro의 정적 출력물을 GitHub Pages에 배포한다.

서버 렌더링, 데이터베이스 서버, 로그인 시스템은 기본 범위 밖이다.

## ADR-006: Slug is the cross-system identity

Git:
```yaml
slug: townscaper-3d-grid
```

Notion:
```text
Slug = townscaper-3d-grid
```

Site:
```text
/projects/research/townscaper-3d-grid/
```

세 시스템을 동일한 slug로 연결한다.

## ADR-007: Assets are owned by the Git repository

Notion의 signed/temporary file URL을 canonical asset으로 사용하지 않는다.

초기 import에서 이미지는 다운로드해서 프로젝트 폴더에 둔다.
