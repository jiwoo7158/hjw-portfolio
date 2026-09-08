# HJW Portfolio

Astro 7 static portfolio site for HJW. Git Markdown is the canonical content source; Notion is used only as an interactive mirror and migration source.

## Stack

- Astro 7
- TypeScript
- Astro Content Collections
- GitHub Actions -> GitHub Pages
- Notion MCP for read/mirror work only

## Local Setup

```bash
npm install
npm run dev
```

Validation and static build:

```bash
npm run check
npm run validate:content
npm run build
```

The site must build without Notion access.

## Content

Project entries live at:

```text
src/content/projects/<category>/<slug>/index.md
```

Minimal frontmatter:

```yaml
---
title: "Project title"
slug: "project-slug"
category: "web"
description: "Short card summary"
draft: false
---
```

Internal projects generate detail routes:

```yaml
external: false
```

External projects are hosted elsewhere. They appear as cards, but the card opens `links.site` and no internal detail route is generated:

```yaml
external: true
links:
  site: "https://example.github.io/project/"
```

## Assets

- Project images: colocated with the project `index.md`
- Shared public images: `public/assets`
- Documents: `public/docs`
- Large video: external hosting
- Notion temporary/signed URLs must not be saved in Markdown or source files

## Notion

Notion is not a runtime CMS for this site. Local Codex sessions may use Notion MCP for reading, initial migration, and mirror updates when explicitly requested.

Upsert identity for future mirror work is `Slug`. If multiple Notion pages share a slug, stop and ask the user instead of choosing one automatically.

## GitHub Pages

The current remote default branch is `master`, so `.github/workflows/deploy.yml` runs on pushes to `master`.

This repository is deployed as a GitHub Project Pages site:

```text
https://jiwoo7158.github.io/hjw-portfolio/
```

The workflow sets:

```text
SITE_URL=https://jiwoo7158.github.io
BASE_PATH=/hjw-portfolio/
```

In GitHub repository settings, Pages should use:

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```
