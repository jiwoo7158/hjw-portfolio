# Scripts

Utility scripts for local Codex operations.

## `validate-content.mjs`

Runs lightweight repository checks before Astro type checking:

- required project frontmatter
- lowercase stable slugs
- slug/category matching the folder path
- duplicate slugs
- missing colocated cover and Markdown images
- Notion temporary/signed asset URLs
- tracked asset size warnings

Run it with:

```bash
npm run validate:content
```
