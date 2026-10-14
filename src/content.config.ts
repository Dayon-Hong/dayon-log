import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const blog = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }), schema: z.object({ uuid: z.uuid(), title: z.string(), description: z.string(), pubDate: z.coerce.date(), updatedDate: z.coerce.date().optional(), tags: z.array(z.string()).default([]), category: z.string().default('Engineering Log'), draft: z.boolean().default(false), originalUrl: z.url().optional() }) });
export const collections = { blog };
