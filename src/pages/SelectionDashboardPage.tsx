import { useNavigate } from 'react-router-dom';
import { Users, ListChecks, Trophy, ClipboardList } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { selectionNavItems } from '@/config/selectionNav';
import { useAuth } from '@/context/AuthContext';
import { applications } from '@/data/mockData';
import { getScreeningResult } from '@/services/screeningService';
import type { StatItem } from '@/types';

export function SelectionDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const eligibleApps = applications.filter(
    (a) => a.status === 'Eligible' || a.status === 'Under Screening' || a.status === 'Selected' || a.status === 'Not Selected'
  );

  const scoredApps = eligibleApps
    .map((a) => ({ app: a, result: getScreeningResult(a.id, a.schemeId) }))
    .filter((x) => x.result !== null)
    .sort((a, b) => (b.result!.totalScore - a.result!.totalScore));

  const stats: StatItem[] = [
    { label: 'Eligible Candidates', value: eligibleApps.length },
    { label: 'Scored', value: scoredApps.length, tone: 'success' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'Selected').length, tone: 'success' },
    { label: 'Awaiting Assessment', value: eligibleApps.filter(a => a.status === 'Eligible').length, tone: 'warning' },
  ];

  return (
    <AppShell items={selectionNavItems} activePath="/selection/dashboard">
      <header className="flex h-16 shrink-0 items-center border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Selection Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Screening Dashboard — {user?.name}</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button onClick={() => navigate('/selection/candidates')} className="border border-ink-200 bg-white p-5 text-left transition-colors hover:border-ink-400">
              <Users className="h-6 w-6 text-ink-400" />
              <h3 className="mt-3 text-sm font-medium text-ink-900">View Candidates</h3>
              <p className="mt-1 text-xs text-ink-500">Browse all eligible candidates</p>
            </button>
            <button onClick={() => navigate('/selection/shortlisting')} className="border border-ink-200 bg-white p-5 text-left transition-colors hover:border-ink-400">
              <ListChecks className="h-6 w-6 text-ink-400" />
              <h3 className="mt-3 text-sm font-medium text-ink-900">Shortlisting</h3>
              <p className="mt-1 text-xs text-ink-500">Score and shortlist candidates</p>
            </button>
            <button onClick={() => navigate('/selection/results')} className="border border-ink-200 bg-white p-5 text-left transition-colors hover:border-ink-400">
              <Trophy className="h-6 w-6 text-ink-400" />
              <h3 className="mt-3 text-sm font-medium text-ink-900">Results</h3>
              <p className="mt-1 text-xs text-ink-500">View final selection results</p>
            </button>
            <div className="border border-ink-200 bg-ink-50 p-5">
              <ClipboardList className="h-6 w-6 text-ink-400" />
              <h3 className="mt-3 text-sm font-medium text-ink-900">Criteria</h3>
              <p className="mt-1 text-xs text-ink-500">Prototype configuration — replace with officially approved scheme criteria.</p>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader
              eyebrow="Top Candidates"
              title="Highest Scored Applications"
              description="Candidates ranked by total screening score"
            />
            <div className="mt-4 border border-ink-200 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50 text-left">
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Application ID</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Applicant</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Scheme</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Score</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Percentile</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scoredApps.slice(0, 6).map(({ app, result }) => (
                    <tr
                      key={app.id}
                      onClick={() => navigate(`/selection/candidates`)}
                      className="cursor-pointer border-b border-ink-100 table-row-hover"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-medium text-ink-800">{app.id}</td>
                      <td className="px-4 py-3 text-sm text-ink-700">{app.applicantName}</td>
                      <td className="px-4 py-3 text-xs text-ink-600">{app.schemeName}</td>
                      <td className="px-4 py-3 text-sm font-medium text-ink-800">{result!.totalScore}/{result!.maxTotalScore}</td>
                      <td className="px-4 py-3 text-sm font-medium text-ink-800">{result!.percentile}%</td>
                      <td className="px-4 py-3"><StatusBadge status={app.status} size="sm" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-ink-400">Demo data · Prototype configuration — replace with officially approved scheme criteria.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
