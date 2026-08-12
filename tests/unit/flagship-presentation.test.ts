import { readFileSync } from 'node:fs';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import {
  flagshipThemeValues,
  projectPresentationSchema,
  type DiagramConfiguration,
} from '../../src/lib/content/presentation';

const repoRoot = process.cwd();

const flagshipExpectations = [
  ['chief-of-staff', 'authority', 'authority-boundaries'],
  ['alpha-screener', 'evidence', 'evidence-gates'],
] as const;

function readProjectPresentation(slug: string) {
  const source = readFileSync(`${repoRoot}/src/content/projects/${slug}.mdx`, 'utf8');
  return projectPresentationSchema.parse(matter(source).data);
}

function labelsById(diagram: DiagramConfiguration): Map<string, string> {
  return new Map(diagram.nodes.map((node) => [node.id, node.label]));
}

describe('public flagship presentation mapping', () => {
  it('resolves each flagship to one controlled theme and diagram configuration', () => {
    expect(flagshipThemeValues).toEqual(['authority', 'continuity', 'evidence']);

    for (const [slug, theme, variant] of flagshipExpectations) {
      const presentation = readProjectPresentation(slug);
      expect(presentation.theme).toBe(theme);
      expect(presentation.diagram?.variant).toBe(variant);
    }
  });

  it('maps every directional relationship through stable node IDs', () => {
    for (const [slug] of flagshipExpectations) {
      const diagram = readProjectPresentation(slug).diagram;
      expect(diagram).toBeDefined();

      const labels = labelsById(diagram!);
      for (const edge of diagram!.edges) {
        expect(labels.get(edge.from)).toBeTruthy();
        expect(labels.get(edge.to)).toBeTruthy();
        expect(edge.label.trim()).not.toBe('');
      }
    }
  });

  it('defines shared diagram semantics and restrained flagship tokens', () => {
    const component = readFileSync(`${repoRoot}/src/components/diagrams/SystemDiagram.astro`, 'utf8');
    const tokens = readFileSync(`${repoRoot}/src/styles/tokens.css`, 'utf8');

    expect(component).toContain('data-diagram-theme');
    expect(component).toContain('data-node-id');
    expect(component).toContain('system-diagram__connector');
    expect(component).toContain('system-diagram__relationship');
    expect(tokens).toContain('--accent-authority:');
    expect(tokens).toContain('--accent-continuity:');
    expect(tokens).toContain('--accent-evidence:');
    expect(tokens).toContain('--state-human-control:');
  });
});
