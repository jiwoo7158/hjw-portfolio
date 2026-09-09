# 03. Notion MCP Operating Rules

## Connection

Project configuration:

```toml
[mcp_servers.notion]
url = "https://mcp.notion.com/mcp"
```

Initial OAuth:

```bash
codex mcp login notion
```

The website must not depend on Notion at build time. `npm run build` and GitHub Actions deployments must work without Notion access.

## Current Workspace

Last checked workspace:

```text
Workspace: 한지우의 Notion
Workspace ID: 0300bf1c-c2ae-4734-829c-273f751bb54d
User: 한지우
```

Tool exposure can include write-capable commands. Tool exposure is not permission to write.

## Write Boundary

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

## Allowed Read Operations

For the current migration/research phase, Notion MCP may be used only for:

- searching existing pages
- fetching existing pages/databases
- confirming source URLs, page properties, and page structure
- checking workspace/tool access

## Forbidden Operations

Do not run these operations against existing Notion content:

```text
create
update
delete
archive
move
comment
upload
```

This restriction remains in place even when OAuth is complete and write-capable tools are visible.

## Asset Policy

Do not save Notion temporary or signed URLs into Git, Markdown, source files, docs, or generated content.

Current Notion MCP must not be assumed to provide the complete homepage asset workflow. Notion mirror images require a later design using one of:

- Notion File Upload API
- permanent GitHub Pages asset URLs
- source links without embedded image mirroring

Website and GitHub assets remain canonical and are owned by the repository.

## Future Portfolio Mirror

If a `Portfolio Mirror` root is created later, record its page/database ID explicitly before writing.

Use `Slug` as the stable identity key:

1. Query by `Slug`.
2. Create only if zero matches exist inside the allowlisted mirror target.
3. Update only if exactly one match exists inside the allowlisted mirror target.
4. Abort if multiple pages match the same `Slug`.
