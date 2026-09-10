import { useState, type MouseEvent } from 'react';
import type { Project, ProjectLinks, MediaItem } from '../data/projects';
import { CATEGORY_LABELS, STATUS_LABELS } from '../data/projects';
import TechTag from './TechTag';
import MediaModal from './MediaModal';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const LINK_LABELS: Record<keyof ProjectLinks, string> = {
  demo: 'Live demo',
  repo: 'Source',
  uiRepo: 'UI source',
  video: 'Demo video',
  itch: 'Play on itch.io',
  download: 'Download',
  tools: 'Tools',
};

function isVideo(item: MediaItem): item is { type: 'video'; src: string; poster: string } {
  return typeof item !== 'string' && item.type === 'video';
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, category, period, tagline, description, stack, highlights, images, links, status, statusLabel } =
    project;

  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const hasImages = Boolean(images && images.length > 0);
  const hasCarousel = Boolean(images && images.length > 1);
  const detailsId = `${project.id}-details`;

  const showPrev = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveImage((i) => (images ? (i === 0 ? images.length - 1 : i - 1) : 0));
  };
  const showNext = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveImage((i) => (images ? (i === images.length - 1 ? 0 : i + 1) : 0));
  };

  // Feed the pointer position to CSS so the glow overlay can follow it.
  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  const linkEntries = (Object.entries(links) as [keyof ProjectLinks, string | undefined][]).filter(
    (entry): entry is [keyof ProjectLinks, string] => Boolean(entry[1])
  );

  const activeItem = hasImages ? images![activeImage] : null;

  return (
    <>
      <article className={styles.card} data-category={category} onMouseMove={handleMouseMove}>
        <span className={styles.glow} aria-hidden="true" />

        {/* Media and tagline are swapped out for the detail text when expanded,
            so the card keeps a compact footprint in either state. */}
        {!expanded && (
          <div className={styles.media}>
            {activeItem ? (
              isVideo(activeItem) ? (
                <video
                  className={styles.image}
                  src={activeItem.src}
                  poster={activeItem.poster}
                  controls
                  playsInline
                  preload="none"
                />
              ) : (
                <button
                  type="button"
                  className={styles.mediaButton}
                  onClick={() => setModalOpen(true)}
                  aria-label={`View larger images for ${title}`}
                >
                  <img key={activeImage} src={activeItem} alt={`${title} preview`} className={styles.image} />
                  <span className={styles.expandHint} aria-hidden="true">
                    ⤢
                  </span>
                </button>
              )
            ) : (
              <div className={styles.mediaFallback} aria-hidden="true">
                {title.charAt(0)}
              </div>
            )}

            {hasCarousel && (
              <>
                <button
                  type="button"
                  className={`${styles.carouselButton} ${styles.carouselPrev}`}
                  onClick={showPrev}
                  aria-label={`Previous image for ${title}`}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles.carouselButton} ${styles.carouselNext}`}
                  onClick={showNext}
                  aria-label={`Next image for ${title}`}
                >
                  ›
                </button>
                <div className={styles.dots}>
                  {images!.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show image ${i + 1} of ${images!.length}`}
                      className={`${styles.dot} ${i === activeImage ? styles.dotActive : ''}`}
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </div>
              </>
            )}

            <span className={styles.statusBadge} data-status={status}>
              {statusLabel ?? STATUS_LABELS[status]}
            </span>
          </div>
        )}

        <div className={styles.body}>
          <p className={styles.eyebrow}>
            {CATEGORY_LABELS[category]}
            {period ? ` · ${period}` : ''}
          </p>
          <h3 className={styles.title}>{title}</h3>

          {expanded ? (
            <div className={styles.details} id={detailsId}>
              <p className={styles.description}>{description}</p>
              {highlights && highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className={styles.tagline}>{tagline}</p>
          )}

          <ul className={styles.stack} aria-label="Technologies used">
            {stack.map((tech) => (
              <TechTag key={tech} name={tech} />
            ))}
          </ul>

          <div className={styles.footer}>
            {linkEntries.length > 0 && (
              <div className={styles.links}>
                {linkEntries.map(([key, href]) => (
                  <a key={key} href={href} target="_blank" rel="noreferrer noopener" className={styles.link}>
                    {LINK_LABELS[key]} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}

            <button
              type="button"
              className={styles.toggle}
              aria-expanded={expanded}
              aria-controls={detailsId}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Hide details' : 'Show details'}
              <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} aria-hidden="true">
                ▾
              </span>
            </button>
          </div>
        </div>
      </article>

      {modalOpen && hasImages && (
        <MediaModal items={images!} startIndex={activeImage} title={title} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
