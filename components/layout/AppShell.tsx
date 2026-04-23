'use client';

import { useState, useEffect } from 'react';
import { NewSidebar } from './NewSidebar';
import { TopBar } from './TopBar';
import { FogLayers } from './FogLayers';
import { ToastProvider } from '@/contexts/ToastContext';
import { Toast } from '@/components/features/Toast';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-collapse on mobile
    const checkMobile = () => {
      if (window.innerWidth < 769) {
        setSidebarCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.shellLoading}>
        <div className={styles.loadingDots}>
          <div className={styles.loadingDot} />
          <div className={styles.loadingDot} />
          <div className={styles.loadingDot} />
        </div>
        <span className={styles.loadingText}>Loading</span>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <FogLayers />
      <div className={styles.grainOverlay} aria-hidden="true" />
      <ToastProvider>
        <Toast />
      </ToastProvider>

      <TopBar
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => {
          if (window.innerWidth < 769) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setSidebarCollapsed(!sidebarCollapsed);
          }
        }}
      />

      <div className={styles.main}>
        {/* Desktop sidebar */}
        <div className={`${styles.desktopSidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
          <NewSidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile overlay */}
        {mobileSidebarOpen && (
          <div
            className={styles.mobileOverlay}
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar drawer */}
        <div className={`${styles.mobileSidebar} ${mobileSidebarOpen ? styles.mobileSidebarOpen : ''}`}>
          <NewSidebar
            collapsed={false}
            onToggle={() => setMobileSidebarOpen(false)}
          />
        </div>

        <main className={`${styles.content} ${sidebarCollapsed ? styles.contentExpanded : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
