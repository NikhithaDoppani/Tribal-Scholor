import type { SchemeId } from '@/types';
import { schemes } from '@/config/schemes';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ReviewSubmitStepProps {
  schemeId: SchemeId | null;
  personal: Record<string, string>;
  academic: Record<string, string>;
  eligibility: Record<string, string | boolean>;
  bank: Record<string, string>;
  documents: Record<string, { uploaded: boolean; fileName: string }>;
  declaration: { confirmed: boolean; signature: string; date: string };
  errors: Record<string, string>;
  onSubmit: () => void;
}

function ReviewSection({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="border border-ink-200 bg-white">
      <div className="border-b border-ink-100 bg-ink-50 px-4 py-2.5">
        <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      </div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 p-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">{item.label}</dt>
            <dd className="mt-0.5 text-sm text-ink-700">{item.value || '—'}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ReviewSubmitStep({
  schemeId,
  personal,
  academic,
  eligibility,
  bank,
  documents,
  declaration,
  errors,
  onSubmit,
}: ReviewSubmitStepProps) {
  const scheme = schemeId ? schemes[schemeId] : null;
  const docs = scheme?.requiredDocuments || [];
  const allDocsUploaded = docs.every((d) => documents[d.id]?.uploaded);

  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-ink-950">Review &amp; Submit</h2>
      <p className="mt-1.5 text-sm text-ink-500">Review all details before submitting your application.</p>

      {Object.keys(errors).length > 0 && (
        <div className="mt-4 flex items-center gap-2 border border-clay-300 bg-clay-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-clay-600" />
          <p className="text-sm text-clay-700">
            Please complete all required steps before submitting. {Object.keys(errors).length} field(s) need attention.
          </p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <ReviewSection
          title="Scheme"
          items={[
            { label: 'Scheme', value: scheme?.name || '—' },
            { label: 'Code', value: scheme?.code || '—' },
          ]}
        />

        <ReviewSection
          title="Personal Details"
          items={[
            { label: 'Full Name', value: personal.fullName },
            { label: 'Father\u2019s Name', value: personal.fatherName },
            { label: 'Mother\u2019s Name', value: personal.motherName },
            { label: 'Date of Birth', value: personal.dateOfBirth },
            { label: 'Gender', value: personal.gender },
            { label: 'Community / Tribe', value: personal.community },
            { label: 'Aadhaar', value: personal.aadhaar },
            { label: 'Phone', value: personal.phone },
            { label: 'Email', value: personal.email },
            { label: 'State', value: personal.state },
            { label: 'District', value: personal.district },
            { label: 'Pincode', value: personal.pincode },
            { label: 'Address', value: personal.address },
          ]}
        />

        <ReviewSection
          title="Academic Details"
          items={[
            { label: 'Qualification', value: academic.qualification },
            { label: 'University', value: academic.university },
            { label: 'Year of Passing', value: academic.yearOfPassing },
            { label: 'Percentage / CGPA', value: academic.percentage },
            { label: 'Programme', value: academic.programme },
            { label: 'Study Category', value: academic.studyCategory },
            { label: 'Research Topic', value: academic.researchTopic },
          ]}
        />

        <ReviewSection
          title="Eligibility"
          items={[
            { label: 'Belongs to ST', value: eligibility.belongsToST ? 'Yes' : 'No' },
            { label: 'Has Admission', value: eligibility.hasAdmission ? 'Yes' : 'No' },
            { label: 'Income', value: eligibility.income as string },
            { label: 'Income Below Threshold', value: eligibility.incomeBelowThreshold ? 'Yes' : 'No' },
            { label: 'Age Confirmed', value: eligibility.ageConfirmed ? 'Yes' : 'No' },
          ]}
        />

        <ReviewSection
          title="Bank Details"
          items={[
            { label: 'Account Holder', value: bank.accountHolder },
            { label: 'Account Number', value: bank.accountNumber },
            { label: 'IFSC Code', value: bank.ifscCode },
            { label: 'Bank Name', value: bank.bankName },
            { label: 'Branch', value: bank.branch },
          ]}
        />

        <div className="border border-ink-200 bg-white">
          <div className="border-b border-ink-100 bg-ink-50 px-4 py-2.5">
            <h3 className="text-sm font-semibold text-ink-900">Documents</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {docs.map((doc) => {
                const uploaded = documents[doc.id]?.uploaded;
                return (
                  <li key={doc.id} className="flex items-center gap-2 text-sm">
                    {uploaded ? (
                      <CheckCircle className="h-4 w-4 text-forest-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-clay-500" />
                    )}
                    <span className={uploaded ? 'text-ink-700' : 'text-clay-600'}>{doc.label}</span>
                    {uploaded && documents[doc.id]?.fileName && (
                      <span className="text-xs text-ink-400">— {documents[doc.id].fileName}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            {!allDocsUploaded && (
              <p className="mt-3 text-xs text-clay-600">
                Some documents are not uploaded. Please go back to the Documents step to upload all required files.
              </p>
            )}
          </div>
        </div>

        <ReviewSection
          title="Declaration"
          items={[
            { label: 'Confirmed', value: declaration.confirmed ? 'Yes' : 'No' },
            { label: 'Signature', value: declaration.signature },
            { label: 'Date', value: declaration.date },
          ]}
        />
      </div>

      {Object.keys(errors).length === 0 && declaration.confirmed && allDocsUploaded && (
        <div className="mt-6 border border-forest-300 bg-forest-50 p-4">
          <p className="text-sm text-forest-700">
            Your application is ready to submit. Click the Submit Application button below to proceed.
          </p>
        </div>
      )}
    </div>
  );
}
