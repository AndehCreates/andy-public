export interface ResumeCapabilityGroup {
  title: string;
  items: string[];
}

export interface ResumeSystem {
  title: string;
  summary: string;
  href: string;
}

export const resume = {
  summary:
    'Systems-oriented software builder focused on reliable, human-centered tools that make context, uncertainty, and recovery visible.',
  capabilityGroups: [
    {
      title: 'AI systems and reliability',
      items: ['Human-owned decision boundaries', 'Evidence and provenance', 'Evaluation-oriented workflows', 'Recovery-aware system design'],
    },
    {
      title: 'Product and software systems',
      items: ['Local-first workspaces', 'Typed domain contracts', 'Accessible static-first interfaces', 'Inspectable state and tradeoffs'],
    },
  ] satisfies ResumeCapabilityGroup[],
  selectedSystems: [
    {
      title: 'Chief of Staff',
      summary: 'A coordination layer for AI-assisted software work with explicit human review and verification boundaries.',
      href: '/work/chief-of-staff/',
    },
    {
      title: 'LifeOS',
      summary: 'A local-first workspace for visible commitments, context, and recovery after interruption.',
      href: '/work/lifeos/',
    },
    {
      title: 'Alpha Screener',
      summary: 'A research workspace that keeps signal quality, uncertainty, and review needs visible.',
      href: '/work/alpha-screener/',
    },
  ] satisfies ResumeSystem[],
  technicalTools: ['Astro', 'TypeScript', 'React', 'MDX', 'Vitest', 'Playwright'],
} as const;
