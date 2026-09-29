import { useNavigate } from 'react-router-dom';
import { Plus, FileText, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useAuth } from '@/context/AuthContext';
import { applicantNavItems } from '@/config/applicantNav';
import { applications } from '@/data/mockData';
import type { ApplicationStatus } from '@/types';

const statusOrder: ApplicationStatus[] = [
  'Deficiency Raised',
  'Under Verification',
  'Under Screening',
  'Submitted',
  'Eligible',
  'Selected',
  'Not Selected',
  'Draft',
];

export function ApplicantApplicationsPage() {
  const navigate = useNavigate();
  const myApps = applications
    .filter((a) => a.applicantName === 'Rahul Kumar')
    .sort((a, b) => {
      const ai = statusOrder.indexOf(a.status);
      const bi = statusOrder.indexOf(b.status);
      return ai - bi;
    });

  return (
    <AppShell items={applicantNavItems} activePath="/applicant/applications">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Applicant Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">My Applications</h1>
        </div>
        <button onClick={() => navigate('/applicant/applications/new')} className="btn-primary">
          <Plus className="h-4 w-4" />
          Start New Application
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <SectionHeader
            eyebrow="Overview"
            title="All Applications"
            description="View and track all your scholarship and fellowship applications"
            action={
              <button onClick={() => navigate('/applicant/applications/new')} className="btn-secondary">
                <Plus className="h-4 w-4" />
                New Application
              </button>
            }
          />

          {myApps.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                icon={<FileText className="h-10 w-10" />}
                title="No applications yet"
                description="Start your first scholarship or fellowship application by selecting a scheme."
                action={
                  <button onClick={() => navigate('/applicant/applications/new')} className="btn-primary">
                    <Plus className="h-4 w-4" />
                    Start New Application
                  </button>
                }
              />
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {myApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => navigate(`/applicant/applications/${app.id}`)}
                  className="group cursor-pointer border border-ink-200 bg-white p-5 transition-colors hover:border-ink-400"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-medium text-ink-700">{app.id}</span>
                        <StatusBadge status={app.status} size="sm" />
                        {app.status === 'Deficiency Raised' && (
                          <span className="inline-flex items-center gap-1 text-2xs font-medium text-clay-600">
                            Action Required
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 font-serif text-base font-medium text-ink-950">{app.schemeName}</h3>
                      <p className="mt-0.5 text-sm text-ink-600">{app.programme}</p>
                      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-500">
                        <span>Submitted: {app.submittedDate}</span>
                        <span>State: {app.state}</span>
                        <span>Documents: {app.documentsVerified}/{app.documentsTotal}</span>
                        <span>Last Updated: {app.lastUpdated}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-ink-300 transition-colors group-hover:text-ink-600" />
                  </div>

                  {app.status !== 'Draft' && (
                    <div className="mt-5 border-t border-ink-100 pt-4">
                      <ProgressTracker currentStage={app.currentStage} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
