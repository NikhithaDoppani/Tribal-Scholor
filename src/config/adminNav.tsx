import { LayoutDashboard, FileText, Users, BarChart3, ScrollText, Settings } from 'lucide-react';

export const adminNavItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Schemes', path: '/admin/schemes', icon: <FileText className="h-4 w-4" /> },
  { label: 'Users', path: '/admin/users', icon: <Users className="h-4 w-4" /> },
  { label: 'Reports', path: '/admin/reports', icon: <BarChart3 className="h-4 w-4" /> },
  { label: 'Audit Log', path: '/admin/audit-log', icon: <ScrollText className="h-4 w-4" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings className="h-4 w-4" /> },
];
