'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ComingSoon.module.css';

interface ComingSoonProps {
  title: string;
  description: string;
  features: string[];
  estimatedQuarter?: string;
  workflowIcon: 'document' | 'shield' | 'building' | 'radar';
  backUrl?: string;
}

export function ComingSoon({
  title,
  description,
  features,
  estimatedQuarter = 'Q3 2026',
  workflowIcon,
  backUrl = '/dashboard',
}: ComingSoonProps) {
  const [email, setEmail] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setNotifyOpen(false);
      setSubmitted(false);
      setEmail('');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      {/* Animated background grid */}
      <div className={styles.gridBg} aria-hidden="true" />
      {/* Floating particles */}
      <FloatingParticles />
      {/* Radial gradient overlay */}
      <div className={styles.radialOverlay} aria-hidden="true" />

      <div className={styles.content}>
        {/* Back link */}
        <motion.a
          href={backUrl}
          className={styles.backLink}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to dashboard
        </motion.a>

        {/* Main card */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top edge glow */}
          <div className={styles.cardGlow} />

          {/* Animated icon */}
          <motion.div
            className={styles.iconWrapper}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <WorkflowIcon type={workflowIcon} />
          </motion.div>

          {/* Coming soon badge */}
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4, type: 'spring' }}
          >
            <span className={styles.badgeDot} />
            Coming Soon
          </motion.div>

          {/* Title */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {description}
          </motion.p>

          {/* Timeline badge */}
          <motion.div
            className={styles.timelineBadge}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
              <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            Estimated: {estimatedQuarter}
          </motion.div>

          {/* Feature list */}
          <motion.div
            className={styles.features}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className={styles.featuresLabel}>What&apos;s coming</div>
            <ul className={styles.featureList}>
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  className={styles.featureItem}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                >
                  <span className={styles.featureDot} />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.4 }}
          >
            <button
              className={styles.notifyBtn}
              onClick={() => setNotifyOpen(true)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v1M7 12v1M1 7h1M12 7h1M2.93 2.93l.7.7M10.37 10.37l.7.7M2.93 11.07l.7-.7M10.37 3.63l.7-.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Get notified when it launches
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          className={styles.bottomDecor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className={styles.decorLine} />
          <div className={styles.decorDot} />
          <div className={styles.decorLine} />
        </motion.div>

        {/* Side decorations */}
        <motion.div
          className={styles.sideDecor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <span className={styles.sideLabel}>KARNA</span>
          <span className={styles.sideLabel}>Legal Ops</span>
        </motion.div>
      </div>

      {/* Email capture modal */}
      <AnimatePresence>
        {notifyOpen && (
          <>
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotifyOpen(false)}
            />
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className={styles.modalClose}
                onClick={() => setNotifyOpen(false)}
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>

              <div className={styles.modalIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 8h24v16H4z" stroke="var(--accent-warm)" strokeWidth="1.2" rx="2" />
                  <path d="M4 8l12 10 12-10" stroke="var(--accent-warm)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {submitted ? (
                <motion.div
                  className={styles.modalSuccess}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="var(--success)" strokeWidth="1.5" />
                    <path d="M7 12l3.5 3.5 6.5-7" stroke="var(--success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>You&apos;re on the list! We&apos;ll be in touch.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className={styles.modalTitle}>Be the first to know</h3>
                  <p className={styles.modalDesc}>
                    Get early access when {title} launches. No spam, just one email.
                  </p>
                  <form className={styles.modalForm} onSubmit={handleNotify}>
                    <input
                      type="email"
                      className={styles.emailInput}
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className={styles.submitBtn}>
                      Notify me
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function WorkflowIcon({ type }: { type: ComingSoonProps['workflowIcon'] }) {
  switch (type) {
    case 'document':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {/* Document base */}
          <rect x="14" y="8" width="36" height="44" rx="4" stroke="var(--text-primary)" strokeWidth="1.5" fill="var(--surface-elevated)" />
          {/* Corner fold */}
          <path d="M38 8v12h12" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="var(--surface-hover)" />
          <path d="M38 8l12 12H38V8z" fill="var(--border)" />
          {/* Checkmark */}
          <circle cx="32" cy="36" r="12" fill="var(--surface)" stroke="var(--success)" strokeWidth="1.2" />
          <path d="M26 36l4 4 8-8" stroke="var(--success)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Text lines */}
          <path d="M22 18h20M22 24h14M22 28h16" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {/* Shield */}
          <path d="M32 8L12 16v16c0 10 8.5 17.5 20 22 11.5-4.5 20-12 20-22V16L32 8z" stroke="var(--text-primary)" strokeWidth="1.5" fill="var(--surface-elevated)" rx="4" />
          {/* Magnifier inside shield */}
          <circle cx="32" cy="30" r="10" stroke="var(--accent-cool)" strokeWidth="1.5" fill="var(--surface)" />
          <path d="M40 38l6 6" stroke="var(--accent-cool)" strokeWidth="2" strokeLinecap="round" />
          {/* Scan line */}
          <path d="M22 26h20" stroke="var(--accent-cool)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case 'building':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {/* Main building */}
          <rect x="16" y="20" width="24" height="36" rx="2" stroke="var(--text-primary)" strokeWidth="1.5" fill="var(--surface-elevated)" />
          {/* Windows grid */}
          <rect x="20" y="24" width="4" height="4" rx="0.5" fill="var(--accent-warm)" opacity="0.8" />
          <rect x="28" y="24" width="4" height="4" rx="0.5" fill="var(--accent-warm)" opacity="0.6" />
          <rect x="36" y="24" width="4" height="4" rx="0.5" fill="var(--border)" />
          <rect x="20" y="32" width="4" height="4" rx="0.5" fill="var(--border)" />
          <rect x="28" y="32" width="4" height="4" rx="0.5" fill="var(--accent-warm)" opacity="0.7" />
          <rect x="36" y="32" width="4" height="4" rx="0.5" fill="var(--accent-warm)" opacity="0.5" />
          <rect x="20" y="40" width="4" height="4" rx="0.5" fill="var(--accent-warm)" opacity="0.4" />
          <rect x="28" y="40" width="4" height="4" rx="0.5" fill="var(--border)" />
          <rect x="36" y="40" width="4" height="4" rx="0.5" fill="var(--accent-warm)" opacity="0.6" />
          {/* Tree structure lines */}
          <path d="M8 56v-8" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
          <path d="M8 48L16 40" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
          <path d="M8 48L16 48" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
          <path d="M56 56v-8" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
          <path d="M56 48L48 40" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
          <path d="M56 48L48 48" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
          {/* Ground */}
          <path d="M8 56h48" stroke="var(--border)" strokeWidth="1" strokeLinecap="round" />
          {/* Door */}
          <rect x="24" y="46" width="8" height="10" rx="1" fill="var(--surface-hover)" stroke="var(--border)" strokeWidth="0.8" />
        </svg>
      );
    case 'radar':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {/* Radar circles */}
          <circle cx="32" cy="32" r="26" stroke="var(--border)" strokeWidth="1" />
          <circle cx="32" cy="32" r="20" stroke="var(--border)" strokeWidth="1" opacity="0.7" />
          <circle cx="32" cy="32" r="14" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
          <circle cx="32" cy="32" r="8" stroke="var(--border)" strokeWidth="1" opacity="0.3" />
          <circle cx="32" cy="32" r="3" fill="var(--accent-cool)" />
          {/* Radar sweep — animated via CSS */}
          <path d="M32 32L32 6" stroke="var(--accent-cool)" strokeWidth="1.5" strokeLinecap="round" className={styles.radarSweep} />
          {/* Blips */}
          <circle cx="44" cy="20" r="2" fill="var(--success)" className={styles.blip1} />
          <circle cx="18" cy="38" r="2" fill="var(--success)" className={styles.blip2} />
          <circle cx="38" cy="46" r="1.5" fill="var(--warning)" className={styles.blip3} />
          <circle cx="52" cy="34" r="1.5" fill="var(--text-muted)" className={styles.blip4} />
          {/* Cross hairs */}
          <path d="M32 2v8M32 54v8M2 32h8M54 32h8" stroke="var(--border)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        </svg>
      );
  }
}

function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <div className={styles.particles} aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
