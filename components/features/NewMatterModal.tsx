'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './NewMatterModal.module.css';

interface NewMatterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    client: string;
    type: string;
    description: string;
  }) => void;
}

const MATTER_TYPES = ['M&A', 'Due Diligence', 'Compliance', 'General'] as const;

export function NewMatterModal({ isOpen, onClose, onSubmit }: NewMatterModalProps) {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [type, setType] = useState<string>('M&A');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; client?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; client?: string } = {};
    if (!name.trim()) newErrors.name = 'Matter name is required';
    if (!client.trim()) newErrors.client = 'Client name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      onSubmit({ name: name.trim(), client: client.trim(), type, description: description.trim() });
      // Reset form
      setName('');
      setClient('');
      setType('M&A');
      setDescription('');
      setErrors({});
      onClose();
    },
    [name, client, type, description, onSubmit, onClose]
  );

  const handleClose = useCallback(() => {
    setErrors({});
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          {/* Slide-in panel */}
          <motion.div
            className={styles.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.panelIcon}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 8h6M5 5.5h4M5 10.5h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 className={styles.title}>New Matter</h2>
                  <p className={styles.subtitle}>Create a new matter to organize UBO analyses</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={handleClose} aria-label="Close panel">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formBody}>
                {/* Matter Name */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="matter-name">
                    Matter Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="matter-name"
                    type="text"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="e.g. PT Example Acquisition"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    autoFocus
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        className={styles.errorMsg}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Client Name */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="client-name">
                    Client Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    className={`${styles.input} ${errors.client ? styles.inputError : ''}`}
                    placeholder="e.g. PT Investama Group"
                    value={client}
                    onChange={(e) => {
                      setClient(e.target.value);
                      if (errors.client) setErrors((prev) => ({ ...prev, client: undefined }));
                    }}
                  />
                  <AnimatePresence>
                    {errors.client && (
                      <motion.p
                        className={styles.errorMsg}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        {errors.client}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Matter Type */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="matter-type">
                    Matter Type
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="matter-type"
                      className={styles.select}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      {MATTER_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <svg className={styles.selectIcon} width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Description */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className={styles.textarea}
                    placeholder="Brief description of the matter scope and objectives..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                  <p className={styles.hint}>Optional. Include scope, key parties, and deadlines.</p>
                </div>
              </div>

              {/* Footer */}
              <div className={styles.footer}>
                <button type="button" className={styles.cancelBtn} onClick={handleClose}>
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className={styles.submitBtn}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Create Matter
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
