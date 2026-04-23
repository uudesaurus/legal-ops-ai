'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProcessingState.module.css';

export type ProcessingStage =
  | 'queued'
  | 'parsing'
  | 'analyzing'
  | 'structuring'
  | 'crystallizing'
  | 'complete';

interface ProcessingStateProps {
  fileName?: string;
  onComplete?: () => void;
  className?: string;
}

const STAGES: {
  id: ProcessingStage;
  label: string;
  sublabel: string;
  duration: number;
}[] = [
  { id: 'queued', label: 'Queued', sublabel: 'Waiting for analysis engine', duration: 1200 },
  { id: 'parsing', label: 'Parsing documents', sublabel: 'Extracting text from Ditjen AHU PDFs', duration: 2500 },
  { id: 'analyzing', label: 'Analyzing ownership', sublabel: 'Tracing shareholder chains & calculating effective %', duration: 3000 },
  { id: 'structuring', label: 'Structuring data', sublabel: 'Building ownership tables & family groups', duration: 2000 },
  { id: 'crystallizing', label: 'Crystallizing report', sublabel: 'Generating UBO analysis document', duration: 1800 },
];

export function ProcessingState({ fileName, onComplete, className }: ProcessingStateProps) {
  const [currentStage, setCurrentStage] = useState<ProcessingStage>('queued');
  const [progress, setProgress] = useState(0);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let stageIndex = 0;
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    const runStages = () => {
      if (cancelled) return;
      const stage = STAGES[stageIndex];
      setCurrentStage(stage.id);
      const startTime = Date.now();
      const animate = (ts: number) => {
        if (cancelled) return;
        const elapsed = ts - startTime;
        setProgress(Math.min((elapsed / stage.duration) * 100, 100));
        if (elapsed < stage.duration) {
          rafId = requestAnimationFrame(animate);
        }
      };
      rafId = requestAnimationFrame(animate);
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        stageIndex++;
        if (stageIndex < STAGES.length) {
          runStages();
        } else {
          setCurrentStage('complete');
          setTimeout(() => { if (!cancelled) { setShowReport(true); onComplete?.(); } }, 800);
        }
      }, stage.duration);
    };
    const startTimeout = setTimeout(runStages, 600);
    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);
  const isComplete = currentStage === 'complete';

  if (showReport) return null;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.bgFog} aria-hidden="true">
        <div className={styles.fogPulse} />
      </div>

      <div className={styles.orbContainer}>
        <motion.div className={styles.outerRing} animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
        <motion.div className={styles.middleRing} animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
        <motion.div
          className={styles.innerCore}
          animate={isComplete ? { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } : { scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: isComplete ? 1 : 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {isComplete ? (
            <motion.svg width="28" height="28" viewBox="0 0 28 28" fill="none" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}>
              <path d="M6 14l6 6 10-10" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ) : (
            <motion.div className={styles.coreIcon} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              <StageIcon stage={currentStage} />
            </motion.div>
          )}
        </motion.div>
        {!isComplete && (
          <div className={styles.particles}>
            {[...Array(6)].map((_, i) => (
              <motion.div key={i} className={styles.particle}
                animate={{ rotate: 360 }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: 'linear', delay: i * -1 }}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.stageInfo}>
        <AnimatePresence mode="wait">
          <motion.div key={currentStage} className={styles.stageContent}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <h3 className={styles.stageLabel}>
              {STAGES[currentIndex]?.label || (isComplete ? 'Analysis complete' : 'Processing')}
            </h3>
            <p className={styles.stageSublabel}>
              {STAGES[currentIndex]?.sublabel || (isComplete ? 'Your UBO report is ready' : '')}
            </p>
          </motion.div>
        </AnimatePresence>
        {fileName && (
          <p className={styles.fileNameBadge}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="0.5" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="0.8" /></svg>
            {fileName}
          </p>
        )}
      </div>

      {!isComplete && (
        <div className={styles.progressSection}>
          <div className={styles.progressTrack}>
            <motion.div className={styles.progressFill} animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
          </div>
          <span className={styles.progressPercent}>{Math.round(progress)}%</span>
        </div>
      )}

      <div className={styles.steps}>
        {STAGES.map((stage, i) => {
          const isPast = i < currentIndex;
          const isCurrent = stage.id === currentStage;
          return (
            <div key={stage.id} className={`${styles.step} ${isPast ? styles.stepPast : ''} ${isCurrent ? styles.stepCurrent : ''} ${i > currentIndex ? styles.stepFuture : ''}`}>
              <div className={styles.stepDot}>
                {isPast ? (
                  <motion.svg width="8" height="8" viewBox="0 0 8 8" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}>
                    <path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                ) : isCurrent ? (
                  <motion.div className={styles.stepPulse} animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }} />
                ) : null}
              </div>
              <span className={styles.stepLabel}>{stage.label}</span>
              {isCurrent && <motion.div className={styles.stepIndicator} layoutId="stepIndicator" />}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {currentIndex >= 2 && (
          <motion.div className={styles.skeletonPreview} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonLine} style={{ width: '60%', height: '12px' }} />
              <div className={styles.skeletonLine} style={{ width: '40%', height: '8px', marginTop: '6px' }} />
            </div>
            <div className={styles.skeletonTable}>
              {[...Array(4)].map((_, i) => (
                <motion.div key={i} className={styles.skeletonRow} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                  <div className={styles.skeletonCell} style={{ width: '35%' }} />
                  <div className={styles.skeletonCell} style={{ width: '20%' }} />
                  <div className={styles.skeletonCell} style={{ width: '15%' }} />
                  <div className={styles.skeletonCell} style={{ width: '15%' }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StageIcon({ stage }: { stage: ProcessingStage }) {
  const p = { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' as const };
  switch (stage) {
    case 'queued': return <svg {...p}><circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.2" /><path d="M11 7v4l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>;
    case 'parsing': return <svg {...p}><rect x="5" y="2" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" /><motion.path d="M8 7h6M8 11h4M8 15h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity }} /></svg>;
    case 'analyzing': return <svg {...p}><circle cx="11" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" /><circle cx="5.5" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="16.5" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.2" /><motion.path d="M9 9l-2.5 4.5M13 9l2.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity }} /></svg>;
    case 'structuring': return <svg {...p}><rect x="2" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="14" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="8" y="14" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><motion.path d="M5 9v3h5M17 9v3h-5M11 11v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.7, repeat: Infinity }} /></svg>;
    case 'crystallizing': return <svg {...p}><polygon points="11,2 19,7 19,15 11,20 3,15 3,7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><motion.polygon points="11,6 16,9.5 16,12.5 11,16 6,12.5 6,9.5" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1, 0.9] }} transition={{ duration: 1, repeat: Infinity }} /></svg>;
    default: return <svg {...p}><circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.2" /></svg>;
  }
}
