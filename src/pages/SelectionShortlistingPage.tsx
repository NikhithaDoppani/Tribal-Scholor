import { useState, useMemo } from 'react';
import { CheckCircle, AlertTriangle, Lock } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { selectionNavItems } from '@/config/selectionNav';
import { useAuth } from '@/context/AuthContext';
import { applications } from '@/data/mockData';
import { getScreeningResult, DISCLAIMER } from '@/services/screeningService';
import { schemes } from '@/config/schemes';
import type { StatItem } from '@/types';

export function SelectionShortlistingPage() {
  const { user } = useAuth();

  const scoredApps = useMemo(() => {
    return applications
      .filter((a) => a.status === 'Eligible' || a.status === 'Under Screening' || a.status === 'Selected' || a.status === 'Not Selected')
      .map((a) => ({ app: a, result: getScreeningResult(a.id, a.schemeId) }))
      .filter((x) => x.result !== null)
      .sort((a, b) => (b.result!.totalScore - a.result!.totalScore));
  }, []);

  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const stats: StatItem[] = [
    { label: 'Total Scored', value: scoredApps.length },
    { label: 'Confirmed', value: confirmed.size, tone: 'success' },
    { label: 'Pending Confirmation', value: scoredApps.length - confirmed.size, tone: 'warning' },
    { label: 'Top Score', value: scoredApps.length > 0 ? `${scoredApps[0].result!.totalScore}/${scoredApps[0].result!.maxTotalScore}` : '—' },
  ];

  const handleConfirm = (appId: string) => {
    setConfirmed(new Set([...confirmed, appId]));
    setShowConfirm(null);
  };

  return (
    <AppShell items={selectionNavItems} activePath="/selection/shortlisting">
      <header className="flex h-16 shrink-0 items-center border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Selection Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Shortlisting — {user?.name}</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="mt-6 border border-ink-200 bg-ink-50 p-4">
            <div className="flex items-start gap-2">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
              <div>
                <p className="text-sm font-medium text-ink-700">Selection requires explicit human confirmation</p>
                <p className="mt-0.5 text-xs text-ink-500">AI-assisted assessment supports the decision but does not replace it. Each confirmation is recorded in the audit trail.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader
              eyebrow="Ranked"
              title="Candidate Shortlisting"
              description="Candidates ranked by total score. Confirm selection for each candidate individually."
            />

            <div className="mt-4 border border-ink-200 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50 text-left">
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Rank</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Application ID</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Applicant</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Scheme</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Score</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Percentile</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Status</th>
                    <th className="px-4 py-2.5 text-right text-2xs font-semibold uppercase tracking-wider text-ink-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {scoredApps.map(({ app, result }, idx) => {
                    const isConfirmed = confirmed.has(app.id);
                    const scheme = schemes[app.schemeId];
                    return (
                      <tr key={app.id} className="border-b border-ink-100 table-row-hover">
                        <td className="px-4 py-3 text-sm font-medium text-ink-700">#{idx + 1}</td>
                        <td className="px-4 py-3 font-mono text-xs font-medium text-ink-800">{app.id}</td>
                        <td className="px-4 py-3 text-sm text-ink-700">{app.applicantName}</td>
                        <td className="px-4 py-3 text-xs text-ink-600">{scheme.shortName}</td>
                        <td className="px-4 py-3 text-sm font-medium text-ink-800">{result!.totalScore}/{result!.maxTotalScore}</td>
                        <td className="px-4 py-3 text-sm font-medium text-ink-800">{result!.percentile}%</td>
                        <td className="px-4 py-3">
                          {isConfirmed ? (
                            <span className="inline-flex items-center gap-1 border border-forest-300 bg-forest-50 px-2 py-0.5 text-2xs font-medium text-forest-700">
                              <CheckCircle className="h-3 w-3" />
                              Confirmed
                            </span>
                          ) : app.status === 'Selected' ? (
                            <StatusBadge status="Selected" size="sm" />
                          ) : app.status === 'Not Selected' ? (
                            <StatusBadge status="Not Selected" size="sm" />
                          ) : (
                            <span className="inline-flex items-center gap-1 border border-saffron-300 bg-saffron-50 px-2 py-0.5 text-2xs font-medium text-saffron-700">
                              <AlertTriangle className="h-3 w-3" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {isConfirmed ? (
                            <span className="text-xs text-forest-600">Confirmed</span>
                          ) : showConfirm === app.id ? (
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleConfirm(app.id)} className="btn-primary text-xs px-3 py-1.5">
                                Confirm Selection
                              </button>
                              <button onClick={() => setShowConfirm(null)} className="btn-ghost text-xs">
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowConfirm(app.id)}
                              className="text-xs font-medium text-ink-600 transition-colors hover:text-ink-950"
                            >
                              Review & Confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Score criteria reference */}
            <div className="mt-6 border border-ink-200 bg-white p-5">
              <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400 mb-3">Screening Criteria — NFST</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {schemes.nfst.screeningCriteria.map((c) => (
                  <div key={c.id} className="flex items-center justify-between border border-ink-100 px-3 py-2">
                    <div>
                      <p className="text-sm text-ink-800">{c.label}</p>
                      <p className="text-2xs text-ink-400">{c.description}</p>
                    </div>
                    <span className="text-sm font-medium text-ink-700">{c.weight}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-400">{DISCLAIMER}</p>
            </div>

            <p className="mt-4 text-xs text-ink-400">Demo data · AI-assisted assessment supports but does not make the final decision.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
