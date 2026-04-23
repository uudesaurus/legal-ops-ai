'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadZone } from './UploadZone';
import { ProcessingState } from './ProcessingState';
import { UBOReport } from './UBOReport';
import { EmptyState } from './EmptyState';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import styles from './UBOFlow.module.css';

type FlowState = 'idle' | 'uploading' | 'processing' | 'report' | 'error';

export function UBOFlow() {
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleStartAnalysis = useCallback((files: File[]) => {
    setFileNames(files.map((f) => f.name));
    setFlowState('uploading');
    // Simulate upload delay then transition to processing
    setTimeout(() => setFlowState('processing'), 1200);
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setFlowState('report');
  }, []);

  const handleReset = useCallback(() => {
    setFlowState('idle');
    setFileNames([]);
    setErrorMessage(null);
  }, []);

  const handleStartNew = useCallback(() => {
    setFlowState('uploading');
    setTimeout(() => setFlowState('processing'), 100);
  }, []);

  return (
    <div className={styles.flowWrapper}>
      <AnimatePresence mode="wait">
        {flowState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.idleView}
          >
            {/* Hero */}
            <div className={styles.heroSection}>
              <motion.div
                className={styles.heroEyebrow}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className={styles.eyebrowDot} />
                KARNA Dashboard
              </motion.div>

              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                UBO Analysis
                <br />
                <span className={styles.heroAccent}>in seconds</span>
              </motion.h1>

              <motion.p
                className={styles.heroSubtitle}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                Drop Ditjen AHU documents. Get a complete UBO report with ownership
                chains, family groupings, and effective percentages — ready for due
                diligence review.
              </motion.p>
            </div>

            {/* Upload Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <UploadZone
                onFilesUploaded={(files) => handleStartAnalysis(files)}
              />
            </motion.div>

            {/* How it works */}
            <motion.div
              className={styles.howItWorks}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className={styles.howSteps}>
                {[
                  { num: '01', label: 'Upload', desc: 'Drop AHU PDFs from the company profiler' },
                  { num: '02', label: 'Analyze', desc: 'We trace every ownership chain automatically' },
                  { num: '03', label: 'Review', desc: 'Inspect the UBO report, export as needed' },
                ].map((step, i) => (
                  <div key={step.num} className={styles.howStep}>
                    <span className={styles.stepNum}>{step.num}</span>
                    <div className={styles.stepText}>
                      <span className={styles.stepLabel}>{step.label}</span>
                      <span className={styles.stepDesc}>{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Architecture Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <ArchitectureDiagram />
            </motion.div>

            {/* Recent empty state for past analyses */}
            <EmptyState />
          </motion.div>
        )}

        {(flowState === 'uploading' || flowState === 'processing') && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.processingView}
          >
            <ProcessingState
              fileName={fileNames[0]}
              onComplete={handleProcessingComplete}
            />
          </motion.div>
        )}

        {flowState === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.reportView}
          >
            <UBOReport
              onExport={() => {
                // TODO: trigger PDF export
              }}
            />

            {/* Floating action bar */}
            <motion.div
              className={styles.floatingBar}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <button className={styles.newAnalysisBtn} onClick={handleReset}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7a5 5 0 1 0 5-5 5.06 5.06 0 0 0-3.54 1.46L2 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M2 3v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                New analysis
              </button>
              <span className={styles.analysisComplete}>
                Analysis complete · {fileNames.length} document{fileNames.length > 1 ? 's' : ''} processed
              </span>
            </motion.div>
          </motion.div>
        )}

        {flowState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.errorView}
          >
            <div className={styles.errorCard}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={styles.errorIcon}>
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="16" cy="20" r="1" fill="currentColor" />
              </svg>
              <h3 className={styles.errorTitle}>Analysis failed</h3>
              <p className={styles.errorDesc}>{errorMessage || 'Something went wrong during analysis. Please try again.'}</p>
              <div className={styles.errorActions}>
                <button className={styles.retryBtn} onClick={handleReset}>Try again</button>
                <button className={styles.contactBtn} onClick={() => {}}>Contact support</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
