import { TECH_ICONS } from '../data/techIcons';
import styles from './TechTag.module.css';

interface TechTagProps {
  name: string;
}

export default function TechTag({ name }: TechTagProps) {
  const Icon = TECH_ICONS[name];

  return (
    <li className={styles.tag}>
      {Icon && <Icon  aria-hidden="true" />}
      <span>{name}</span>
    </li>
  );
}
