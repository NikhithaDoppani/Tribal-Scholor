import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Scheme } from '@/types';

interface SchemeCardProps {
  scheme: Scheme;
}

export function SchemeCard({ scheme }: SchemeCardProps) {
  return (
    <Link
      to={`/scheme/${scheme.id}`}
      className="group flex flex-col border border-ink-200 bg-white p-6 transition-colors hover:border-ink-400"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-saffron-600">
            {scheme.code}
          </p>
          <h3 className="mt-1 font-serif text-xl font-medium text-ink-950">
            {scheme.name}
          </h3>
        </div>
        <span
          className={`border px-2.5 py-1 text-2xs font-medium ${
            scheme.status === 'Open'
              ? 'border-forest-300 bg-forest-50 text-forest-700'
              : 'border-ink-300 bg-ink-100 text-ink-500'
          }`}
        >
          {scheme.status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-600">
        {scheme.description}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink-100 pt-4">
        <div>
          <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Study Level</dt>
          <dd className="mt-0.5 text-sm font-medium text-ink-800">{scheme.studyLevel}</dd>
        </div>
        <div>
          <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Destination</dt>
          <dd className="mt-0.5 text-sm font-medium text-ink-800">{scheme.destination}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-ink-700 transition-colors group-hover:text-ink-950">
        View details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
