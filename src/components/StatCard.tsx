import type { StatItem } from '@/types';

const toneStyles: Record<string, { value: string; label: string; border: string }> = {
  default: { value: 'text-ink-950', label: 'text-ink-500', border: 'border-ink-200' },
  warning: { value: 'text-saffron-700', label: 'text-ink-500', border: 'border-saffron-200' },
  success: { value: 'text-forest-700', label: 'text-ink-500', border: 'border-forest-200' },
  info: { value: 'text-sky-700', label: 'text-ink-500', border: 'border-sky-200' },
};

interface StatCardProps {
  stat: StatItem;
}

export function StatCard({ stat }: StatCardProps) {
  const tone = toneStyles[stat.tone || 'default'];
  return (
    <div className={`border ${tone.border} bg-white p-5`}>
      <p className={`text-2xs font-semibold uppercase tracking-[0.15em] ${tone.label}`}>
        {stat.label}
      </p>
      <p className={`mt-2 font-serif text-3xl font-medium ${tone.value}`}>
        {stat.value}
      </p>
      {stat.hint && (
        <p className="mt-1 text-xs text-ink-400">{stat.hint}</p>
      )}
    </div>
  );
}
