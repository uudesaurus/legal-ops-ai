'use client';

import styles from './TopBar.module.css';

interface TopBarProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export function TopBar({ collapsed, onToggleSidebar }: TopBarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onToggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="1" rx="0.5" fill="currentColor" />
            <rect x="2" y="7.5" width="9" height="1" rx="0.5" fill="currentColor" />
            <rect x="2" y="12" width="12" height="1" rx="0.5" fill="currentColor" />
          </svg>
        </button>

        <div className={styles.logo}>
          <LogoMark />
          <span className={styles.logoText}>UBO</span>
          <span className={styles.logoSub}>Analyzer</span>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.statusIndicator}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Telegram Bot Active</span>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Settings">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className={styles.iconBtn} aria-label="Help">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M6.5 6.5a1.5 1.5 0 0 1 3 0c0 .8-.5 1.2-1.5 1.8-.6.4-1 1-1 1.7h-2a2 2 0 0 1 2-2z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="12" r="0.6" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.logoMark}>
      <rect width="24" height="24" rx="5" fill="var(--surface)" />
      <path
        d="M6 8h12M6 12h8M6 16h10"
        stroke="var(--text-primary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="19" cy="14" r="2" fill="var(--accent-warm)" opacity="0.7" />
    </svg>
  );
}
