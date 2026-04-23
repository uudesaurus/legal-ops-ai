'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';
import { WorkflowCard } from '@/components/layout/WorkflowCard';
import { ActivityFeed } from '@/components/layout/ActivityFeed';
import { mockWorkflows, mockActivities } from '@/lib/mock-data';

export default function DashboardPage() {
  const activeCount = mockWorkflows.filter((w) => w.status === 'active').length;
  const totalCount = mockWorkflows.length;

  return (
    <div className={styles.page}>
      {/* ── Ambient background ── */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGradient} aria-hidden="true" />

      {/* ── Page Header ── */}
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.headerContent}>
          <div className={styles.greeting}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>
              Welcome back. Here&apos;s what&apos;s happening across your legal operations.
            </p>
          </div>

          <div className={styles.headerMeta}>
            <div className={styles.clock}>
              <span className={styles.clockLabel}>Jakarta</span>
              <span className={styles.clockTime}>{currentTime()}</span>
              <span className={styles.clockDate}>{currentDate()}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Section 1: Workflow Hub ── */}
      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.sectionTitleGroup}>
            <h2 className={styles.sectionTitle}>Workflows</h2>
            <span className={styles.sectionCount}>
              <span className={styles.sectionCountActive}>{activeCount}</span>
              <span className={styles.sectionCountSeparator}>/</span>
              <span className={styles.sectionCountTotal}>{totalCount}</span>
            </span>
          </div>
          <p className={styles.sectionSubtitle}>
            Navigate between legal operations workflows
          </p>
        </motion.div>

        {/* 2x3 grid */}
        <div className={styles.workflowGrid}>
          {mockWorkflows.map((workflow, index) => (
            <WorkflowCard key={workflow.id} workflow={workflow} index={index} />
          ))}
        </div>
      </section>

      {/* ── Section 2: Activity Feed ── */}
      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.sectionTitleGroup}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <span className={styles.activityBadge}>
              <span className={styles.activityDot} />
              Live
            </span>
          </div>
          <p className={styles.sectionSubtitle}>
            Latest actions across your workspace
          </p>
        </motion.div>

        <motion.div
          className={styles.activityCard}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ActivityFeed activities={mockActivities} />
        </motion.div>
      </section>

      {/* ── Bottom spacing ── */}
      <div className={styles.bottomSpacer} />
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function currentTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function currentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Jakarta',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
