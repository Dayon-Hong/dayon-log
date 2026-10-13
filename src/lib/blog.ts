import { getCollection } from 'astro:content';
export async function posts() { return (await getCollection('blog', ({ data }) => !data.draft)).sort((a,b) => b.data.pubDate.getTime()-a.data.pubDate.getTime()); }
export function path(url: string) { const base = import.meta.env.BASE_URL; return `${base.replace(/\/$/, '')}/${url.replace(/^\//, '')}`; }
