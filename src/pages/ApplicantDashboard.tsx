import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { ApplicationTable } from '@/components/ApplicationTable';
import { ProgressTracker } from '@/components/ProgressTracker';
import { NotificationItem } from '@/components/NotificationItem';
import { AuditTimeline } from '@/components/AuditTimeline';
import { useAuth } from '@/context/AuthContext';
import { applicantNavItems } from '@/config/applicantNav';
import { applications, applicantNotifications, auditEvents } from '@/data/mockData';
import type { StatItem } from '@/types';

export function ApplicantDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedAppId, setSelectedAppId] = useState<string>('MOTA-NFST-2026-00142');

  const myApplications = applications.filter((a) => a.applicantName === 'Rahul Kumar');
  const selectedApp = myApplications.find((a) => a.id === selectedAppId) || myApplications[0];

  const stats: StatItem[] = [
    { label: 'Applications', value: myApplications.filter((a) => a.status !== 'Draft').length },
    { label: 'Action Required', value: myApplications.filter((a) => a.status === 'Deficiency Raised').length, tone: 'warning' },
    { label: 'Under Verification', value: myApplications.filter((a) => a.status === 'Under Verification').length, tone: 'info' },
    { label: 'Notifications', value: applicantNotifications.filter((n) => !n.read).length },
  ];

  return (
    <AppShell items={applicantNavItems} activePath="/applicant/dashboard">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Applicant Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Welcome, {user?.name}</h1>
        </div>
        <button onClick={() => navigate('/applicant/applications/new')} className="btn-primary">
          <Plus className="h-4 w-4" />
          Start New Application
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeader
                eyebrow="My Applications"
                title="Application History"
                description="Track the status of your submitted applications"
              />
              <div className="mt-4 border border-ink-200 bg-white">
                <ApplicationTable
                  applications={myApplications}
                  columns={['scheme', 'programme', 'submitted', 'stage', 'status']}
                  onRowClick={(app) => navigate(`/applicant/applications/${app.id}`)}
                />
              </div>

              {selectedApp && (
                <div className="mt-8">
                  <SectionHeader
                    eyebrow={selectedApp.id}
                    title="Application Progress"
                    description={`${selectedApp.schemeName} — ${selectedApp.programme}`}
                  />
                  <div className="mt-6 border border-ink-200 bg-white p-6">
                    <ProgressTracker currentStage={selectedApp.currentStage} />
                    <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink-100 pt-5 sm:grid-cols-4">
                      <div>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Submitted</dt>
                        <dd className="mt-1 text-sm font-medium text-ink-800">{selectedApp.submittedDate}</dd>
                      </div>
                      <div>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">State</dt>
                        <dd className="mt-1 text-sm font-medium text-ink-800">{selectedApp.state}</dd>
                      </div>
                      <div>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Documents</dt>
                        <dd className="mt-1 text-sm font-medium text-ink-800">{selectedApp.documentsVerified}/{selectedApp.documentsTotal} verified</dd>
                      </div>
                      <div>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Last Updated</dt>
                        <dd className="mt-1 text-sm font-medium text-ink-800">{selectedApp.lastUpdated}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div>
                <SectionHeader eyebrow="Recent" title="Notifications" />
                <div className="mt-4 border border-ink-200 bg-white">
                  {applicantNotifications.map((n) => (
                    <NotificationItem key={n.id} notification={n} />
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader eyebrow="Audit Trail" title="Activity Log" />
                <div className="mt-4 border border-ink-200 bg-white p-5">
                  <AuditTimeline events={auditEvents} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
