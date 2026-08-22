import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { capabilityIds } from '@/lib/content/taxonomy';
import { reviewValues, sourceAvailabilityValues, visibilityValues } from '@/lib/content/publication';
import { addProjectPresentationIssues, projectPresentationFields } from '@/lib/content/presentation';
import { projectStatusValues } from '@/lib/content/types';

const portfolioWorldValues = [
  'Human Understanding',
  'Augmentation Systems',
  'Complex-System Infrastructure',
  'Applied Research / Proving Grounds',
] as const;

const ecosystemRoleFields = {
  world: z.enum(portfolioWorldValues).optional(),
  ecosystemRole: z.string().trim().min(1).optional(),
  whatItProves: z.string().trim().min(1).optional(),
  boundaries: z.array(z.string().trim().min(1)).min(1).optional(),
};

const baseFields = {
  id: z.string().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(2),
  summary: z.string().min(20).max(240),
  visibility: z.enum(visibilityValues),
  publicReview: z.enum(reviewValues),
  sourceAvailability: z.enum(sourceAvailabilityValues),
  sourceUrls: z.array(z.string().url()).default([]),
  capabilities: z.array(z.enum(capabilityIds)).min(1),
  relatedIds: z.array(z.string()).default([]),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date(),
  order: z.number().int().nonnegative().optional(),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    ...baseFields,
    ...projectPresentationFields,
    ...ecosystemRoleFields,
    projectId: z.string().min(2),
    status: z.enum(projectStatusValues),
  }).superRefine(addProjectPresentationIssues),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    ...baseFields,
    projectId: z.string().min(2),
    status: z.enum(['planned', 'published']),
  }),
});

const systems = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/systems' }),
  schema: z.object({
    ...baseFields,
    systemId: z.string().min(2),
  }),
});

const handbook = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/handbook' }),
  schema: z.object({
    ...baseFields,
    topic: z.string().min(2),
  }),
});

const signals = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/signals' }),
  schema: z.object({
    ...baseFields,
    kind: z.enum(['resource', 'homelab', 'field-note', 'experiment']),
  }),
});

export const collections = { projects, caseStudies, systems, handbook, signals };
