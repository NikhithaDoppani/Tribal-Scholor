import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LandingPage } from '@/pages/LandingPage';
import { SchemesPage } from '@/pages/SchemesPage';
import { SchemeDetailPage } from '@/pages/SchemeDetailPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { FAQsPage } from '@/pages/FAQsPage';
import { HelpPage } from '@/pages/HelpPage';
import { LoginPage } from '@/pages/LoginPage';
import { ApplicantDashboard } from '@/pages/ApplicantDashboard';
import { ApplicantProfilePage } from '@/pages/ApplicantProfilePage';
import { ApplicantApplicationsPage } from '@/pages/ApplicantApplicationsPage';
import { NewApplicationPage } from '@/pages/NewApplicationPage';
import { ApplicationDetailPage } from '@/pages/ApplicationDetailPage';
import { ApplicantDocumentsPage } from '@/pages/ApplicantDocumentsPage';
import { ApplicantNotificationsPage } from '@/pages/ApplicantNotificationsPage';
import { OfficerDashboard } from '@/pages/OfficerDashboard';
import { OfficerApplicationsPage } from '@/pages/OfficerApplicationsPage';
import { OfficerApplicationDetailPage } from '@/pages/OfficerApplicationDetailPage';
import { OfficerVerificationPage } from '@/pages/OfficerVerificationPage';
import { OfficerDeficienciesPage } from '@/pages/OfficerDeficienciesPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { AdminSchemesPage } from '@/pages/AdminSchemesPage';
import { AdminSchemeDetailPage } from '@/pages/AdminSchemeDetailPage';
import { AdminUsersPage } from '@/pages/AdminUsersPage';
import { AdminReportsPage } from '@/pages/AdminReportsPage';
import { AdminAuditLogPage } from '@/pages/AdminAuditLogPage';
import { AdminSettingsPage } from '@/pages/AdminSettingsPage';
import { SelectionDashboardPage } from '@/pages/SelectionDashboardPage';
import { SelectionCandidatesPage } from '@/pages/SelectionCandidatesPage';
import { SelectionShortlistingPage } from '@/pages/SelectionShortlistingPage';
import { SelectionResultsPage } from '@/pages/SelectionResultsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/scheme/:schemeId" element={<SchemeDetailPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Applicant routes */}
          <Route
            path="/applicant/dashboard"
            element={
              <ProtectedRoute allowedRoles={['applicant']}>
                <ApplicantDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicant/profile"
            element={
              <ProtectedRoute allowedRoles={['applicant']}>
                <ApplicantProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicant/applications"
            element={
              <ProtectedRoute allowedRoles={['applicant']}>
                <ApplicantApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicant/applications/new"
            element={
              <ProtectedRoute allowedRoles={['applicant']}>
                <NewApplicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicant/applications/:id"
            element={
              <ProtectedRoute allowedRoles={['applicant']}>
                <ApplicationDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicant/documents"
            element={
              <ProtectedRoute allowedRoles={['applicant']}>
                <ApplicantDocumentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicant/notifications"
            element={
              <ProtectedRoute allowedRoles={['applicant']}>
                <ApplicantNotificationsPage />
              </ProtectedRoute>
            }
          />

          {/* Officer routes */}
          <Route
            path="/officer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['verification', 'selection']}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/applications"
            element={
              <ProtectedRoute allowedRoles={['verification', 'selection']}>
                <OfficerApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/applications/:id"
            element={
              <ProtectedRoute allowedRoles={['verification', 'selection']}>
                <OfficerApplicationDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/verification"
            element={
              <ProtectedRoute allowedRoles={['verification', 'selection']}>
                <OfficerVerificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/deficiencies"
            element={
              <ProtectedRoute allowedRoles={['verification', 'selection']}>
                <OfficerDeficienciesPage />
              </ProtectedRoute>
            }
          />

          {/* Selection routes */}
          <Route
            path="/selection/dashboard"
            element={
              <ProtectedRoute allowedRoles={['selection', 'admin']}>
                <SelectionDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/selection/candidates"
            element={
              <ProtectedRoute allowedRoles={['selection', 'admin']}>
                <SelectionCandidatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/selection/shortlisting"
            element={
              <ProtectedRoute allowedRoles={['selection', 'admin']}>
                <SelectionShortlistingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/selection/results"
            element={
              <ProtectedRoute allowedRoles={['selection', 'admin']}>
                <SelectionResultsPage />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/schemes"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSchemesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/schemes/:schemeId"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSchemeDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/audit-log"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminAuditLogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
