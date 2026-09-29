import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle, Forward, MessageSquare, ScanLine } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { ProgressTracker } from '@/components/ProgressTracker';
import { ApplicationTimeline } from '@/components/ApplicationTimeline';
import { DocumentStatusBadge } from '@/components/DocumentStatusBadge';
import { DocumentIntelligencePanel, EligibilityPanel, AIDisclaimer } from '@/components/DocumentIntelligencePanel';
import { officerNavItems } from '@/config/officerNav';
import { applications, applicationTimelines, documentRecords, applicantProfile } from '@/data/mockData';
import { runVerification } from '@/services/verificationService';
import { assessEligibility } from '@/services/eligibilityService';
import { schemes } from '@/config/schemes';
import type { OfficerComment } from '@/types';

export function OfficerApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const app = applications.find((a) => a.id === id);
  if (!app) return <Navigate to="/officer/applications" replace />;

  const timeline = applicationTimelines[app.id] || [];
  const docs = documentRecords.filter((d) => d.applicationId === app.id);
  const scheme = schemes[app.schemeId];
  const verification = runVerification(app.id, app.applicantName, app.schemeId);
  const eligibility = assessEligibility(app.schemeId, app.applicantName);

  const [comments, setComments] = useState<OfficerComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showForwardConfirm, setShowForwardConfirm] = useState(false);
  const [deficiencyForm, setDeficiencyForm] = useState(false);
  const [deficiencyData, setDeficiencyData] = useState({ documentId: '', reason: '', comment: '', deadline: '' });
  const [actionTaken, setActionTaken] = useState<string | null>(null);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, {
      id: `c-${Date.now()}`,
      officerName: 'Priya Sharma',
      officerRole: 'Verification Officer',
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      comment: newComment,
    }]);
    setNewComment('');
  };

  const handleVerify = () => {
    setActionTaken('Application verified and forwarded to screening.');
    setShowForwardConfirm(false);
  };

  const handleReject = () => {
    setActionTaken('Application rejected. Reason recorded in audit log.');
    setShowRejectConfirm(false);
  };

  const handleForward = () => {
    setActionTaken('Application forwarded to screening stage.');
    setShowForwardConfirm(false);
  };

  const handleRaiseDeficiency = () => {
    if (!deficiencyData.documentId || !deficiencyData.reason) return;
    setActionTaken(`Deficiency raised on ${deficiencyData.documentId}: ${deficiencyData.reason}`);
    setDeficiencyForm(false);
    setDeficiencyData({ documentId: '', reason: '', comment: '', deadline: '' });
  };

  return (
    <AppShell items={officerNavItems} activePath="/officer/applications">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Verification</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">{app.id}</h1>
        </div>
        <button onClick={() => navigate('/officer/applications')} className="btn-ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Queue
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          {/* Action confirmation */}
          {actionTaken && (
            <div className="mb-6 flex items-center gap-2 border border-forest-300 bg-forest-50 px-4 py-3">
              <CheckCircle className="h-4 w-4 text-forest-600" />
              <p className="text-sm font-medium text-forest-700">{actionTaken}</p>
              <button onClick={() => setActionTaken(null)} className="ml-auto text-xs text-forest-600 hover:text-forest-800">
                Dismiss
              </button>
            </div>
          )}

          {/* Summary */}
          <div className="border border-ink-200 bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-xl font-medium text-ink-950">{app.schemeName}</h2>
                  <StatusBadge status={app.status} />
                </div>
                <p className="mt-1 text-sm text-ink-600">{app.programme}</p>
                <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                  <div>
                    <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Applicant</dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink-800">{app.applicantName}</dd>
                  </div>
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
                </dl>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-5">
              <ProgressTracker currentStage={app.currentStage} />
            </div>
          </div>

          {/* Applicant details */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SectionHeader eyebrow="Applicant" title="Applicant Details" />
              <div className="mt-4 border border-ink-200 bg-white p-5">
                <dl className="space-y-3">
                  {[
                    ['Full Name', applicantProfile.fullName],
                    ['Date of Birth', applicantProfile.dateOfBirth],
                    ['Gender', applicantProfile.gender],
                    ['Category', applicantProfile.category],
                    ['Community', applicantProfile.community],
                    ['State', `${applicantProfile.state}, ${applicantProfile.district}`],
                    ['Aadhaar', applicantProfile.aadhaar],
                    ['Phone', applicantProfile.phone],
                    ['Email', applicantProfile.email],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">{label}</dt>
                      <dd className="mt-0.5 text-sm text-ink-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* AI Document Intelligence */}
            <div className="lg:col-span-2">
              <SectionHeader
                eyebrow="Document Intelligence"
                title="AI-Assisted Document Verification"
                description="Automated classification, field extraction, and consistency checks"
                action={<ScanLine className="h-5 w-5 text-ink-400" />}
              />
              <div className="mt-4">
                <AIDisclaimer />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                {verification.results.map((result) => (
                  <DocumentIntelligencePanel key={result.documentId} result={result} />
                ))}
              </div>

              {/* Verification summary */}
              <div className="mt-4 border border-ink-200 bg-ink-50 p-4">
                <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Verification Summary</p>
                <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                  <div><span className="text-xs text-ink-500">Total</span><p className="text-sm font-medium text-ink-800">{verification.totalDocuments}</p></div>
                  <div><span className="text-xs text-ink-500">AI Verified</span><p className="text-sm font-medium text-forest-600">{verification.verified}</p></div>
                  <div><span className="text-xs text-ink-500">Needs Review</span><p className="text-sm font-medium text-saffron-600">{verification.requiresReview}</p></div>
                  <div><span className="text-xs text-ink-500">Avg Confidence</span><p className="text-sm font-medium text-ink-800">{verification.confidenceAverage}%</p></div>
                </div>
                {verification.missing.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 border border-clay-300 bg-clay-50 px-3 py-2">
                    <AlertTriangle className="h-4 w-4 text-clay-600" />
                    <p className="text-xs text-clay-700">
                      Missing documents: {verification.missing.map(m => scheme.requiredDocuments.find(d => d.id === m)?.label || m).join(', ')}
                    </p>
                  </div>
                )}
                <div className="mt-3">
                  <p className="text-xs font-medium text-ink-700">
                    AI Recommendation: <span className={
                      verification.recommendation === 'verified' ? 'text-forest-600' :
                      verification.recommendation === 'rejected' ? 'text-clay-600' : 'text-saffron-600'
                    }>
                      {verification.recommendation === 'verified' ? 'All documents pass automated checks' :
                       verification.recommendation === 'rejected' ? 'Issues detected — manual review required' :
                       'Some documents require manual review'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility checklist */}
          <div className="mt-8">
            <SectionHeader eyebrow="Eligibility" title="Eligibility Assessment" />
            <div className="mt-4">
              <EligibilityPanel assessment={eligibility} />
            </div>
          </div>

          {/* Documents list */}
          <div className="mt-8">
            <SectionHeader eyebrow="Documents" title="Document Review" />
            <div className="mt-4 border border-ink-200 bg-white">
              {docs.map((doc, idx) => (
                <div key={doc.id} className={`p-4 ${idx < docs.length - 1 ? 'border-b border-ink-100' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                      <div>
                        <p className="text-sm font-medium text-ink-900">{doc.label}</p>
                        {doc.fileName && <p className="mt-0.5 text-xs text-ink-500">{doc.fileName} · {doc.fileSize}</p>}
                        {doc.remarks && <p className="mt-1 text-xs text-ink-400">{doc.remarks}</p>}
                      </div>
                    </div>
                    <DocumentStatusBadge status={doc.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Officer comments */}
          <div className="mt-8">
            <SectionHeader eyebrow="Internal" title="Officer Comments" />
            <div className="mt-4 border border-ink-200 bg-white p-5">
              {comments.length > 0 ? (
                <ul className="space-y-3">
                  {comments.map((c) => (
                    <li key={c.id} className="flex gap-3 border-b border-ink-100 pb-3 last:border-0 last:pb-0">
                      <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                      <div>
                        <p className="text-sm text-ink-800">{c.comment}</p>
                        <p className="mt-1 text-2xs text-ink-400">{c.officerName} ({c.officerRole}) · {c.timestamp}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-500">No comments yet.</p>
              )}
              <div className="mt-4 flex gap-2 border-t border-ink-100 pt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add an internal comment…"
                  className="input-field flex-1"
                />
                <button onClick={handleAddComment} className="btn-secondary">Add Comment</button>
              </div>
            </div>
          </div>

          {/* Audit timeline */}
          <div className="mt-8">
            <SectionHeader eyebrow="History" title="Application History" />
            <div className="mt-4 border border-ink-200 bg-white p-6">
              {timeline.length > 0 ? (
                <ApplicationTimeline events={timeline} />
              ) : (
                <p className="text-sm text-ink-500">No events recorded yet.</p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 border border-ink-200 bg-white p-5">
            <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400 mb-4">Verification Actions</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={handleVerify} className="btn-primary">
                <CheckCircle className="h-4 w-4" />
                Verify
              </button>
              <button onClick={() => setDeficiencyForm(!deficiencyForm)} className="btn-secondary">
                <AlertTriangle className="h-4 w-4" />
                Raise Deficiency
              </button>
              <button onClick={() => setShowRejectConfirm(true)} className="btn-secondary">
                <XCircle className="h-4 w-4" />
                Reject
              </button>
              <button onClick={() => setShowForwardConfirm(true)} className="btn-secondary">
                <Forward className="h-4 w-4" />
                Forward to Screening
              </button>
            </div>

            {/* Deficiency form */}
            {deficiencyForm && (
              <div className="mt-4 border border-clay-300 bg-clay-50 p-4">
                <p className="text-sm font-medium text-clay-800">Raise Deficiency</p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Document</label>
                    <select
                      value={deficiencyData.documentId}
                      onChange={(e) => setDeficiencyData({ ...deficiencyData, documentId: e.target.value })}
                      className="input-field mt-1"
                    >
                      <option value="">Select document…</option>
                      {docs.map((d) => <option key={d.id} value={d.documentId}>{d.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Response Deadline</label>
                    <input
                      type="date"
                      value={deficiencyData.deadline}
                      onChange={(e) => setDeficiencyData({ ...deficiencyData, deadline: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Reason</label>
                    <input
                      type="text"
                      value={deficiencyData.reason}
                      onChange={(e) => setDeficiencyData({ ...deficiencyData, reason: e.target.value })}
                      placeholder="e.g., Document is expired"
                      className="input-field mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Comment</label>
                    <textarea
                      value={deficiencyData.comment}
                      onChange={(e) => setDeficiencyData({ ...deficiencyData, comment: e.target.value })}
                      rows={2}
                      placeholder="Additional details for the applicant"
                      className="input-field mt-1"
                    />
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={handleRaiseDeficiency} className="btn-primary">Submit Deficiency</button>
                  <button onClick={() => setDeficiencyForm(false)} className="btn-ghost">Cancel</button>
                </div>
              </div>
            )}

            {/* Reject confirmation */}
            {showRejectConfirm && (
              <div className="mt-4 border border-clay-300 bg-clay-50 p-4">
                <p className="text-sm font-medium text-clay-800">Confirm Rejection</p>
                <p className="mt-1 text-xs text-clay-700">
                  This will reject the application. The action will be recorded in the audit log and cannot be undone.
                </p>
                <div className="mt-3 flex gap-2">
                  <button onClick={handleReject} className="btn-primary">Confirm Rejection</button>
                  <button onClick={() => setShowRejectConfirm(false)} className="btn-ghost">Cancel</button>
                </div>
              </div>
            )}

            {/* Forward confirmation */}
            {showForwardConfirm && (
              <div className="mt-4 border border-sky-300 bg-sky-50 p-4">
                <p className="text-sm font-medium text-sky-800">Confirm Forward to Screening</p>
                <p className="mt-1 text-xs text-sky-700">
                  This will forward the application to the screening stage. The action will be recorded in the audit log.
                </p>
                <div className="mt-3 flex gap-2">
                  <button onClick={handleForward} className="btn-primary">Confirm Forward</button>
                  <button onClick={() => setShowForwardConfirm(false)} className="btn-ghost">Cancel</button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-6 text-xs text-ink-400">
            All actions are recorded in the audit log. AI-assisted verification supports the officer's decision but does not replace it.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
