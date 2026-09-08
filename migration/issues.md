# Migration Issues

## Images

- Several candidate pages include Notion-hosted images, covers, or file icons.
- Signed/temporary Notion asset URLs must not be saved in Markdown.
- During sample migration, image files must be downloaded into `src/content/projects/<category>/<slug>/`.
- Notion MCP direct image/file upload should not be assumed for mirror pages.

## Layout

- `한지우 | HJW` and `Game Design Hub` use column layouts.
- Column layouts should be converted into semantic Markdown sections instead of preserving pixel layout.
- Some pages use callouts as visual containers; decide whether each becomes a blockquote, a heading section, or plain content.

## Toggles

- Many game planning pages use toggle headings.
- Markdown migration should usually flatten toggles into visible sections unless there is a strong reason to use HTML `<details>`.

## Tables

- `스탯과 계산식 기획` contains many tables.
- Table conversion should be tested before broad migration.
- Wide tables may need responsive styling on the Astro detail page.

## Code Blocks

- `스탯과 계산식 기획` includes plain text code fences for formulas.
- Code fences should keep language labels when meaningful, otherwise use `text`.

## Databases

- `게임 기획`, `게임 아이디어`, `노트`, `게임 프로젝트`, and PARA `프로젝트` are relevant database structures.
- Relation, rollup, formula, status, date, person, created time, and last edited time properties need mapping rules.
- Not every database row should become a standalone portfolio page.
- Idea/note rows may be better merged into related project pages.

## Unsupported / Special Blocks

- Unknown/button/copy-indicator style blocks were observed.
- Inline databases appear inside hub pages.
- External covers and external links exist.
- Fetch results for at least one research page were truncated.
- These blocks should be handled manually in the sample migration stage before any bulk conversion.

## Privacy / Scope

- `사진` appears to be outside the portfolio migration scope and was not deeply inspected.
- The full PARA system should not be migrated as a website section; only project-relevant rows should be considered.
- Inventory files intentionally record structure and titles, not full private page bodies.
