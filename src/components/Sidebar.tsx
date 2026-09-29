import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  items: { label: string; path: string; icon: React.ReactNode }[];
  activePath: string;
}

export function Sidebar({ items, activePath }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-ink-200 bg-white">
      <div className="flex h-16 items-center border-b border-ink-200 px-5">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-lg font-semibold text-ink-950">TRIBAL</span>
          <span className="font-sans text-sm font-medium text-saffron-600">SCHOLAR</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-2 pb-2 text-2xs font-semibold uppercase tracking-[0.18em] text-ink-400">
          {user?.roleLabel}
        </p>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = activePath === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-ink-100 font-medium text-ink-950'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                  }`}
                >
                  <span className={isActive ? 'text-ink-950' : 'text-ink-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-ink-200 p-3">
        <div className="px-2 pb-3">
          <p className="text-sm font-medium text-ink-900">{user?.name}</p>
          <p className="text-xs text-ink-500">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
