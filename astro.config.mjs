import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
// Change SITE_URL and BASE_PATH when deploying to a custom domain or project Pages.
const site = process.env.SITE_URL || 'https://example.com';
const base = process.env.BASE_PATH || '/';
export default defineConfig({ site, base, integrations: [mdx(), sitemap()], markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, wrap: true } } });
