'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './UBOReport.module.css';
import { OwnershipDiagram } from './OwnershipDiagram';

// ── Mock data mirroring the real UBO report ──────────────────────────────────
const REPORT_META = {
  companyName: 'PT Ekacitta Dian Pertiwi',
  preparedFor: 'Darin Putra Bagaskara',
  date: '17 April 2026',
  classification: 'PMDN NON FASILITAS — TERTUTUP',
  source: 'Ditjen AHU Online (downloaded 27 Maret 2026)',
  generatedBy: 'UBO Analyzer — Legal Ops AI',
  totalCompanies: 4,
};

const UBOS = [
  { id: 1, name: 'Angela Trismitro', effective: 47.10, family: 'Trismitro', threshold: '>25%', status: 'UBO', statusType: 'main' as const },
  { id: 2, name: 'Leliany Trismitro', effective: 22.73, family: 'Trismitro', threshold: '>5%', status: 'Near', statusType: 'near' as const },
  { id: 3, name: 'Roswita Trismitro', effective: 18.48, family: 'Trismitro', threshold: '>5%', status: 'Near', statusType: 'near' as const },
  { id: 4, name: 'Ida Juda', effective: 6.13, family: 'Juda', threshold: '>5%', status: 'Near', statusType: 'near' as const },
  { id: 5, name: 'Sofian Juda', effective: 5.02, family: 'Juda', threshold: '>5%', status: 'Near', statusType: 'near' as const },
  { id: 6, name: 'Roy K.K. Hadiraharjo', effective: 0.54, family: '—', threshold: '—', status: '—', statusType: 'minor' as const },
];

const FAMILY_SUMMARY = [
  { family: 'Trismitro family', total: 88.31 },
  { family: 'Juda family', total: 11.15 },
];

const KEY_FINDINGS = [
  'Angela Trismitro is the largest UBO with 47.10% effective ownership.',
  'Trismitro family (Angela + Leliany + Roswita) collectively controls 88.31% — exceeding the 25% UBO threshold.',
  'Juda family (Ida + Sofian) collectively holds 11.15%.',
  'Ownership traced through 3 intermediate holding companies: PT Ekacitta Dian Persada, PT Laniros Gemala Sakti, PT Juda Utama Dharma Abadi.',
  'Total effective ownership traced: 100.00% — all shareholders accounted for (verified: sums to 100%).',
];

const SHAREHOLDERS = [
  {
    company: 'PT Ekacitta Dian Pertiwi',
    source: 'SK AHU-0023616.AH.01.02.TAHUN 2022 (Perubahan)',
    total: '4,000 shares',
    rows: [
      { name: 'PT Laniros Gemala Sakti', shares: '1,200', direct: '30.00%', type: 'Company' },
      { name: 'PT Ekacitta Dian Persada', shares: '2,800', direct: '70.00%', type: 'Company' },
    ],
  },
  {
    company: 'PT Ekacitta Dian Persada',
    source: 'SK AHU-AH.01.09-0122969, MARET 2025',
    total: '4,000 shares',
    rows: [
      { name: 'PT Laniros Gemala Sakti', shares: '1,880', direct: '47.00%', type: 'Company' },
      { name: 'Angela Trismitro', shares: '840', direct: '21.00%', type: 'Individual' },
      { name: 'Roswita Trismitro', shares: '624', direct: '15.60%', type: 'Individual' },
      { name: 'Leliany Trismitro', shares: '528', direct: '13.20%', type: 'Individual' },
      { name: 'PT Juda Utama Dharma Abadi', shares: '128', direct: '3.20%', type: 'Company' },
    ],
  },
  {
    company: 'PT Laniros Gemala Sakti',
    source: 'SK AHU-AH.01.03-0224188, APRIL 2022',
    total: '26,678 shares',
    rows: [
      { name: 'Angela Trismitro', shares: '13,741', direct: '51.51%', type: 'Individual' },
      { name: 'Leliany Trismitro', shares: '5,722', direct: '21.45%', type: 'Individual' },
      { name: 'Roswita Trismitro', shares: '3,206', direct: '12.02%', type: 'Individual' },
      { name: 'Roy K.K. Hadiraharjo', shares: '230', direct: '0.86%', type: 'Individual' },
      { name: 'PT Juda Utama Dharma Abadi', shares: '3,779', direct: '14.17%', type: 'Company' },
    ],
  },
  {
    company: 'PT Juda Utama Dharma Abadi',
    source: 'SK AHU-0047293.AH.01.02.TAHUN 2024',
    total: '7,050 shares',
    rows: [
      { name: 'Ida Juda', shares: '3,878', direct: '55.01%', type: 'Individual' },
      { name: 'Sofian Juda', shares: '3,172', direct: '44.99%', type: 'Individual' },
    ],
  },
];

