import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileCheck, AlertTriangle, Settings, Search, Filter } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { ApplicationTable } from '@/components/ApplicationTable';
import { useAuth } from '@/context/AuthContext';
import { officerNavItems } from '@/config/officerNav';
import { applications, officerStats } from '@/data/mockData';
import type { StatItem, ApplicationStatus } from '@/types';

const navItems = officerNavItems;

const statusOptions: ('All' | ApplicationStatus)[] = [
  'All', 'Submitted', 'Under Verification', 'Deficiency Raised', 'Eligible', 'Under Screening', 'Selected', 'Not Selected', 'Draft',
];

const schemeOptions = ['All', 'NFST', 'NOS'];
const stateOptions = ['All', 'Jharkhand', 'Odisha', 'Madhya Pradesh', 'Meghalaya', 'Mizoram', 'Maharashtra', 'Gujarat', 'Assam', 'Arunachal Pradesh', 'Chhattisgarh', 'West Bengal', 'Rajasthan'];

export function OfficerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [schemeFilter, setSchemeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | ApplicationStatus>('All');
  const [stateFilter, setStateFilter] = useState('All');

  const stats: StatItem[] = [
    { label: 'Pending Verification', value: officerStats.pendingVerification, tone: 'warning' },
    { label: 'Deficiencies', value: officerStats.deficiencies, tone: 'warning' },
    { label: 'Verified Today', value: officerStats.verifiedToday, tone: 'success' },
    { label: 'Total Applications', value: officerStats.totalApplications.toLocaleString() },
  ];

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      if (search) {
        const q = search.toLowerCase();
        if (!app.id.toLowerCase().includes(q) && !app.applicantName.toLowerCase().includes(q)) return false;
      }
      if (schemeFilter !== 'All') {
        if (schemeFilter === 'NFST' && app.schemeId !== 'nfst') return false;
        if (schemeFilter === 'NOS' && app.schemeId !== 'nos') return false;
      }
      if (statusFilter !== 'All' && app.status !== statusFilter) return false;
      if (stateFilter !== 'All' && app.state !== stateFilter) return false;
      return true;
    });
  }, [search, schemeFilter, statusFilter, stateFilter]);

  return (
    <AppShell items={navItems} activePath="/officer/applications">
      <header className="flex h-16 shrink-0 items-center border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Officer Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Verification Workspace — {user?.name}</h1>
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
              eyebrow="Queue"
              title="Verification Queue"
              description="Review and verify applicant documents and eligibility"
            />

            <div className="mt-4 border border-ink-200 bg-white p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
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
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'All' | ApplicationStatus)}
                    className="border border-ink-300 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-500 focus:outline-none"
                  >
                    {statusOptions.map((s) => <option key={s} value={s}>Status: {s}</option>)}
                  </select>
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="border border-ink-300 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-500 focus:outline-none"
                  >
                    {stateOptions.map((s) => <option key={s} value={s}>State: {s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 border border-ink-200 bg-white">
              <ApplicationTable
                applications={filteredApps}
                columns={['applicantName', 'scheme', 'submitted', 'documents', 'eligibility', 'status']}
                onRowClick={(app) => navigate(`/officer/applications/${app.id}`)}
              />
            </div>

            <p className="mt-3 text-xs text-ink-400">
              Showing {filteredApps.length} of {applications.length} applications · Demo data
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
