'use client';

import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import styles from './TopBar.module.css';

interface TopBarProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export function TopBar({ collapsed, onToggleSidebar }: TopBarProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('karna-theme');
    const isDark = stored === null ? true : stored === 'dark';
    setDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('karna-theme', next ? 'dark' : 'light');
  };

  return (
    <header className={styles.topbar}>
      {/* Left: Menu + Logo */}
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
          <div className={styles.karnaLogo}>
            <span className={styles.karnaName}>KARNA</span>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>Legal Ops</span>
            <span className={styles.logoSub}>Agent</span>
          </div>
        </div>
      </div>

      {/* Right: Theme toggle */}
      <div className={styles.right}>
        <div className={styles.divider} />

        {/* Notification bell */}
        <button className={styles.iconBtn} aria-label="Notifications" title="Notifications">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2C6.9 2 6 2.9 6 4V4.29L4.7 5.59C4.09 6.21 3.75 7.02 3.75 7.88V10.5C3.75 11.88 4.87 13 6.25 13H9.75C11.13 13 12.25 11.88 12.25 10.5V7.88C12.25 7.02 11.91 6.21 11.3 5.59L10 4.29V4C10 2.9 9.1 2 8 2Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 13C7 13.55 7.45 14 8 14C8.55 14 9 13.55 9 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className={styles.notificationBadge}>3</span>
        </button>

        <button
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {mounted && (darkMode ? <SunIcon /> : <MoonIcon />)}
        </button>

        {/* UserButton */}
        <div className={styles.userButtonWrapper}>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: '28px', height: '28px' },
              },
            }}
          />
        </div>

        {/* Role badge */}
        <span className={styles.roleBadge}>Admin</span>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
