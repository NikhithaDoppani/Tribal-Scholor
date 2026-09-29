interface EligibilityDetailsStepProps {
  data: {
    belongsToST: boolean;
    hasAdmission: boolean;
    income: string;
    incomeBelowThreshold: boolean;
    ageConfirmed: boolean;
    declaration: boolean;
  };
  onChange: (field: string, value: boolean | string) => void;
  errors: Record<string, string>;
}

const checks: { key: string; label: string; description: string }[] = [
  { key: 'belongsToST', label: 'I belong to a Scheduled Tribe community', description: 'I declare that I belong to a Scheduled Tribe community as notified by the Government of India.' },
  { key: 'hasAdmission', label: 'I have secured admission', description: 'I have secured admission to a full-time programme at a recognised university or institution.' },
  { key: 'incomeBelowThreshold', label: 'Family income is within the prescribed ceiling', description: 'My family income is within the ceiling prescribed by the scheme guidelines.' },
  { key: 'ageConfirmed', label: 'I meet the age criteria', description: 'I meet the age criteria as specified by the scheme guidelines.' },
];

export function EligibilityDetailsStep({ data, onChange, errors }: EligibilityDetailsStepProps) {
  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-ink-950">Eligibility Details</h2>
      <p className="mt-1.5 text-sm text-ink-500">Confirm your eligibility for this scheme.</p>

      <div className="mt-6 space-y-4">
        {checks.map((check) => (
          <div key={check.key} className="border border-ink-200 bg-white p-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={data[check.key as keyof typeof data] as boolean || false}
                onChange={(e) => onChange(check.key, e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 border-ink-300 accent-ink-950"
              />
              <div>
                <p className="text-sm font-medium text-ink-900">{check.label}</p>
                <p className="mt-0.5 text-xs text-ink-500">{check.description}</p>
              </div>
            </label>
            {errors[check.key] && <p className="mt-1.5 pl-7 text-xs text-clay-600">{errors[check.key]}</p>}
          </div>
        ))}

        <div className="border border-ink-200 bg-white p-4">
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Annual Family Income (INR)</label>
          <input
            type="text"
            value={data.income || ''}
            onChange={(e) => onChange('income', e.target.value)}
            placeholder="e.g., 1,50,000"
            className="input-field mt-1"
          />
          {errors.income && <p className="mt-1 text-xs text-clay-600">{errors.income}</p>}
          <p className="mt-2 text-xs text-ink-400">
            Scheme-specific criteria configured by the Ministry. Refer to the scheme guidelines for the income ceiling.
          </p>
        </div>
      </div>
    </div>
  );
}
