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
          <span className={styles.headerLabel}>Analyses</span>
        )}
        <button className={styles.newBtn} aria-label="New analysis">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {!collapsed && <span>New</span>}
        </button>
      </div>

      <nav className={styles.nav}>
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
            <span>Legal Ops AI</span>
          </div>
        </div>
      )}
    </aside>
  );
}
