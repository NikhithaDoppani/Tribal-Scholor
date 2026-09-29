import { useState, useMemo } from 'react';
import { Search, ScrollText } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';
import { adminNavItems } from '@/config/adminNav';
import { useAuth } from '@/context/AuthContext';
import { auditLogEntries } from '@/data/mockData';

export function AdminAuditLogPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const filteredEntries = useMemo(() => {
    return auditLogEntries.filter((e) => {
      if (search) {
        const q = search.toLowerCase();
        if (!e.user.toLowerCase().includes(q) && !e.applicationId.toLowerCase().includes(q) && !e.action.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search]);

  return (
    <AppShell items={adminNavItems} activePath="/admin/audit-log">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Ministry Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Audit Log — {user?.name}</h1>
        </div>
        <span className="border border-saffron-300 bg-saffron-50 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-saffron-700">
          Prototype / Demo Data
        </span>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <SectionHeader
            eyebrow="Audit Trail"
            title="System Audit Log"
            description="Every important action is recorded with timestamp, user, and status change"
          />

          <div className="mt-4 border border-ink-200 bg-white p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                placeholder="Search by user, application ID, or action"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-ink-300 bg-white py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-500 focus:outline-none focus:ring-1 focus:ring-ink-500"
              />
            </div>
          </div>

          {filteredEntries.length > 0 ? (
            <div className="mt-4 border border-ink-200 bg-white overflow-x-auto scrollbar-thin">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50 text-left">
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Timestamp</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">User</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Role</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Application ID</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Action</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Previous Status</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">New Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="border-b border-ink-100 table-row-hover">
                      <td className="px-4 py-3 text-xs text-ink-500 whitespace-nowrap">{entry.timestamp}</td>
                      <td className="px-4 py-3 text-sm font-medium text-ink-900">{entry.user}</td>
                      <td className="px-4 py-3 text-xs text-ink-600">{entry.role}</td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-700">{entry.applicationId}</td>
                      <td className="px-4 py-3 text-sm text-ink-800">{entry.action}</td>
                      <td className="px-4 py-3 text-xs text-ink-500">{entry.previousStatus}</td>
                      <td className="px-4 py-3 text-xs font-medium text-ink-700">{entry.newStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4">
              <EmptyState icon={<ScrollText className="h-8 w-8" />} title="No audit entries found" description="No entries match your search." />
            </div>
          )}
          <p className="mt-4 text-xs text-ink-400">Demo data · Audit log entries are illustrative.</p>
        </div>
      </div>
    </AppShell>
  );
}
