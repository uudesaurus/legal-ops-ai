'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './WorkflowCard.module.css';
import type { Workflow } from '@/lib/mock-data';

// ─── SVG Icons for each workflow ──────────────────────────────────────────────

function CascadeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Cascading layers — UBO ownership chain metaphor */}
      <rect x="4" y="6" width="40" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <rect x="4" y="6" width="40" height="10" rx="3" fill="var(--surface-hover)" />
      <path d="M8 11H40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

      <rect x="8" y="19" width="32" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <rect x="8" y="19" width="32" height="10" rx="3" fill="var(--surface-elevated)" />
      <path d="M12 24H36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

      <rect x="12" y="32" width="24" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="32" width="24" height="10" rx="3" fill="var(--surface-active)" />
      <path d="M16 37H32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

      {/* Connection dots */}
      <circle cx="20" cy="28" r="2" fill="var(--accent-warm)" opacity="0.8" />
      <circle cx="28" cy="28" r="2" fill="var(--accent-cool)" opacity="0.6" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="10" y="6" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="6" width="28" height="36" rx="3" fill="var(--surface-hover)" />
      <path d="M26 6V12C26 12 28 10 32 10H38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M16 18H32M16 23H28M16 28H30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      {/* Check overlay */}
      <circle cx="36" cy="36" r="8" fill="var(--surface)" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <path d="M32.5 36L35 38.5L39.5 34" stroke="var(--success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 6L8 13V23C8 32.94 14.84 42.18 24 45C33.16 42.18 40 32.94 40 23V13L24 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 6L8 13V23C8 32.94 14.84 42.18 24 45C33.16 42.18 40 32.94 40 23V13L24 6Z" fill="var(--surface-hover)" />
      <path d="M17 24L21 28L31 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Magnifier overlay */}
      <circle cx="34" cy="34" r="8" fill="var(--surface)" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="34" cy="34" r="4" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <path d="M37 37L41 41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="10" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="10" width="32" height="32" rx="3" fill="var(--surface-hover)" />
      {/* Windows grid */}
      <rect x="13" y="15" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <rect x="21.5" y="15" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <rect x="30" y="15" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <rect x="13" y="24" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <rect x="21.5" y="24" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <rect x="30" y="24" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Door */}
      <rect x="20" y="33" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="26" cy="37.5" r="0.8" fill="currentColor" opacity="0.5" />
      {/* Roof accent */}
      <path d="M6 10L24 4L42 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.3" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Radar rings */}
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.15" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="2.5" fill="var(--accent-cool)" opacity="0.8" />
      {/* Radar sweep line */}
      <path d="M24 24L24 6" stroke="var(--accent-cool)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M24 24L38 14" stroke="var(--accent-cool)" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      {/* Blip */}
      <circle cx="32" cy="16" r="2" fill="var(--warning)" opacity="0.7" />
      <circle cx="32" cy="16" r="4" stroke="var(--warning)" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" fill="var(--surface-hover)" />
      <path d="M24 18V30M18 24H30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      {/* Small orbit dots */}
      <circle cx="36" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="10" cy="34" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="38" cy="32" r="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

const iconComponentMap: Record<string, React.ReactNode> = {
  cascade: <CascadeIcon />,
  document: <DocumentIcon />,
  shield: <ShieldIcon />,
  building: <BuildingIcon />,
  radar: <RadarIcon />,
  plus: <PlusIcon />,
};

// ─── WorkflowCard Component ────────────────────────────────────────────────────

interface WorkflowCardProps {
  workflow: Workflow;
  index: number;
}

export function WorkflowCard({ workflow, index }: WorkflowCardProps) {
  const isActive = workflow.status === 'active';
  const isMore = workflow.id === 'more';

  const content = (
    <motion.div
      className={`
        ${styles.card}
        ${isActive ? styles.cardActive : styles.cardComingSoon}
        ${isMore ? styles.cardMore : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={isActive ? { y: -4, scale: 1.01 } : {}}
      whileTap={isActive ? { scale: 0.98 } : {}}
    >
      {/* Animated gradient border on hover (for active cards) */}
      {isActive && (
        <div className={styles.borderGlow} aria-hidden="true" />
      )}

      {/* Icon */}
      <div className={styles.iconWrapper}>
        {iconComponentMap[workflow.icon] || <PlusIcon />}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{workflow.name}</h3>
        <p className={styles.description}>{workflow.description}</p>
      </div>

      {/* Status badge */}
      <div className={styles.footer}>
        {isActive ? (
          <span className={styles.activeBadge}>
            <span className={styles.activeDot} />
            Active
          </span>
        ) : (
          <span className={styles.comingSoonBadge}>
            Coming Soon
          </span>
        )}

        {workflow.comingSoonNote && (
          <span className={styles.note}>{workflow.comingSoonNote}</span>
        )}
      </div>

      {/* Hover arrow for active cards */}
      {isActive && (
        <div className={styles.arrowWrapper}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.arrow}>
            <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </motion.div>
  );

  if (isActive && !isMore) {
    return (
      <Link href={workflow.url} className={styles.cardLink}>
        {content}
      </Link>
    );
  }

  return content;
}
