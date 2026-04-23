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
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8h16M6 14h10M6 20h13"
                stroke="var(--text-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="22"
                cy="8"
                r="2"
                fill="var(--accent-warm)"
                opacity="0.8"
              />
            </svg>
          </div>

          <div className={styles.wordmark}>
            <h1 className={styles.firmName}>KARNA</h1>
            <p className={styles.productName}>Legal Ops AI</p>
          </div>

          <div className={styles.divider} />

          <p className={styles.tagline}>
            Legal operations, elevated.
          </p>
        </div>

        {/* Clerk Sign-In */}
        <div className={styles.clerkContainer}>
          <SignIn />
        </div>

        {/* Footer */}
        <p className={styles.footer}>
          Private access — KARNA Partnership internal platform.
          <br />
          <a href="https://karnapartnership.com" target="_blank" rel="noopener">
            karnapartnership.com
          </a>
        </p>
      </div>
    </div>
  );
}
