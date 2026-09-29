import type { Notification } from '@/types';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const iconMap = {
  info: { Icon: Info, color: 'text-sky-500' },
  success: { Icon: CheckCircle, color: 'text-forest-500' },
  warning: { Icon: AlertTriangle, color: 'text-saffron-500' },
  error: { Icon: XCircle, color: 'text-clay-500' },
};

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { Icon, color } = iconMap[notification.type];
  return (
    <div className={`flex gap-3 border-b border-ink-100 px-4 py-3 transition-colors hover:bg-ink-50 ${!notification.read ? 'bg-saffron-50/30' : ''}`}>
      <div className={`mt-0.5 shrink-0 ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-900">{notification.title}</p>
        <p className="mt-0.5 text-xs text-ink-600">{notification.message}</p>
        <p className="mt-1 text-2xs text-ink-400">{notification.timestamp}</p>
      </div>
      {!notification.read && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-saffron-500" />
      )}
    </div>
  );
}
