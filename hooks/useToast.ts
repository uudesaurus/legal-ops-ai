'use client';

import { useCallback } from 'react';
import { useToastContext } from '@/contexts/ToastContext';

export function useToast() {
  const { addToast } = useToastContext();

  const success = useCallback(
    (message: string) => addToast('success', message),
    [addToast]
  );

  const error = useCallback(
    (message: string) => addToast('error', message),
    [addToast]
  );

  const warning = useCallback(
    (message: string) => addToast('warning', message),
    [addToast]
  );

  const info = useCallback(
    (message: string) => addToast('info', message),
    [addToast]
  );

  return { success, error, warning, info };
}
