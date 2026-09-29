import { useNavigate } from 'react-router-dom';
import { FileText, FolderOpen } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { DocumentStatusBadge } from '@/components/DocumentStatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { applicantNavItems } from '@/config/applicantNav';
import { applications, documentRecords } from '@/data/mockData';
import type { DocumentStatus } from '@/types';

const statusOrder: Record<DocumentStatus, number> = {
  Deficient: 0,
  Rejected: 1,
  'Under Verification': 2,
  Uploaded: 3,
  'Not Uploaded': 4,
  Verified: 5,
};

export function ApplicantDocumentsPage() {
  const navigate = useNavigate();
  const myApps = applications.filter((a) => a.applicantName === 'Rahul Kumar');
  const myDocs = documentRecords.filter((d) =>
    myApps.some((a) => a.id === d.applicationId)
  );

  const stats = {
    total: myDocs.length,
    verified: myDocs.filter((d) => d.status === 'Verified').length,
    pending: myDocs.filter((d) => d.status === 'Under Verification' || d.status === 'Uploaded').length,
    deficient: myDocs.filter((d) => d.status === 'Deficient' || d.status === 'Rejected').length,
  };

  return (
    <AppShell items={applicantNavItems} activePath="/applicant/documents">
      <header className="flex h-16 shrink-0 items-center border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Applicant Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Documents</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="border border-ink-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-ink-500">Total Documents</p>
              <p className="mt-2 font-serif text-3xl font-medium text-ink-950">{stats.total}</p>
            </div>
            <div className="border border-forest-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-ink-500">Verified</p>
              <p className="mt-2 font-serif text-3xl font-medium text-forest-700">{stats.verified}</p>
            </div>
            <div className="border border-saffron-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-ink-500">In Progress</p>
              <p className="mt-2 font-serif text-3xl font-medium text-saffron-700">{stats.pending}</p>
            </div>
            <div className="border border-clay-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-ink-500">Needs Attention</p>
              <p className="mt-2 font-serif text-3xl font-medium text-clay-700">{stats.deficient}</p>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader
              eyebrow="All Applications"
              title="Document Status"
              description="Track the verification status of your submitted documents"
            />

            {myDocs.length === 0 ? (
              <div className="mt-6">
                <EmptyState
                  icon={<FolderOpen className="h-10 w-10" />}
                  title="No documents uploaded yet"
                  description="Documents will appear here once you submit an application."
                  action={
                    <button onClick={() => navigate('/applicant/applications/new')} className="btn-primary">
                      Start New Application
                    </button>
                  }
                />
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {myApps.map((app) => {
                  const appDocs = myDocs
                    .filter((d) => d.applicationId === app.id)
                    .sort((a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9));
                  if (appDocs.length === 0) return null;

                  return (
                    <div key={app.id} className="border border-ink-200 bg-white">
                      <div className="flex items-center justify-between border-b border-ink-100 bg-ink-50 px-5 py-3">
                        <div>
                          <p className="font-mono text-xs font-medium text-ink-700">{app.id}</p>
                          <p className="mt-0.5 text-sm text-ink-600">{app.schemeName} — {app.programme}</p>
                        </div>
                        <button
                          onClick={() => navigate(`/applicant/applications/${app.id}`)}
                          className="text-xs font-medium text-ink-600 hover:text-ink-950"
                        >
                          View Application →
                        </button>
                      </div>
                      <div className="divide-y divide-ink-100">
                        {appDocs.map((doc) => (
                          <div key={doc.id} className="flex items-start justify-between gap-4 px-5 py-3.5">
                            <div className="flex items-start gap-3">
                              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                              <div>
                                <p className="text-sm font-medium text-ink-900">{doc.label}</p>
                                {doc.fileName && (
                                  <p className="mt-0.5 text-xs text-ink-500">
                                    {doc.fileName} · {doc.fileSize}
                                  </p>
                                )}
                                {doc.remarks && (
                                  <p className={`mt-1 text-xs ${
                                    doc.status === 'Deficient' || doc.status === 'Rejected'
                                      ? 'text-clay-600'
                                      : 'text-ink-400'
                                  }`}>
                                    {doc.remarks}
                                  </p>
                                )}
                                <div className="mt-0.5 flex gap-3 text-2xs text-ink-400">
                                  {doc.uploadedDate && <span>Uploaded: {doc.uploadedDate}</span>}
                                  {doc.verifiedDate && <span>Verified: {doc.verifiedDate}</span>}
                                </div>
                              </div>
                            </div>
                            <DocumentStatusBadge status={doc.status} size="sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
