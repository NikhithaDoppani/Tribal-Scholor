import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowLeft, FileText, GraduationCap, MapPin, Award } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { selectionNavItems } from '@/config/selectionNav';
import { useAuth } from '@/context/AuthContext';
import { applications } from '@/data/mockData';
import { getScreeningResult, DISCLAIMER } from '@/services/screeningService';

const schemeOptions = ['All', 'NFST', 'NOS'];

export function SelectionCandidatesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [schemeFilter, setSchemeFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const eligibleApps = useMemo(() => {
    return applications.filter((a) => {
      if (a.status !== 'Eligible' && a.status !== 'Under Screening' && a.status !== 'Selected' && a.status !== 'Not Selected') return false;
      if (search) {
        const q = search.toLowerCase();
        if (!a.id.toLowerCase().includes(q) && !a.applicantName.toLowerCase().includes(q)) return false;
      }
      if (schemeFilter !== 'All') {
        if (schemeFilter === 'NFST' && a.schemeId !== 'nfst') return false;
        if (schemeFilter === 'NOS' && a.schemeId !== 'nos') return false;
      }
      return true;
    });
  }, [search, schemeFilter]);

  const selectedApp = selectedId ? applications.find((a) => a.id === selectedId) : null;
  const selectedResult = selectedApp ? getScreeningResult(selectedApp.id, selectedApp.schemeId) : null;

  return (
    <AppShell items={selectionNavItems} activePath="/selection/candidates">
      <header className="flex h-16 shrink-0 items-center border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Selection Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Eligible Candidates — {user?.name}</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center border border-ink-200 bg-white p-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                placeholder="Search by Application ID or Applicant Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-ink-300 bg-white py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-500 focus:outline-none focus:ring-1 focus:ring-ink-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-ink-400" />
              <select
                value={schemeFilter}
                onChange={(e) => setSchemeFilter(e.target.value)}
                className="border border-ink-300 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-500 focus:outline-none"
              >
                {schemeOptions.map((s) => <option key={s} value={s}>Scheme: {s}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Candidate list */}
            <div className="lg:col-span-1">
              <SectionHeader eyebrow="Candidates" title={`${eligibleApps.length} Eligible`} />
              <div className="mt-4 space-y-2">
                {eligibleApps.length > 0 ? (
                  eligibleApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedId(app.id)}
                      className={`cursor-pointer border p-4 transition-colors ${
                        selectedId === app.id ? 'border-ink-500 bg-ink-50' : 'border-ink-200 bg-white hover:border-ink-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-2xs text-ink-500">{app.id}</span>
                        <StatusBadge status={app.status} size="sm" />
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-ink-900">{app.applicantName}</p>
                      <p className="mt-0.5 text-xs text-ink-600">{app.schemeName}</p>
                      <p className="mt-0.5 text-xs text-ink-500">{app.programme}</p>
                    </div>
                  ))
                ) : (
                  <EmptyState icon={<FileText className="h-8 w-8" />} title="No eligible candidates" description="No candidates match your filters." />
                )}
              </div>
            </div>

            {/* Candidate detail */}
            <div className="lg:col-span-2">
              {selectedApp ? (
                <div>
                  <button onClick={() => setSelectedId(null)} className="btn-ghost mb-4">
                    <ArrowLeft className="h-4 w-4" />
                    Back to list
                  </button>

                  <div className="border border-ink-200 bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="font-serif text-xl font-medium text-ink-950">{selectedApp.applicantName}</h2>
                          <StatusBadge status={selectedApp.status} size="sm" />
                        </div>
                        <p className="mt-1 font-mono text-xs text-ink-500">{selectedApp.id}</p>
                        <p className="mt-1 text-sm text-ink-600">{selectedApp.schemeName} — {selectedApp.programme}</p>
                      </div>
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                      <div>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">State</dt>
                        <dd className="mt-0.5 flex items-center gap-1 text-sm text-ink-800"><MapPin className="h-3 w-3 text-ink-400" />{selectedApp.state}</dd>
                      </div>
                      <div>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Submitted</dt>
                        <dd className="mt-0.5 text-sm text-ink-800">{selectedApp.submittedDate}</dd>
                      </div>
                      <div>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Eligibility</dt>
                        <dd className="mt-0.5 text-sm font-medium text-forest-600">{selectedApp.eligibilityStatus}</dd>
                      </div>
                      <div>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Documents</dt>
                        <dd className="mt-0.5 text-sm text-ink-800">{selectedApp.documentsVerified}/{selectedApp.documentsTotal} verified</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Score breakdown */}
                  {selectedResult ? (
                    <div className="mt-6">
                      <SectionHeader
                        eyebrow="Assessment"
                        title="Score Breakdown"
                        description="Each score shows its underlying criterion"
                      />
                      <div className="mt-4 border border-ink-200 bg-white p-5">
                        <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                          <div>
                            <p className="text-sm font-medium text-ink-900">Total Score</p>
                            <p className="text-xs text-ink-500">Assessed by {selectedResult.assessedBy} on {selectedResult.assessedDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-serif text-2xl font-medium text-ink-950">{selectedResult.totalScore}<span className="text-base text-ink-400">/{selectedResult.maxTotalScore}</span></p>
                            <p className="text-xs text-ink-500">{selectedResult.percentile}th percentile</p>
                          </div>
                        </div>

                        <ul className="mt-4 space-y-4">
                          {selectedResult.scores.map((score) => (
                            <li key={score.criterionId} className="border-b border-ink-100 pb-4 last:border-0 last:pb-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    {score.criterionLabel === 'Academic Record' && <GraduationCap className="h-4 w-4 text-ink-400" />}
                                    {score.criterionLabel === 'Research Proposal' && <FileText className="h-4 w-4 text-ink-400" />}
                                    {score.criterionLabel === 'Interview' && <Award className="h-4 w-4 text-ink-400" />}
                                    <p className="text-sm font-medium text-ink-900">{score.criterionLabel}</p>
                                    {score.aiAssisted && (
                                      <span className="border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-2xs text-ink-500">AI-assisted assessment</span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-xs text-ink-500">{score.rationale}</p>
                                  <p className="mt-1 text-2xs text-ink-400">Weight: {score.weight}% · Max: {score.maxScore} pts</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-serif text-lg font-medium text-ink-900">{score.score}<span className="text-sm text-ink-400">/{score.maxScore}</span></p>
                                  <div className="mt-1 h-1 w-20 bg-ink-200">
                                    <div className="h-full bg-forest-500" style={{ width: `${(score.score / score.maxScore) * 100}%` }} />
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 border-t border-ink-100 pt-3">
                          <p className="text-xs text-ink-400">{DISCLAIMER}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button onClick={() => navigate('/selection/shortlisting')} className="btn-secondary">
                          Go to Shortlisting
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 border border-ink-200 bg-ink-50 p-5">
                      <p className="text-sm text-ink-500">No screening assessment has been recorded for this candidate yet.</p>
                      <button onClick={() => navigate('/selection/shortlisting')} className="btn-secondary mt-3">
                        Assess Candidate
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <EmptyState
                    icon={<FileText className="h-10 w-10" />}
                    title="Select a candidate"
                    description="Choose a candidate from the list to view their details and score breakdown."
                  />
                </div>
              )}
            </div>
          </div>

          <p className="mt-6 text-xs text-ink-400">Demo data · Prototype configuration — replace with officially approved scheme criteria.</p>
        </div>
      </div>
    </AppShell>
  );
}
