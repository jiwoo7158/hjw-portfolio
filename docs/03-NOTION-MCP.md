# 03. Notion MCP 운영 규칙

## 연결

프로젝트 `.codex/config.toml`:

```toml
[mcp_servers.notion]
url = "https://mcp.notion.com/mcp"
```

최초 인증:

```bash
codex mcp login notion
```

브라우저 OAuth를 완료한다.

## 공식 MCP를 사용하는 이유

- Notion이 호스팅
- OAuth
- Codex 지원
- 검색/읽기/생성/수정 지원
- 별도 Notion token을 소스에 저장할 필요가 없음

## 중요한 제약

### 1. 무인 CI용으로 보지 않는다

공식 Notion MCP는 현재 interactive authorization이 필요하다.

따라서 GitHub Actions에서 홈페이지 빌드를 위해 MCP에 로그인하는 구조를 만들지 않는다.

### 2. 파일 크기

공식 문서 기준 MCP 파일 업로드 도구는 일반적으로 최대 20 MiB 파일 업로드 경로를 제공한다.
더 큰 파일은:
- Notion의 별도 file upload API
- 외부 저장소 링크
- 홈페이지의 파일 URL
중 하나를 사용한다.

### 3. 권한

Codex는 OAuth로 연결한 사용자가 접근 가능한 Notion 콘텐츠 범위에서 작업한다.

## Notion Portfolio DB 최초 설정

Codex가 다음을 수행한다.

1. `Portfolio` 데이터베이스 검색
2. 없으면 사용자에게 생성 위치를 확인하거나, 사용자가 이미 지정한 부모 페이지 아래 생성
3. 필요한 속성 확인
4. `Slug` 속성 생성/확인
5. 샘플 page 한 개로 create/update 테스트
6. 실제 콘텐츠 대량 sync 전 결과 확인

## Upsert 알고리즘

페이지 하나를 mirror할 때:

```text
read index.md
↓
parse frontmatter
↓
slug 획득
↓
Notion Portfolio DB에서 Slug 검색
├─ 0 → create
├─ 1 → update
└─ 2+ → abort
```

업데이트 시 Notion에만 존재하는 사용자의 개인 메모 영역을 보존하고 싶다면 별도 섹션을 둔다.

권장:

```text
[SYNCED CONTENT - Codex managed]
...
[PERSONAL NOTES - Notion only]
...
```

Codex-managed 영역만 교체하는 방식이 가장 안전하다.

## Notion에서의 수동 수정

초기 마이그레이션 후 Notion mirror에서 수동으로 내용을 수정할 수는 있지만,
그 수정은 GitHub 원본에 자동 반영되지 않는다.

중요한 변경이라면 사용자는 Codex에게:
"Notion에서 내가 바꾼 내용을 확인해서 canonical Markdown에도 반영해줘"
라고 명시적으로 요청해야 한다.

이 작업은 예외적인 수동 reconciliation이며 자동 양방향 sync가 아니다.
