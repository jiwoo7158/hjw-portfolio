# 07. 이미지/파일 정책

## 프로젝트 이미지

위치:

```text
src/content/projects/<category>/<slug>/
```

예:

```text
townscaper-3d-grid/
├─ index.md
├─ cover.png
├─ 2d-grid.png
└─ tetrahedral-result.png
```

Markdown:

```md
![3차원 격자 결과](tetrahedral-result.png)
```

## 파일명

좋음:

```text
grid-result-01.png
network-diagram.webp
cover.jpg
```

피함:

```text
화면 캡처 2026-09-08 오후 7.12.01.png
최종(진짜최종)2.png
```

## 이미지 용량

Codex가 가능하면:
- 불필요하게 거대한 PNG 검사
- 사진은 적절한 web format 사용
- 원본 보존이 필요하면 별도 archive 고려

Git repo에 원본 대형 영상은 넣지 않는다.

## PDF

권장:

```text
public/docs/<ascii-name>.pdf
```

사이트 링크:

```md
[문서 보기](/docs/document-name.pdf)
```

실제 Astro base path가 `/`가 아니라면 URL helper를 사용하도록 구현할 수 있다.

## 영상

- YouTube
- Vimeo
- 기타 장기 유지 가능한 외부 URL

을 선호한다.

## Notion에서 import한 이미지

Notion API/MCP가 준 temporary URL을 그대로 저장하지 않는다.

다운로드 후 로컬 파일로 소유한다.

## Notion mirror 이미지

20 MiB 이하라면 MCP file upload 사용을 우선할 수 있다.

큰 파일은 홈페이지/외부 저장소 링크로 대체한다.
