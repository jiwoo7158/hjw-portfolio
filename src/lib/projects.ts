import type { CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;
export type ProjectCategory = Project["data"]["category"];

export const categoryLabels: Record<ProjectCategory, string> = {
  game: "Game",
  web: "Web",
  research: "Research",
  security: "Security",
  etc: "Etc"
};

export function getProjectPath(project: Project) {
  return `/projects/${project.data.category}/${project.data.slug}/`;
}

export function getProjectHref(project: Project) {
  return project.data.external ? project.data.links.site : getProjectPath(project);
}

export function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    const featuredDelta = Number(b.data.featured) - Number(a.data.featured);
    if (featuredDelta !== 0) return featuredDelta;

    const orderDelta = a.data.order - b.data.order;
    if (orderDelta !== 0) return orderDelta;

    return (b.data.year ?? 0) - (a.data.year ?? 0);
  });
}

export function uniqueCategories(projects: Project[]) {
  return [...new Set(projects.map((project) => project.data.category))];
}
