interface BankDetailsStepProps {
  data: {
    accountHolder: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const fields: { key: string; label: string; full?: boolean; placeholder?: string }[] = [
  { key: 'accountHolder', label: 'Account Holder Name', full: true, placeholder: 'As per bank records' },
  { key: 'accountNumber', label: 'Account Number', placeholder: 'Bank account number' },
  { key: 'ifscCode', label: 'IFSC Code', placeholder: 'e.g., SBIN0001234' },
  { key: 'bankName', label: 'Bank Name', placeholder: 'e.g., State Bank of India' },
  { key: 'branch', label: 'Branch Name', placeholder: 'e.g., Ranchi Main' },
];

export function BankDetailsStep({ data, onChange, errors }: BankDetailsStepProps) {
  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-ink-950">Bank Details</h2>
      <p className="mt-1.5 text-sm text-ink-500">Enter your bank account details for scholarship disbursement.</p>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
            <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">{field.label}</label>
            <input
              type="text"
              value={data[field.key as keyof typeof data] || ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="input-field mt-1"
            />
            {errors[field.key] && <p className="mt-1 text-xs text-clay-600">{errors[field.key]}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 border border-saffron-200 bg-saffron-50 p-4">
        <p className="text-xs text-saffron-800">
          Ensure the account holder name matches your bank records. Disbursement will be made to this account only.
        </p>
      </div>
    </div>
  );
}
