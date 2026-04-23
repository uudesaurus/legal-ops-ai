'use client';

import { useState, useCallback, use } from 'react';
import { motion } from 'framer-motion';
import styles from '../page.module.css';
import { NewMatterModal } from '@/components/features/NewMatterModal';
import { MatterDocumentZone } from '@/components/features/MatterDocumentZone';
import { UBOReport } from '@/components/features/UBOReport';
import { ProcessingState } from '@/components/features/ProcessingState';
import { mockMatters, matterTypeColors, getMatterById, type Matter, type MatterType } from '@/lib/mock-data';

type Tab = 'analyses' | 'documents' | 'activity';

export default function MatterDetailPage({
  params,
}: {
  params: Promise<{ matterId: string }>;
}) {
  const { matterId } = use(params);
  const [matters, setMatters] = useState<Matter[]>(mockMatters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('analyses');
  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);

  const matter = getMatterById(matterId) || null;

  const handleNewAnalysis = useCallback(() => {
    setRunningAnalysis(true);
    setShowReport(false);
    setSelectedAnalysisId(null);
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setRunningAnalysis(false);
    setShowReport(true);
  }, []);

  const handleAnalysisBack = useCallback(() => {
    setRunningAnalysis(false);
    setShowReport(false);
    setSelectedAnalysisId(null);
  }, []);

  const handleViewAnalysis = useCallback((analysisId: string) => {
    setSelectedAnalysisId(analysisId);
    setRunningAnalysis(false);
    setShowReport(true);
  }, []);

  if (!matter) {
    return (
      <div className={styles.page}>
        <main className={styles.rightColumn}>
          <div className={styles.noSelection}>
            <div className={styles.noSelectionBg}>
              <div className={styles.noSelectionOrb} />
            </div>
            <div className={styles.noSelectionContent}>
              <div className={styles.noSelectionIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
                  <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
                </svg>
              </div>
              <h3 className={styles.noSelectionTitle}>Matter not found</h3>
              <p className={styles.noSelectionText}>
                The matter you are looking for does not exist or has been removed.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Left Column — simplified: back to list */}
      <aside className={styles.leftColumn}>
        <div className={styles.leftHeader}>
          <div className={styles.leftTitle}>
            <span className={styles.leftTitleText}>Matter</span>
          </div>
        </div>
        <div className={styles.matterList}>
          <div className={styles.emptyMatters}>
            <a href="/workflows/ubo" className={styles.noMattersState} style={{ textDecoration: 'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)' }}>
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Back to all matters</p>
            </a>
          </div>
        </div>
      </aside>

      {/* Right Column — Matter Detail */}
      <main className={styles.rightColumn}>
        {runningAnalysis ? (
          <div className={styles.analysisView}>
            <ProcessingState
              fileName={`${matter.name} — ${matter.client}`}
              onComplete={handleAnalysisComplete}
            />
            {showReport && (
              <div className={styles.analysisReport}>
                <UBOReport onExport={() => {}} />
              </div>
            )}
            <div className={styles.analysisFloatingBar}>
              <button className={styles.saveCloseBtn} onClick={handleAnalysisBack}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Save & Close
              </button>
            </div>
          </div>
        ) : showReport ? (
          <div className={styles.reportView}>
            <UBOReport onExport={() => {}} />
            <div className={styles.reportFloatingBar}>
              <button className={styles.saveCloseBtn} onClick={handleAnalysisBack}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Save & Close
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.matterDetail}>
            {/* Matter Header */}
            <div className={styles.matterHeader}>
              <div className={styles.matterHeaderTop}>
                <div className={styles.matterHeaderLeft}>
                  <h1 className={styles.matterName}>{matter.name}</h1>
                  <div className={styles.matterMeta}>
                    <span className={styles.matterClient}>{matter.client}</span>
                    <span className={styles.metaDot}>·</span>
                    <span
                      className={styles.typeBadge}
                      style={{
                        background: matterTypeColors[matter.type].bg,
                        color: matterTypeColors[matter.type].text,
                        borderColor: matterTypeColors[matter.type].border,
                      }}
                    >
                      {matter.type}
                    </span>
                    <span className={styles.metaDot}>·</span>
                    <span className={styles.matterDate}>Created {matter.createdDate}</span>
                  </div>
                </div>
                <div className={styles.matterHeaderRight}>
                  <motion.button
                    className={styles.newAnalysisBtn}
                    onClick={handleNewAnalysis}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    New Analysis
                  </motion.button>
                </div>
              </div>
              {matter.description && (
                <p className={styles.matterDescription}>{matter.description}</p>
              )}
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
              {(['analyses', 'documents', 'activity'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'analyses' && matter.analyses.length > 0 && (
                    <span className={styles.tabCount}>{matter.analyses.length}</span>
                  )}
                  {tab === 'documents' && matter.documents.length > 0 && (
                    <span className={styles.tabCount}>{matter.documents.length}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
              <div className={styles.tabPanel}>
                {activeTab === 'analyses' && (
                  matter.analyses.length === 0 ? (
                    <div className={styles.emptyTab}>
                      <div className={styles.emptyTabIcon}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <rect x="6" y="6" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.3" />
                          <path d="M20 14v12M14 20h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
                        </svg>
                      </div>
                      <h4 className={styles.emptyTabTitle}>No analyses yet</h4>
                      <p className={styles.emptyTabText}>Upload AHU documents and run a UBO analysis for this matter.</p>
                      <button className={styles.emptyTabBtn} onClick={handleNewAnalysis}>
                        Start Analysis
                      </button>
                    </div>
                  ) : (
                    <div className={styles.analysisGrid}>
                      {matter.analyses.map((analysis, i) => (
                        <motion.button
                          key={analysis.id}
                          className={styles.analysisCard}
                          onClick={() => handleViewAnalysis(analysis.id)}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.3 }}
                          whileHover={{ y: -2 }}
                        >
                          <div className={styles.analysisCardHeader}>
                            <span className={`${styles.statusDot} ${styles[`status_${analysis.status.toLowerCase()}`]}`} />
                            <span className={`${styles.statusBadge} ${styles[`badge_${analysis.status.toLowerCase()}`]}`}>
                              {analysis.status}
                            </span>
                          </div>
                          <h4 className={styles.analysisCardName}>{analysis.name}</h4>
                          <div className={styles.analysisCardMeta}>
                            <span className={styles.metaItem}>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1" />
                                <path d="M3.5 4h5M3.5 6h3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                              </svg>
                              {analysis.date}
                            </span>
                            <span className={styles.metaItem}>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1" />
                                <circle cx="2.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1" />
                                <circle cx="9.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1" />
                              </svg>
                              {analysis.uboCount} UBOs
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )
                )}

                {activeTab === 'documents' && (
                  <MatterDocumentZone
                    documents={matter.documents}
                    onDocumentsChange={(docs) => {
                      setMatters((prev) =>
                        prev.map((m) => (m.id === matter.id ? { ...m, documents: docs } : m))
                      );
                    }}
                  />
                )}

                {activeTab === 'activity' && (
                  (() => {
                    type Activity = { id: string; user: string; initials: string; action: string; timestamp: string; date: string };
                    const grouped = matter.activities.reduce<Record<string, Activity[]>>((acc, item) => {
                      if (!acc[item.date]) acc[item.date] = [];
                      acc[item.date].push(item);
                      return acc;
                    }, {});

                    return Object.entries(grouped).map(([date, items]: [string, Activity[]]) => (
                      <div key={date} className={styles.activityGroup}>
                        <p className={styles.activityDateLabel}>{date}</p>
                        <div className={styles.activityTimeline}>
                          {items.map((item: Activity, i: number) => (
                            <motion.div
                              key={item.id}
                              className={styles.activityItem}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                            >
                              <div className={styles.activityAvatar}>
                                {item.initials}
                              </div>
                              <div className={styles.activityContent}>
                                <div className={styles.activityHeader}>
                                  <span className={styles.activityUser}>{item.user}</span>
                                  <span className={styles.activityTime}>{item.timestamp}</span>
                                </div>
                                <p className={styles.activityAction}>{item.action}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* New Matter Modal */}
      <NewMatterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
}
