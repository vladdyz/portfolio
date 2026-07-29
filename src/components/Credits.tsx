import { CREDITS } from '../data/credits';
import styles from './Credits.module.css';

export default function Credits() {
  const line = CREDITS.join('   •   ');

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        <span className={styles.segment}>{line}</span>
        <span className={styles.segment} aria-hidden="true">
          {line}
        </span>
      </div>
    </div>
  );
}
