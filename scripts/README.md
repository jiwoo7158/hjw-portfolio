# scripts

이 폴더에는 이후 Codex가 필요에 따라 유틸리티를 구현한다.

권장 스크립트:

## validate-content

목적:
- duplicate slug 탐지
- 필수 frontmatter 누락
- local image missing
- Notion temporary/signed URL 탐지
- 너무 큰 asset 경고

## migration helper

최초 Notion migration 동안:
- 다운로드한 asset 이름 정규화
- Markdown 링크 rewrite
- page-map 검증
- migration report 생성

주의:
Notion MCP를 억지로 Node script에서 OAuth 자동화하지 않는다.
Notion 조작은 Codex의 MCP tool 사용을 기본으로 한다.
