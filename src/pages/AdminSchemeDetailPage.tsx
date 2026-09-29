import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, FileText, CheckCircle, GraduationCap } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { adminNavItems } from '@/config/adminNav';
import { useAuth } from '@/context/AuthContext';
import { schemes } from '@/config/schemes';
import { applications } from '@/data/mockData';

export function AdminSchemeDetailPage() {
  const { user } = useAuth();
  const { schemeId } = useParams<{ schemeId: string }>();
  const navigate = useNavigate();

  const scheme = schemeId ? schemes[schemeId as keyof typeof schemes] : null;
  if (!scheme) return <Navigate to="/admin/schemes" replace />;

  const appCount = applications.filter((a) => a.schemeId === scheme.id).length;
  const selectedCount = applications.filter((a) => a.schemeId === scheme.id && a.status === 'Selected').length;

  return (
    <AppShell items={adminNavItems} activePath="/admin/schemes">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Ministry Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">{scheme.name} — {user?.name}</h1>
        </div>
        <button onClick={() => navigate('/admin/schemes')} className="btn-ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Schemes
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <div className="border border-ink-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-xl font-medium text-ink-950">{scheme.name}</h2>
              <span className={`inline-flex items-center border px-2 py-0.5 text-2xs font-medium ${
                scheme.status === 'Open' ? 'border-forest-300 bg-forest-50 text-forest-700' :
                scheme.status === 'Closed' ? 'border-ink-300 bg-ink-100 text-ink-600' :
                'border-saffron-300 bg-saffron-50 text-saffron-700'
              }`}>{scheme.status}</span>
            </div>
            <p className="mt-1 text-sm text-ink-600">{scheme.description}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Code</dt>
                <dd className="mt-0.5 text-sm text-ink-800">{scheme.code}</dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Study Level</dt>
                <dd className="mt-0.5 text-sm text-ink-800">{scheme.studyLevel}</dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Destination</dt>
                <dd className="mt-0.5 text-sm text-ink-800">{scheme.destination}</dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Applications</dt>
                <dd className="mt-0.5 text-sm text-ink-800">{appCount} ({selectedCount} selected)</dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Application Open</dt>
                <dd className="mt-0.5 text-sm text-ink-800">{scheme.applicationOpen}</dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Application Close</dt>
                <dd className="mt-0.5 text-sm text-ink-800">{scheme.applicationClose}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Criteria" title="Eligibility Rules" />
              <div className="mt-4 border border-ink-200 bg-white p-5">
                <ul className="space-y-3">
                  {scheme.eligibilityRules.map((rule) => (
                    <li key={rule.id} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
                      <div>
                        <p className="text-sm font-medium text-ink-800">{rule.label}</p>
                        <p className="text-xs text-ink-500">{rule.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-ink-100 pt-3 text-xs text-ink-400">
                  Prototype configuration — replace with officially approved scheme criteria.
                </p>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Scoring" title="Screening Criteria" />
              <div className="mt-4 border border-ink-200 bg-white p-5">
                <ul className="space-y-3">
                  {scheme.screeningCriteria.map((c) => (
                    <li key={c.id} className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                        <div>
                          <p className="text-sm font-medium text-ink-800">{c.label}</p>
                          <p className="text-xs text-ink-500">{c.description}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-ink-700">{c.weight}%</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-ink-100 pt-3 text-xs text-ink-400">
                  Prototype configuration — replace with officially approved scheme criteria.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader eyebrow="Documents" title="Required Documents" />
            <div className="mt-4 border border-ink-200 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50 text-left">
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Document</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Format</th>
                    <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">Max Size</th>
                  </tr>
                </thead>
                <tbody>
                  {scheme.requiredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b border-ink-100">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-ink-800">{doc.label}</p>
                        <p className="text-xs text-ink-500">{doc.description}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink-700">{doc.format}</td>
                      <td className="px-4 py-3 text-sm text-ink-700">{doc.maxSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
