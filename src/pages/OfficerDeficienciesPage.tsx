import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Search } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';
import { officerNavItems } from '@/config/officerNav';
import { applications, applicationTimelines } from '@/data/mockData';
import type { StatItem, TimelineEvent } from '@/types';

export function OfficerDeficienciesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const deficiencyApps = useMemo(() => {
    return applications.filter((a) => {
      const timeline = applicationTimelines[a.id] || [];
      const hasDeficiency = timeline.some((t) => t.action === 'Deficiency Raised' || t.actionRequired);
      if (!hasDeficiency && a.status !== 'Deficiency Raised') return false;
      if (search) {
        const q = search.toLowerCase();
        if (!a.id.toLowerCase().includes(q) && !a.applicantName.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search]);

  const stats: StatItem[] = [
    { label: 'Open Deficiencies', value: deficiencyApps.length, tone: 'warning' },
    { label: 'Resolved', value: 18, tone: 'success' },
    { label: 'Overdue', value: 3, tone: 'warning' },
    { label: 'Total Raised', value: 42 },
  ];

  const getDeficiencyDetail = (appId: string): TimelineEvent | undefined => {
    const timeline = applicationTimelines[appId] || [];
    return timeline.find((t) => t.action === 'Deficiency Raised' || t.actionRequired);
  };

  return (
    <AppShell items={officerNavItems} activePath="/officer/deficiencies">
      <header className="flex h-16 shrink-0 items-center border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Officer Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Deficiencies</h1>
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
              eyebrow="Action Required"
              title="Deficiency Queue"
              description="Applications with raised deficiencies requiring applicant response"
            />

            <div className="mt-4 border border-ink-200 bg-white p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="text"
                  placeholder="Search by Application ID or Applicant Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-ink-300 bg-white py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-500 focus:outline-none focus:ring-1 focus:ring-ink-500"
                />
              </div>
            </div>

            {deficiencyApps.length > 0 ? (
              <div className="mt-4 space-y-3">
                {deficiencyApps.map((app) => {
                  const detail = getDeficiencyDetail(app.id);
                  return (
                    <div
                      key={app.id}
                      onClick={() => navigate(`/officer/applications/${app.id}`)}
                      className="group cursor-pointer border border-clay-200 bg-white p-4 transition-colors hover:border-clay-400"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-medium text-ink-700">{app.id}</span>
                            <span className="inline-flex items-center gap-1 border border-clay-300 bg-clay-50 px-2 py-0.5 text-2xs font-medium text-clay-700">
                              <AlertTriangle className="h-3 w-3" />
                              Deficiency Raised
                            </span>
                          </div>
                          <h3 className="mt-1.5 text-sm font-medium text-ink-900">{app.applicantName}</h3>
                          <p className="mt-0.5 text-xs text-ink-600">{app.schemeName} — {app.programme}</p>
                          {detail && (
                            <div className="mt-2 border border-clay-200 bg-clay-50 px-3 py-2">
                              <p className="text-xs text-clay-700">{detail.detail}</p>
                              <p className="mt-1 text-2xs text-clay-500">Raised: {detail.timestamp} by {detail.actor}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4">
                <EmptyState
                  icon={<AlertTriangle className="h-10 w-10" />}
                  title="No open deficiencies"
                  description="Applications with raised deficiencies will appear here."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
