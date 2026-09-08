# 05. 일상 운영 Workflow

## A. 새 콘텐츠 추가

사용자:

```text
캡스톤 프로젝트 내용을 홈페이지와 Notion에 추가해줘.
자료는 docs/capstone-notes.md와 screenshots/capstone/에 있어.
카테고리는 game으로 해줘. 배포까지 해줘.
```

Codex:

1. 자료 읽기
2. slug 결정
3. 프로젝트 폴더 생성
4. 이미지 정리/복사
5. `index.md` 작성
6. frontmatter validation
7. build
8. Notion Portfolio DB에서 slug 검색
9. create
10. git commit
11. git push
12. 결과 보고

## B. 기존 콘텐츠 수정

사용자:

```text
townscaper-3d-grid에 오늘 실험 결과 추가하고
result-04.png도 넣어줘. Notion과 홈페이지 둘 다 반영해줘.
```

Codex:

1. 기존 Markdown 찾기
2. 섹션 수정
3. image colocate
4. build
5. Notion Slug로 page 찾기
6. managed content 갱신
7. commit/push

## C. 홈페이지만 수정

사용자:

```text
카드 디자인만 수정해. 콘텐츠와 Notion은 건드리지 마.
```

Codex:

- Astro/CSS만 수정
- Notion 호출하지 않음
- build
- 요청 시 push

## D. Notion mirror만 복구

사용자:

```text
GitHub 내용 기준으로 Notion의 sephiria-mod 페이지만 다시 맞춰줘.
```

Codex:

- canonical Markdown 읽기
- Notion page 검색
- Notion만 update
- Git 변경 없음

## E. Draft

```yaml
draft: true
```

이면 사이트에서 제외한다.

Notion Status는 `Draft`.

게시 시:

```yaml
draft: false
```

Notion Status는 `Published`.

## F. 삭제

삭제는 위험 작업이다.

권장 동작:

Git:
- 바로 영구삭제보다 `draft: true` 또는 archive 검토

Notion:
- 페이지 삭제보다 Status=`Archived`

사용자가 명확히 영구삭제를 요구하지 않으면 archive를 우선한다.
