import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const projectCategories = ["game", "web", "research", "security", "etc"] as const;

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.enum(projectCategories),
    description: z.string().min(1),
    year: z.number().int().optional(),
    dateRange: z.string().optional(),
    team: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z
      .object({
        image: z.string().min(1)
      })
      .optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    links: z
      .object({
        github: z.url().or(z.literal("")).optional(),
        demo: z.url().or(z.literal("")).optional(),
        youtube: z.url().or(z.literal("")).optional(),
        paper: z.url().or(z.literal("")).optional()
      })
      .default({}),
    order: z.number().int().default(100)
  })
});

export const collections = { projects };
