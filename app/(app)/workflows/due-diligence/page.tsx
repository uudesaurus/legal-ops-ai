import { ComingSoon } from '@/components/features/ComingSoon';

export default function DueDiligencePage() {
  return (
    <ComingSoon
      title="Due Diligence"
      description="Comprehensive M&A due diligence workspace with document management, checklist tracking, and team collaboration."
      features={[
        'Virtual data room with granular permissions',
        'Smart document classification and indexing',
        'Diligence checklist with assignee tracking',
        'Issue flagging and resolution workflow',
        'Automated findings summary generation',
      ]}
      estimatedQuarter="Q3 2026"
      workflowIcon="shield"
      backUrl="/dashboard"
    />
  );
}
