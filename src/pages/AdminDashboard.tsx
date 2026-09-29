import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { AppShell } from '@/components/AppShell';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { useAuth } from '@/context/AuthContext';
import { adminNavItems } from '@/config/adminNav';
import { adminStats, adminChartData, monthlyApplicationsData, turnaroundData, applications } from '@/data/mockData';
import type { StatItem, ApplicationStatus } from '@/types';

const statusColors: Record<string, string> = {
  Draft: '#8e8a82',
  Submitted: '#3d80a8',
  'Under Verification': '#e09a14',
  'Deficiency Raised': '#b86a3f',
  Eligible: '#487f55',
  'Under Screening': '#5f9bc0',
  Selected: '#356640',
  'Not Selected': '#6b675e',
};

const schemeOptions = ['All', 'NFST', 'NOS'];
const stateOptions = ['All', 'Jharkhand', 'Odisha', 'Madhya Pradesh', 'Meghalaya', 'Mizoram', 'Maharashtra', 'Gujarat', 'Assam', 'Arunachal Pradesh', 'Chhattisgarh', 'West Bengal', 'Rajasthan'];
const statusOptions: ('All' | ApplicationStatus)[] = ['All', 'Submitted', 'Under Verification', 'Deficiency Raised', 'Eligible', 'Under Screening', 'Selected', 'Not Selected', 'Draft'];
const academicYearOptions = ['All', '2026-27', '2025-26', '2024-25'];

export function AdminDashboard() {
  const { user } = useAuth();
  const [schemeFilter, setSchemeFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | ApplicationStatus>('All');
  const [yearFilter, setYearFilter] = useState('All');

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      if (schemeFilter !== 'All') {
        if (schemeFilter === 'NFST' && app.schemeId !== 'nfst') return false;
        if (schemeFilter === 'NOS' && app.schemeId !== 'nos') return false;
      }
      if (statusFilter !== 'All' && app.status !== statusFilter) return false;
      if (stateFilter !== 'All' && app.state !== stateFilter) return false;
      return true;
    });
  }, [schemeFilter, stateFilter, statusFilter]);

  const stats: StatItem[] = adminStats.map((s) => ({
    label: s.label,
    value: s.value,
    tone: s.tone as StatItem['tone'],
  }));

  return (
    <AppShell items={adminNavItems} activePath="/admin/dashboard">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Ministry Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Ministry Overview — {user?.name}</h1>
        </div>
        <span className="border border-saffron-300 bg-saffron-50 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-saffron-700">
          Prototype / Demo Data
        </span>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="flex items-center gap-2 border border-saffron-200 bg-saffron-50 px-4 py-2.5">
            <p className="text-xs font-medium text-saffron-800">
              PROTOTYPE / DEMO DATA — The figures below are illustrative and do not represent actual Ministry statistics.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-6 border border-ink-200 bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <select value={schemeFilter} onChange={(e) => setSchemeFilter(e.target.value)} className="border border-ink-300 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-500 focus:outline-none">
                {schemeOptions.map((s) => <option key={s} value={s}>Scheme: {s}</option>)}
              </select>
              <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="border border-ink-300 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-500 focus:outline-none">
                {academicYearOptions.map((y) => <option key={y} value={y}>Academic Year: {y}</option>)}
              </select>
              <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="border border-ink-300 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-500 focus:outline-none">
                {stateOptions.map((s) => <option key={s} value={s}>State: {s}</option>)}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'All' | ApplicationStatus)} className="border border-ink-300 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-500 focus:outline-none">
                {statusOptions.map((s) => <option key={s} value={s}>Status: {s}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Distribution" title="Applications by Scheme" />
              <div className="mt-4 border border-ink-200 bg-white p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adminChartData.byScheme} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eeedeb" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                    <Tooltip contentStyle={{ border: '1px solid #d8d6d2', borderRadius: 0, fontSize: 12, fontFamily: 'Inter' }} cursor={{ fill: '#f7f7f6' }} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                    <Bar dataKey="applications" name="Applications" fill="#2a2825" barSize={40} />
                    <Bar dataKey="selected" name="Selected" fill="#e09a14" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Breakdown" title="Application Status" />
              <div className="mt-4 border border-ink-200 bg-white p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={adminChartData.byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={45} paddingAngle={1}>
                      {adminChartData.byStatus.map((entry) => (
                        <Cell key={entry.name} fill={statusColors[entry.name] || '#8e8a82'} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ border: '1px solid #d8d6d2', borderRadius: 0, fontSize: 12, fontFamily: 'Inter' }} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Geography" title="Applications by State" />
              <div className="mt-4 border border-ink-200 bg-white p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={adminChartData.byState} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eeedeb" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                    <YAxis type="category" dataKey="state" tick={{ fontSize: 11, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} width={110} />
                    <Tooltip contentStyle={{ border: '1px solid #d8d6d2', borderRadius: 0, fontSize: 12, fontFamily: 'Inter' }} cursor={{ fill: '#f7f7f6' }} />
                    <Bar dataKey="count" name="Applications" fill="#3d80a8" barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Trend" title="Monthly Applications" />
              <div className="mt-4 border border-ink-200 bg-white p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={monthlyApplicationsData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eeedeb" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                    <Tooltip contentStyle={{ border: '1px solid #d8d6d2', borderRadius: 0, fontSize: 12, fontFamily: 'Inter' }} />
                    <Line type="monotone" dataKey="count" name="Applications" stroke="#2a2825" strokeWidth={2} dot={{ r: 4, fill: '#2a2825' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader eyebrow="Performance" title="Verification Turnaround Time" />
            <div className="mt-4 border border-ink-200 bg-white p-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={turnaroundData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eeedeb" vertical={false} />
                  <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} unit="d" />
                  <Tooltip contentStyle={{ border: '1px solid #d8d6d2', borderRadius: 0, fontSize: 12, fontFamily: 'Inter' }} cursor={{ fill: '#f7f7f6' }} />
                  <Bar dataKey="days" name="Avg Days" fill="#487f55" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="mt-6 text-xs text-ink-400">
            Showing {filteredApps.length} applications with current filters · Demo data
          </p>
        </div>
      </div>
    </AppShell>
  );
}
