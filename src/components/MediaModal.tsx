import { useEffect, useRef, useState } from 'react';
import type { MediaItem } from '../data/projects';
import styles from './MediaModal.module.css';

interface MediaModalProps {
  items: MediaItem[];
  startIndex: number;
  title: string;
  onClose: () => void;
}

export default function MediaModal({ items, startIndex, title, onClose }: MediaModalProps) {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  useEffect(() => {
    closeRef.current?.focus();

    // Locks the background scroll while the overlay is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const item = items[index];
  const isVideo = typeof item !== 'string' && item.type === 'video';

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — media viewer`}
      onClick={onClose}
    >
      {/* Prevent clicking inside the frame from reaching the close handler. */}
      <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close viewer">
          ✕
        </button>

        {isVideo ? (
          <video className={styles.media} src={item.src} poster={item.poster} controls autoPlay playsInline />
        ) : (
          <img className={styles.media} src={item as string} alt={`${title} — image ${index + 1} of ${items.length}`} />
        )}

        {items.length > 1 && (
          <>
            <button type="button" className={`${styles.nav} ${styles.navPrev}`} onClick={prev} aria-label="Previous">
              ‹
            </button>
            <button type="button" className={`${styles.nav} ${styles.navNext}`} onClick={next} aria-label="Next">
              ›
            </button>
            <p className={styles.counter}>
              {index + 1} / {items.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
