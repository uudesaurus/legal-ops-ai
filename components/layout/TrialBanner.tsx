'use client';

import { useState } from 'react';
import styles from './TrialBanner.module.css';

export function TrialBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <span className={styles.dot} />
        <span className={styles.label}>Trial Mode</span>
        <span className={styles.separator}>—</span>
        <span className={styles.message}>
          We&apos;re currently building. Please let us know if you encounter any errors.
        </span>
      </div>
      <button
        className={styles.closeBtn}
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
