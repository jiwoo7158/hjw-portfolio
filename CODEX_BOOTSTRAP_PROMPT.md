# Codex 최초 실행 프롬프트

아래 내용을 이 프로젝트 폴더를 연 Codex에게 전달한다.

---

이 저장소를 개인 홈페이지 프로젝트로 실제 구현해줘.

먼저 `AGENTS.md`, `project.config.json`, `README.md`, `docs/` 전체를 읽고 설계 의도를 파악해.

중요한 목표는 `205sla/205-portfolio`의 **운영 방식**을 참고한 Astro 정적 포트폴리오 사이트를 새 코드로 만드는 거야. 해당 저장소의 디자인이나 코드를 그대로 복제하지 말고, 다음 운영 철학만 사용해.

- 콘텐츠는 GitHub의 Markdown이 원본
- 프로젝트 하나 = `index.md` + 같은 폴더의 이미지
- frontmatter로 분류/설명/연도/태그/대표 이미지 등을 관리
- 콘텐츠 컬렉션에서 목록과 상세 페이지를 자동 생성
- `main` push 시 GitHub Actions에서 정적 빌드 후 GitHub Pages 배포
- Notion은 런타임 CMS가 아니라 mirror
- Notion MCP는 로컬 Codex 작업 세션에서 읽기/생성/수정에 사용
- 초기 마이그레이션 이후 Notion → GitHub 역동기화 금지

## 1단계: 현재 환경 확인

1. Node/npm/git 버전을 확인해.
2. 현재 디렉터리가 Git 저장소인지 확인해.
3. 기존 구현이 있다면 분석하고 보존 가능한 부분을 찾아.
4. Notion MCP가 사용 가능한지 확인해. 연결되어 있지 않으면 코드 구현은 계속 진행하되, 나중에 필요한 인증 단계만 정확히 문서화해.
5. 현재 시점의 Astro 공식 문법과 호환되는 버전을 사용해. 불필요하게 구버전에 맞추지 마.

## 2단계: Astro 기본 구조 구현

최소한 다음을 실제로 동작하게 구현해.

- 홈 페이지
- 프로젝트 목록
- 카테고리 필터 또는 카테고리별 표시
- 프로젝트 상세 페이지
- Markdown 본문 렌더링
- 이미지 표시
- 태그/연도/설명
- draft 제외
- 없는 페이지 404
- 반응형 기본 UI

목표 디렉터리:

```text
src/content/projects/<category>/<slug>/index.md
```

Content Collection 스키마를 작성하고 타입 검증이 되게 해.

`templates/project-index.md`를 참고하되 실제 스키마와 일치하게 정리해.

## 3단계: 샘플 콘텐츠

실제 개인 정보나 기존 포트폴리오를 임의로 만들지 말고, 개발 검증용 예제 2개만 `draft: true` 또는 명확한 sample로 추가해.

빌드/렌더링 확인 후 쉽게 삭제할 수 있게 해.

## 4단계: Notion 연동 규칙 준비

Notion MCP는 애플리케이션 코드에서 호출하는 것이 아니라 Codex가 작업 중 사용하는 도구야.

따라서 사이트 런타임에 Notion SDK를 설치하지 마.

Notion mirror 데이터베이스는 다음 속성을 전제로 해.

- Name: title
- Slug: rich text 또는 unique 식별 가능한 텍스트
- Category: select
- Year: number 또는 text
- Tags: multi-select
- Status: Draft / Published / Archived
- Description: text
- GitHub URL: url
- Site URL: url
- Updated At: date

Codex가 Notion에 업데이트할 때 Slug를 고유 키로 사용하도록 문서와 운영 프롬프트를 정리해.

## 5단계: GitHub Pages

`.github/workflows/deploy.yml`을 구현해.

요구사항:

- main push
- workflow_dispatch
- npm clean install
- build
- GitHub Pages artifact 업로드
- deploy
- 필요 권한 최소화

사이트 base path와 custom domain 여부는 아직 사용자 값이 없으면 설정하기 쉬운 형태로 분리해.

## 6단계: 개발 명령

다음 명령이 명확히 존재해야 해.

```bash
npm run dev
npm run check
npm run build
npm run preview
```

가능하면 다음도 추가해.

```bash
npm run validate:content
```

## 7단계: 검증

반드시 실제로 실행해.

```bash
npm install
npm run check
npm run build
```

실패하면 원인을 수정하고 다시 실행해.

가능하다면 생성된 `dist`를 확인해 프로젝트 상세 HTML이 만들어졌는지도 확인해.

## 8단계: 문서 정리

구현이 끝나면 README를 실제 사용법에 맞게 업데이트해.

특히 다음 사용자 작업을 명확히 적어.

### 콘텐츠 추가
### 이미지 추가
### 로컬 미리보기
### Notion mirror 동기화
### Git commit/push
### GitHub Pages 활성화
### custom domain 추가

## 9단계: 하지 말아야 할 것

- Notion을 홈페이지 런타임 CMS로 만들지 마.
- GitHub Actions에서 Notion MCP를 호출하지 마.
- 양방향 sync를 만들지 마.
- Notion의 temporary image URL을 저장하지 마.
- 별도 DB 서버를 추가하지 마.
- 사용자 확인 없이 실제 Notion 콘텐츠를 삭제하지 마.
- 참고 저장소의 디자인/소스/개인 콘텐츠를 복사하지 마.

## 10단계: 완료 보고

작업 후 다음을 알려줘.

1. 최종 파일 구조
2. 구현 기능
3. `npm run check` 결과
4. `npm run build` 결과
5. 아직 사용자가 입력해야 하는 값
6. Notion MCP 연결 상태
7. 다음에 내가 Codex에게 입력할 추천 명령 3개

코드 구현을 끝까지 진행하고, 단순 설계 설명에서 멈추지 마.
