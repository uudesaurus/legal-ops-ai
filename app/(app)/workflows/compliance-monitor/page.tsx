import { ComingSoon } from '@/components/features/ComingSoon';

export default function ComplianceMonitorPage() {
  return (
    <ComingSoon
      title="Compliance Monitor"
      description="Continuous regulatory compliance monitoring with real-time sanctions screening, PEP checks, and adverse media alerts."
      features={[
        'Real-time sanctions list screening (OFAC, EU, UN)',
        'PEP (Politically Exposed Person) database checks',
        'Adverse media and news monitoring',
        'Automated alert triage and workflow routing',
        'Compliance report generation for regulators',
      ]}
      estimatedQuarter="Q3 2026"
      workflowIcon="radar"
      backUrl="/dashboard"
    />
  );
}
