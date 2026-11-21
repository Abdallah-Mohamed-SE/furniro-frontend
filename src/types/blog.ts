export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
  content: string;
  contentAr?: string;
  author: string;
  date: string;
  publishedAt?: string;
  category: string;
  categoryAr?: string;
  categorySlug: string;
  image: string;
  readTime?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}
