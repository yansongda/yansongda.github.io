import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/posts" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
	}),
});

export const collections = { posts };
