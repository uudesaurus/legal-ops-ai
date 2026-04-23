'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MatterDocumentZone.module.css';
import type { MatterDocument } from '@/lib/mock-data';

interface MatterDocumentZoneProps {
  documents: MatterDocument[];
  onDocumentsChange?: (documents: MatterDocument[]) => void;
  onUpload?: (files: File[]) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'done' | 'error';
  progress: number;
}

export function MatterDocumentZone({ documents: initialDocs, onDocumentsChange, onUpload }: MatterDocumentZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [docs, setDocs] = useState<MatterDocument[]>(initialDocs);
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
    if (dragCounter.current === 0) setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFiles = (fileList: FileList | File[]): File[] => {
    const valid: File[] = [];
    const maxSize = 50 * 1024 * 1024;
    for (const file of Array.from(fileList)) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setError(`${file.name} is not a PDF file. Only PDF documents are accepted.`);
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

    uploaded.forEach((file) => {
      simulateUpload(file.id, file.name, file.size);
    });

    if (onUpload) onUpload(validated);
  }, [onUpload]);

  const simulateUpload = (id: string, name: string, size: number) => {
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
        // Add to docs
        const newDoc: MatterDocument = {
          id,
          name,
          size,
          type: 'application/pdf',
          uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          uploadedBy: 'Darin Putra Bagaskara',
        };
        setDocs((prev) => {
          const updated = [newDoc, ...prev];
          onDocumentsChange?.(updated);
          return updated;
        });
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress } : f))
        );
      }
    }, 150);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  }, [addFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  }, [addFiles]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const deleteDoc = useCallback((id: string) => {
    setDocs((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      onDocumentsChange?.(updated);
      return updated;
    });
  }, [onDocumentsChange]);

  const clearError = useCallback(() => setError(null), []);

  return (
    <div className={styles.container}>
      {/* Drop zone */}
      <motion.div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging ? 'rgba(254, 243, 199, 0.4)' : 'rgba(39, 39, 42, 0.6)',
          backgroundColor: isDragging ? 'rgba(20, 20, 22, 0.9)' : 'rgba(15, 15, 17, 0.4)',
          scale: isDragging ? 1.005 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleInputChange}
          className={styles.hiddenInput}
        />

        <motion.div
          className={styles.dropContent}
          animate={isDragging ? { y: 4 } : { y: 0 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className={styles.dropIcon}>
            {isDragging ? (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 8v12M12 16l4 4 4-4" stroke="var(--accent-warm)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 24v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 8v12M12 16l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <path d="M8 24v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
              </svg>
            )}
          </div>
          <p className={styles.dropTitle}>
            {isDragging ? 'Release to upload' : 'Drop files here or click to upload'}
          </p>
          <p className={styles.dropFormats}>
            PDF documents only · Max 50MB each
          </p>
          <button
            className={styles.browseBtn}
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            Browse files
          </button>
        </motion.div>
      </motion.div>

      {/* Uploading files */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className={styles.uploadingSection}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className={styles.sectionLabel}>Uploading</p>
            {files.map((file) => (
              <motion.div
                key={file.id}
                className={styles.fileItem}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
              >
                <div className={styles.fileIcon}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M5 5h4M5 7.5h3M5 10h2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{file.name}</span>
                  <div className={styles.fileMeta}>
                    <span>{formatSize(file.size)}</span>
                    {file.status === 'uploading' && (
                      <>
                        <span className={styles.sep}>·</span>
                        <span>{Math.round(file.progress)}%</span>
                      </>
                    )}
                    {file.status === 'done' && (
                      <>
                        <span className={styles.sep}>·</span>
                        <span className={styles.done}>Uploaded</span>
                      </>
                    )}
                  </div>
                  {file.status === 'uploading' && (
                    <div className={styles.progressBar}>
                      <motion.div
                        className={styles.progressFill}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  )}
                </div>
                {file.status !== 'uploading' && (
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFile(file.id)}
                    aria-label="Remove"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded documents */}
      {docs.length > 0 && (
        <div className={styles.docsSection}>
          <p className={styles.sectionLabel}>{docs.length} document{docs.length !== 1 ? 's' : ''}</p>
          <div className={styles.docsList}>
            {docs.map((doc) => (
              <motion.div
                key={doc.id}
                className={styles.docItem}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                layout
              >
                <div className={styles.docIcon}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="3" y="1" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M6 6h6M6 9h5M6 12h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <path d="M9 4v3.5l2-1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  </svg>
                </div>
                <div className={styles.docInfo}>
                  <span className={styles.docName}>{doc.name}</span>
                  <div className={styles.docMeta}>
                    <span>{formatSize(doc.size)}</span>
                    <span className={styles.sep}>·</span>
                    <span>{doc.uploadDate}</span>
                    <span className={styles.sep}>·</span>
                    <span>{doc.uploadedBy}</span>
                  </div>
                </div>
                <div className={styles.docActions}>
                  <button
                    className={styles.actionBtn}
                    title="Download"
                    onClick={() => {
                      console.log('Download', doc.name);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 10v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    title="Delete"
                    onClick={() => deleteDoc(doc.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 4h10M5 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M6 7v3M8 7v3M3 4l1 8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l1-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Error banner */}
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

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
