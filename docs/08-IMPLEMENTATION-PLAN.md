# 08. Codex 구현 계획

## Milestone 1. Repository bootstrap

- [ ] Astro 프로젝트 초기화
- [ ] TypeScript
- [ ] 기본 scripts
- [ ] `.gitignore`
- [ ] `AGENTS.md` 유지
- [ ] `.codex/config.toml` 유지

완료 조건:
`npm run dev` 실행 가능.

## Milestone 2. Content collection

- [ ] project schema
- [ ] Markdown load
- [ ] draft filter
- [ ] category
- [ ] tags
- [ ] cover image
- [ ] duplicate slug 검증

완료 조건:
샘플 콘텐츠가 타입 검증되고 페이지 생성.

## Milestone 3. UI

- [ ] home
- [ ] project cards
- [ ] project detail
- [ ] responsive layout
- [ ] accessible nav
- [ ] markdown typography

디자인은 독자적으로 만든다.

## Milestone 4. Content validation

권장 검증:

- duplicate slugs
- required frontmatter
- nonexistent local images
- Notion signed URL detection
- oversized tracked asset warning

## Milestone 5. GitHub Pages

- [ ] deploy workflow
- [ ] build artifact
- [ ] Pages deploy
- [ ] README setup

## Milestone 6. Notion mirror

사이트 코드에 Notion SDK를 넣는 단계가 아니다.

- [ ] Notion MCP 연결 테스트
- [ ] Portfolio DB 찾기/생성
- [ ] Slug property
- [ ] 한 페이지 create
- [ ] 같은 slug update
- [ ] duplicate detection 규칙 확인
- [ ] image mirror 방식 결정(File Upload API 또는 영구 URL)

## Milestone 7. Initial Notion migration

- [ ] inventory
- [ ] page mapping
- [ ] sample 2~3 pages
- [ ] asset download
- [ ] build
- [ ] 전체 migration
- [ ] freeze point

## Milestone 8. Operational polish

- [ ] Codex prompt examples
- [ ] publish/draft flow
- [ ] backup/restore docs
- [ ] custom domain optional
