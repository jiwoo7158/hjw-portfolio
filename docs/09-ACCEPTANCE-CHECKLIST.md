# 09. 완료 판정 Checklist

## 사이트

- [ ] `npm run dev` 성공
- [ ] `npm run check` 성공
- [ ] `npm run build` 성공
- [ ] Notion 연결이 없어도 build 성공
- [ ] Markdown 1개 추가만으로 카드 생성
- [ ] 상세 페이지 자동 생성
- [ ] draft 페이지 제외
- [ ] 이미지 상대경로 정상
- [ ] 모바일 기본 사용 가능

## GitHub

- [ ] main push workflow 존재
- [ ] Pages artifact 생성
- [ ] deploy job 존재
- [ ] repository secret에 Notion token 요구하지 않음

## Notion MCP

- [ ] Codex에서 Notion MCP 연결
- [ ] 기존 페이지 검색
- [ ] page create
- [ ] page update
- [ ] Slug로 upsert
- [ ] duplicate slug에서 중단
- [ ] 이미지 mirror 방식 결정(File Upload API 또는 영구 URL)

## 초기 migration

- [ ] inventory
- [ ] page map
- [ ] 이미지 로컬화
- [ ] Notion temporary asset URL 제거
- [ ] 샘플 검증
- [ ] 전체 build
- [ ] migration 완료 시점 기록

## 운영

다음 자연어 명령이 정상적으로 수행되어야 한다.

```text
새 프로젝트 추가해. Notion과 홈페이지 둘 다 반영하고 배포해.
```

```text
이 프로젝트 내용만 수정해. 배포하지는 마.
```

```text
GitHub 내용을 기준으로 Notion mirror만 다시 맞춰줘.
```

```text
사이트 디자인만 바꿔. 콘텐츠는 건드리지 마.
```
