import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, ScanLine } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { ProgressTracker } from '@/components/ProgressTracker';
import { ApplicationTimeline } from '@/components/ApplicationTimeline';
import { DocumentStatusBadge } from '@/components/DocumentStatusBadge';
import { DocumentIntelligencePanel, AIDisclaimer } from '@/components/DocumentIntelligencePanel';
import { useAuth } from '@/context/AuthContext';
import { applicantNavItems } from '@/config/applicantNav';
import { applications, applicationTimelines, documentRecords } from '@/data/mockData';
import { analyzeAllDocuments } from '@/services/documentIntelligenceService';

export function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const app = applications.find((a) => a.id === id && a.applicantName === 'Rahul Kumar');
  if (!app) return <Navigate to="/applicant/applications" replace />;

  const timeline = applicationTimelines[app.id] || [];
  const docs = documentRecords.filter((d) => d.applicationId === app.id);
  const hasActionRequired = timeline.some((t) => t.actionRequired);
  const aiResults = app.status !== 'Draft' ? analyzeAllDocuments(app.id, app.applicantName) : [];

  return (
    <AppShell items={applicantNavItems} activePath="/applicant/applications">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Application</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">{app.id}</h1>
        </div>
        <button onClick={() => navigate('/applicant/applications')} className="btn-ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          {/* Summary */}
          <div className="border border-ink-200 bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-xl font-medium text-ink-950">{app.schemeName}</h2>
                  <StatusBadge status={app.status} />
                  {hasActionRequired && (
                    <span className="inline-flex items-center gap-1 border border-clay-300 bg-clay-50 px-2 py-0.5 text-2xs font-medium text-clay-700">
                      <AlertTriangle className="h-3 w-3" />
                      Action Required
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-600">{app.programme}</p>
                <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                  <div>
                    <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Submitted</dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink-800">{app.submittedDate}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">State</dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink-800">{app.state}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Documents</dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink-800">{app.documentsVerified}/{app.documentsTotal} verified</dd>
                  </div>
                  <div>
                    <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Last Updated</dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink-800">{app.lastUpdated}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {app.status !== 'Draft' && (
              <div className="mt-6 border-t border-ink-100 pt-5">
                <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400 mb-4">Application Progress</p>
                <ProgressTracker currentStage={app.currentStage} />
              </div>
            )}
          </div>

          {/* Action required banner */}
          {hasActionRequired && (
            <div className="mt-4 flex items-start gap-3 border border-clay-300 bg-clay-50 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
              <div>
                <p className="text-sm font-medium text-clay-800">Action Required</p>
                <p className="mt-0.5 text-sm text-clay-700">
                  {timeline.filter((t) => t.actionRequired).map((t) => t.detail).join(' ')}
                </p>
              </div>
            </div>
          )}

          {/* AI Document Intelligence */}
          {aiResults.length > 0 && (
            <div className="mt-8">
              <SectionHeader
                eyebrow="Document Intelligence"
                title="AI-Assisted Document Analysis"
                description="Automated checks on your uploaded documents"
                action={<ScanLine className="h-5 w-5 text-ink-400" />}
              />
              <div className="mt-4">
                <AIDisclaimer />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {aiResults.map((result) => (
                  <DocumentIntelligencePanel key={result.documentId} result={result} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <SectionHeader
                eyebrow="History"
                title="Application Timeline"
                description="What happened, when it happened, and what stage your application is in"
              />
              <div className="mt-4 border border-ink-200 bg-white p-6">
                {timeline.length > 0 ? (
                  <ApplicationTimeline events={timeline} />
                ) : (
                  <p className="text-sm text-ink-500">No events recorded yet.</p>
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="lg:col-span-1">
              <SectionHeader eyebrow="Verification" title="Documents" />
              <div className="mt-4 border border-ink-200 bg-white">
                {docs.length > 0 ? (
                  docs.map((doc, idx) => (
                    <div key={doc.id} className={`p-4 ${idx < docs.length - 1 ? 'border-b border-ink-100' : ''}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                          <div>
                            <p className="text-sm font-medium text-ink-900">{doc.label}</p>
                            {doc.fileName && <p className="mt-0.5 text-xs text-ink-500">{doc.fileName}</p>}
                            {doc.remarks && <p className="mt-1 text-xs text-ink-400">{doc.remarks}</p>}
                            {doc.uploadedDate && (
                              <p className="mt-0.5 text-2xs text-ink-400">Uploaded: {doc.uploadedDate}</p>
                            )}
                          </div>
                        </div>
                        <DocumentStatusBadge status={doc.status} size="sm" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <FileText className="mx-auto h-8 w-8 text-ink-300" />
                    <p className="mt-2 text-sm text-ink-500">No documents uploaded yet.</p>
                  </div>
                )}
              </div>

              {app.status === 'Draft' && (
                <div className="mt-4">
                  <button onClick={() => navigate('/applicant/applications/new')} className="btn-secondary w-full">
                    Continue Application
                  </button>
                </div>
              )}

              {docs.length > 0 && (
                <div className="mt-4 border border-ink-200 bg-ink-50 p-4">
                  <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Summary</p>
                  <div className="mt-2 space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-ink-500">Total Documents</span><span className="font-medium text-ink-800">{docs.length}</span></div>
                    <div className="flex justify-between"><span className="text-ink-500">Verified</span><span className="font-medium text-forest-600">{docs.filter((d) => d.status === 'Verified').length}</span></div>
                    <div className="flex justify-between"><span className="text-ink-500">Under Verification</span><span className="font-medium text-saffron-600">{docs.filter((d) => d.status === 'Under Verification').length}</span></div>
                    <div className="flex justify-between"><span className="text-ink-500">Deficient</span><span className="font-medium text-clay-600">{docs.filter((d) => d.status === 'Deficient').length}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
