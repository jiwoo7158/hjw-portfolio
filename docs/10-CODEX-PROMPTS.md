# 10. Codex 운영 프롬프트 모음

## 새 항목 + 전체 반영

```text
새 포트폴리오 항목을 추가해줘.

자료:
- notes/townscaper.md
- assets/townscaper/

카테고리:
research

해야 할 일:
1. 기존 콘텐츠 양식에 맞춰 Markdown 작성
2. 이미지 파일명과 위치 정리
3. 로컬 build 확인
4. Slug를 기준으로 Notion Portfolio DB에 mirror 생성
5. Git commit
6. main에 push해서 홈페이지 배포

AGENTS.md 규칙을 지켜줘.
```

## 내용 추가

```text
`townscaper-3d-grid` 항목에 오늘 실험 내용을 추가해줘.
새 이미지는 `incoming/result.png`야.

Markdown을 canonical로 먼저 수정하고 build 성공 후
Notion의 같은 Slug 페이지도 업데이트해.
그 다음 GitHub에 push해.
```

## 배포 없는 초안

```text
새 항목 초안만 만들어줘.
draft: true로 하고 Notion/GitHub push는 하지 마.
로컬 build까지만 확인해줘.
```

## 게시

```text
이제 `my-project` 초안을 게시해줘.
draft를 해제하고 Notion Status도 Published로 맞춘 뒤
build → commit → push까지 해줘.
```

## Notion 복구

```text
Notion의 `my-project` mirror가 깨졌어.
GitHub Markdown을 기준으로 다시 생성/수정해줘.
Git 파일은 수정하지 마.
```

## 초기 마이그레이션 조사

```text
아직 실제 변환은 하지 말고,
Notion workspace에서 포트폴리오로 보이는 페이지와 데이터베이스를 조사해서
migration/inventory.md와 migration/page-map.csv 초안을 만들어줘.

원본 Notion은 절대 수정하지 마.
```

## 초기 마이그레이션 샘플

```text
inventory 결과를 기준으로 서로 형태가 다른 페이지 3개만 샘플 migration 해줘.
텍스트, 이미지, 표/코드가 각각 포함되도록 선택해.

Notion 이미지는 로컬로 다운로드하고 temporary URL이 Markdown에 남지 않게 해.
build까지 검증해. 아직 전체 migration은 하지 마.
```

## 디자인 변경

```text
홈페이지 프로젝트 카드 레이아웃을 더 간결하게 바꿔줘.
205-portfolio의 코드를 복사하지 말고 운영 구조만 유지해.
Notion과 콘텐츠 Markdown은 수정하지 마.
```
