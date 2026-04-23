'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './access-denied.module.css';

export default function AccessDeniedPage() {
  return (
    <div className={styles.container}>
      {/* Animated background */}
      <div className={styles.bg}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.gridLines} />
      </div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated lock icon */}
        <motion.div
          className={styles.iconWrap}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="12" y="28" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M20 28v-10c0-8.837 7.163-16 16-16s16 7.163 16 16v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="32" cy="44" r="4" fill="var(--error)" opacity="0.6" />
            <motion.path
              d="M32 48v6"
              stroke="var(--error)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
            />
          </svg>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Access Restricted
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          You don&apos;t have permission to access the Admin panel.
          Only administrators can manage team members and platform settings.
        </motion.p>

        <motion.div
          className={styles.hint}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          If you believe this is an error, contact your workspace administrator.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/dashboard" className={styles.returnBtn}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Return to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
