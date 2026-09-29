import { schemes } from '@/config/schemes';
import type { SchemeId } from '@/types';

interface SchemeSelectionStepProps {
  selectedScheme: SchemeId | null;
  onSelect: (id: SchemeId) => void;
  error?: string;
}

export function SchemeSelectionStep({ selectedScheme, onSelect, error }: SchemeSelectionStepProps) {
  const schemeList = Object.values(schemes);

  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-ink-950">Scheme Selection</h2>
      <p className="mt-1.5 text-sm text-ink-500">Select the scheme you wish to apply for.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {schemeList.map((scheme) => {
          const isSelected = selectedScheme === scheme.id;
          return (
            <button
              key={scheme.id}
              onClick={() => onSelect(scheme.id)}
              className={`flex flex-col border p-5 text-left transition-colors ${
                isSelected
                  ? 'border-ink-950 bg-ink-50 ring-1 ring-ink-950'
                  : 'border-ink-200 bg-white hover:border-ink-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-saffron-600">{scheme.code}</p>
                  <h3 className="mt-1 font-serif text-lg font-medium text-ink-950">{scheme.name}</h3>
                </div>
                {isSelected && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-950 text-2xs text-white">✓</span>
                )}
              </div>
              <p className="mt-2 text-sm text-ink-600">{scheme.description}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-ink-100 pt-3">
                <div>
                  <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Study Level</dt>
                  <dd className="mt-0.5 text-sm text-ink-700">{scheme.studyLevel}</dd>
                </div>
                <div>
                  <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Destination</dt>
                  <dd className="mt-0.5 text-sm text-ink-700">{scheme.destination}</dd>
                </div>
              </dl>
            </button>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-clay-600">{error}</p>}
    </div>
  );
}
