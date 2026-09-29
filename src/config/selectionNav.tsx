import { ClipboardList, Users, ListChecks, Trophy } from 'lucide-react';

export const selectionNavItems = [
  { label: 'Dashboard', path: '/selection/dashboard', icon: <ClipboardList className="h-4 w-4" /> },
  { label: 'Candidates', path: '/selection/candidates', icon: <Users className="h-4 w-4" /> },
  { label: 'Shortlisting', path: '/selection/shortlisting', icon: <ListChecks className="h-4 w-4" /> },
  { label: 'Results', path: '/selection/results', icon: <Trophy className="h-4 w-4" /> },
];