const METHODOLOGY = {
  dataSource: 'Ditjen AHU company profile documents (Profil Perseroan), downloaded via AHU Online portal on 27 Maret 2026. Documents: SK AHU-0023616.AH.01.02.Tahun 2022, SK AHU-AH.01.09-0122969 (2025), SK AHU-AH.01.03-0224188 (2022), SK AHU-0047293.AH.01.02.Tahun 2024.',
  calculation: 'Formula: (lembar_A / total_A) x (lembar_B / total_B) x ... x 100 = effective%. Example Angela Trismitro: Path A - (13,741/26,678 x 1,200/4,000) = 15.45%. Path B - (840/4,000 x 2,800/4,000) = 14.70%. Total = 30.15%. Where multiple paths exist, both are summed (Angela via PT Laniros AND via PT EDP).',
  cycleHandling: 'PT Laniros appears both as direct shareholder of target (30%) and as 47% shareholder of PT EDP -- circular reference. Cycle merged: PT Laniros traced once via its direct 30% path only. Excluded from PT EDP sub-trace to prevent double-counting.',
  accuracyNote: 'All share counts extracted from AHU Profil Perseroan PDFs via OCR. Cross-check against latest Akta Notaris before formal use. Total effective ownership = 100.00% -- all shareholders accounted for, confirming self-consistency of extracted data.',
  disclaimer: 'This report is for due diligence purposes only. Based on publicly available Ditjen AHU registration data. No legal, financial, or investment advice is implied or provided.',
};

// ── Component ────────────────────────────────────────────────────────────────
interface UBOReportProps {
  onExport?: () => void;
}

