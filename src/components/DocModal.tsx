import { useEffect, useRef } from 'react';
import styles from './DocModal.module.css';

interface DocModalProps {
  src: string;
  title: string;
  onClose: () => void;
}

export default function DocModal({ src, title, onClose }: DocModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — documentation`}
      onClick={onClose}
    >
      <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
        <div className={styles.bar}>
          <span className={styles.barTitle}>{title} — Documentation</span>
          <div className={styles.barActions}>
            {/* Mobile browsers (iOS Safari especially) often refuse to render a
                PDF inside an iframe, so always offer a real link out. */}
            <a href={src} target="_blank" rel="noreferrer noopener" className={styles.openLink}>
              Open in new tab <span aria-hidden="true">↗</span>
            </a>
            <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close documentation">
              ✕
            </button>
          </div>
        </div>

        <iframe className={styles.viewer} src={src} title={`${title} documentation`} />
      </div>
    </div>
  );
}
