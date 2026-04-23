'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './settings.module.css';

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('karna-theme');
  return stored === null ? true : stored === 'dark';
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('karna-theme', next ? 'dark' : 'light');
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage your account preferences and platform information</p>
      </motion.div>

      {/* Profile Section */}
      <motion.section
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleRow}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 12c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <h2 className={styles.cardTitle}>Profile</h2>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.profileRow}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                <span className={styles.avatarText}>AS</span>
              </div>
              <div className={styles.avatarBadge}>Admin</div>
            </div>
            <div className={styles.profileFields}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Display Name</label>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    defaultValue="Alvin Saptamandra"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Email</label>
                  <input
                    type="email"
                    className={styles.fieldInput}
                    defaultValue="alvin@karnapartnership.com"
                    readOnly
                  />
                  <span className={styles.fieldNote}>Managed by your organization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Preferences Section */}
      <motion.section
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleRow}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7 5.5 5.5 0 0 1 7 12.5 5.5 5.5 0 0 1 1.5 7 5.5 5.5 0 0 1 7 1.5z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className={styles.cardTitle}>Preferences</h2>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.toggleList}>
            {/* Theme */}
            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>Dark Mode</span>
                <span className={styles.toggleDesc}>Switch between dark and light theme</span>
              </div>
              <button
                className={`${styles.toggle} ${darkMode ? styles.toggleOn : styles.toggleOff}`}
                onClick={toggleTheme}
                role="switch"
                aria-checked={darkMode}
              >
                <motion.span
                  className={styles.toggleThumb}
                  animate={{ x: darkMode ? 20 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Email notifications — coming soon */}
            <div className={`${styles.toggleItem} ${styles.toggleItemDisabled}`}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>
                  Email Notifications
                  <span className={styles.comingSoonPill}>Coming soon</span>
                </span>
                <span className={styles.toggleDesc}>Receive email updates for workflow events</span>
              </div>
              <div className={`${styles.toggle} ${styles.toggleOff}`}>
                <span className={styles.toggleThumb} />
              </div>
            </div>

            {/* Desktop notifications — coming soon */}
            <div className={`${styles.toggleItem} ${styles.toggleItemDisabled}`}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>
                  Desktop Notifications
                  <span className={styles.comingSoonPill}>Coming soon</span>
                </span>
                <span className={styles.toggleDesc}>Show browser notifications for real-time updates</span>
              </div>
              <div className={`${styles.toggle} ${styles.toggleOff}`}>
                <span className={styles.toggleThumb} />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Account Section */}
      <motion.section
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleRow}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <h2 className={styles.cardTitle}>Account</h2>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.accountActions}>
            <button className={styles.signOutBtn}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 7h7M9 4l3 3-3 3M12 7H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sign Out
            </button>
            <button className={styles.deleteAccountBtn}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 4h8M5.5 4V3h3v1M5 4.5v7h4v-7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      </motion.section>

      {/* Platform Info */}
      <motion.section
        className={styles.platformInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className={styles.platformLinks}>
          <a href="#" className={styles.platformLink}>Documentation</a>
          <span className={styles.platformDot} />
          <a href="#" className={styles.platformLink}>Support</a>
          <span className={styles.platformDot} />
          <a href="#" className={styles.platformLink}>Terms</a>
          <span className={styles.platformDot} />
          <a href="#" className={styles.platformLink}>Privacy</a>
        </div>
        <div className={styles.versionInfo}>
          <span className={styles.versionLabel}>KARNA Legal Ops</span>
          <span className={styles.versionDot} />
          <span className={styles.versionValue}>v0.1.0</span>
          <span className={styles.versionDot} />
          <span className={styles.versionBuild}>build 2026.04.23</span>
        </div>
      </motion.section>
    </div>
  );
}
