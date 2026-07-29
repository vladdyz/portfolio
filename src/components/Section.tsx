import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.headingGroup}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={`${id}-heading`} className={styles.title}>
            {title}
          </h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