export function UBOReport({ onExport }: UBOReportProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'tables' | 'structure' | 'method'>('overview');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className={styles.reportWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Report header */}
      <motion.header
        className={styles.reportHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.headerTop}>
          <div className={styles.headerMeta}>
            <span className={styles.badge}>UBO REPORT</span>
            <span className={styles.separator} />
            <span className={styles.headerCompany}>{REPORT_META.companyName}</span>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.actionBtn} title="Copy link">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 7a2 2 0 0 1 2.83 0l2 2a2 2 0 0 1-2.83 2.83L5 9.83M9 7a2 2 0 0 1-2.83 0l-2-2a2 2 0 0 1 2.83-2.83L9 4.17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <button className={styles.actionBtn} title="Print">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="3" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M3 5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <motion.button
              className={styles.exportBtn}
              onClick={onExport}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 10v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Export PDF
            </motion.button>
          </div>
        </div>

        <div className={styles.headerInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Prepared for</span>
              <span className={styles.infoValue}>{REPORT_META.preparedFor}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Date</span>
              <span className={styles.infoValue}>{REPORT_META.date}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Classification</span>
              <span className={styles.infoValue}>{REPORT_META.classification}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Source</span>
              <span className={styles.infoValue}>{REPORT_META.source}</span>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className={styles.tabs}>
          {(['overview', 'tables', 'structure', 'method'] as const).map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </motion.header>

      {/* Report content */}
      <div className={styles.reportContent}>
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              {/* UBO identification result */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>UBO Identification Result</h2>
                </div>

                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>#</th>
                        <th className={styles.th}>UBO</th>
                        <th className={styles.th}>Effective %</th>
                        <th className={styles.th}>Family Group</th>
                        <th className={styles.th}>Threshold</th>
                        <th className={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {UBOS.map((ubo, i) => (
                        <motion.tr
                          key={ubo.id}
                          className={styles.tr}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.3 }}
                        >
                          <td className={styles.tdNum}>{ubo.id}</td>
                          <td className={styles.tdName}>{ubo.name}</td>
                          <td className={`${styles.tdEffective} ${styles[`status_${ubo.statusType}`]}`}>
                            <span className={styles.effectiveValue}>{ubo.effective.toFixed(2)}%</span>
                            <div className={styles.effectiveBar}>
                              <motion.div
                                className={`${styles.effectiveFill} ${styles[`fill_${ubo.statusType}`]}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${ubo.effective}%` }}
                                transition={{ delay: i * 0.08 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              />
                            </div>
                          </td>
                          <td className={styles.td}>{ubo.family}</td>
                          <td className={styles.tdMuted}>{ubo.threshold}</td>
                          <td className={styles.td}>
                            <span className={`${styles.statusBadge} ${styles[`badge_${ubo.statusType}`]}`}>
                              {ubo.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Family summary */}
                <div className={styles.familySummary}>
                  {FAMILY_SUMMARY.map((f, i) => (
                    <motion.div
                      key={f.family}
                      className={styles.familyCard}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                    >
                      <span className={styles.familyName}>{f.family}</span>
                      <span className={styles.familyTotal}>{f.total.toFixed(2)}%</span>
                    </motion.div>
                  ))}
                  <div className={styles.totalsRow}>
                    <div className={styles.totalItem}>
                      <span>Total traced</span>
                      <span className={styles.totalValue}>100.00%</span>
                    </div>
                    <div className={styles.totalItem}>
                      <span>Untraced</span>
                      <span className={styles.totalValueMuted}>0.00%</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Key findings */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Key Findings</h2>
                </div>
                <div className={styles.findingsList}>
                  {KEY_FINDINGS.map((finding, i) => (
                    <motion.div
                      key={i}
                      className={styles.findingItem}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                    >
                      <div className={styles.findingBullet}>
                        <svg width="6" height="6" viewBox="0 0 6 6">
                          <circle cx="3" cy="3" r="3" fill="currentColor" />
                        </svg>
                      </div>
                      <p className={styles.findingText}>{finding}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'tables' && (
            <motion.div
              key="tables"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Shareholder Tables</h2>
                </div>
                {SHAREHOLDERS.map((co, ci) => (
                  <motion.div
                    key={co.company}
                    className={styles.companyBlock}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.12, duration: 0.4 }}
                  >
                    <div className={styles.companyHeader}>
                      <h3 className={styles.companyName}>{co.company}</h3>
                      <div className={styles.companyMeta}>
                        <span className={styles.sourceText}>{co.source}</span>
                        <span className={styles.totalShares}>Total: {co.total}</span>
                      </div>
                    </div>
                    <table className={styles.miniTable}>
                      <thead>
                        <tr>
                          <th className={styles.th}>Shareholder</th>
                          <th className={styles.th}>Shares</th>
                          <th className={styles.th}>Direct %</th>
                          <th className={styles.th}>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {co.rows.map((row, ri) => (
                          <motion.tr
                            key={ri}
                            className={styles.tr}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: ci * 0.12 + ri * 0.05 }}
                          >
                            <td className={styles.td}>{row.name}</td>
                            <td className={`${styles.td} ${styles.tdMono}`}>{row.shares}</td>
                            <td className={`${styles.td} ${styles.tdMono}`}>{row.direct}</td>
                            <td className={styles.td}>
                              <span className={`${styles.typeBadge} ${row.type === 'Company' ? styles.typeCompany : styles.typeIndividual}`}>
                                {row.type}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          )}

          {activeTab === 'structure' && (
            <motion.div
              key="structure"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Ownership Structure Diagram</h2>
                  <span className={styles.diagramSource}>Generated by UBO Analyzer</span>
                </div>
                <motion.div
                  className={styles.diagramContainer}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <OwnershipDiagram />
                </motion.div>
              </section>
            </motion.div>
          )}

          {activeTab === 'method' && (
            <motion.div
              key="method"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Methodology & Notes</h2>
                </div>
                <div className={styles.methodBlocks}>
                  {[
                    { label: 'Data Source', content: METHODOLOGY.dataSource },
                    { label: 'Calculation Method', content: METHODOLOGY.calculation },
                    { label: 'Cycle Handling', content: METHODOLOGY.cycleHandling },
                    { label: 'Accuracy Note', content: METHODOLOGY.accuracyNote },
                  ].map((block, i) => (
                    <motion.div
                      key={block.label}
                      className={styles.methodBlock}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <h4 className={styles.methodLabel}>{block.label}</h4>
                      <p className={styles.methodContent}>{block.content}</p>
                    </motion.div>
                  ))}
                  <motion.div
                    className={styles.disclaimer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                      <path d="M6 4v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="6" cy="8" r="0.5" fill="currentColor" />
                    </svg>
                    <p>{METHODOLOGY.disclaimer}</p>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
