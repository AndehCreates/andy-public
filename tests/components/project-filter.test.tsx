import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import ProjectFilter from '@/components/interactive/ProjectFilter';

const projects = [
  {
    slug: 'chief-of-staff',
    title: 'Chief of Staff',
    summary: 'A coordination layer for AI-assisted software work.',
    status: 'active',
    workHook: 'Keep AI-assisted work authority-bounded and recoverable.',
    visualMark: 'authority',
    technicalDifferentiator: 'Typed lifecycle states keep coordination separate from runtime authority.',
    capabilities: ['ai-systems', 'evaluation-reliability'],
  },
  {
    slug: 'lifeos',
    title: 'LifeOS',
    summary: 'A local-first workspace for visible work state.',
    status: 'active',
    workHook: 'Preserve context and make re-entry explicit.',
    visualMark: 'continuity',
    technicalDifferentiator: 'Domain contracts extend the existing local-first state model.',
    capabilities: ['knowledge-context', 'product-engineering'],
  },
  {
    slug: 'mathpad',
    title: 'MathPad',
    summary: 'A focused mathematical workbench.',
    status: 'experimental',
    workHook: 'Keep multi-line calculations readable as expressions change.',
    visualMark: 'semantic-document',
    technicalDifferentiator: 'A revisioned semantic document aligns parsing, diagnostics, and results.',
    capabilities: ['product-engineering'],
  },
] as const;

afterEach(cleanup);

describe('ProjectFilter', () => {
  it('shows all projects, filters by capability, clears the filter, and announces the result count', async () => {
    const user = userEvent.setup();
    render(<ProjectFilter projects={[...projects]} />);

    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toBe('3 projects shown');

    await user.click(screen.getByRole('button', { name: 'Product engineering' }));

    expect(screen.getByRole('heading', { level: 2, name: 'LifeOS' })).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'MathPad' })).not.toBeNull();
    expect(screen.queryByRole('heading', { level: 2, name: 'Chief of Staff' })).toBeNull();
    expect(screen.getByRole('status').textContent).toBe('2 projects shown');

    await user.click(screen.getByRole('button', { name: 'Clear filter' }));

    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toBe('3 projects shown');
  });

  it('distinguishes every project by purpose, technical idea, visual mark, and display status', () => {
    render(<ProjectFilter projects={[...projects]} />);

    for (const project of projects) {
      const card = screen.getByRole('article', { name: project.title });
      expect(card.textContent).toContain(project.workHook);
      expect(card.textContent).toContain(project.technicalDifferentiator);
      expect(card.querySelector(`[data-visual-mark="${project.visualMark}"]`)).not.toBeNull();
    }

    expect(screen.getAllByText('Active system')).toHaveLength(2);
    expect(screen.getByText('Exploratory system')).not.toBeNull();
    expect(screen.queryByText(/^active$/i)).toBeNull();
    expect(screen.queryByText(/^experimental$/i)).toBeNull();
  });

  it('keeps capability tags visually distinct in the filter island', () => {
    const stylesheet = readFileSync(
      resolve(process.cwd(), 'src/components/interactive/ProjectFilter.css'),
      'utf8',
    );

    expect(stylesheet).toMatch(/\.capability-tag\s*\{[^}]*border:.*var\(--border-strong\)/s);
    expect(stylesheet).toMatch(/\.capability-tag\s*\{[^}]*color:.*var\(--text-secondary\)/s);
  });
});
