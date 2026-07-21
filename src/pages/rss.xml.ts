import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { publicEntries } from '@/lib/content/queries';

type FeedEntry = {
  id: string;
  collection: 'handbook' | 'signals';
  title: string;
  summary: string;
  publishedAt: Date | undefined;
  updatedAt: Date;
  visibility: 'internal' | 'draft' | 'listed' | 'featured';
  publicReview: 'pending' | 'approved';
};

export async function GET(context: { site?: URL }) {
  const [handbook, signals] = await Promise.all([getCollection('handbook'), getCollection('signals')]);
  const entries: FeedEntry[] = [
    ...handbook.map((entry) => ({ id: entry.id, collection: 'handbook' as const, title: entry.data.title, summary: entry.data.summary, publishedAt: entry.data.publishedAt, updatedAt: entry.data.updatedAt, visibility: entry.data.visibility, publicReview: entry.data.publicReview })),
    ...signals.map((entry) => ({ id: entry.id, collection: 'signals' as const, title: entry.data.title, summary: entry.data.summary, publishedAt: entry.data.publishedAt, updatedAt: entry.data.updatedAt, visibility: entry.data.visibility, publicReview: entry.data.publicReview })),
  ];
  const publicFeedEntries = publicEntries(entries).sort((a, b) => (b.publishedAt ?? b.updatedAt).getTime() - (a.publishedAt ?? a.updatedAt).getTime());

  return rss({
    title: 'Andy — AI Systems',
    description: 'New handbook principles and annotated Signal Library entries.',
    site: context.site ?? 'http://localhost:4321',
    items: publicFeedEntries.map((entry) => ({
      title: entry.title,
      description: entry.summary,
      link: `/${entry.collection}/${entry.id}/`,
      pubDate: entry.publishedAt ?? entry.updatedAt,
    })),
  });
}
