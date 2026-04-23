"use client";

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './admin-layout.module.css';

// Admin sub-navigation
const adminNav = [
  {
    label: 'Users',
    href: '/admin/users',
    badge: null,
    comingSoon: false,
  },
  {
    label: 'Settings',
    href: '/settings',
    badge: null,
    comingSoon: false,
  },
  {
    label: 'Audit Log',
    href: '/admin/audit',
    badge: 'Soon',
    comingSoon: true,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.adminLayout}>
      {/* Narrow admin sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect width="20" height="20" rx="4" fill="var(--surface-elevated)" stroke="var(--border)" strokeWidth="1" />
              <path d="M5 6h10M5 10h7M5 14h8" stroke="var(--text-primary)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className={styles.sidebarTitle}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {adminNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.comingSoon ? '#' : item.href}
                className={`${styles.navItem} ${isActive && !item.comingSoon ? styles.navItemActive : ''} ${item.comingSoon ? styles.navItemComingSoon : ''}`}
                onClick={(e) => item.comingSoon && e.preventDefault()}
              >
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge && (
                  <span className={styles.navBadge}>{item.badge}</span>
                )}
                {isActive && !item.comingSoon && (
                  <motion.span
                    className={styles.activeIndicator}
                    layoutId="admin-nav-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/dashboard" className={styles.backLink}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
