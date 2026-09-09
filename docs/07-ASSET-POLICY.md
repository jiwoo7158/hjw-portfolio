# 07. Asset Policy

## Website Assets

Project-specific images belong beside the project entry:

```text
src/content/projects/<category>/<slug>/
├─ index.md
├─ cover.png
└─ screenshot-01.png
```

Shared public assets belong in:

```text
public/assets
```

Public documents belong in:

```text
public/docs
```

Large videos should stay outside Git and be linked from a stable hosting service such as YouTube or Vimeo.

## Filenames

Use stable ASCII filenames:

```text
cover.png
screenshot-01.webp
network-diagram.png
```

Avoid spaces, Korean filenames, temporary export names, and "final-final" variants.

## Markdown References

Project-local images can be referenced relative to `index.md`:

```md
![Gameplay screenshot](screenshot-01.png)
```

Do not reference a local image unless the file exists in the repository.

## Size

Prefer reasonably compressed web formats. Keep large raw media, project backups, videos, and build artifacts out of Git.

The validation script warns when colocated project assets exceed 10 MiB.

## Notion Imported Images

Do not store Notion temporary or signed URLs in Markdown.

If a Notion page exposes a temporary file URL, treat it only as a transient read source. Downloading, converting, or rehosting those files requires a separate explicit migration step and confirmation that the final asset is owned by the Git repository.

## Notion Mirror Images

Current Notion MCP must not be assumed to directly upload homepage images/files for mirror pages.

Future Notion mirror image handling should use one of:

- Notion File Upload API
- permanent GitHub Pages asset URLs
- source links without embedded image mirroring

Website/GitHub assets remain the canonical source.
