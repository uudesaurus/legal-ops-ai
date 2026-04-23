'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { FogLayers } from './FogLayers';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.shellLoading}>
        <div className={styles.loadingOrb} />
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <FogLayers />
      <div className={styles.grainOverlay} aria-hidden="true" />

      <TopBar
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className={styles.main}>
        <Sidebar collapsed={sidebarCollapsed} />
        <main className={`${styles.content} ${sidebarCollapsed ? styles.contentExpanded : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
