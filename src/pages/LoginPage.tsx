import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ClipboardCheck, Building2, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import { PublicHeader } from '@/components/PublicHeader';

const roles: { role: UserRole; label: string; description: string; icon: React.ComponentType<{ className?: string }>; path: string }[] = [
  { role: 'applicant', label: 'Applicant', description: 'Submit and track scholarship and fellowship applications', icon: User, path: '/applicant/dashboard' },
  { role: 'verification', label: 'Verification Officer', description: 'Review documents and verify applicant eligibility', icon: ShieldCheck, path: '/officer/dashboard' },
  { role: 'selection', label: 'Selection Officer', description: 'Screen eligible candidates and manage selection', icon: ClipboardCheck, path: '/selection/dashboard' },
  { role: 'admin', label: 'Ministry Administrator', description: 'Overview schemes, applications, and Ministry-wide metrics', icon: Building2, path: '/admin/dashboard' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role: UserRole, path: string) => {
    login(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <PublicHeader />

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-eyebrow">Sign In</p>
            <h1 className="mt-3 font-serif text-3xl font-medium text-ink-950">Sign in to Tribal Scholar</h1>
            <p className="mt-2 text-sm text-ink-500">Demo Environment</p>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center gap-2 border border-saffron-300 bg-saffron-50 px-4 py-2.5">
              <AlertTriangle className="h-4 w-4 text-saffron-600" />
              <p className="text-xs font-medium text-saffron-800">
                Prototype environment — demo accounts only
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {roles.map((r) => (
              <div
                key={r.role}
                className="group flex flex-col border border-ink-200 bg-white p-5 transition-colors hover:border-ink-400"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-ink-200 bg-ink-50 text-ink-500 transition-colors group-hover:border-ink-300 group-hover:text-ink-700">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-medium text-ink-900">{r.label}</h3>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-sm text-ink-600">{r.description}</p>
                <button
                  onClick={() => handleLogin(r.role, r.path)}
                  className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-sm font-medium text-ink-700 transition-colors hover:text-ink-950"
                >
                  Continue as {r.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-ink-400">
            No registration required for the demo. Click a role above to enter the corresponding workspace.
          </p>
        </div>
      </section>
    </div>
  );
}
