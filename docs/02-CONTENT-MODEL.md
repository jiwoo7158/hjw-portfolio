# 02. Content Model

## Project Location

Each project is stored as one Markdown entry under:

```text
src/content/projects/<category>/<slug>/index.md
```

Images for an internal project should live in the same folder as `index.md`. Public shared assets can live in `public/assets`.

## Required Frontmatter

```yaml
---
title: "Project title"
slug: "project-slug"
category: "web"
description: "Short card summary"
draft: false
---
```

Required fields:

- `title`
- `slug`
- `category`
- `description`
- `draft`

## Optional Frontmatter

```yaml
year: 2026
dateRange: "2026.09"
team: "Personal"
tags:
  - Web
cover:
  image: "cover.png"
external: false
featured: false
links:
  github: ""
  demo: ""
  site: ""
  youtube: ""
  paper: ""
order: 100
```

Supported categories:

- `game`
- `web`
- `research`
- `security`
- `etc`

## Internal Projects

Internal projects are the default. They generate a local detail route:

```text
/projects/<category>/<slug>/
```

Example:

```yaml
external: false
links:
  github: "https://github.com/example/project"
  demo: ""
  site: ""
```

## External Projects

External projects are already hosted somewhere else, such as a separate GitHub Pages site.

They still live in the same `projects` Content Collection so cards, categories, tags, and ordering are managed consistently. The card opens `links.site` directly and no internal `/projects/<category>/<slug>/` route is generated.

Example:

```yaml
external: true
links:
  site: "https://example.github.io/project/"
```

Validation rules for external projects:

- `links.site` is required.
- `links.site` must be a valid `http` or `https` URL.
- `slug` still follows the same stable lowercase rule.
- `draft: true` still excludes the card from production output.

## Notion Mapping

Recommended Notion Portfolio properties:

| Notion property | Git value | Notes |
| --- | --- | --- |
| Name | `title` | title property |
| Slug | `slug` | stable identity key |
| Category | `category` | select |
| Description | `description` | text |
| Year | `year` | number/text |
| Tags | `tags` | multi-select |
| Status | `draft` | Draft/Published |
| GitHub URL | `links.github` | optional |
| Site URL | `links.site` or generated site URL | required for external projects |
| Updated At | sync timestamp | optional |

Markdown/Git remains canonical after migration. Notion is a mirror and must not be required for `npm run build`.
