import type { SchemeId, EligibilityAssessment, EligibilityCheckResult } from '@/types';
import { schemes } from '@/config/schemes';
import { applicantProfile } from '@/data/mockData';

const DISCLAIMER = 'Prototype configuration — replace with officially approved scheme criteria.';

export function assessEligibility(
  schemeId: SchemeId,
  applicantName: string,
  formData?: {
    belongsToST: boolean;
    hasAdmission: boolean;
    income: string;
    incomeBelowThreshold: boolean;
    ageConfirmed: boolean;
  }
): EligibilityAssessment {
  const scheme = schemes[schemeId];
  const results: EligibilityCheckResult[] = scheme.eligibilityRules.map((rule) => {
    let status: EligibilityCheckResult['status'] = 'requires_verification';
    let detail = '';

    if (rule.id === 'st_status') {
      const declared = formData?.belongsToST ?? true;
      const profileCategory = applicantProfile.category === 'Scheduled Tribe';
      status = declared && profileCategory ? 'satisfied' : 'not_satisfied';
      detail = declared
        ? 'Applicant declared ST community. Profile category matches.'
        : 'Applicant has not confirmed ST community status.';
    } else if (rule.id === 'admission') {
      const hasAdmission = formData?.hasAdmission ?? true;
      status = hasAdmission ? 'satisfied' : 'not_satisfied';
      detail = hasAdmission
        ? 'Proof of admission uploaded and detected in documents.'
        : 'No valid proof of admission detected.';
    } else if (rule.id === 'income') {
      const incomeDeclared = formData?.incomeBelowThreshold ?? true;
      status = incomeDeclared ? 'satisfied' : 'requires_verification';
      detail = incomeDeclared
        ? 'Applicant declared income within threshold. Income certificate detected.'
        : 'Income certificate requires manual review against scheme threshold.';
    } else if (rule.id === 'age_limit') {
      const ageConfirmed = formData?.ageConfirmed ?? true;
      status = ageConfirmed ? 'satisfied' : 'requires_verification';
      detail = ageConfirmed
        ? 'Applicant confirmed age criteria.'
        : 'Age criteria requires manual verification against scheme guidelines.';
    } else if (rule.id === 'foreign_admission') {
      const hasAdmission = formData?.hasAdmission ?? true;
      status = hasAdmission ? 'satisfied' : 'not_satisfied';
      detail = hasAdmission
        ? 'Admission letter from foreign university detected.'
        : 'No foreign university admission letter detected.';
    } else {
      detail = 'This criterion requires manual verification by an authorised officer.';
    }

    return {
      ruleId: rule.id,
      ruleLabel: rule.label,
      ruleDescription: rule.description,
      category: rule.category,
      status,
      detail,
      aiAssisted: true,
    };
  });

  const allSatisfied = results.every((r) => r.status === 'satisfied');
  const anyNotSatisfied = results.some((r) => r.status === 'not_satisfied');

  const overallStatus: EligibilityAssessment['overallStatus'] = anyNotSatisfied
    ? 'not_eligible'
    : allSatisfied
      ? 'eligible'
      : 'requires_verification';

  return {
    schemeId,
    results,
    overallStatus,
    note: DISCLAIMER,
  };
}

export function getEligibilityStatusLabel(status: EligibilityAssessment['overallStatus']): string {
  switch (status) {
    case 'eligible': return 'Eligible';
    case 'requires_verification': return 'Requires Verification';
    case 'not_eligible': return 'Not Eligible';
  }
}

export { DISCLAIMER };
