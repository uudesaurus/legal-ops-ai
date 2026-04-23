import { ComingSoon } from '@/components/features/ComingSoon';

export default function EntityManagementPage() {
  return (
    <ComingSoon
      title="Entity Management"
      description="Corporate secretarial automation for entity lifecycle management, officer tracking, and regulatory filings."
      features={[
        'Multi-entity hierarchy visualization',
        'Officer appointment and resignation tracking',
        'Automated regulatory filing calendar',
        'Share capital table management',
        'Document storage and retrieval',
      ]}
      estimatedQuarter="Q4 2026"
      workflowIcon="building"
      backUrl="/dashboard"
    />
  );
}
