'use client';

import { motion } from 'framer-motion';
import styles from './EmptyState.module.css';

export function EmptyState() {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
    >
      <div className={styles.header}>
        <span className={styles.label}>Recent analyses</span>
      </div>

      <div className={styles.emptyCard}>
        <motion.div
          className={styles.illustration}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
            <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </motion.div>
        <p className={styles.message}>No past analyses yet.</p>
        <p className={styles.hint}>Drop documents above to start your first UBO analysis.</p>
      </div>
    </motion.div>
  );
}
