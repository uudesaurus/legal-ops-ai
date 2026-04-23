import { redirect } from 'next/navigation';

// Root page — redirect to dashboard
// The authenticated layout is in (app)/layout.tsx
export default function RootPage() {
  redirect('/dashboard');
}
