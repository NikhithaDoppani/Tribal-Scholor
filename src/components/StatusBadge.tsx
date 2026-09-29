import type { ApplicationStatus } from '@/types';

const statusStyles: Record<ApplicationStatus, { bg: string; text: string; border: string; dot: string }> = {
  Draft: { bg: 'bg-ink-100', text: 'text-ink-600', border: 'border-ink-300', dot: 'bg-ink-400' },
  Submitted: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300', dot: 'bg-sky-500' },
  'Under Verification': { bg: 'bg-saffron-50', text: 'text-saffron-700', border: 'border-saffron-300', dot: 'bg-saffron-500' },
  'Deficiency Raised': { bg: 'bg-clay-50', text: 'text-clay-700', border: 'border-clay-300', dot: 'bg-clay-500' },
  Eligible: { bg: 'bg-forest-50', text: 'text-forest-700', border: 'border-forest-300', dot: 'bg-forest-500' },
  'Under Screening': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300', dot: 'bg-sky-400' },
  Selected: { bg: 'bg-forest-50', text: 'text-forest-800', border: 'border-forest-400', dot: 'bg-forest-600' },
  'Not Selected': { bg: 'bg-ink-100', text: 'text-ink-500', border: 'border-ink-300', dot: 'bg-ink-400' },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const s = statusStyles[status];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-2xs' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 border font-medium ${s.bg} ${s.text} ${s.border} ${padding}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}
