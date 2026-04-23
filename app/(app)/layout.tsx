import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { AppShell } from '@/components/layout/AppShell';
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
      <AppShell>{children}</AppShell>
      <ToastContainer />
    </ToastProvider>
  );
}
