import type { SchemeId, ScreeningScore, ScreeningResult } from '@/types';
import { schemes } from '@/config/schemes';

const DISCLAIMER = 'Prototype configuration — replace with officially approved scheme criteria.';

const mockScores: Record<string, ScreeningScore[]> = {
  'MOTA-NFST-2026-00131': [
    { criterionId: 'academic_record', criterionLabel: 'Academic Record', weight: 30, score: 26, maxScore: 30, rationale: '78.4% in PG, consistent academic performance', aiAssisted: true },
    { criterionId: 'research_proposal', criterionLabel: 'Research Proposal', weight: 35, score: 30, maxScore: 35, rationale: 'Well-structured proposal with clear methodology and feasible scope', aiAssisted: true },
    { criterionId: 'interview', criterionLabel: 'Interview', weight: 25, score: 22, maxScore: 25, rationale: 'Strong presentation and subject knowledge demonstrated', aiAssisted: false },
    { criterionId: 'diversity', criterionLabel: 'Diversity Factor', weight: 10, score: 8, maxScore: 10, rationale: 'Underrepresented state and subject category', aiAssisted: true },
  ],
  'MOTA-NFST-2026-00119': [
    { criterionId: 'academic_record', criterionLabel: 'Academic Record', weight: 30, score: 28, maxScore: 30, rationale: '82.1% in PG, excellent academic record', aiAssisted: true },
    { criterionId: 'research_proposal', criterionLabel: 'Research Proposal', weight: 35, score: 27, maxScore: 35, rationale: 'Good proposal but lacks methodological detail', aiAssisted: true },
    { criterionId: 'interview', criterionLabel: 'Interview', weight: 25, score: 20, maxScore: 25, rationale: 'Satisfactory interview performance', aiAssisted: false },
    { criterionId: 'diversity', criterionLabel: 'Diversity Factor', weight: 10, score: 5, maxScore: 10, rationale: 'Well-represented state and subject', aiAssisted: true },
  ],
  'MOTA-NFST-2026-00115': [
    { criterionId: 'academic_record', criterionLabel: 'Academic Record', weight: 30, score: 24, maxScore: 30, rationale: '75.2% in PG, above average', aiAssisted: true },
    { criterionId: 'research_proposal', criterionLabel: 'Research Proposal', weight: 35, score: 22, maxScore: 35, rationale: 'Proposal needs refinement in research questions', aiAssisted: true },
    { criterionId: 'interview', criterionLabel: 'Interview', weight: 25, score: 18, maxScore: 25, rationale: 'Average interview performance', aiAssisted: false },
    { criterionId: 'diversity', criterionLabel: 'Diversity Factor', weight: 10, score: 7, maxScore: 10, rationale: 'Moderate diversity contribution', aiAssisted: true },
  ],
  'MOTA-NOS-2026-00038': [
    { criterionId: 'academic_record', criterionLabel: 'Academic Record', weight: 35, score: 32, maxScore: 35, rationale: '85.3% in qualifying degree', aiAssisted: true },
    { criterionId: 'university_ranking', criterionLabel: 'University Ranking', weight: 25, score: 23, maxScore: 25, rationale: 'Top-100 QS ranked university', aiAssisted: true },
    { criterionId: 'interview', criterionLabel: 'Interview', weight: 30, score: 26, maxScore: 30, rationale: 'Excellent interview, clear career goals', aiAssisted: false },
    { criterionId: 'diversity', criterionLabel: 'Diversity Factor', weight: 10, score: 9, maxScore: 10, rationale: 'Underrepresented state for NOS', aiAssisted: true },
  ],
  'MOTA-NOS-2026-00049': [
    { criterionId: 'academic_record', criterionLabel: 'Academic Record', weight: 35, score: 30, maxScore: 35, rationale: '80.7% in qualifying degree', aiAssisted: true },
    { criterionId: 'university_ranking', criterionLabel: 'University Ranking', weight: 25, score: 20, maxScore: 25, rationale: 'Well-ranked but not top-tier', aiAssisted: true },
    { criterionId: 'interview', criterionLabel: 'Interview', weight: 30, score: 24, maxScore: 30, rationale: 'Good interview performance', aiAssisted: false },
    { criterionId: 'diversity', criterionLabel: 'Diversity Factor', weight: 10, score: 6, maxScore: 10, rationale: 'Moderate diversity contribution', aiAssisted: true },
  ],
  'MOTA-NOS-2026-00025': [
    { criterionId: 'academic_record', criterionLabel: 'Academic Record', weight: 35, score: 27, maxScore: 35, rationale: '76.4% in qualifying degree', aiAssisted: true },
    { criterionId: 'university_ranking', criterionLabel: 'University Ranking', weight: 25, score: 18, maxScore: 25, rationale: 'Mid-tier university', aiAssisted: true },
    { criterionId: 'interview', criterionLabel: 'Interview', weight: 30, score: 21, maxScore: 30, rationale: 'Average interview performance', aiAssisted: false },
    { criterionId: 'diversity', criterionLabel: 'Diversity Factor', weight: 10, score: 5, maxScore: 10, rationale: 'Well-represented state', aiAssisted: true },
  ],
  'MOTA-NOS-2026-00031': [
    { criterionId: 'academic_record', criterionLabel: 'Academic Record', weight: 35, score: 31, maxScore: 35, rationale: '83.9% in qualifying degree', aiAssisted: true },
    { criterionId: 'university_ranking', criterionLabel: 'University Ranking', weight: 25, score: 22, maxScore: 25, rationale: 'Well-ranked university', aiAssisted: true },
    { criterionId: 'interview', criterionLabel: 'Interview', weight: 30, score: 25, maxScore: 30, rationale: 'Strong interview performance', aiAssisted: false },
    { criterionId: 'diversity', criterionLabel: 'Diversity Factor', weight: 10, score: 7, maxScore: 10, rationale: 'Moderate diversity contribution', aiAssisted: true },
  ],
};

export function getScreeningResult(applicationId: string, schemeId: SchemeId): ScreeningResult | null {
  const scores = mockScores[applicationId];
  if (!scores) return null;

  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const maxTotalScore = scores.reduce((sum, s) => sum + s.maxScore, 0);

  return {
    applicationId,
    scores,
    totalScore,
    maxTotalScore,
    percentile: Math.round((totalScore / maxTotalScore) * 100),
    status: 'scored',
    assessedBy: 'Arun Mehta (Selection Officer)',
    assessedDate: '25 Sep 2026',
  };
}

export function getSchemeCriteria(schemeId: SchemeId) {
  const scheme = schemes[schemeId];
  return scheme.screeningCriteria;
}

export function getDisclaimer() {
  return DISCLAIMER;
}

export { DISCLAIMER };
