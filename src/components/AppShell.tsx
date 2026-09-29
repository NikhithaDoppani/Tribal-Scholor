import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  items: { label: string; path: string; icon: ReactNode }[];
  activePath: string;
  children: ReactNode;
}

export function AppShell({ items, activePath, children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-ink-50">
      <Sidebar items={items} activePath={activePath} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
