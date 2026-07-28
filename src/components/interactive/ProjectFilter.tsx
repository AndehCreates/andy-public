import { Component } from 'react';
import { capabilities, type CapabilityId } from '@/lib/content/taxonomy';
import type { VisualMark } from '@/lib/content/presentation';
import type { ProjectStatus } from '@/lib/content/types';
import './ProjectFilter.css';

export interface ProjectFilterProject {
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  workHook: string;
  visualMark: VisualMark;
  technicalDifferentiator: string;
  capabilities: readonly CapabilityId[];
}

interface Props {
  projects: ProjectFilterProject[];
}

function projectCountLabel(count: number) {
  return `${count} ${count === 1 ? 'project' : 'projects'} shown`;
}

function getInitialSelectedCapability(): CapabilityId | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const selectedCapability = document
    .querySelector<HTMLElement>('[data-project-filter-root]')
    ?.dataset.selectedCapability;

  if (!selectedCapability || !(selectedCapability in capabilities)) {
    return null;
  }

  return selectedCapability as CapabilityId;
}

const statusDisplayCopy: Record<ProjectStatus, string> = {
  active: 'Active system',
  stable: 'Stable system',
  experimental: 'Exploratory system',
  archived: 'Archived system',
};

interface State {
  selectedCapability: CapabilityId | null;
}

export default class ProjectFilter extends Component<Props, State> {
  override state: State = { selectedCapability: getInitialSelectedCapability() };

  override render() {
    const { projects } = this.props;
    const { selectedCapability } = this.state;
    const availableCapabilities = [...new Set(projects.flatMap((project) => project.capabilities))];
    const visibleProjects = selectedCapability
      ? projects.filter((project) => project.capabilities.includes(selectedCapability))
      : projects;

    return (
    <section
      className="collection-index container"
      aria-labelledby="collection-heading"
      data-project-filter-root
      data-selected-capability={selectedCapability ?? ''}
    >
      <header className="collection-index__header">
        <p className="collection-index__eyebrow">Work</p>
        <h1 id="collection-heading">Project atlas</h1>
        <p>Reviewed systems with different jobs: coordinate AI work, preserve continuity, evaluate uncertain evidence, keep calculations coherent, and make simulations inspectable.</p>
        <p className="collection-index__count" role="status" aria-live="polite" data-filter-count>
          {projectCountLabel(visibleProjects.length)}
        </p>
      </header>

      <div className="project-filter" aria-label="Filter projects by capability">
        <span className="project-filter__label">Filter by capability</span>
        <div className="project-filter__controls">
          {availableCapabilities.map((capability) => (
            <button
              type="button"
              aria-pressed={selectedCapability === capability}
              key={capability}
              data-filter-capability={capability}
              onClick={() => this.setState({ selectedCapability: capability })}
            >
              {capabilities[capability]}
            </button>
          ))}
          <button
            type="button"
            data-filter-clear
            onClick={() => this.setState({ selectedCapability: null })}
            disabled={!selectedCapability}
          >
            Clear filter
          </button>
        </div>
      </div>

      <div className="collection-index__grid">
        {visibleProjects.map((project) => (
          <article
            className="project-card"
            key={project.slug}
            aria-labelledby={`project-${project.slug}-title`}
            data-project-card
            data-project-capabilities={project.capabilities.join(' ')}
          >
            <div className="project-card__meta">
              <span className="project-card__mark" data-visual-mark={project.visualMark} aria-hidden="true" />
              <p className="project-card__status">{statusDisplayCopy[project.status]}</p>
            </div>
            <h2 id={`project-${project.slug}-title`}><a href={`/work/${project.slug}/`}>{project.title}</a></h2>
            <p className="project-card__hook">{project.workHook}</p>
            <p className="project-card__summary">{project.summary}</p>
            <p className="project-card__differentiator"><span>Technical idea</span>{project.technicalDifferentiator}</p>
            <ul className="project-card__capabilities" aria-label="Capabilities">
              {project.capabilities.map((capability) => <li key={capability}><span className="capability-tag">{capabilities[capability]}</span></li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
    );
  }
}
