import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { adminNavItems } from '@/config/adminNav';
import { useAuth } from '@/context/AuthContext';
import { adminChartData, monthlyApplicationsData, turnaroundData, applications } from '@/data/mockData';

export function AdminReportsPage() {
  const { user } = useAuth();

  const statusCounts: Record<string, number> = {};
  applications.forEach((a) => {
    statusCounts[a.status] = (statusCounts[a.status] || 0) + 1;
  });
  const statusChartData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  return (
    <AppShell items={adminNavItems} activePath="/admin/reports">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Ministry Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Reports & Analytics — {user?.name}</h1>
        </div>
        <span className="border border-saffron-300 bg-saffron-50 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-saffron-700">
          Prototype / Demo Data
        </span>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="flex items-center gap-2 border border-saffron-200 bg-saffron-50 px-4 py-2.5">
            <p className="text-xs font-medium text-saffron-800">
              PROTOTYPE / DEMO DATA — These reports are illustrative and do not represent actual Ministry statistics.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Distribution" title="Applications by Scheme" />
              <div className="mt-4 border border-ink-200 bg-white p-6">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={adminChartData.byScheme} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eeedeb" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                    <Tooltip contentStyle={{ border: '1px solid #d8d6d2', borderRadius: 0, fontSize: 12, fontFamily: 'Inter' }} cursor={{ fill: '#f7f7f6' }} />
                    <Bar dataKey="applications" name="Applications" fill="#2a2825" barSize={40} />
                    <Bar dataKey="selected" name="Selected" fill="#e09a14" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Live Data" title="Application Status (Current)" />
              <div className="mt-4 border border-ink-200 bg-white p-6">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={statusChartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eeedeb" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6b675e' }} axisLine={{ stroke: '#d8d6d2' }} tickLine={false} width={120} />
                    <Tooltip contentStyle={{ border: '1px solid #d8d6d2', borderRadius: 0, fontSize: 12, fontFamily: 'Inter' }} cursor={{ fill: '#f7f7f6' }} />
                    <Bar dataKey="value" name="Count" fill="#3d80a8" barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Trend" title="Monthly Applications" />
              <div className="mt-4 border border-ink-200 bg-white p-6">
                <ResponsiveContainer width="100%" height={280}>
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

            <div>
              <SectionHeader eyebrow="Performance" title="Verification Turnaround" />
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
          </div>
          <p className="mt-6 text-xs text-ink-400">Demo data · Reports are generated from mock data.</p>
        </div>
      </div>
    </AppShell>
  );
}
