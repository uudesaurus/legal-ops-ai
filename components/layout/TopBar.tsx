'use client';

import { useState, useEffect } from 'react';
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
          <LogoMark />
          <div className={styles.logoText}>
            <span className={styles.logoMain}>UBO</span>
            <span className={styles.logoSub}>Analyzer</span>
          </div>
        </div>
      </div>

      {/* Right: KARNA + Theme toggle */}
      <div className={styles.right}>
        <KarnaLogo />
        <div className={styles.divider} />
        <button
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {mounted && (darkMode ? <SunIcon /> : <MoonIcon />)}
        </button>
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
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={styles.logoMark}>
      <rect width="28" height="28" rx="6" fill="var(--surface-elevated)" />
      <rect x="1" y="1" width="26" height="26" rx="5" stroke="var(--border)" strokeWidth="1" />
      <path d="M7 9h14M7 14h10M7 19h12" stroke="var(--text-primary)" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="22" cy="16" r="2.5" fill="var(--accent-warm)" opacity="0.8" />
    </svg>
  );
}

function KarnaLogo() {
  return (
    <div className={styles.karnaLogo}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.karnaMark}>
        <rect width="24" height="24" rx="5" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="12" y="16" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="Space Mono, monospace" fontWeight="700" letterSpacing="0.5">K</text>
      </svg>
      <span className={styles.karnaName}>KARNA</span>
    </div>
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
