import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Users } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { adminNavItems } from '@/config/adminNav';
import { useAuth } from '@/context/AuthContext';
import { schemes } from '@/config/schemes';
import { applications } from '@/data/mockData';

export function AdminSchemesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const schemeList = Object.values(schemes);

  return (
    <AppShell items={adminNavItems} activePath="/admin/schemes">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Ministry Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Scheme Management — {user?.name}</h1>
        </div>
        <span className="border border-saffron-300 bg-saffron-50 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-saffron-700">
          Prototype / Demo Data
        </span>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <SectionHeader
            eyebrow="Configuration"
            title="Schemes"
            description="View and manage scheme configurations"
          />

          <div className="mt-4 space-y-4">
            {schemeList.map((scheme) => {
              const appCount = applications.filter((a) => a.schemeId === scheme.id).length;
              const selectedCount = applications.filter((a) => a.schemeId === scheme.id && a.status === 'Selected').length;
              return (
                <div
                  key={scheme.id}
                  onClick={() => navigate(`/admin/schemes/${scheme.id}`)}
                  className="group cursor-pointer border border-ink-200 bg-white p-5 transition-colors hover:border-ink-400"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-sm font-medium text-ink-900">{scheme.name}</h3>
                          <span className={`inline-flex items-center border px-2 py-0.5 text-2xs font-medium ${
                            scheme.status === 'Open' ? 'border-forest-300 bg-forest-50 text-forest-700' :
                            scheme.status === 'Closed' ? 'border-ink-300 bg-ink-100 text-ink-600' :
                            'border-saffron-300 bg-saffron-50 text-saffron-700'
                          }`}>{scheme.status}</span>
                        </div>
                        <p className="mt-1 text-xs text-ink-500">{scheme.code} · {scheme.shortName}</p>
                        <p className="mt-1 text-xs text-ink-600">{scheme.studyLevel} · {scheme.destination}</p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-2xs text-ink-500">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Open: {scheme.applicationOpen}</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Close: {scheme.applicationClose}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{appCount} applications</span>
                          <span>{selectedCount} selected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-ink-400">Demo data · Scheme configuration is for demonstration only.</p>
        </div>
      </div>
    </AppShell>
  );
}
