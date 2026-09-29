import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, Send, Check } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { applicantNavItems } from '@/config/applicantNav';
import { schemes } from '@/config/schemes';
import type { SchemeId } from '@/types';
import { SchemeSelectionStep } from './application-steps/SchemeSelectionStep';
import { PersonalDetailsStep } from './application-steps/PersonalDetailsStep';
import { AcademicDetailsStep } from './application-steps/AcademicDetailsStep';
import { EligibilityDetailsStep } from './application-steps/EligibilityDetailsStep';
import { BankDetailsStep } from './application-steps/BankDetailsStep';
import { DocumentsStep } from './application-steps/DocumentsStep';
import { DeclarationStep } from './application-steps/DeclarationStep';
import { ReviewSubmitStep } from './application-steps/ReviewSubmitStep';

const stepLabels = [
  'Scheme Selection',
  'Personal Details',
  'Academic Details',
  'Eligibility Details',
  'Bank Details',
  'Documents',
  'Declaration',
  'Review & Submit',
];

const emptyForm = {
  personal: { fullName: '', fatherName: '', motherName: '', dateOfBirth: '', gender: '', category: '', community: '', aadhaar: '', phone: '', email: '', state: '', district: '', address: '', pincode: '' },
  academic: { qualification: '', university: '', yearOfPassing: '', percentage: '', programme: '', researchTopic: '', studyCategory: '' },
  eligibility: { belongsToST: false, hasAdmission: false, income: '', incomeBelowThreshold: false, ageConfirmed: false, declaration: false },
  bank: { accountHolder: '', accountNumber: '', ifscCode: '', bankName: '', branch: '' },
  documents: {} as Record<string, { uploaded: boolean; fileName: string }>,
  declaration: { confirmed: false, signature: '', date: '' },
};

