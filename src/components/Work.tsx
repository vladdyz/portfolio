import { useMemo, useState } from 'react';
import Section from './Section';
import ProjectCard from './ProjectCard';
import { projects, CATEGORY_LABELS } from '../data/projects';
import type { ProjectCategory } from '../data/projects';
import styles from './Work.module.css';

type FilterValue = 'all' | ProjectCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'webapp', label: CATEGORY_LABELS.webapp },
  { value: 'repository', label: CATEGORY_LABELS.repository },
  { value: 'game', label: CATEGORY_LABELS.game },
];

export default function Work() {
  const [filter, setFilter] = useState<FilterValue>('all');

  const visibleProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <Section
      id="work"
      eyebrow="Portfolio"
      title="Selected Work"
      description="Live apps, source-only systems, and a couple of games."
    >
      <div className={styles.filters} role="group" aria-label="Filter projects by category">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={styles.filterButton}
            data-active={filter === f.value}
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
