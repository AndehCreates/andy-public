import { canPublish } from './publication';
import type { Publishable } from './types';

export function publicEntries<T extends Publishable>(entries: T[]): T[] {
  return entries.filter(canPublish).sort(byOrderThenTitle);
}

export function featuredEntries<T extends Publishable>(entries: T[]): T[] {
  return entries.filter((entry) => entry.visibility === 'featured' && canPublish(entry)).sort(byOrderThenTitle);
}

export function byOrderThenTitle<T extends { order?: number; title: string }>(a: T, b: T): number {
  const orderDifference = (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY);

  if (orderDifference) return orderDifference;
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
}
