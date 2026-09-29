import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { adminNavItems } from '@/config/adminNav';
import { useAuth } from '@/context/AuthContext';
import { schemes } from '@/config/schemes';

export function AdminSettingsPage() {
  const { user } = useAuth();
  const schemeList = Object.values(schemes);

  return (
    <AppShell items={adminNavItems} activePath="/admin/settings">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Ministry Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">Settings — {user?.name}</h1>
        </div>
        <span className="border border-saffron-300 bg-saffron-50 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-saffron-700">
          Prototype / Demo Data
        </span>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          <SectionHeader
            eyebrow="Configuration"
            title="System Settings"
            description="Basic scheme configuration and system preferences"
          />

          <div className="mt-4 border border-ink-200 bg-white p-6">
            <h3 className="text-sm font-medium text-ink-900">Scheme Configuration</h3>
            <p className="mt-1 text-xs text-ink-500">View and adjust scheme parameters. All changes are demo-only.</p>

            <div className="mt-4 space-y-4">
              {schemeList.map((scheme) => (
                <div key={scheme.id} className="border border-ink-100 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ink-900">{scheme.name}</p>
                      <p className="text-xs text-ink-500">{scheme.code} · {scheme.shortName}</p>
                    </div>
                    <span className={`inline-flex items-center border px-2 py-0.5 text-2xs font-medium ${
                      scheme.status === 'Open' ? 'border-forest-300 bg-forest-50 text-forest-700' :
                      scheme.status === 'Closed' ? 'border-ink-300 bg-ink-100 text-ink-600' :
                      'border-saffron-300 bg-saffron-50 text-saffron-700'
                    }`}>{scheme.status}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                    <div>
                      <label className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Application Open</label>
                      <input type="text" defaultValue={scheme.applicationOpen} className="input-field mt-1" readOnly />
                    </div>
                    <div>
                      <label className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Application Close</label>
                      <input type="text" defaultValue={scheme.applicationClose} className="input-field mt-1" readOnly />
                    </div>
                    <div>
                      <label className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Study Level</label>
                      <input type="text" defaultValue={scheme.studyLevel} className="input-field mt-1" readOnly />
                    </div>
                    <div>
                      <label className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Destination</label>
                      <input type="text" defaultValue={scheme.destination} className="input-field mt-1" readOnly />
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Screening Criteria Weights</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {scheme.screeningCriteria.map((c) => (
                        <span key={c.id} className="border border-ink-200 bg-ink-50 px-2 py-1 text-2xs text-ink-600">
                          {c.label}: {c.weight}%
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 border-t border-ink-100 pt-3 text-xs text-ink-400">
              Prototype configuration — replace with officially approved scheme criteria. Settings are read-only in this demo.
            </p>
          </div>

          <div className="mt-6 border border-ink-200 bg-white p-6">
            <h3 className="text-sm font-medium text-ink-900">System Preferences</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between border border-ink-100 px-4 py-3">
                <div>
                  <p className="text-sm text-ink-800">AI-Assisted Verification</p>
                  <p className="text-xs text-ink-500">Enable AI-assisted document and eligibility checks</p>
                </div>
                <span className="inline-flex items-center border border-forest-300 bg-forest-50 px-2 py-0.5 text-2xs font-medium text-forest-700">Enabled</span>
              </div>
              <div className="flex items-center justify-between border border-ink-100 px-4 py-3">
                <div>
                  <p className="text-sm text-ink-800">Audit Logging</p>
                  <p className="text-xs text-ink-500">Record all officer and admin actions in the audit trail</p>
                </div>
                <span className="inline-flex items-center border border-forest-300 bg-forest-50 px-2 py-0.5 text-2xs font-medium text-forest-700">Enabled</span>
              </div>
              <div className="flex items-center justify-between border border-ink-100 px-4 py-3">
                <div>
                  <p className="text-sm text-ink-800">Deficiency Auto-Notification</p>
                  <p className="text-xs text-ink-500">Notify applicants automatically when a deficiency is raised</p>
                </div>
                <span className="inline-flex items-center border border-forest-300 bg-forest-50 px-2 py-0.5 text-2xs font-medium text-forest-700">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
