'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { NewMatterModal } from '@/components/features/NewMatterModal';
import { MatterDocumentZone } from '@/components/features/MatterDocumentZone';
import { UBOFlow } from '@/components/features/UBOFlow';
import { UBOReport } from '@/components/features/UBOReport';
import { ProcessingState } from '@/components/features/ProcessingState';
import { mockMatters, matterTypeColors, type Matter, type MatterType } from '@/lib/mock-data';

type Tab = 'analyses' | 'documents' | 'activity';

export default function UBOWorkflowPage() {
  const [matters, setMatters] = useState<Matter[]>(mockMatters);
  const [selectedMatterId, setSelectedMatterId] = useState<string | null>('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('analyses');
  const [searchQuery, setSearchQuery] = useState('');
  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);

  const selectedMatter = matters.find((m) => m.id === selectedMatterId) || null;

  const filteredMatters = matters.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateMatter = useCallback(
    (data: { name: string; client: string; type: string; description: string }) => {
      console.log('New matter created:', data);
      const newMatter: Matter = {
        id: `${Date.now()}`,
        name: data.name,
        client: data.client,
        type: data.type as MatterType,
        description: data.description,
        createdDate: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        uboCount: 0,
        lastActivity: 'Just now',
        analyses: [],
        documents: [],
        activities: [
          {
            id: `act-${Date.now()}`,
            user: 'Darin Putra Bagaskara',
            initials: 'DP',
            action: `Created matter ${data.name}`,
            timestamp: 'Just now',
            date: 'Today',
          },
        ],
      };
      setMatters((prev) => [newMatter, ...prev]);
      setSelectedMatterId(newMatter.id);
    },
    []
  );

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
    // Add a new analysis to the matter
    if (selectedMatter) {
      const newAnalysis = {
        id: `analysis-${Date.now()}`,
        name: selectedMatter.name + ' — Analysis',
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        status: 'Complete' as const,
        uboCount: 6,
        companyName: selectedMatter.name,
        preparedFor: 'Darin Putra Bagaskara',
      };
      setMatters((prev) =>
        prev.map((m) =>
          m.id === selectedMatter.id
            ? {
                ...m,
                uboCount: m.uboCount + 1,
                lastActivity: 'Just now',
                analyses: [newAnalysis, ...m.analyses],
              }
            : m
        )
      );
    }
  }, [selectedMatter]);

  const handleViewAnalysis = useCallback((analysisId: string) => {
    setSelectedAnalysisId(analysisId);
    setRunningAnalysis(false);
    setShowReport(true);
  }, []);

  return (
    <div className={styles.page}>
      {/* Left Column — Matter List */}
      <aside className={styles.leftColumn}>
        <div className={styles.leftHeader}>
          <div className={styles.leftTitle}>
            <span className={styles.leftTitleText}>Matters</span>
            <span className={styles.matterCount}>{matters.length}</span>
          </div>
          <button
            className={styles.newMatterBtn}
            onClick={() => setIsModalOpen(true)}
            aria-label="Create new matter"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search matters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Matter List */}
        <div className={styles.matterList}>
          {filteredMatters.length === 0 ? (
            <div className={styles.emptyMatters}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.3" />
                <path d="M9 12h6M9 8h4M9 16h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
              </svg>
              <p>No matters found</p>
            </div>
          ) : (
            filteredMatters.map((matter, i) => (
              <motion.button
                key={matter.id}
                className={`${styles.matterItem} ${selectedMatterId === matter.id ? styles.matterItemActive : ''}`}
                onClick={() => {
                  setSelectedMatterId(matter.id);
                  setActiveTab('analyses');
                  setRunningAnalysis(false);
                  setShowReport(false);
                  setSelectedAnalysisId(null);
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <div className={styles.matterItemLeft}>
                  <div className={styles.matterItemName}>{matter.name}</div>
                  <div className={styles.matterItemClient}>{matter.client}</div>
                  <div className={styles.matterItemMeta}>
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
                    <span className={styles.metaText}>
                      {matter.analyses.length} analysis{matter.analyses.length !== 1 ? 'es' : ''}
                    </span>
                    <span className={styles.metaDot}>·</span>
                    <span className={styles.metaText}>{matter.lastActivity}</span>
                  </div>
                </div>
                {selectedMatterId === matter.id && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.button>
            ))
          )}
        </div>

        {/* No matters empty state */}
        {matters.length === 0 && (
          <div className={styles.noMattersState}>
            <div className={styles.noMattersIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.3" />
                <path d="M16 12v8M12 16h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
              </svg>
            </div>
            <p className={styles.noMattersText}>No matters yet.</p>
            <p className={styles.noMattersHint}>Create your first matter to start analyzing UBOs.</p>
          </div>
        )}
      </aside>

      {/* Right Column — Matter Detail */}
      <main className={styles.rightColumn}>
        <AnimatePresence mode="wait">
          {!selectedMatter ? (
            // No matter selected — empty state
            <motion.div
              key="empty"
              className={styles.noSelection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
                <h3 className={styles.noSelectionTitle}>Select a matter</h3>
                <p className={styles.noSelectionText}>Choose a matter from the list to view analyses and documents.</p>
              </div>
            </motion.div>
          ) : runningAnalysis ? (
            // Running analysis
            <motion.div
              key="running"
              className={styles.analysisView}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProcessingState
                fileName={`${selectedMatter.name} — ${selectedMatter.client}`}
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
            </motion.div>
          ) : showReport ? (
            // Report view
            <motion.div
              key="report"
              className={styles.reportView}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <UBOReport onExport={() => {}} />
              <div className={styles.reportFloatingBar}>
                <button className={styles.saveCloseBtn} onClick={handleAnalysisBack}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Save & Close
                </button>
              </div>
            </motion.div>
          ) : (
            // Matter detail view
            <motion.div
              key={`matter-${selectedMatter.id}`}
              className={styles.matterDetail}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Matter Header */}
              <div className={styles.matterHeader}>
                <div className={styles.matterHeaderTop}>
                  <div className={styles.matterHeaderLeft}>
                    <h1 className={styles.matterName}>{selectedMatter.name}</h1>
                    <div className={styles.matterMeta}>
                      <span className={styles.matterClient}>{selectedMatter.client}</span>
                      <span className={styles.metaDot}>·</span>
                      <span
                        className={styles.typeBadge}
                        style={{
                          background: matterTypeColors[selectedMatter.type].bg,
                          color: matterTypeColors[selectedMatter.type].text,
                          borderColor: matterTypeColors[selectedMatter.type].border,
                        }}
                      >
                        {selectedMatter.type}
                      </span>
                      <span className={styles.metaDot}>·</span>
                      <span className={styles.matterDate}>Created {selectedMatter.createdDate}</span>
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
                    <button className={styles.menuBtn} aria-label="Matter options">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="3.5" r="1" fill="currentColor" />
                        <circle cx="8" cy="8" r="1" fill="currentColor" />
                        <circle cx="8" cy="12.5" r="1" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </div>
                {selectedMatter.description && (
                  <p className={styles.matterDescription}>{selectedMatter.description}</p>
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
                    {tab === 'analyses' && selectedMatter.analyses.length > 0 && (
                      <span className={styles.tabCount}>{selectedMatter.analyses.length}</span>
                    )}
                    {tab === 'documents' && selectedMatter.documents.length > 0 && (
                      <span className={styles.tabCount}>{selectedMatter.documents.length}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className={styles.tabContent}>
                <AnimatePresence mode="wait">
                  {activeTab === 'analyses' && (
                    <motion.div
                      key="analyses"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className={styles.tabPanel}
                    >
                      {selectedMatter.analyses.length === 0 ? (
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
                          {selectedMatter.analyses.map((analysis, i) => (
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
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'documents' && (
                    <motion.div
                      key="documents"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className={styles.tabPanel}
                    >
                      <MatterDocumentZone
                        documents={selectedMatter.documents}
                        onDocumentsChange={(docs) => {
                          setMatters((prev) =>
                            prev.map((m) => (m.id === selectedMatter.id ? { ...m, documents: docs } : m))
                          );
                        }}
                      />
                    </motion.div>
                  )}

                  {activeTab === 'activity' && (
                    <motion.div
                      key="activity"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className={styles.tabPanel}
                    >
                      {/* Group activities by date */}
                      {(() => {
                        const grouped = selectedMatter.activities.reduce<Record<string, typeof selectedMatter.activities>>((acc, item) => {
                          if (!acc[item.date]) acc[item.date] = [];
                          acc[item.date].push(item);
                          return acc;
                        }, {});

                        return Object.entries(grouped).map(([date, items]: [string, typeof selectedMatter.activities]) => (
                          <div key={date} className={styles.activityGroup}>
                            <p className={styles.activityDateLabel}>{date}</p>
                            <div className={styles.activityTimeline}>
                              {items.map((item, i) => (
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
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* New Matter Modal */}
      <NewMatterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateMatter}
      />
    </div>
  );
}
