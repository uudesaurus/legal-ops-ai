'use client';

import { motion } from 'framer-motion';
import { platformMetrics } from '@/lib/mock-data';
import styles from './PlatformMetrics.module.css';

const ICONS = {
  documents: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="14" height="14" rx="2" />
      <path d="M5 6h8M5 9h8M5 12h5" />
    </svg>
  ),
  analyses: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7" />
      <path d="M9 5v4l3 2" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    </svg>
  ),
  matters: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="14" height="11" rx="2" />
      <path d="M6 5V3.5a.5.5 0 0 1 .5-.5H11.5a.5.5 0 0 1 .5.5V5" />
      <path d="M2 9h14" />
    </svg>
  ),
  reports: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2h9l3 3v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M12 2v4h4" />
      <path d="M6 9h6M6 12h4" />
    </svg>
  ),
  team: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="6" r="2.5" />
      <path d="M2 16c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <circle cx="13" cy="6" r="2" />
      <path d="M16 16c0-2.2-1.3-4-3-4.5" />
    </svg>
  ),
  time: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7" />
      <path d="M9 5v4.5l2.5 1.5" />
    </svg>
  ),
};

export function PlatformMetrics() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {platformMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            className={styles.card}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.05 * index,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className={styles.cardTop}>
              <div className={styles.iconWrap}>
                {ICONS[metric.icon as keyof typeof ICONS]}
              </div>
              {metric.trend && (
                <span className={`${styles.trend} ${metric.trend > 0 ? styles.trendUp : styles.trendDown}`}>
                  {metric.trend > 0 ? '↑' : '↓'} {Math.abs(metric.trend)}%
                </span>
              )}
            </div>
            <div className={styles.value}>{metric.value}</div>
            <div className={styles.label}>{metric.label}</div>
            {metric.sublabel && (
              <div className={styles.sublabel}>{metric.sublabel}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
