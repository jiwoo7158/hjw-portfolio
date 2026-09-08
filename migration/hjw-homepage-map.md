# HJW Homepage Mapping

| Notion area | Astro homepage area | Local source file |
| --- | --- | --- |
| Page title `한지우 | HJW` | Hero title | `src/data/home.ts` |
| `About me | 자기소개` | Hero lead and About section | `src/data/home.ts`, `src/pages/index.astro` |
| Skills `Language | 언어` | Language skills panel | `src/data/home.ts`, `src/pages/index.astro` |
| Skills `Tools | 도구` | Tools skills panel | `src/data/home.ts`, `src/pages/index.astro` |
| Links `jiwoo7158` | External links section | `src/data/home.ts`, `src/pages/index.astro` |
| Links `픽셀 변환` | External links and project card | `src/data/home.ts`, `src/content/projects/web/pixel-art-resampler/index.md` |
| Links `애트리뷰트` | External links and project card | `src/data/home.ts`, `src/content/projects/web/attribute/index.md` |
| Education | Review-only candidate | `migration/hjw-homepage-analysis.md` |
| Contact email | Review-only candidate | `migration/hjw-homepage-analysis.md` |
| Profile/character/signature images | Asset migration candidate | `migration/hjw-homepage-assets.md` |
| Page icon/cover | Asset migration candidate | `migration/hjw-homepage-assets.md` |

## Mapping Decisions

- The public homepage now uses a structured local data file instead of querying Notion at build time.
- Review-only items are documented but not rendered on the public homepage.
- `픽셀 변환` and `애트리뷰트` are represented as external project entries. Their cards open the existing external sites directly and do not generate internal detail routes.
- Sample content remains in the repository for schema/layout testing but is excluded from production by `draft: true`.
