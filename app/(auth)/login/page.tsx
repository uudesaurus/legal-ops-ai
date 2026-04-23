"use client";

import { SignIn } from "@clerk/nextjs";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      {/* Ambient fog orbs */}
      <div className={`${styles.fogOrb} ${styles.fogOrbWarm}`} />
      <div className={`${styles.fogOrb} ${styles.fogOrbCool}`} />
      <div className={`${styles.fogOrb} ${styles.fogOrbSmall}`} />

      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoMark}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
              <text x="24" y="32" textAnchor="middle" fill="var(--accent-warm)" fontSize="20" fontFamily="DM Sans, sans-serif" fontWeight="800" letterSpacing="0.05em">K</text>
            </svg>
          </div>

          <div className={styles.wordmark}>
            <h1 className={styles.firmName}>KARNA</h1>
            <p className={styles.productName}>Legal Ops Agent</p>
          </div>

          <div className={styles.divider} />

          <p className={styles.tagline}>
            Legal operations, elevated.
          </p>
        </div>

        {/* Clerk Sign-In */}
        <div className={styles.clerkContainer}>
          <SignIn
            appearance={{
              variables: {
                colorBackground: 'var(--surface)',
                colorInputBackground: 'var(--bg-secondary)',
                colorInputText: 'var(--text-primary)',
                colorText: 'var(--text-primary)',
                colorTextSecondary: 'var(--text-secondary)',
                colorPrimary: 'var(--accent-warm)',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
              },
              elements: {
                card: {
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  boxShadow: 'none',
                  width: '100%',
                  maxWidth: '100%',
                },
                header: {
                  display: 'none',
                },
                formButtonPrimary: {
                  backgroundColor: 'var(--accent-warm)',
                  color: 'var(--bg)',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  width: '100%',
                },
                formButtonPrimaryHover: {
                  opacity: '0.9',
                },
                formButtonPrimaryFocus: {
                  opacity: '0.85',
                },
                formFieldInput: {
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                },
                formFieldLabel: {
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                },
                formFieldHint: {
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                },
                footer: {
                  display: 'none',
                },
                dividerText: {
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                },
                socialButtonsBlockButton: {
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                },
                socialButtonsBlockButtonText: {
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                },
                otpCodeFieldInput: {
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                },
                badge: {
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                },
              },
            }}
          />
        </div>

        {/* Footer */}
        <p className={styles.footer}>
          Private access — KARNA Legal Ops Agent internal platform.
          <br />
          <a href="https://karnapartnership.com" target="_blank" rel="noopener">
            karnapartnership.com
          </a>
        </p>
      </div>
    </div>
  );
}
