import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ProjectFilter from '@/components/interactive/ProjectFilter';

const projects = [
  {
    slug: 'chief-of-staff',
    title: 'Chief of Staff',
    summary: 'A coordination layer for AI-assisted software work.',
    status: 'active',
    capabilities: ['ai-systems', 'evaluation-reliability'],
  },
  {
    slug: 'lifeos',
    title: 'LifeOS',
    summary: 'A local-first workspace for visible work state.',
    status: 'active',
    capabilities: ['knowledge-context', 'product-engineering'],
  },
  {
    slug: 'mathpad',
    title: 'MathPad',
    summary: 'A focused mathematical workbench.',
    status: 'active',
    capabilities: ['product-engineering'],
  },
] as const;

describe('ProjectFilter', () => {
  it('shows all projects, filters by capability, clears the filter, and announces the result count', async () => {
    const user = userEvent.setup();
    render(<ProjectFilter projects={[...projects]} />);

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toBe('3 projects shown');

    await user.click(screen.getByRole('button', { name: 'Product engineering' }));

    expect(screen.getByRole('heading', { level: 2, name: 'LifeOS' })).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'MathPad' })).not.toBeNull();
    expect(screen.queryByRole('heading', { level: 2, name: 'Chief of Staff' })).toBeNull();
    expect(screen.getByRole('status').textContent).toBe('2 projects shown');

    await user.click(screen.getByRole('button', { name: 'Clear filter' }));

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toBe('3 projects shown');
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
