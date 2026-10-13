import { path } from './blog';

export const categories = [
  { name: 'Backend', slug: 'backend' },
  { name: 'Database', slug: 'database' },
  { name: 'DevOps & Cloud', slug: 'devops-cloud' },
  { name: 'Computer Science', slug: 'computer-science' },
  { name: 'Algorithm', slug: 'algorithm' },
  { name: 'Engineering Log', slug: 'engineering-log' },
] as const;

export type Category = (typeof categories)[number];
export const categoryUrl = (slug: Category['slug']) => path(`blog/category/${slug}`);
