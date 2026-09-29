import { LayoutDashboard, FileCheck, AlertTriangle, ClipboardList } from 'lucide-react';

export const officerNavItems = [
  { label: 'Workspace', path: '/officer/applications', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Verification Queue', path: '/officer/verification', icon: <FileCheck className="h-4 w-4" /> },
  { label: 'Deficiencies', path: '/officer/deficiencies', icon: <AlertTriangle className="h-4 w-4" /> },
  { label: 'All Applications', path: '/officer/applications', icon: <ClipboardList className="h-4 w-4" /> },
];
