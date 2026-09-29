import { LayoutDashboard, FileText, Plus, FolderOpen, Bell, User } from 'lucide-react';

export const applicantNavItems = [
  { label: 'Dashboard', path: '/applicant/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'My Profile', path: '/applicant/profile', icon: <User className="h-4 w-4" /> },
  { label: 'My Applications', path: '/applicant/applications', icon: <FileText className="h-4 w-4" /> },
  { label: 'New Application', path: '/applicant/applications/new', icon: <Plus className="h-4 w-4" /> },
  { label: 'Documents', path: '/applicant/documents', icon: <FolderOpen className="h-4 w-4" /> },
  { label: 'Notifications', path: '/applicant/notifications', icon: <Bell className="h-4 w-4" /> },
];
