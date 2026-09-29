import type { DocumentStatus } from '@/types';
import { CheckCircle, FileUp, Clock, AlertTriangle, XCircle, FileQuestion } from 'lucide-react';

const config: Record<DocumentStatus, { bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }> = {
  'Not Uploaded': { bg: 'bg-ink-100', text: 'text-ink-500', border: 'border-ink-300', icon: FileQuestion },
  Uploaded: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300', icon: FileUp },
  'Under Verification': { bg: 'bg-saffron-50', text: 'text-saffron-700', border: 'border-saffron-300', icon: Clock },
  Verified: { bg: 'bg-forest-50', text: 'text-forest-700', border: 'border-forest-300', icon: CheckCircle },
  Deficient: { bg: 'bg-clay-50', text: 'text-clay-700', border: 'border-clay-300', icon: AlertTriangle },
  Rejected: { bg: 'bg-ink-100', text: 'text-ink-600', border: 'border-ink-300', icon: XCircle },
};

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
  size?: 'sm' | 'md';
}

export function DocumentStatusBadge({ status, size = 'md' }: DocumentStatusBadgeProps) {
  const c = config[status];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-2xs' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center gap-1.5 border font-medium ${c.bg} ${c.text} ${c.border} ${padding}`}>
      <c.icon className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      {status}
    </span>
  );
}
