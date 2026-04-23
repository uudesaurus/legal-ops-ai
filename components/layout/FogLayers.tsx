'use client';

import styles from './FogLayers.module.css';

export function FogLayers() {
  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
      <div className={styles.orb4} />
    </div>
  );
}
