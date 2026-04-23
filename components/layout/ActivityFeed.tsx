'use client';

import { motion } from 'framer-motion';
import styles from './ActivityFeed.module.css';
import type { ActivityItem, ActivityAction } from '@/lib/mock-data';

// ─── Action Icons ─────────────────────────────────────────────────────────────

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 9V3M4 6l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="3" y="2" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5H9M5 7.5H8M5 10H7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function MatterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 7H9M7 5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2L12 5L7 8L2 5L7 2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M2 7L7 10L12 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9L7 12L12 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 4.5V7L8.5 8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 10L5 7L7 9L12 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnalysisIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="8" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7.5 7L6.5 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function InviteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1 12c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M10 8V12M8 10H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 5V11M4 8l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9v2a1 1 0 001 1h8a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="11" cy="3" r="2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="3" cy="7" r="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5 6L9 4M5 8L9 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1H5l-2.5 2L2 9V3z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

const actionIconMap: Record<ActivityAction, React.ReactNode> = {
  upload: <UploadIcon />,
  report: <ReportIcon />,
  matter_create: <MatterIcon />,
  workflow_start: <WorkflowIcon />,
  system: <SystemIcon />,
  review: <ReviewIcon />,
  analysis: <AnalysisIcon />,
  invite: <InviteIcon />,
  export: <ExportIcon />,
  share: <ShareIcon />,
  comment: <CommentIcon />,
};

const actionColorMap: Record<ActivityAction, string> = {
  upload: 'var(--text-secondary)',
  report: 'var(--success)',
  matter_create: 'var(--accent-cool)',
  workflow_start: 'var(--text-secondary)',
  system: 'var(--info)',
  review: 'var(--success)',
  analysis: 'var(--text-secondary)',
  invite: 'var(--warning)',
  export: 'var(--text-tertiary)',
  share: 'var(--accent-cool)',
  comment: 'var(--text-secondary)',
};

// ─── ActivityFeed Component ────────────────────────────────────────────────────

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={styles.emptyIcon}>
          <rect x="6" y="6" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M20 14v12M14 20h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        </svg>
        <p className={styles.emptyTitle}>No recent activity</p>
        <p className={styles.emptyHint}>Activity will appear here as team members use the platform.</p>
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      <div className={styles.timeline}>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className={styles.item}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Timeline line + dot */}
            <div className={styles.timelineLeft}>
              <div
                className={styles.timelineDot}
                style={{ color: actionColorMap[activity.action] }}
              >
                {actionIconMap[activity.action]}
              </div>
              {index < activities.length - 1 && (
                <div className={styles.timelineLine} />
              )}
            </div>

            {/* Content */}
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                {/* Avatar */}
                <div
                  className={styles.avatar}
                  style={{ backgroundColor: activity.userColor + '20', color: activity.userColor }}
                >
                  {activity.userInitials}
                </div>

                {/* Text */}
                <div className={styles.text}>
                  <span className={styles.userName}>{activity.userName}</span>
                  <span className={styles.actionText}> {activity.description} </span>
                  {activity.meta && (
                    <span className={styles.meta}>{activity.meta}</span>
                  )}
                </div>

                {/* Time */}
                <span className={styles.time}>{activity.relativeTime}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View all link */}
      <div className={styles.viewAll}>
        <button className={styles.viewAllBtn}>
          View all activity
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6H9.5M7 3.5L9.5 6L7 8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
