import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, AlertTriangle } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { useAuth } from '@/context/AuthContext';
import { applicantNavItems } from '@/config/applicantNav';
import { applicantProfile } from '@/data/mockData';

export function ApplicantProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(applicantProfile);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields: { label: string; key: keyof typeof applicantProfile; section: string }[][] = [
    [
      { label: 'Full Name', key: 'fullName', section: 'Personal' },
      { label: 'Date of Birth', key: 'dateOfBirth', section: 'Personal' },
      { label: 'Gender', key: 'gender', section: 'Personal' },
      { label: 'Category', key: 'category', section: 'Personal' },
      { label: 'Community / Tribe', key: 'community', section: 'Personal' },
      { label: 'Aadhaar Number', key: 'aadhaar', section: 'Personal' },
    ],
    [
      { label: 'Father\u2019s Name', key: 'fatherName', section: 'Family' },
      { label: 'Mother\u2019s Name', key: 'motherName', section: 'Family' },
      { label: 'Guardian Phone', key: 'guardianPhone', section: 'Family' },
    ],
    [
      { label: 'Email', key: 'email', section: 'Contact' },
      { label: 'Phone', key: 'phone', section: 'Contact' },
      { label: 'State', key: 'state', section: 'Contact' },
      { label: 'District', key: 'district', section: 'Contact' },
      { label: 'Pincode', key: 'pincode', section: 'Contact' },
      { label: 'Address', key: 'address', section: 'Contact' },
    ],
  ];

  return (
    <AppShell items={applicantNavItems} activePath="/applicant/profile">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-8">
        <div>
          <p className="text-eyebrow">Applicant Portal</p>
          <h1 className="font-serif text-lg font-medium text-ink-950">My Profile — {user?.name}</h1>
        </div>
        <button onClick={handleSave} className="btn-primary">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8">
          {saved && (
            <div className="mb-6 flex items-center gap-2 border border-forest-300 bg-forest-50 px-4 py-3">
              <p className="text-sm font-medium text-forest-700">Profile saved successfully.</p>
            </div>
          )}

          <div className="mb-6 flex items-center gap-2 border border-saffron-200 bg-saffron-50 px-4 py-2.5">
            <AlertTriangle className="h-4 w-4 text-saffron-600" />
            <p className="text-xs font-medium text-saffron-800">
              Ensure your profile matches your official documents. Discrepancies may cause verification delays.
            </p>
          </div>

          <div className="max-w-3xl space-y-8">
            {fields.map((section, sIdx) => (
              <div key={sIdx} className="border border-ink-200 bg-white">
                <SectionHeader eyebrow={section[0].section} title={section[0].section + ' Details'} />
                <div className="p-6">
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    {section.map((field) => (
                      <div key={field.key} className={field.key === 'address' ? 'sm:col-span-2' : ''}>
                        <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">{field.label}</dt>
                        <dd className="mt-1">
                          <input
                            type="text"
                            value={form[field.key]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            className="input-field"
                          />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button onClick={handleSave} className="btn-primary">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
            <button onClick={() => navigate('/applicant/dashboard')} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
