interface PersonalDetailsStepProps {
  data: {
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
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const fields: { key: string; label: string; type?: string; full?: boolean; options?: string[] }[] = [
  { key: 'fullName', label: 'Full Name (as per official ID)', full: true },
  { key: 'fatherName', label: 'Father\u2019s Name' },
  { key: 'motherName', label: 'Mother\u2019s Name' },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
  { key: 'gender', label: 'Gender', options: ['Male', 'Female', 'Other'] },
  { key: 'category', label: 'Category', options: ['Scheduled Tribe'] },
  { key: 'community', label: 'Community / Tribe' },
  { key: 'aadhaar', label: 'Aadhaar Number' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Email Address' },
  { key: 'state', label: 'State', options: ['Jharkhand', 'Odisha', 'Madhya Pradesh', 'Chhattisgarh', 'Meghalaya', 'Mizoram', 'Gujarat', 'Maharashtra', 'Assam', 'Arunachal Pradesh', 'West Bengal', 'Rajasthan'] },
  { key: 'district', label: 'District' },
  { key: 'pincode', label: 'Pincode' },
  { key: 'address', label: 'Full Address', full: true },
];

export function PersonalDetailsStep({ data, onChange, errors }: PersonalDetailsStepProps) {
  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-ink-950">Personal Details</h2>
      <p className="mt-1.5 text-sm text-ink-500">Enter your personal information as per official documents.</p>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
            <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">{field.label}</label>
            {field.full ? (
              <textarea
                value={data[field.key as keyof typeof data] || ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                rows={2}
                className="input-field mt-1"
              />
            ) : field.options ? (
              <select
                value={data[field.key as keyof typeof data] || ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="input-field mt-1"
              >
                <option value="">Select…</option>
                {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                value={data[field.key as keyof typeof data] || ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="input-field mt-1"
              />
            )}
            {errors[field.key] && <p className="mt-1 text-xs text-clay-600">{errors[field.key]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
