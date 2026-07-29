import { useState } from 'react';
import type { Project, ProjectLinks, MediaItem } from '../data/projects';
import { CATEGORY_LABELS, STATUS_LABELS } from '../data/projects';
import TechTag from './TechTag';
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
};

function isVideoItem(item: MediaItem): item is { type: 'video'; src: string; poster: string } {
  return typeof item !== 'string' && item.type === 'video';
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// Click-to-play: nothing but the poster <img> exists in the DOM until the
// user opts in, so no video bytes are fetched by default.
function VideoSlide({ item, title }: { item: { src: string; poster: string }; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return <video className={styles.image} src={item.src} controls autoPlay playsInline />;
  }

  return (
    <button
      type="button"
      className={styles.videoPoster}
      onClick={() => setPlaying(true)}
      aria-label={`Play video — ${title}`}
    >
      <img src={item.poster} alt="" className={styles.image} />
      <span className={styles.playButton} aria-hidden="true">
        <PlayIcon />
      </span>
    </button>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, category, period, tagline, description, stack, highlights, images, links, status, statusLabel } =
    project;

  const hasImages = Boolean(images && images.length > 0);
  const hasCarousel = Boolean(images && images.length > 1);
  const [activeImage, setActiveImage] = useState(0);

  const showPrev = () =>
    setActiveImage((i) => (images ? (i === 0 ? images.length - 1 : i - 1) : 0));
  const showNext = () =>
    setActiveImage((i) => (images ? (i === images.length - 1 ? 0 : i + 1) : 0));

  const linkEntries = (Object.entries(links) as [keyof ProjectLinks, string | undefined][]).filter(
    (entry): entry is [keyof ProjectLinks, string] => Boolean(entry[1])
  );

  const activeItem = hasImages ? images![activeImage] : null;

  return (
    <article className={styles.card} data-category={category}>
      <div className={styles.media}>
        {activeItem ? (
          <>
            {isVideoItem(activeItem) ? (
              <VideoSlide key={activeImage} item={activeItem} title={title} />
            ) : (
              <img
                key={activeImage}
                src={activeItem}
                alt={`${title} — slide ${activeImage + 1} of ${images!.length}`}
                className={styles.image}
              />
            )}
            {hasCarousel && (
              <>
                <button
                  type="button"
                  className={`${styles.carouselButton} ${styles.carouselPrev}`}
                  onClick={showPrev}
                  aria-label={`Previous slide for ${title}`}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles.carouselButton} ${styles.carouselNext}`}
                  onClick={showNext}
                  aria-label={`Next slide for ${title}`}
                >
                  ›
                </button>
                <div className={styles.dots} role="tablist" aria-label={`${title} slides`}>
                  {images!.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === activeImage}
                      aria-label={`Show slide ${i + 1} of ${images!.length}`}
                      className={`${styles.dot} ${i === activeImage ? styles.dotActive : ''}`}
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className={styles.mediaFallback} aria-hidden="true">
            {title.charAt(0)}
          </div>
        )}
        <span className={styles.statusBadge} data-status={status}>
          {statusLabel ?? STATUS_LABELS[status]}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          {CATEGORY_LABELS[category]}
          {period ? ` · ${period}` : ''}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.description}>{description}</p>
        {highlights && highlights.length > 0 && (
          <ul className={styles.highlights}>
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <ul className={styles.stack} aria-label="Technologies used">
          {stack.map((tech) => (
            <TechTag key={tech} name={tech} />
          ))}
        </ul>

        {linkEntries.length > 0 && (
          <div className={styles.links}>
            {linkEntries.map(([key, href]) => (
              <a key={key} href={href} target="_blank" rel="noreferrer noopener" className={styles.link}>
                {LINK_LABELS[key]} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
