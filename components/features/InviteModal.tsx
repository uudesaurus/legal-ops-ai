'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/useToast';
import styles from './InviteModal.module.css';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: 'Admin' | 'User', message?: string) => void;
}

export function InviteModal({ isOpen, onClose, onInvite }: InviteModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Admin' | 'User'>('User');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { success } = useToast();

  const handleClose = useCallback(() => {
    setEmail('');
    setRole('User');
    setMessage('');
    setError('');
    setLoading(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    onInvite(email.trim(), role, message || undefined);
    success(`Invitation sent to ${email}`);
    setLoading(false);
    handleClose();
  };

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

          {/* Panel */}
          <motion.div
            className={styles.panel}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>Invite Team Member</h2>
                <p className={styles.subtitle}>Send an invitation to join your workspace</p>
              </div>
              <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Email */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="invite-email">
                  Email address
                </label>
                <input
                  id="invite-email"
                  type="email"
                  className={styles.input}
                  placeholder="colleague@karnapartnership.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  autoFocus
                />
                {error && (
                  <motion.p
                    className={styles.error}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              {/* Role */}
              <div className={styles.field}>
                <label className={styles.label}>Role</label>
                <div className={styles.roleCards}>
                  <RoleCard
                    value="User"
                    selected={role === 'User'}
                    onSelect={() => setRole('User')}
                    title="User"
                    description="Access to workflows and client work. Can be assigned to matters."
                    icon={
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    }
                  />
                  <RoleCard
                    value="Admin"
                    selected={role === 'Admin'}
                    onSelect={() => setRole('Admin')}
                    title="Admin"
                    description="Full access to platform settings and user management."
                    icon={
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5l3.5-.5L8 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="invite-message">
                  Personal message <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                  id="invite-message"
                  className={styles.textarea}
                  placeholder="Add a personal note to the invitation..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </form>

            {/* Footer */}
            <div className={styles.footer}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className={styles.spinnerWrap}>
                    <Spinner />
                    <span>Sending...</span>
                  </span>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Send Invite
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function RoleCard({
  value,
  selected,
  onSelect,
  title,
  description,
  icon,
}: {
  value: string;
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`${styles.roleCard} ${selected ? styles.roleCardSelected : ''}`}
      onClick={onSelect}
    >
      <div className={styles.roleCardHeader}>
        <span className={styles.roleIcon}>{icon}</span>
        <span className={styles.roleTitle}>{title}</span>
        {selected && (
          <motion.span
            className={styles.roleCheck}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" fill="var(--text-secondary)" />
              <path d="M3.5 6l2 2 3-3" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        )}
      </div>
      <p className={styles.roleDescription}>{description}</p>
    </button>
  );
}

function Spinner() {
  return (
    <svg className={styles.spinner} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 14" strokeLinecap="round" />
    </svg>
  );
}
