'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserButton, useUser } from '@clerk/nextjs';
import { useClerk } from '@clerk/react';
import styles from './NewSidebar.module.css';

// ─── Icon Components ─────────────────────────────────────────────────────────

function KarnaLogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="var(--surface)" />
      <rect x="0.5" y="0.5" width="27" height="27" rx="5.5" stroke="var(--border)" />
      <text x="14" y="19" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontFamily="Space Mono, monospace" fontWeight="700">K</text>
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 7.5L9 2.5L15 7.5V15.5H11V10.5H7V15.5H3V7.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L16 6L9 10L2 6L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9L9 13L16 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M2 12L9 16L16 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M10 2H5C4.17 2 3.5 2.67 3.5 3.5V14.5C3.5 15.33 4.17 16 5 16H13C13.83 16 14.5 15.33 14.5 14.5V6L10 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 2V6H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10H12M6 12.5H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L3 4.5V9C3 12.87 5.63 16.26 9 17C12.37 16.26 15 12.87 15 9V4.5L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9L8 10.5L11.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="3" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 7H12M6 10H12M6 13H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="6" y="4.5" width="2.5" height="2" rx="0.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <circle cx="9" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 2V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12.12 4.88L13.54 6.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M15 7H16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
      <path d="M9 6.5V11.5M6.5 9H11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L11 5H5L8 2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <rect x="3" y="5" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5.5 12V13.5H10.5V12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="6.5" cy="8.5" r="0.75" fill="currentColor" />
      <circle cx="9.5" cy="8.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 14H3C2.45 14 2 13.55 2 13V3C2 2.45 2.45 2 3 2H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 11L14 8L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Icon map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeIcon />,
  cascade: <LayersIcon />,
  document: <DocumentIcon />,
  shield: <ShieldIcon />,
  building: <BuildingIcon />,
  radar: <RadarIcon />,
  plus: <PlusIcon />,
};

// ─── Nav Items ───────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  iconKey: string;
  href: string;
  status: 'active' | 'coming-soon';
  badge?: string;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    iconKey: 'home',
    href: '/dashboard',
    status: 'active',
  },
  {
    id: 'ubo',
    label: 'UBO — Ultimate Beneficial Owner',
    iconKey: 'cascade',
    href: '/workflows/ubo',
    status: 'active',
    badge: 'Active',
  },
  {
    id: 'contract-review',
    label: 'Contract Review',
    iconKey: 'document',
    href: '/workflows/contract-review',
    status: 'coming-soon',
    badge: 'Coming Soon',
  },
  {
    id: 'due-diligence',
    label: 'Due Diligence',
    iconKey: 'shield',
    href: '/workflows/due-diligence',
    status: 'coming-soon',
    badge: 'Coming Soon',
  },
  {
    id: 'entity-management',
    label: 'Entity Management',
    iconKey: 'building',
    href: '/workflows/entity-management',
    status: 'coming-soon',
    badge: 'Coming Soon',
  },
  {
    id: 'compliance-monitor',
    label: 'Compliance Monitor',
    iconKey: 'radar',
    href: '/workflows/compliance-monitor',
    status: 'coming-soon',
    badge: 'Coming Soon',
  },
];

// ─── Divider index: between index 1 (dashboard) and 2 (ubo) ────────────────
const DIVIDER_AFTER = 1;

// ─── Component ───────────────────────────────────────────────────────────────

interface NewSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function NewSidebar({ collapsed, onToggle }: NewSidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: '/login' });
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* ── Top: Logo + Branding ── */}
      <div className={styles.brandArea}>
        <Link href="/dashboard" className={styles.brand}>
          <KarnaLogoMark />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                className={styles.brandText}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <span className={styles.brandName}>KARNA</span>
                <span className={styles.brandVersion}>v0.1.0</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        <button
          className={styles.collapseBtn}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ExpandIcon /> : <CollapseIcon />}
        </button>
      </div>

      <div className={styles.divider} />

      {/* ── Navigation ── */}
      <nav className={styles.nav}>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              className={styles.navSectionLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Navigation
            </motion.span>
          )}
        </AnimatePresence>

        <div className={styles.navList}>
          {navItems.map((item, index) => {
            const active = isActive(item.href);
            const isComingSoon = item.status === 'coming-soon';
            const showDivider = index === DIVIDER_AFTER;

            return (
              <div key={item.id}>
                {showDivider && !collapsed && <div className={styles.navDivider} />}

                <AnimatePresence mode="wait">
                  {!collapsed && showDivider && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={styles.navDivider}
                    />
                  )}
                </AnimatePresence>

                <div
                  className={`
                    ${styles.navItem}
                    ${active && !isComingSoon ? styles.navItemActive : ''}
                    ${isComingSoon ? styles.navItemComingSoon : ''}
                  `}
                >
                  {isComingSoon ? (
                    <div className={styles.navItemInner}>
                      <span className={styles.navIcon}>
                        {iconMap[item.iconKey]}
                      </span>
                      {!collapsed && (
                        <span className={styles.navLabel}>{item.label}</span>
                      )}
                      {!collapsed && item.badge && (
                        <span className={styles.navBadge}>{item.badge}</span>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={styles.navItemLink}
                    >
                      <span className={styles.navIcon}>
                        {iconMap[item.iconKey]}
                      </span>
                      {!collapsed && (
                        <>
                          <span className={styles.navLabel}>{item.label}</span>
                          {item.badge && (
                            <span className={styles.navBadge}>{item.badge}</span>
                          )}
                          {item.status === 'active' && (
                            <span className={styles.activeDot} />
                          )}
                        </>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* ── Bottom: User + Actions ── */}
      <div className={styles.bottom}>
        <div className={styles.divider} />

        {/* Settings & Admin links */}
        <div className={styles.bottomLinks}>
          <Link href="/settings" className={styles.bottomLink}>
            <SettingsIcon />
            {!collapsed && <span>Settings</span>}
          </Link>
          {/* Admin link — visible to admins. Using mock for now. */}
          <Link href="/admin" className={styles.bottomLink}>
            <AdminIcon />
            {!collapsed && <span>Admin</span>}
          </Link>
        </div>

        <div className={styles.divider} />

        {/* User area */}
        <div className={styles.userArea}>
          <div className={styles.userButtonWrapper}>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: { width: '32px', height: '32px' },
                },
              }}
            />
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                className={styles.userInfo}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <span className={styles.userName}>
                  {user?.fullName || 'Team Member'}
                </span>
                <span className={styles.userRole}>Admin</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sign out */}
        <button className={styles.signOutBtn} onClick={handleSignOut}>
          <SignOutIcon />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
