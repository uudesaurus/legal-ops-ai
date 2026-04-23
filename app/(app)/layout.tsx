import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { AppShell } from '@/components/layout/AppShell';
import { TrialBanner } from '@/components/layout/TrialBanner';
import { ToastProvider } from '@/contexts/ToastContext';
import { ToastContainer } from '@/components/features/Toast';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/login');
  }

  return (
    <ToastProvider>
      <TrialBanner />
      <AppShell>{children}</AppShell>
      <ToastContainer />
    </ToastProvider>
  );
}
