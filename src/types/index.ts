export type SchemeId = 'nfst' | 'nos';

export type StudyLevel = 'Doctoral' | 'Post-Doctoral' | 'Postgraduate' | 'Undergraduate';

export type Destination = 'India' | 'Abroad';

export type ApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Verification'
  | 'Deficiency Raised'
  | 'Eligible'
  | 'Under Screening'
  | 'Selected'
  | 'Not Selected';

export type ApplicationStage =
  | 'Submitted'
  | 'Eligibility'
  | 'Documents'
  | 'Screening'
  | 'Selection';

export type DocumentStatus =
  | 'Not Uploaded'
  | 'Uploaded'
  | 'Under Verification'
  | 'Verified'
  | 'Deficient'
  | 'Rejected';

export type UserRole = 'applicant' | 'verification' | 'selection' | 'admin';

export interface SchemeField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'file' | 'number' | 'radio';
  required: boolean;
  section: 'personal' | 'academic' | 'financial' | 'documents';
  options?: string[];
  placeholder?: string;
}

export interface RequiredDocument {
  id: string;
  label: string;
  description: string;
  format: 'PDF' | 'JPG' | 'PDF/JPG';
  maxSize: string;
}

export interface EligibilityRule {
  id: string;
  label: string;
  description: string;
  category: 'demographic' | 'academic' | 'financial' | 'other';
}

export interface ScreeningCriterion {
  id: string;
  label: string;
  weight: number;
  description: string;
}

export interface Scheme {
  id: SchemeId;
  code: string;
  name: string;
  shortName: string;
  description: string;
  purpose: string;
  studyLevel: StudyLevel;
  destination: Destination;
  status: 'Open' | 'Closed' | 'Upcoming';
  applicationOpen: string;
  applicationClose: string;
  overview: string;
  whoCanApply: string[];
  studyCategory: string[];
  applicationProcess: string[];
  importantInfo: string[];
  applicationFields: SchemeField[];
  requiredDocuments: RequiredDocument[];
  eligibilityRules: EligibilityRule[];
  screeningCriteria: ScreeningCriterion[];
}

export interface Application {
  id: string;
  applicantName: string;
  applicantId: string;
  schemeId: SchemeId;
  schemeName: string;
  programme: string;
  submittedDate: string;
  currentStage: ApplicationStage;
  status: ApplicationStatus;
  state: string;
  documentsTotal: number;
  documentsVerified: number;
  eligibilityStatus: 'Pending' | 'Eligible' | 'Not Eligible';
  lastUpdated: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface AuditEvent {
  id: string;
  applicationId: string;
  timestamp: string;
  actor: string;
  action: string;
  detail: string;
}

export interface DemoUser {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  email: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'default' | 'warning' | 'success' | 'info';
}

export interface ApplicantProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  community: string;
  state: string;
  district: string;
  address: string;
  pincode: string;
  aadhaar: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
}

export interface DocumentRecord {
  id: string;
  applicationId: string;
  documentId: string;
  label: string;
  status: DocumentStatus;
  uploadedDate: string | null;
  verifiedDate: string | null;
  fileName: string | null;
  fileSize: string | null;
  remarks: string | null;
}

export interface TimelineEvent {
  id: string;
  applicationId: string;
  timestamp: string;
  stage: string;
  action: string;
  actor: string;
  detail: string;
  actionRequired: boolean;
}

export type CheckStatus = 'satisfied' | 'requires_verification' | 'not_satisfied';

export interface DocumentField {
  label: string;
  value: string;
}

export interface DocumentCheck {
  label: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}

export interface DocumentIntelligenceResult {
  documentId: string;
  documentLabel: string;
  classification: string;
  confidence: number;
  readable: boolean;
  fields: DocumentField[];
  checks: DocumentCheck[];
  isDuplicate: boolean;
  duplicateOf?: string;
  overallStatus: 'verified' | 'requires_review' | 'rejected';
}

export interface EligibilityCheckResult {
  ruleId: string;
  ruleLabel: string;
  ruleDescription: string;
  category: string;
  status: CheckStatus;
  detail: string;
  aiAssisted: boolean;
}

export interface EligibilityAssessment {
  schemeId: SchemeId;
  results: EligibilityCheckResult[];
  overallStatus: 'eligible' | 'requires_verification' | 'not_eligible';
  note: string;
}

export interface OfficerComment {
  id: string;
  officerName: string;
  officerRole: string;
  timestamp: string;
  comment: string;
}

export interface Deficiency {
  id: string;
  applicationId: string;
  documentId: string;
  documentLabel: string;
  reason: string;
  comment: string;
  responseDeadline: string;
  raisedBy: string;
  raisedDate: string;
  status: 'open' | 'resolved';
}

export interface ScreeningScore {
  criterionId: string;
  criterionLabel: string;
  weight: number;
  score: number;
  maxScore: number;
  rationale: string;
  aiAssisted: boolean;
}

export interface ScreeningResult {
  applicationId: string;
  scores: ScreeningScore[];
  totalScore: number;
  maxTotalScore: number;
  percentile: number;
  status: 'pending' | 'scored' | 'shortlisted' | 'not_shortlisted' | 'selected' | 'not_selected';
  assessedBy: string;
  assessedDate: string;
  confirmedBy?: string;
  confirmedDate?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  applicationId: string;
  action: string;
  previousStatus: string;
  newStatus: string;
}

export interface ApplicationFormData {
  schemeId: string;
  personal: {
    fullName: string;
    fatherName: string;
    motherName: string;
    dateOfBirth: string;
    gender: string;
    category: string;
    community: string;
    aadhaar: string;
    phone: string;
    email: string;
    state: string;
    district: string;
    address: string;
    pincode: string;
  };
  academic: {
    qualification: string;
    university: string;
    yearOfPassing: string;
    percentage: string;
    programme: string;
    researchTopic: string;
    studyCategory: string;
  };
  eligibility: {
    belongsToST: boolean;
    hasAdmission: boolean;
    income: string;
    incomeBelowThreshold: boolean;
    ageConfirmed: boolean;
    declaration: boolean;
  };
  bank: {
    accountHolder: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
  documents: Record<string, { uploaded: boolean; fileName: string }>;
  declaration: {
    confirmed: boolean;
    signature: string;
    date: string;
  };
}
