import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { NotificationItem } from '@/components/NotificationItem';
import { EmptyState } from '@/components/EmptyState';
import { applicantNavItems } from '@/config/applicantNav';
import { allNotifications } from '@/data/mockData';

export function ApplicantNotificationsPage() {
  const navigate = useNavigate();
  const unread = allNotifications.filter((n) => !n.read);
  const read = allNotifications.filter((n) => n.read);

  return (
    <AppShell items={applicantNavItems} activePath="/applicant/notifications">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Applicant Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Notifications</h1>
        </div>
        <button className="btn-ghost">
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="border border-ink-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-ink-500">Total</p>
              <p className="mt-2 font-serif text-3xl font-medium text-ink-950">{allNotifications.length}</p>
            </div>
            <div className="border border-saffron-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-ink-500">Unread</p>
              <p className="mt-2 font-serif text-3xl font-medium text-saffron-700">{unread.length}</p>
            </div>
            <div className="border border-clay-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-ink-500">Action Required</p>
              <p className="mt-2 font-serif text-3xl font-medium text-clay-700">
                {allNotifications.filter((n) => n.type === 'warning' || n.type === 'error').length}
              </p>
            </div>
            <div className="border border-forest-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-ink-500">Updates</p>
              <p className="mt-2 font-serif text-3xl font-medium text-forest-700">
                {allNotifications.filter((n) => n.type === 'success' || n.type === 'info').length}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader
              eyebrow="Unread"
              title="Recent Notifications"
              description="Stay informed about your application status and required actions"
            />

            {unread.length > 0 ? (
              <div className="mt-4 border border-ink-200 bg-white">
                {unread.map((n) => (
                  <NotificationItem key={n.id} notification={n} />
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <EmptyState
                  icon={<Bell className="h-10 w-10" />}
                  title="No unread notifications"
                  description="You're all caught up. New notifications will appear here."
                />
              </div>
            )}
          </div>

          {read.length > 0 && (
            <div className="mt-8">
              <SectionHeader eyebrow="Earlier" title="Read Notifications" />
              <div className="mt-4 border border-ink-200 bg-white">
                {read.map((n) => (
                  <NotificationItem key={n.id} notification={n} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <button onClick={() => navigate('/applicant/dashboard')} className="btn-secondary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
