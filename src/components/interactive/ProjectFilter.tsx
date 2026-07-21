import { Component } from 'react';
import { capabilities, type CapabilityId } from '@/lib/content/taxonomy';
import './ProjectFilter.css';

export interface ProjectFilterProject {
  slug: string;
  title: string;
  summary: string;
  status: string;
  capabilities: readonly CapabilityId[];
}

interface Props {
  projects: ProjectFilterProject[];
}

function projectCountLabel(count: number) {
  return `${count} ${count === 1 ? 'project' : 'projects'} shown`;
}

interface State {
  selectedCapability: CapabilityId | null;
}

export default class ProjectFilter extends Component<Props, State> {
  override state: State = { selectedCapability: null };

  override render() {
    const { projects } = this.props;
    const { selectedCapability } = this.state;
    const availableCapabilities = [...new Set(projects.flatMap((project) => project.capabilities))];
    const visibleProjects = selectedCapability
      ? projects.filter((project) => project.capabilities.includes(selectedCapability))
      : projects;

    return (
    <section className="collection-index container" aria-labelledby="collection-heading">
      <header className="collection-index__header">
        <p className="collection-index__eyebrow">Work</p>
        <h1 id="collection-heading">Project atlas</h1>
        <p>Reviewed systems and experiments, organized around the capabilities they make concrete.</p>
        <p className="collection-index__count" role="status" aria-live="polite">
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
              onClick={() => this.setState({ selectedCapability: capability })}
            >
              {capabilities[capability]}
            </button>
          ))}
          <button type="button" onClick={() => this.setState({ selectedCapability: null })} disabled={!selectedCapability}>
            Clear filter
          </button>
        </div>
      </div>

      <div className="collection-index__grid">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.slug}>
            <p className="project-card__status">{project.status}</p>
            <h2><a href={`/work/${project.slug}/`}>{project.title}</a></h2>
            <p className="project-card__summary">{project.summary}</p>
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
