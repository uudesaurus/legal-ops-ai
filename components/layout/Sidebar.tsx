'use client';

import { useState } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  collapsed: boolean;
}

// Mock history data
const mockHistory = [
  {
    id: '1',
    companyName: 'PT Ekacitta Dian Pertiwi',
    preparedFor: 'Darin Putra Bagaskara',
    date: '17 Apr 2026',
    status: 'ready' as const,
    uboCount: 6,
  },
  {
    id: '2',
    companyName: 'PT Wijaya Karya',
    preparedFor: 'Sarah Wijaya',
    date: '15 Apr 2026',
    status: 'ready' as const,
    uboCount: 4,
  },
  {
    id: '3',
    companyName: 'PT Semen Indonesia',
    preparedFor: 'Ahmad Hidayat',
    date: '12 Apr 2026',
    status: 'processing' as const,
    uboCount: 0,
  },
];

export function Sidebar({ collapsed }: SidebarProps) {
  const [activeId, setActiveId] = useState<string | null>('1');

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        {!collapsed && (
          <span className={styles.headerLabel}>Navigation</span>
        )}
        <button className={styles.newBtn} aria-label="New analysis">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {!collapsed && <span>New</span>}
        </button>
      </div>

      <nav className={styles.nav}>
        {/* Workflow nav */}
        <div className={styles.navSection}>
          <a href="/" className={`${styles.navItem} ${activeId === 'dashboard' ? styles.active : ''}`} onClick={() => setActiveId('dashboard')}>
            <span className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
              </svg>
            </span>
            <span className={styles.navLabel}>Dashboard</span>
          </a>
          <a href="/ubo" className={`${styles.navItem} ${activeId === 'ubo' ? styles.active : ''}`} onClick={() => setActiveId('ubo')}>
            <span className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2L2 4.5v4c0 3 2.5 5.5 5 7 2.5-1.5 5-4 5-7v-4L7 2z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.navLabel}>UBO Analyzer</span>
          </a>
        </div>

        {!collapsed ? (
          <div className={styles.list}>
            {mockHistory.map((item, i) => (
              <button
                key={item.id}
                className={`${styles.historyItem} ${activeId === item.id ? styles.active : ''}`}
                onClick={() => setActiveId(item.id)}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={styles.itemIcon}>
                  {item.status === 'ready' ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1" />
                      <path d="M3.5 6l2 2 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div className={styles.processingDot} />
                  )}
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemName}>{item.companyName}</span>
                  <span className={styles.itemMeta}>
                    {item.status === 'ready' ? `${item.uboCount} UBOs · ${item.date}` : 'Processing...'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.collapsedIcons}>
            {mockHistory.map((item) => (
              <button
                key={item.id}
                className={`${styles.collapsedItem} ${activeId === item.id ? styles.active : ''}`}
                aria-label={item.companyName}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1" />
                  <path d="M3.5 4.5h7M3.5 7h5M3.5 9.5h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </nav>

      {!collapsed && (
        <div className={styles.footer}>
          <div className={styles.footerSection}>
            <span className={styles.footerLabel}>Quick Reference</span>
            <a href="#" className={styles.footerLink}>AHU Document Guide</a>
            <a href="#" className={styles.footerLink}>UBO Threshold Rules</a>
            <a href="#" className={styles.footerLink}>Methodology Notes</a>
          </div>
          <div className={styles.version}>
            <span>v0.1.0</span>
            <span className={styles.versionDot} />
            <span>KARNA Dashboard</span>
          </div>
        </div>
      )}
    </aside>
  );
}
