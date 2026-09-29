import type { AuditEvent } from '@/types';
import { FileText, CheckCircle, ArrowRightCircle, User, Upload } from 'lucide-react';

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Document Verified': CheckCircle,
  'Stage Updated': ArrowRightCircle,
  'Application Submitted': Upload,
  'Profile Updated': User,
};

const actionColors: Record<string, string> = {
  'Document Verified': 'text-forest-500',
  'Stage Updated': 'text-sky-500',
  'Application Submitted': 'text-saffron-500',
  'Profile Updated': 'text-ink-400',
};

interface AuditTimelineProps {
  events: AuditEvent[];
}

export function AuditTimeline({ events }: AuditTimelineProps) {
  return (
    <ol className="relative">
      {events.map((event, idx) => {
        const Icon = actionIcons[event.action] || FileText;
        const color = actionColors[event.action] || 'text-ink-400';
        const isLast = idx === events.length - 1;
        return (
          <li key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span className="absolute left-[15px] top-8 h-full w-px bg-ink-200" aria-hidden />
            )}
            <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white ${color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-ink-900">{event.action}</p>
                <time className="shrink-0 text-2xs text-ink-400">{event.timestamp}</time>
              </div>
              <p className="mt-0.5 text-sm text-ink-600">{event.detail}</p>
              <p className="mt-1 text-2xs text-ink-400">by {event.actor}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
