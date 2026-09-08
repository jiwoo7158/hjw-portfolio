import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const contentRoot = path.join(root, "src", "content", "projects");
const categories = new Set(["game", "web", "research", "security", "etc"]);
const requiredFields = ["title", "slug", "category", "description", "draft"];
const signedUrlPatterns = [/notion\.so\/signed/i, /secure\.notion-static\.com/i, /prod-files-secure/i];
const imagePattern = /!\[[^\]]*]\(([^)]+)\)/g;
const localImageExt = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

const errors = [];
const warnings = [];
const slugMap = new Map();

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function parseFrontmatter(filePath) {
  const raw = readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw, raw };

  const data = {};
  const lines = match[1].split(/\r?\n/);
  const stack = [{ indent: -1, target: data }];
  let currentArray = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;
    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const trimmed = line.trim();

    while (stack.length > 1 && indent <= stack.at(-1).indent) stack.pop();
    const target = stack.at(-1).target;

    if (trimmed.startsWith("- ") && currentArray) {
      currentArray.push(coerceValue(trimmed.slice(2)));
      continue;
    }

    const pair = trimmed.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/);
    if (!pair) continue;

    const [, key, rawValue = ""] = pair;
    if (rawValue === "") {
      const nextLine = lines[index + 1]?.trim() ?? "";
      const next = nextLine.startsWith("- ") ? [] : {};
      target[key] = next;
      if (Array.isArray(next)) {
        currentArray = next;
      } else {
        stack.push({ indent, target: next });
        currentArray = null;
      }
      continue;
    }

    const value = coerceValue(rawValue);
    target[key] = value;
    currentArray = Array.isArray(value) ? value : null;
  }

  return { data, body: raw.slice(match[0].length), raw };
}

function coerceValue(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => coerceValue(item.trim()))
      .filter((item) => item !== "");
  }
  return trimmed;
}

if (!existsSync(contentRoot)) {
  errors.push("Missing content root: src/content/projects");
} else {
  const markdownFiles = walk(contentRoot).filter((file) => path.basename(file) === "index.md");

  for (const file of markdownFiles) {
    const relativeFile = path.relative(root, file).replaceAll(path.sep, "/");
    const projectDir = path.dirname(file);
    const relativeProjectDir = path.relative(contentRoot, projectDir).replaceAll(path.sep, "/");
    const [pathCategory, pathSlug] = relativeProjectDir.split("/");
    const { data, body, raw } = parseFrontmatter(file);

    for (const field of requiredFields) {
      if (!(field in data)) errors.push(`${relativeFile}: missing required frontmatter field "${field}"`);
    }

    if (typeof data.slug === "string") {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
        errors.push(`${relativeFile}: slug must use lowercase ascii words separated by hyphens`);
      }
      if (pathSlug && data.slug !== pathSlug) {
        errors.push(`${relativeFile}: slug "${data.slug}" does not match folder "${pathSlug}"`);
      }
      const existing = slugMap.get(data.slug) ?? [];
      existing.push(relativeFile);
      slugMap.set(data.slug, existing);
    }

    if (typeof data.category === "string") {
      if (!categories.has(data.category)) errors.push(`${relativeFile}: unsupported category "${data.category}"`);
      if (pathCategory && data.category !== pathCategory) {
        errors.push(`${relativeFile}: category "${data.category}" does not match folder "${pathCategory}"`);
      }
    }

    if (typeof data.draft !== "boolean") {
      errors.push(`${relativeFile}: draft must be true or false`);
    }

    const coverImage = data.cover?.image;
    if (typeof coverImage === "string" && !existsSync(path.join(projectDir, coverImage))) {
      errors.push(`${relativeFile}: cover image not found: ${coverImage}`);
    }

    for (const pattern of signedUrlPatterns) {
      if (pattern.test(raw)) errors.push(`${relativeFile}: contains a Notion temporary/signed asset URL`);
    }

    for (const match of body.matchAll(imagePattern)) {
      const target = match[1].split("#")[0].split("?")[0];
      if (/^(https?:)?\/\//.test(target) || target.startsWith("/")) continue;
      if (!localImageExt.test(target)) continue;
      if (!existsSync(path.join(projectDir, target))) {
        errors.push(`${relativeFile}: markdown image not found: ${target}`);
      }
    }

    for (const asset of walk(projectDir)) {
      if (asset === file) continue;
      if (statSync(asset).size > 10 * 1024 * 1024) {
        warnings.push(`${path.relative(root, asset).replaceAll(path.sep, "/")}: larger than 10 MiB`);
      }
    }
  }
}

for (const [slug, files] of slugMap) {
  if (files.length > 1) errors.push(`Duplicate slug "${slug}" in ${files.join(", ")}`);
}

for (const warning of warnings) console.warn(`Warning: ${warning}`);

if (errors.length > 0) {
  for (const error of errors) console.error(`Error: ${error}`);
  process.exit(1);
}

console.log(`Content validation passed (${slugMap.size} project entries).`);
