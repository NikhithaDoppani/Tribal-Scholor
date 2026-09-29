import type { DocumentIntelligenceResult, EligibilityAssessment, EligibilityCheckResult } from '@/types';
import { CheckCircle, AlertTriangle, XCircle, FileText, ScanLine, AlertOctagon } from 'lucide-react';

const DISCLAIMER = 'AI-assisted verification. Final verification is performed by an authorised officer.';

function CheckIcon({ status }: { status: 'pass' | 'warn' | 'fail' }) {
  if (status === 'pass') return <CheckCircle className="h-4 w-4 text-forest-500" />;
  if (status === 'warn') return <AlertTriangle className="h-4 w-4 text-saffron-500" />;
  return <XCircle className="h-4 w-4 text-clay-500" />;
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  const color = confidence >= 90 ? 'bg-forest-500' : confidence >= 75 ? 'bg-saffron-500' : 'bg-clay-500';
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 bg-ink-200">
        <div className={`h-full ${color}`} style={{ width: `${confidence}%` }} />
      </div>
      <span className="text-xs font-medium text-ink-700">{confidence}%</span>
    </div>
  );
}

function OverallStatusBadge({ status }: { status: DocumentIntelligenceResult['overallStatus'] }) {
  const config = {
    verified: { bg: 'bg-forest-50', text: 'text-forest-700', border: 'border-forest-300', label: 'AI Verified' },
    requires_review: { bg: 'bg-saffron-50', text: 'text-saffron-700', border: 'border-saffron-300', label: 'Requires Review' },
    rejected: { bg: 'bg-clay-50', text: 'text-clay-700', border: 'border-clay-300', label: 'AI Flagged' },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 border px-2 py-0.5 text-2xs font-medium ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  );
}

export function DocumentIntelligencePanel({ result }: { result: DocumentIntelligenceResult }) {
  return (
    <div className="border border-ink-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <ScanLine className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-ink-900">{result.documentLabel}</h4>
              <OverallStatusBadge status={result.overallStatus} />
            </div>
            <p className="mt-0.5 text-xs text-ink-500">Classification: {result.classification}</p>
          </div>
        </div>
        <ConfidenceBar confidence={result.confidence} />
      </div>

      {result.fields.length > 0 && (
        <div className="mt-4 border-t border-ink-100 pt-3">
          <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Extracted Fields</p>
          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            {result.fields.map((field) => (
              <div key={field.label}>
                <dt className="text-2xs text-ink-400">{field.label}</dt>
                <dd className="text-sm text-ink-700">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="mt-4 border-t border-ink-100 pt-3">
        <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Automated Checks</p>
        <ul className="mt-2 space-y-1.5">
          {result.checks.map((check) => (
            <li key={check.label} className="flex items-start gap-2">
              <CheckIcon status={check.status} />
              <div>
                <span className="text-sm text-ink-800">{check.label}</span>
                <p className="text-xs text-ink-500">{check.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {result.isDuplicate && (
        <div className="mt-3 flex items-center gap-2 border border-clay-300 bg-clay-50 px-3 py-2">
          <AlertOctagon className="h-4 w-4 text-clay-600" />
          <p className="text-xs text-clay-700">Duplicate document detected — appears in another application.</p>
        </div>
      )}
    </div>
  );
}

export function EligibilityPanel({ assessment }: { assessment: EligibilityAssessment }) {
  const statusConfig: Record<EligibilityCheckResult['status'], { icon: 'pass' | 'warn' | 'fail'; label: string; color: string }> = {
    satisfied: { icon: 'pass', label: 'Satisfied', color: 'text-forest-600' },
    requires_verification: { icon: 'warn', label: 'Requires verification', color: 'text-saffron-600' },
    not_satisfied: { icon: 'fail', label: 'Not satisfied', color: 'text-clay-600' },
  };

  const overallConfig = {
    eligible: { bg: 'bg-forest-50', text: 'text-forest-700', border: 'border-forest-300', label: 'Eligible' },
    requires_verification: { bg: 'bg-saffron-50', text: 'text-saffron-700', border: 'border-saffron-300', label: 'Requires Verification' },
    not_eligible: { bg: 'bg-clay-50', text: 'text-clay-700', border: 'border-clay-300', label: 'Not Eligible' },
  };
  const oc = overallConfig[assessment.overallStatus];

  return (
    <div className="border border-ink-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-ink-900">Eligibility Assessment</h4>
        <span className={`inline-flex items-center gap-1 border px-2 py-0.5 text-2xs font-medium ${oc.bg} ${oc.text} ${oc.border}`}>
          {oc.label}
        </span>
      </div>

      <ul className="mt-4 space-y-3">
        {assessment.results.map((result) => {
          const sc = statusConfig[result.status];
          return (
            <li key={result.ruleId} className="flex items-start gap-2">
              <CheckIcon status={sc.icon} />
              <div>
                <p className="text-sm font-medium text-ink-800">{result.ruleLabel}</p>
                <p className="text-xs text-ink-500">{result.detail}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className={`text-2xs font-medium ${sc.color}`}>{sc.label}</span>
                  {result.aiAssisted && (
                    <span className="text-2xs text-ink-400">· AI-assisted</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 border-t border-ink-100 pt-3">
        <p className="text-xs text-ink-400">{assessment.note}</p>
      </div>
    </div>
  );
}

export function AIDisclaimer() {
  return (
    <div className="flex items-center gap-2 border border-ink-200 bg-ink-50 px-3 py-2">
      <FileText className="h-3.5 w-3.5 text-ink-400" />
      <p className="text-xs text-ink-500">{DISCLAIMER}</p>
    </div>
  );
}
