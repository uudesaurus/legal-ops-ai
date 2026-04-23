import { ComingSoon } from '@/components/features/ComingSoon';

export default function ContractReviewPage() {
  return (
    <ComingSoon
      title="Contract Review"
      description="Streamline contract lifecycle management with AI-assisted analysis, automated redlines, and intelligent clause matching."
      features={[
        'AI-powered clause detection and risk flagging',
        'Automated redline against standard templates',
        'Counterparty negotiation timeline',
        'e-Signature integration (DocuSign, HelloSign)',
        'Version comparison and audit trail',
      ]}
      estimatedQuarter="Q3 2026"
      workflowIcon="document"
      backUrl="/dashboard"
    />
  );
}
