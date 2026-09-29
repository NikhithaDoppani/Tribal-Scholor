import type { DocumentIntelligenceResult, CheckStatus } from '@/types';
import { analyzeAllDocuments, getMissingDocuments } from './documentIntelligenceService';
import { schemes } from '@/config/schemes';
import type { SchemeId } from '@/types';

const DISCLAIMER = 'AI-assisted verification. Final verification is performed by an authorised officer.';

export interface VerificationSummary {
  applicationId: string;
  totalDocuments: number;
  verified: number;
  requiresReview: number;
  rejected: number;
  missing: string[];
  confidenceAverage: number;
  results: DocumentIntelligenceResult[];
  recommendation: 'verified' | 'requires_review' | 'rejected';
  note: string;
}

export function runVerification(
  applicationId: string,
  applicantName: string,
  schemeId: SchemeId
): VerificationSummary {
  const results = analyzeAllDocuments(applicationId, applicantName);
  const scheme = schemes[schemeId];
  const requiredDocIds = scheme.requiredDocuments.map((d) => d.id);
  const missing = getMissingDocuments(applicationId, requiredDocIds);

  const verified = results.filter((r) => r.overallStatus === 'verified').length;
  const requiresReview = results.filter((r) => r.overallStatus === 'requires_review').length;
  const rejected = results.filter((r) => r.overallStatus === 'rejected').length;

  const confidenceAverage = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.confidence, 0) / results.length)
    : 0;

  let recommendation: VerificationSummary['recommendation'] = 'requires_review';
  if (missing.length === 0 && rejected === 0 && requiresReview === 0 && verified === results.length) {
    recommendation = 'verified';
  } else if (rejected > 0 || missing.length > 2) {
    recommendation = 'rejected';
  }

  return {
    applicationId,
    totalDocuments: results.length,
    verified,
    requiresReview,
    rejected,
    missing,
    confidenceAverage,
    results,
    recommendation,
    note: DISCLAIMER,
  };
}

export function getCheckIcon(status: CheckStatus): 'pass' | 'warn' | 'fail' {
  switch (status) {
    case 'satisfied': return 'pass';
    case 'requires_verification': return 'warn';
    case 'not_satisfied': return 'fail';
  }
}

export { DISCLAIMER };
