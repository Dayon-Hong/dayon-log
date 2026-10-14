import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
// GitHub Pages project site: https://dayon-hong.github.io/dayon-log/
const site = process.env.SITE_URL || 'https://dayon-hong.github.io';
// GitHub Pages uses a repository subpath; the local dev server runs at `/`.
const base = process.env.npm_lifecycle_event === 'dev' ? '/' : (process.env.BASE_PATH || '/dayon-log/');
export default defineConfig({ site, base, integrations: [mdx(), sitemap()], markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, wrap: true } } });
