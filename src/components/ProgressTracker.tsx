import { Check } from 'lucide-react';
import type { ApplicationStage } from '@/types';

const stages: ApplicationStage[] = ['Submitted', 'Eligibility', 'Documents', 'Screening', 'Selection'];

interface ProgressTrackerProps {
  currentStage: ApplicationStage;
}

export function ProgressTracker({ currentStage }: ProgressTrackerProps) {
  const currentIndex = stages.indexOf(currentStage);

  return (
    <div className="w-full">
      <div className="flex items-center">
        {stages.map((stage, idx) => {
          const isComplete = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <div key={stage} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center border text-xs font-semibold transition-colors ${
                    isComplete
                      ? 'border-forest-500 bg-forest-500 text-white'
                      : isCurrent
                        ? 'border-saffron-500 bg-saffron-50 text-saffron-700 ring-4 ring-saffron-100'
                        : 'border-ink-300 bg-white text-ink-400'
                  }`}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : idx + 1}
                </div>
                <span
                  className={`mt-1.5 text-2xs font-medium ${
                    isCurrent ? 'text-saffron-700' : isComplete ? 'text-forest-700' : 'text-ink-400'
                  }`}
                >
                  {stage}
                </span>
              </div>
              {idx < stages.length - 1 && (
                <div
                  className={`mx-2 mb-5 h-px flex-1 ${
                    idx < currentIndex ? 'bg-forest-400' : 'bg-ink-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
