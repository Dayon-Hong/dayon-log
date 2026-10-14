import { getCollection } from 'astro:content';
const localBlogImages = import.meta.glob('../content/blog/images/**/*.{avif,gif,jpeg,jpg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
export async function posts() { return (await getCollection('blog', ({ data }) => !data.draft)).sort((a,b) => b.data.pubDate.getTime()-a.data.pubDate.getTime()); }
export function path(url: string) { const base = import.meta.env.BASE_URL; return `${base.replace(/\/$/, '')}/${url.replace(/^\//, '')}`; }
export function postUrl(post: { data: { uuid: string } }) { return path(`blog/${post.data.uuid}`); }
export function firstImageUrl(post: { id: string; body?: string }) {
  const body = (post.body || '').replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '').replace(/<!--[\s\S]*?-->/g, '');
  const markdownImage = body.match(/!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))/);
  const htmlImage = body.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  const source = (markdownImage?.[1] || markdownImage?.[2] || htmlImage?.[1])?.replace(/\\([()])/g, '$1');
  if (!source) return undefined;
  if (/^(https?:|data:|blob:)/i.test(source)) return source;
  if (source.startsWith('/')) return path(source);

  const imagePath = source.replace(/^\.\//, '').replace(/^\.\.\//, '');
  const localImage = Object.entries(localBlogImages).find(([key]) => key.endsWith(`/${imagePath}`));
  return localImage?.[1];
}
