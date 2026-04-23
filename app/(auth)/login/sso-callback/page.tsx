'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { HandleSSOCallback } from '@clerk/react';
import styles from './sso-callback.module.css';

function LoadingSpinner() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <p>Completing sign in...</p>
    </div>
  );
}

export default function SSOCallbackPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Suspense fallback={<LoadingSpinner />}>
        <HandleSSOCallback
          navigateToApp={() => router.push('/dashboard')}
          navigateToSignIn={() => router.push('/login')}
          navigateToSignUp={() => router.push('/login')}
        />
      </Suspense>
    </div>
  );
}
