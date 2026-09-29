import type { DocumentIntelligenceResult, DocumentField, DocumentCheck } from '@/types';
import { documentRecords } from '@/data/mockData';

const DISCLAIMER = 'AI-assisted verification. Final verification is performed by an authorised officer.';

const mockDocumentData: Record<string, { classification: string; fields: DocumentField[]; confidence: number }> = {
  st_cert: {
    classification: 'Scheduled Tribe Certificate',
    confidence: 94,
    fields: [
      { label: 'Name', value: 'Rahul Kumar' },
      { label: 'Certificate No', value: 'DEMO-ST-20481' },
      { label: 'Issue Date', value: '14/05/2026' },
      { label: 'Issuing Authority', value: 'District Welfare Office, Ranchi' },
    ],
  },
  income_cert: {
    classification: 'Family Income Certificate',
    confidence: 91,
    fields: [
      { label: 'Name', value: 'Suresh Kumar (Father)' },
      { label: 'Annual Income', value: 'Rs. 1,50,000' },
      { label: 'Certificate No', value: 'DEMO-INC-11342' },
      { label: 'Issue Date', value: '02/04/2026' },
      { label: 'Issuing Authority', value: 'Tehsildar, Kanke' },
    ],
  },
  admission_proof: {
    classification: 'Proof of Admission',
    confidence: 97,
    fields: [
      { label: 'Candidate Name', value: 'Rahul Kumar' },
      { label: 'Programme', value: 'Ph.D. — Computer Science' },
      { label: 'University', value: 'IIT Kharagpur' },
      { label: 'Admission Date', value: '01/08/2026' },
      { label: 'Reference No', value: 'IITKGP/PHD/2026/04471' },
    ],
  },
  marksheet_pg: {
    classification: 'Postgraduate Marksheet',
    confidence: 89,
    fields: [
      { label: 'Candidate Name', value: 'Rahul Kumar' },
      { label: 'Degree', value: 'M.Tech — Computer Science' },
      { label: 'University', value: 'BIT Mesra' },
      { label: 'Year', value: '2024' },
      { label: 'Percentage', value: '78.4%' },
    ],
  },
  research_proposal: {
    classification: 'Research Proposal',
    confidence: 85,
    fields: [
      { label: 'Candidate Name', value: 'Rahul Kumar' },
      { label: 'Topic', value: 'Machine Learning for Tribal Language Preservation' },
      { label: 'Pages', value: '12' },
      { label: 'Date', value: '10/09/2026' },
    ],
  },
  photo: {
    classification: 'Passport-size Photograph',
    confidence: 99,
    fields: [
      { label: 'Format', value: 'JPG' },
      { label: 'Dimensions', value: '35mm x 45mm' },
    ],
  },
  passport: {
    classification: 'Valid Passport',
    confidence: 92,
    fields: [
      { label: 'Name', value: 'Rahul Kumar' },
      { label: 'Passport No', value: 'T1234567' },
      { label: 'Issue Date', value: '15/03/2023' },
      { label: 'Expiry Date', value: '14/03/2033' },
    ],
  },
  admission_letter: {
    classification: 'Foreign University Admission Letter',
    confidence: 95,
    fields: [
      { label: 'Candidate Name', value: 'Lalrempuii Chhangte' },
      { label: 'University', value: 'Technical University of Munich' },
      { label: 'Programme', value: 'M.S. — Mechanical Engineering' },
      { label: 'Admission Date', value: '01/10/2026' },
    ],
  },
};

function buildChecks(
  documentId: string,
  applicantName: string,
  fields: DocumentField[],
  confidence: number,
  isDuplicate: boolean
): DocumentCheck[] {
  const checks: DocumentCheck[] = [];

  checks.push({
    label: 'Document readable',
    status: confidence > 70 ? 'pass' : 'fail',
    detail: confidence > 70 ? 'Text and fields are clearly legible' : 'Document quality is poor — rescan recommended',
  });

  const requiredFields = fields.length;
  checks.push({
    label: 'Required fields detected',
    status: requiredFields >= 3 ? 'pass' : 'warn',
    detail: `${requiredFields} field(s) detected via OCR-style extraction`,
  });

  const nameField = fields.find((f) => f.label.toLowerCase().includes('name'));
  if (nameField) {
    const nameMatches = nameField.value.toLowerCase().includes(applicantName.toLowerCase().split(' ')[0]);
    checks.push({
      label: 'Name matches application',
      status: nameMatches ? 'pass' : 'warn',
      detail: nameMatches
        ? `Extracted name "${nameField.value}" is consistent with applicant "${applicantName}"`
        : `Extracted name "${nameField.value}" differs from applicant "${applicantName}" — manual check required`,
    });
  }

  checks.push({
    label: 'Duplicate detection',
    status: isDuplicate ? 'fail' : 'pass',
    detail: isDuplicate ? 'This document appears to be a duplicate of another upload' : 'No duplicates detected across uploads',
  });

  checks.push({
    label: 'Manual verification required',
    status: 'warn',
    detail: 'AI-assisted check complete. An authorised officer must confirm the final verification.',
  });

  return checks;
}

export function analyzeDocument(
  documentId: string,
  documentLabel: string,
  applicantName: string,
  _fileName?: string
): DocumentIntelligenceResult {
  const mock = mockDocumentData[documentId] || {
    classification: documentLabel,
    confidence: 80,
    fields: [{ label: 'Document Type', value: documentLabel }],
  };

  const allDocs = documentRecords.filter((d) => d.documentId === documentId);
  const isDuplicate = allDocs.length > 1;

  const checks = buildChecks(documentId, applicantName, mock.fields, mock.confidence, isDuplicate);

  let overallStatus: DocumentIntelligenceResult['overallStatus'] = 'requires_review';
  if (mock.confidence >= 90 && !isDuplicate) {
    const hasNameMismatch = checks.some((c) => c.label === 'Name matches application' && c.status === 'fail');
    if (!hasNameMismatch) overallStatus = 'verified';
  }
  if (isDuplicate || mock.confidence < 60) overallStatus = 'rejected';

  return {
    documentId,
    documentLabel,
    classification: mock.classification,
    confidence: mock.confidence,
    readable: mock.confidence > 70,
    fields: mock.fields,
    checks,
    isDuplicate,
    duplicateOf: isDuplicate ? allDocs[0]?.applicationId : undefined,
    overallStatus,
  };
}

export function analyzeAllDocuments(
  applicationId: string,
  applicantName: string
): DocumentIntelligenceResult[] {
  const docs = documentRecords.filter((d) => d.applicationId === applicationId);
  return docs.map((doc) => analyzeDocument(doc.documentId, doc.label, applicantName, doc.fileName || undefined));
}

export function getMissingDocuments(applicationId: string, requiredDocIds: string[]): string[] {
  const uploaded = documentRecords
    .filter((d) => d.applicationId === applicationId)
    .map((d) => d.documentId);
  return requiredDocIds.filter((id) => !uploaded.includes(id));
}

export { DISCLAIMER };
