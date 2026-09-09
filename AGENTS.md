# AGENTS.md

This file is the top-level operating guide for Codex in this repository.

## 1. Project Goal

Build a personal portfolio and knowledge website.

Use `205sla/205-portfolio` only as an operational reference:

1. Use Astro as a static site generator.
2. Manage each content item as one Markdown file with colocated images.
3. Build and deploy to GitHub Pages from GitHub Actions on the configured publishing branch.
4. Do not use Notion as a runtime data source for the website.
5. Treat Notion as a mirror and knowledge-management copy of Markdown content.
6. Treat local Markdown and GitHub as the canonical source of truth.
7. The user should be able to ask Codex for content work in natural language instead of editing files manually.

## 2. Core Principles

### Source of Truth

```text
Local Markdown / GitHub = canonical
Notion = mirror
Static Website = generated output
```

After the initial migration, do not implement automatic Notion to GitHub reverse sync.

Do not implement bidirectional Notion/GitHub sync unless the user explicitly changes the architecture.

### Build Independence

`npm run build` and GitHub Actions deployment must always work without Notion API or Notion MCP access.

Do not call Notion during website builds. Notion outage, expired OAuth, or MCP failure must not block deployment.

### Notion MCP Role

Notion MCP may be used by Codex during work sessions for:

- reading existing Notion content
- initial migration research
- creating Markdown-backed mirror pages only after a write target is explicitly allowlisted
- updating existing mirror pages only after a write target is explicitly allowlisted

Do not call Notion MCP from unattended CI/CD.

## 3. Notion Write Boundary

Existing Notion content is read-only by default.

Read-only roots include:

- `한지우 | HJW`
- `Game Design Hub`
- `세피리아 모드`
- any other existing Notion page or database

Current homepage root page ID:

```text
3718671c-22b3-8049-a906-c2a459188eaf
```

No Notion write target is currently allowlisted.

Until a separate `Portfolio Mirror` root page or database is created and its ID is explicitly recorded, Codex must not create, update, delete, archive, move, comment on, or upload files to Notion.

When a future write target is allowlisted, Codex may write only inside that allowlisted subtree. If the parent chain cannot be verified as being under the allowlisted root, stop and ask the user before making any Notion change.

For the current research/migration phase, allowed Notion operations are limited to:

- search
- fetch/read
- workspace/tool-access checks

Forbidden Notion operations:

```text
create
update
delete
archive
move
comment
upload
```

## 4. Reference Repository

Reference repository:

```text
https://github.com/205sla/205-portfolio
```

Reference only:

- Astro Content Collections structure
- project-level `index.md`
- colocated project images
- Git push to GitHub Actions to GitHub Pages
- frontmatter-driven cards/categories/metadata
- static detail page generation from content

Do not copy:

- original HTML/CSS
- design assets
- wording
- personal data
- large implementation code from the reference repository

## 5. Content Rules

A project normally has this structure:

```text
src/content/projects/<category>/<slug>/
├─ index.md
├─ cover.png
├─ screenshot-01.png
└─ screenshot-02.png
```

Slug rules:

- lowercase ASCII letters
- numbers allowed
- words separated with `-`
- no spaces
- avoid Korean filenames
- avoid changing a published slug

Minimum frontmatter:

```yaml
---
title: "Project title"
slug: "stable-slug"
category: "research"
description: "Card summary"
draft: false
---
```

The detailed schema is documented in `docs/02-CONTENT-MODEL.md`.

## 6. Notion Mirror Identity

The Notion portfolio database must have a `Slug` property.

GitHub `slug` and Notion `Slug` must be identical.

When updating a Notion mirror page:

1. Find the existing page by `Slug`.
2. If there are zero matches, create a new page only inside the allowlisted mirror target.
3. If there is one match, update that page only if it is inside the allowlisted mirror target.
4. If there are two or more matches, abort and report the duplicate state to the user.

Do not use Notion page IDs as required public Git keys. Prefer `Slug`.

## 7. Asset Rules

### GitHub / Website

- Project images: colocated in the project folder
- Shared images: `public/assets`
- PDF/attachments: `public/docs`
- Large video: external hosting such as YouTube
- Never store Notion temporary or signed URLs in Markdown

### Notion

Do not assume current Notion MCP can directly upload images or files for the mirror workflow.

Notion mirror image handling must be designed later using one of:

- the Notion File Upload API
- permanent GitHub Pages asset URLs
- source links without embedded image mirroring

GitHub/homepage assets remain canonical.

## 8. Work Modes

### Draft Mode

When the user says "draft", "local only", or "do not deploy":

1. Edit local Markdown/code.
2. Run checks.
3. Run a local build.
4. Report results.
5. Do not push.
6. Modify Notion only if the user explicitly asks and a write target is allowlisted.

### Publish Mode

When the user says "publish", "deploy", "reflect", or "update GitHub and Notion":

1. Edit local files.
2. Run `npm run check` or an equivalent validation.
3. Run `npm run build`.
4. Review changes.
5. Sync Notion mirror only when a write target is allowlisted.
6. Commit.
7. Push.
8. Check GitHub Actions when possible.
9. Check the deployment URL when possible.

If the user explicitly forbids push, never push.

## 9. Content Editing Order

Always edit Markdown first.

Forbidden order:

```text
Edit Notion
-> later align Markdown
```

Allowed order:

```text
Edit Markdown
-> local validation
-> Notion mirror when allowed
-> GitHub publish when requested
```

## 10. Initial Migration

Initial migration is the only phase where Notion can be an input source.

Rules:

- Do not delete or mass-edit original Notion pages.
- Create an inventory first.
- Count pages, databases, images, and attachments.
- Do not overwrite everything in one pass.
- Validate conversion rules with 2-3 small samples first.
- Confirm that images were actually downloaded locally before referencing them.
- Verify Markdown links do not point at Notion signed URLs.
- Do not delete original Notion pages without user approval.

See `docs/04-INITIAL-MIGRATION.md`.

### Migration Research Files

`migration/` is not website source. It is Codex working material for inventory and migration research.

Existing tracked files under `migration/` must not be removed or history-rewritten without explicit user approval.

New internal research files under `migration/project-research/` should not be committed to the public GitHub repository by default. They may contain local evidence notes, private-source observations, or attribution questions that are useful for Codex but not intended as public portfolio content.

## 11. Code Quality

- Prefer TypeScript.
- Do not add unnecessary frameworks for a static site.
- Do not add a server database.
- Do not add a CMS.
- Minimize build-time network dependencies.
- Separate content and presentation.
- Do not duplicate frontmatter parsing logic.
- Use schema validation.
- Keep HTML accessible.
- Keep layouts responsive.
- Optimize images.
- Prevent broken internal links.

## 12. Before Large Work

1. Read this `AGENTS.md`.
2. Read `project.config.json`.
3. Read relevant `docs/`.
4. Check repository status.
5. Reuse existing implementation instead of rewriting destructively.
6. Form a plan.
7. Implement.
8. Verify with real commands.

## 13. Completion Report

Briefly report:

- changed files
- implemented behavior/content
- validation commands and results
- Notion sync status
- Git commit/push status
- remaining TODOs
- one recommended next action for the user
