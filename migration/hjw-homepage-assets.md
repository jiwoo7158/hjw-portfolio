# HJW Homepage Asset Migration

## Policy

- Git repository / GitHub Pages assets are canonical for the public homepage.
- Notion temporary or signed file URLs must not be saved in Markdown, data files, docs, or generated source.
- Current Notion MCP is not treated as a direct binary downloader for existing page images.
- Notion mirror image handling will be designed later through either Notion File Upload API or permanent homepage asset URLs.

## Assets Found

| Asset | Source block | Current status | Homepage use |
| --- | --- | --- | --- |
| Page icon `노션_아이콘.png` | Notion page icon metadata | Manual follow-up required | Not used |
| Page cover | Notion page cover metadata | Manual follow-up required | Not used |
| Profile photo `증명사진.jpg` | Left column image | Manual follow-up required and public approval needed | Not used |
| Character image `캐릭터_모음_이미지1대1.png` | About section image | Manual follow-up required and public approval needed | Not used |
| Signature image `서명2.png` | Footer image | Manual follow-up required and public approval needed | Not used |

## Download Result

- Download success: 0
- Manual work required: 5
- Not used in this migration step: 5

## Follow-Up Options

1. User provides local original image files for `src/content` or `public/assets`.
2. Use permanent GitHub Pages asset URLs after assets are committed and deployed.
3. Design a separate Notion File Upload API workflow for Notion mirror images.
