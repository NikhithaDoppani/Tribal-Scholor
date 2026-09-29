import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';
import { adminNavItems } from '@/config/adminNav';
import { useAuth } from '@/context/AuthContext';
import { adminUserList } from '@/data/mockData';

export function AdminUsersPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    return adminUserList.filter((u) => {
      if (search) {
        const q = search.toLowerCase();
        if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q) && !u.role.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search]);

  return (
    <AppShell items={adminNavItems} activePath="/admin/users">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Ministry Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">User Management — {user?.name}</h1>
        </div>
        <span className="border border-saffron-300 bg-saffron-50 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-saffron-700">
          Prototype / Demo Data
        </span>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <SectionHeader
            eyebrow="Users"
            title="Registered Users"
            description="Demo user-management interface"
          />

          <div className="mt-4 border border-ink-200 bg-white p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                placeholder="Search by name, email, or role"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-ink-300 bg-white py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-500 focus:outline-none focus:ring-1 focus:ring-ink-500"
              />
            </div>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="mt-4 border border-ink-200 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50 text-left">
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Name</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Role</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Email</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Status</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-ink-100 table-row-hover">
                      <td className="px-4 py-3 text-sm font-medium text-ink-900">{u.name}</td>
                      <td className="px-4 py-3 text-sm text-ink-700">{u.role}</td>
                      <td className="px-4 py-3 text-xs text-ink-600">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center border px-2 py-0.5 text-2xs font-medium ${
                          u.status === 'Active' ? 'border-forest-300 bg-forest-50 text-forest-700' : 'border-ink-300 bg-ink-100 text-ink-500'
                        }`}>{u.status}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-500">{u.lastLogin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4">
              <EmptyState title="No users found" description="No users match your search." />
            </div>
          )}
          <p className="mt-4 text-xs text-ink-400">Demo data · User management is for demonstration only.</p>
        </div>
      </div>
    </AppShell>
  );
}