export function NewApplicationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [schemeId, setSchemeId] = useState<SchemeId | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftSaved, setDraftSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updatePersonal = (field: string, value: string) => setForm({ ...form, personal: { ...form.personal, [field]: value } });
  const updateAcademic = (field: string, value: string) => setForm({ ...form, academic: { ...form.academic, [field]: value } });
  const updateEligibility = (field: string, value: string | boolean) => setForm({ ...form, eligibility: { ...form.eligibility, [field]: value } });
  const updateBank = (field: string, value: string) => setForm({ ...form, bank: { ...form.bank, [field]: value } });
  const updateDeclaration = (field: string, value: string | boolean) => setForm({ ...form, declaration: { ...form.declaration, [field]: value } });

  const handleUpload = (docId: string, fileName: string) => setForm({ ...form, documents: { ...form.documents, [docId]: { uploaded: true, fileName } } });
  const handleRemove = (docId: string) => {
    const docs = { ...form.documents };
    delete docs[docId];
    setForm({ ...form, documents: docs });
  };

  const validateStep = (stepNum: number): boolean => {
    const errs: Record<string, string> = {};

    if (stepNum === 0 && !schemeId) {
      errs.scheme = 'Please select a scheme to continue.';
    }

    if (stepNum === 1) {
      if (!form.personal.fullName) errs.fullName = 'Full name is required.';
      if (!form.personal.dateOfBirth) errs.dateOfBirth = 'Date of birth is required.';
      if (!form.personal.community) errs.community = 'Community / Tribe is required.';
      if (!form.personal.aadhaar) errs.aadhaar = 'Aadhaar number is required.';
      if (!form.personal.phone) errs.phone = 'Phone number is required.';
      if (!form.personal.email) errs.email = 'Email is required.';
      if (!form.personal.state) errs.state = 'State is required.';
      if (!form.personal.address) errs.address = 'Address is required.';
      if (!form.personal.pincode) errs.pincode = 'Pincode is required.';
    }

    if (stepNum === 2) {
      if (!form.academic.qualification) errs.qualification = 'Qualification is required.';
      if (!form.academic.university) errs.university = 'University is required.';
      if (!form.academic.yearOfPassing) errs.yearOfPassing = 'Year of passing is required.';
      if (!form.academic.percentage) errs.percentage = 'Percentage / CGPA is required.';
      if (!form.academic.programme) errs.programme = 'Programme is required.';
      if (!form.academic.studyCategory) errs.studyCategory = 'Study category is required.';
      if (!form.academic.researchTopic) errs.researchTopic = 'Research topic is required.';
    }

    if (stepNum === 3) {
      if (!form.eligibility.belongsToST) errs.belongsToST = 'Please confirm this requirement.';
      if (!form.eligibility.hasAdmission) errs.hasAdmission = 'Please confirm this requirement.';
      if (!form.eligibility.incomeBelowThreshold) errs.incomeBelowThreshold = 'Please confirm this requirement.';
      if (!form.eligibility.ageConfirmed) errs.ageConfirmed = 'Please confirm this requirement.';
      if (!form.eligibility.income) errs.income = 'Annual family income is required.';
    }

    if (stepNum === 4) {
      if (!form.bank.accountHolder) errs.accountHolder = 'Account holder name is required.';
      if (!form.bank.accountNumber) errs.accountNumber = 'Account number is required.';
      if (!form.bank.ifscCode) errs.ifscCode = 'IFSC code is required.';
      if (!form.bank.bankName) errs.bankName = 'Bank name is required.';
    }

    if (stepNum === 5) {
      const scheme = schemeId ? schemes[schemeId] : null;
      const docs = scheme?.requiredDocuments || [];
      docs.forEach((doc) => {
        if (!form.documents[doc.id]?.uploaded) {
          errs[doc.id] = 'Please upload this document.';
        }
      });
    }

    if (stepNum === 6) {
      if (!form.declaration.confirmed) errs.confirmed = 'Please accept the declaration.';
      if (!form.declaration.signature) errs.signature = 'Signature is required.';
      if (!form.declaration.date) errs.date = 'Date is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAll = (): boolean => {
    for (let i = 0; i <= 6; i++) {
      if (!validateStep(i)) {
        setStep(i);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step) && step < stepLabels.length - 1) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleSubmit = () => {
    if (validateAll()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <AppShell items={applicantNavItems} activePath="/applicant/applications/new">
        <header className="flex h-16 shrink-0 items-center border-b border-ink-200 bg-white px-8">
          <div>
            <p className="text-eyebrow">Application</p>
            <h1 className="font-serif text-lg font-medium text-ink-950">New Application</h1>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-8">
            <div className="mx-auto max-w-lg border border-forest-300 bg-forest-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest-500">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-serif text-xl font-medium text-forest-800">Application Submitted</h2>
              <p className="mt-2 text-sm text-forest-700">
                Your application has been submitted successfully. You will receive a notification once verification begins.
              </p>
              <p className="mt-3 font-mono text-xs text-forest-600">Application ID: MOTA-NFST-2026-00153</p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={() => navigate('/applicant/applications')} className="btn-primary">
                  View My Applications
                </button>
                <button onClick={() => navigate('/applicant/dashboard')} className="btn-secondary">
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell items={applicantNavItems} activePath="/applicant/applications/new">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Application</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">New Application</h1>
        </div>
        {draftSaved && (
          <span className="text-sm font-medium text-forest-600">Draft saved</span>
        )}
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          {/* Step indicator */}
          <div className="mb-8 border border-ink-200 bg-white p-4">
            <div className="flex flex-wrap gap-1">
              {stepLabels.map((label, idx) => {
                const isComplete = idx < step;
                const isCurrent = idx === step;
                return (
                  <div key={label} className="flex items-center">
                    <div
                      className={`flex h-7 w-7 items-center justify-center border text-2xs font-semibold ${
                        isComplete
                          ? 'border-forest-500 bg-forest-500 text-white'
                          : isCurrent
                            ? 'border-ink-950 bg-ink-950 text-white'
                            : 'border-ink-300 bg-white text-ink-400'
                      }`}
                    >
                      {isComplete ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                    </div>
                    <span className={`ml-2 hidden text-xs font-medium lg:inline ${isCurrent ? 'text-ink-950' : isComplete ? 'text-forest-700' : 'text-ink-400'}`}>
                      {label}
                    </span>
                    {idx < stepLabels.length - 1 && <div className="mx-2 h-px w-4 bg-ink-200 lg:w-6" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div className="max-w-3xl border border-ink-200 bg-white p-6 lg:p-8">
            {step === 0 && (
              <SchemeSelectionStep
                selectedScheme={schemeId}
                onSelect={(id) => { setSchemeId(id); setErrors({}); }}
                error={errors.scheme}
              />
            )}
            {step === 1 && (
              <PersonalDetailsStep data={form.personal} onChange={updatePersonal} errors={errors} />
            )}
            {step === 2 && (
              <AcademicDetailsStep schemeId={schemeId} data={form.academic} onChange={updateAcademic} errors={errors} />
            )}
            {step === 3 && (
              <EligibilityDetailsStep data={form.eligibility} onChange={updateEligibility} errors={errors} />
            )}
            {step === 4 && (
              <BankDetailsStep data={form.bank} onChange={updateBank} errors={errors} />
            )}
            {step === 5 && (
              <DocumentsStep
                schemeId={schemeId}
                data={form.documents}
                onUpload={handleUpload}
                onRemove={handleRemove}
                errors={errors}
              />
            )}
            {step === 6 && (
              <DeclarationStep data={form.declaration} onChange={updateDeclaration} errors={errors} />
            )}
            {step === 7 && (
              <ReviewSubmitStep
                schemeId={schemeId}
                personal={form.personal}
                academic={form.academic}
                eligibility={form.eligibility}
                bank={form.bank}
                documents={form.documents}
                declaration={form.declaration}
                errors={errors}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {/* Navigation buttons */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {step > 0 && (
                <button onClick={handlePrev} className="btn-secondary">
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
              )}
              <button onClick={handleSaveDraft} className="btn-ghost">
                <Save className="h-4 w-4" />
                Save Draft
              </button>
            </div>
            <div className="flex items-center gap-2">
              {step < stepLabels.length - 1 ? (
                <button onClick={handleNext} className="btn-primary">
                  Save &amp; Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn-primary">
                  <Send className="h-4 w-4" />
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
