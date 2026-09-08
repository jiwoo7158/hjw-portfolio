# 06. GitHub Pages 배포

## 목표

Notion 연결 여부와 무관하게 GitHub만으로 배포 가능해야 한다.

## Pipeline

```text
push main
  ↓
checkout
  ↓
setup node
  ↓
npm ci
  ↓
npm run check
  ↓
npm run build
  ↓
upload-pages-artifact(dist)
  ↓
deploy-pages
```

## GitHub 저장소 설정

Repository:
`Settings → Pages`

Source:
`GitHub Actions`

## 커스텀 도메인 미사용

GitHub project pages를 쓰면 base path가 repository name일 수 있다.

Astro 설정에서 `site`와 `base`를 환경/설정에 맞게 결정한다.

## 커스텀 도메인 사용

예:
```text
https://example.com
```

필요:

- DNS 설정
- Astro `site`
- 필요한 경우 `public/CNAME`

Codex는 실제 도메인을 사용자가 알려주기 전 임의로 넣지 않는다.

## 배포 검증

가능하면:

- workflow 성공
- main page HTTP 200
- 대표 project detail HTTP 200
- CSS/image 정상
- 없는 URL 404

를 확인한다.
