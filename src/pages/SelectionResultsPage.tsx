import { useMemo } from 'react';
import { Trophy, CheckCircle, XCircle } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { selectionNavItems } from '@/config/selectionNav';
import { useAuth } from '@/context/AuthContext';
import { applications, applicationTimelines } from '@/data/mockData';
import { getScreeningResult, DISCLAIMER } from '@/services/screeningService';
import { schemes } from '@/config/schemes';
import type { StatItem } from '@/types';

export function SelectionResultsPage() {
  const { user } = useAuth();

  const selectedApps = useMemo(() => {
    return applications
      .filter((a) => a.status === 'Selected' || a.status === 'Not Selected')
      .map((a) => ({ app: a, result: getScreeningResult(a.id, a.schemeId) }))
      .sort((a, b) => {
        const aScore = a.result?.totalScore ?? 0;
        const bScore = b.result?.totalScore ?? 0;
        return bScore - aScore;
      });
  }, []);

  const stats: StatItem[] = [
    { label: 'Selected', value: applications.filter(a => a.status === 'Selected').length, tone: 'success' },
    { label: 'Not Selected', value: applications.filter(a => a.status === 'Not Selected').length },
    { label: 'Total Assessed', value: selectedApps.length },
    { label: 'Avg Score', value: selectedApps.length > 0 ? Math.round(selectedApps.reduce((s, x) => s + (x.result?.totalScore ?? 0), 0) / selectedApps.length) : 0 },
  ];

  return (
    <AppShell items={selectionNavItems} activePath="/selection/results">
      <header className="flex h-16 shrink-0 items-center border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Selection Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Final Results — {user?.name}</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="mt-8">
            <SectionHeader
              eyebrow="Outcome"
              title="Selection Results"
              description="Final selection outcomes with audit trail"
            />

            {selectedApps.length > 0 ? (
              <div className="mt-4 space-y-4">
                {selectedApps.map(({ app, result }) => {
                  const scheme = schemes[app.schemeId];
                  const timeline = applicationTimelines[app.id] || [];
                  const isSelected = app.status === 'Selected';
                  return (
                    <div key={app.id} className={`border bg-white p-5 ${isSelected ? 'border-forest-300' : 'border-ink-200'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          {isSelected ? (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-forest-300 bg-forest-50">
                              <Trophy className="h-5 w-5 text-forest-600" />
                            </div>
                          ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink-200 bg-ink-50">
                              <XCircle className="h-5 w-5 text-ink-400" />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-sm font-medium text-ink-900">{app.applicantName}</h3>
                              <StatusBadge status={app.status} size="sm" />
                            </div>
                            <p className="mt-0.5 font-mono text-2xs text-ink-500">{app.id}</p>
                            <p className="mt-0.5 text-xs text-ink-600">{app.schemeName} — {app.programme}</p>
                            <p className="mt-0.5 text-xs text-ink-500">State: {app.state}</p>
                          </div>
                        </div>
                        {result && (
                          <div className="text-right">
                            <p className="font-serif text-xl font-medium text-ink-950">{result.totalScore}<span className="text-sm text-ink-400">/{result.maxTotalScore}</span></p>
                            <p className="text-xs text-ink-500">{result.percentile}th percentile</p>
                          </div>
                        )}
                      </div>

                      {/* Score breakdown summary */}
                      {result && (
                        <div className="mt-4 border-t border-ink-100 pt-3">
                          <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400 mb-2">Score Breakdown</p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {result.scores.map((s) => (
                              <div key={s.criterionId} className="border border-ink-100 px-2 py-1.5">
                                <p className="text-2xs text-ink-400">{s.criterionLabel}</p>
                                <p className="text-sm font-medium text-ink-800">{s.score}/{s.maxScore}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Audit trail */}
                      {timeline.length > 0 && (
                        <div className="mt-4 border-t border-ink-100 pt-3">
                          <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400 mb-2">Audit Trail</p>
                          <ul className="space-y-1.5">
                            {timeline.map((event) => (
                              <li key={event.id} className="flex items-start gap-2 text-xs">
                                <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-ink-300" />
                                <span className="text-ink-500">{event.timestamp}</span>
                                <span className="text-ink-700">— {event.action}</span>
                                <span className="text-ink-500">({event.actor})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={<Trophy className="h-10 w-10" />}
                title="No results yet"
                description="Final selection results will appear here once candidates are confirmed."
              />
            )}
          </div>

          <p className="mt-6 text-xs text-ink-400">Demo data · {DISCLAIMER}</p>
        </div>
      </div>
    </AppShell>
  );
}
