import type { TimelineEvent } from '@/types';
import { CheckCircle, ArrowRightCircle, Upload, User, AlertTriangle, FileText, Clock } from 'lucide-react';

const actionConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  'Application Submitted': { icon: Upload, color: 'text-saffron-500' },
  'Document Verified': { icon: CheckCircle, color: 'text-forest-500' },
  'Stage Updated': { icon: ArrowRightCircle, color: 'text-sky-500' },
  'Eligibility Confirmed': { icon: CheckCircle, color: 'text-forest-500' },
  'Profile Updated': { icon: User, color: 'text-ink-400' },
  'Draft Created': { icon: FileText, color: 'text-ink-400' },
  'Deficiency Raised': { icon: AlertTriangle, color: 'text-clay-500' },
};

interface ApplicationTimelineProps {
  events: TimelineEvent[];
}

export function ApplicationTimeline({ events }: ApplicationTimelineProps) {
  return (
    <ol className="relative">
      {events.map((event, idx) => {
        const cfg = actionConfig[event.action] || { icon: Clock, color: 'text-ink-400' };
        const isLast = idx === events.length - 1;
        return (
          <li key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span className="absolute left-[15px] top-8 h-full w-px bg-ink-200" aria-hidden />
            )}
            <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white ${cfg.color}`}>
              <cfg.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-ink-900">{event.action}</p>
                <time className="shrink-0 text-2xs text-ink-400">{event.timestamp}</time>
              </div>
              <p className="mt-0.5 text-sm text-ink-600">{event.detail}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-2xs font-medium text-ink-500">
                  Stage: {event.stage}
                </span>
                <span className="text-2xs text-ink-400">by {event.actor}</span>
                {event.actionRequired && (
                  <span className="inline-flex items-center gap-1 border border-clay-300 bg-clay-50 px-1.5 py-0.5 text-2xs font-medium text-clay-700">
                    <AlertTriangle className="h-3 w-3" />
                    Action Required
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
