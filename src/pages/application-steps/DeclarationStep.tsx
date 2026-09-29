interface DeclarationStepProps {
  data: { confirmed: boolean; signature: string; date: string };
  onChange: (field: string, value: string | boolean) => void;
  errors: Record<string, string>;
}

export function DeclarationStep({ data, onChange, errors }: DeclarationStepProps) {
  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-ink-950">Declaration</h2>
      <p className="mt-1.5 text-sm text-ink-500">Read and accept the declaration to proceed.</p>

      <div className="mt-6 border border-ink-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-ink-900">Declaration</h3>
        <div className="mt-3 space-y-2 text-sm text-ink-600">
          <p>I hereby declare that all the information provided in this application is true and correct to the best of my knowledge.</p>
          <p>I understand that providing false information will lead to rejection of my application and may result in legal action.</p>
          <p>I agree to abide by the terms and conditions of the scheme and the guidelines issued by the Ministry of Tribal Affairs.</p>
          <p>I consent to the verification of my documents and information by the concerned authorities.</p>
        </div>

        <label className="mt-5 flex items-start gap-3 border-t border-ink-100 pt-4">
          <input
            type="checkbox"
            checked={data.confirmed || false}
            onChange={(e) => onChange('confirmed', e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 border-ink-300 accent-ink-950"
          />
          <span className="text-sm font-medium text-ink-900">
            I have read and accept the above declaration
          </span>
        </label>
        {errors.confirmed && <p className="mt-1.5 pl-7 text-xs text-clay-600">{errors.confirmed}</p>}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div>
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Signature (Full Name)</label>
          <input
            type="text"
            value={data.signature || ''}
            onChange={(e) => onChange('signature', e.target.value)}
            placeholder="Type your full name as signature"
            className="input-field mt-1"
          />
          {errors.signature && <p className="mt-1 text-xs text-clay-600">{errors.signature}</p>}
        </div>
        <div>
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Date</label>
          <input
            type="date"
            value={data.date || ''}
            onChange={(e) => onChange('date', e.target.value)}
            className="input-field mt-1"
          />
          {errors.date && <p className="mt-1 text-xs text-clay-600">{errors.date}</p>}
        </div>
      </div>
    </div>
  );
}
