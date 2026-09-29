import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const redirectPath = `/${user.role === 'applicant' ? 'applicant' : user.role === 'admin' ? 'admin' : user.role === 'selection' ? 'selection' : 'officer'}/dashboard`;
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
