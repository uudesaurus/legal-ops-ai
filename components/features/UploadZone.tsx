'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './UploadZone.module.css';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'queued' | 'uploading' | 'done' | 'error';
  progress: number;
}

interface UploadZoneProps {
  onFilesUploaded?: (files: File[]) => void;
  compact?: boolean;
}

export function UploadZone({ onFilesUploaded, compact = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFiles = (fileList: FileList | File[]): File[] => {
    const valid: File[] = [];
    const maxSize = 50 * 1024 * 1024; // 50MB

    for (const file of Array.from(fileList)) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setError(`${file.name} is not a PDF file. Only PDF documents from Ditjen AHU are accepted.`);
        return [];
      }
      if (file.size > maxSize) {
        setError(`${file.name} exceeds 50MB limit.`);
        return [];
      }
      valid.push(file);
    }
    return valid;
  };

  const addFiles = useCallback((newFiles: File[]) => {
    setError(null);
    const validated = validateFiles(newFiles as unknown as FileList);
    if (validated.length === 0) return;

    const uploaded: UploadedFile[] = validated.map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: f.name,
      size: f.size,
      type: f.type,
      status: 'uploading' as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...uploaded]);

    // Simulate upload progress
    uploaded.forEach((file) => {
      simulateUpload(file.id);
    });

    if (onFilesUploaded) {
      onFilesUploaded(validated);
    }
  }, [onFilesUploaded]);

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: 'done' } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress } : f
          )
        );
      }
    }, 150);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addFiles(Array.from(e.dataTransfer.files));
      }
    },
    [addFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(Array.from(e.target.files));
      }
    },
    [addFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearError = useCallback(() => setError(null), []);

  if (compact) {
    return (
      <div className={styles.compactZone}>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleInputChange}
          className={styles.hiddenInput}
        />
        <button
          className={styles.compactBtn}
          onClick={() => inputRef.current?.click()}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v8M4 5l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add PDF
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={`${styles.zone} ${isDragging ? styles.dragging : ''} ${files.length > 0 ? styles.hasFiles : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging
            ? 'rgba(250, 250, 250, 0.2)'
            : files.length > 0
            ? 'rgba(39, 39, 42, 1)'
            : 'rgba(39, 39, 42, 0.6)',
          backgroundColor: isDragging
            ? 'rgba(20, 20, 22, 0.95)'
            : 'rgba(15, 15, 17, 0.6)',
          scale: isDragging ? 1.01 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Ambient fog in drop zone */}
        <div className={styles.zoneFog} aria-hidden="true">
          <div className={styles.fogOrb} />
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleInputChange}
          className={styles.hiddenInput}
        />

        <AnimatePresence mode="wait">
          {files.length === 0 ? (
            <motion.div
              key="empty"
              className={styles.emptyState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={styles.iconWrap}
                animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <DropIcon isDragging={isDragging} />
              </motion.div>

              <div className={styles.textContent}>
                <h3 className={styles.title}>
                  {isDragging ? 'Release to analyze' : 'Drop AHU documents'}
                </h3>
                <p className={styles.subtitle}>
                  PDF documents from{' '}
                  <span className={styles.highlight}>Ditjen AHU Online</span>
                </p>
                <p className={styles.formats}>
                  Profil Perseroan · SK AHU · Akta Notaris
                </p>
              </div>

              <div className={styles.divider}>
                <span>or</span>
              </div>

              <button
                className={styles.browseBtn}
                onClick={() => inputRef.current?.click()}
              >
                Browse files
              </button>

              <p className={styles.hint}>
                Accepts multiple PDF files · Max 50MB each
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="files"
              className={styles.filesState}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.filesHeader}>
                <span className={styles.filesCount}>
                  {files.filter((f) => f.status === 'done').length} / {files.length} uploaded
                </span>
                <div className={styles.filesActions}>
                  <button
                    className={styles.addMoreBtn}
                    onClick={() => inputRef.current?.click()}
                  >
                    + Add more
                  </button>
                  <button
                    className={styles.clearBtn}
                    onClick={() => setFiles([])}
                  >
                    Clear all
                  </button>
                </div>
              </div>

              <div className={styles.fileList}>
                {files.map((file, i) => (
                  <motion.div
                    key={file.id}
                    className={styles.fileItem}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <div className={styles.fileIcon}>
                      <FileIcon />
                    </div>
                    <div className={styles.fileInfo}>
                      <span className={styles.fileName}>{file.name}</span>
                      <div className={styles.fileMeta}>
                        <span>{formatSize(file.size)}</span>
                        {file.status === 'uploading' && (
                          <>
                            <span className={styles.fileSep}>·</span>
                            <span className={styles.fileProgress}>
                              {Math.round(file.progress)}%
                            </span>
                          </>
                        )}
                        {file.status === 'done' && (
                          <>
                            <span className={styles.fileSep}>·</span>
                            <span className={styles.fileDone}>Ready</span>
                          </>
                        )}
                      </div>
                      {file.status === 'uploading' && (
                        <div className={styles.progressBar}>
                          <motion.div
                            className={styles.progressFill}
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.15 }}
                          />
                        </div>
                      )}
                    </div>
                    {file.status !== 'uploading' && (
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFile(file.id)}
                        aria-label={`Remove ${file.name}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {files.every((f) => f.status === 'done') && (
                <motion.div
                  className={styles.analyzeCta}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <button
                    className={styles.analyzeBtn}
                    onClick={() => {
                      // Signal to parent to start analysis
                      const event = new CustomEvent('startAnalysis', {
                        detail: { files: files.map((f) => f.name) },
                      });
                      window.dispatchEvent(event);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M6 8l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Analyze documents
                  </button>
                  <p className={styles.ctaHint}>
                    UBO analysis will be ready in 30–60 seconds
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            className={styles.errorBanner}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
              <path d="M7 4v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="7" cy="9.5" r="0.6" fill="currentColor" />
            </svg>
            <span>{error}</span>
            <button onClick={clearError} className={styles.errorClose}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropIcon({ isDragging }: { isDragging: boolean }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={styles.dropIcon}
    >
      {/* Document stack */}
      <rect
        x="10"
        y="14"
        width="22"
        height="28"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        opacity="0.3"
      />
      <rect
        x="13"
        y="11"
        width="22"
        height="28"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        opacity="0.5"
      />
      <rect
        x="16"
        y="8"
        width="22"
        height="28"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Lines on document */}
      <path d="M21 16h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M21 20h9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M21 24h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M21 28h7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Drop arrow */}
      <motion.g
        animate={isDragging ? { y: 6 } : { y: 0 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <path
          d="M24 38v-10M20 30l4 4 4-4"
          stroke="var(--accent-warm)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1" />
      <path d="M5 5h4M5 7.5h3M5 10h2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
