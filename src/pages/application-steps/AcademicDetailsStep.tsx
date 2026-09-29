import type { SchemeId } from '@/types';
import { schemes } from '@/config/schemes';

interface AcademicDetailsStepProps {
  schemeId: SchemeId | null;
  data: {
    qualification: string;
    university: string;
    yearOfPassing: string;
    percentage: string;
    programme: string;
    researchTopic: string;
    studyCategory: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export function AcademicDetailsStep({ schemeId, data, onChange, errors }: AcademicDetailsStepProps) {
  const scheme = schemeId ? schemes[schemeId] : null;
  const programmeOptions = scheme?.id === 'nfst' ? ['M.Phil', 'Ph.D.'] : ['M.S.', 'M.Sc.', 'MBA', 'LL.M.', 'M.Eng.', 'Other'];

  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-ink-950">Academic Details</h2>
      <p className="mt-1.5 text-sm text-ink-500">Enter your academic qualifications and proposed study plan.</p>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div>
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Highest Qualification</label>
          <select
            value={data.qualification || ''}
            onChange={(e) => onChange('qualification', e.target.value)}
            className="input-field mt-1"
          >
            <option value="">Select…</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Doctoral">Doctoral</option>
          </select>
          {errors.qualification && <p className="mt-1 text-xs text-clay-600">{errors.qualification}</p>}
        </div>

        <div>
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">University / Institution</label>
          <input
            type="text"
            value={data.university || ''}
            onChange={(e) => onChange('university', e.target.value)}
            placeholder="e.g., BIT Mesra"
            className="input-field mt-1"
          />
          {errors.university && <p className="mt-1 text-xs text-clay-600">{errors.university}</p>}
        </div>

        <div>
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Year of Passing</label>
          <input
            type="text"
            value={data.yearOfPassing || ''}
            onChange={(e) => onChange('yearOfPassing', e.target.value)}
            placeholder="e.g., 2024"
            className="input-field mt-1"
          />
          {errors.yearOfPassing && <p className="mt-1 text-xs text-clay-600">{errors.yearOfPassing}</p>}
        </div>

        <div>
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Percentage / CGPA</label>
          <input
            type="text"
            value={data.percentage || ''}
            onChange={(e) => onChange('percentage', e.target.value)}
            placeholder="e.g., 78.4%"
            className="input-field mt-1"
          />
          {errors.percentage && <p className="mt-1 text-xs text-clay-600">{errors.percentage}</p>}
        </div>

        <div>
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Programme</label>
          <select
            value={data.programme || ''}
            onChange={(e) => onChange('programme', e.target.value)}
            className="input-field mt-1"
          >
            <option value="">Select…</option>
            {programmeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          {errors.programme && <p className="mt-1 text-xs text-clay-600">{errors.programme}</p>}
        </div>

        <div>
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Study Category</label>
          <select
            value={data.studyCategory || ''}
            onChange={(e) => onChange('studyCategory', e.target.value)}
            className="input-field mt-1"
          >
            <option value="">Select…</option>
            {(scheme?.studyCategory || []).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errors.studyCategory && <p className="mt-1 text-xs text-clay-600">{errors.studyCategory}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-2xs font-semibold uppercase tracking-wider text-ink-500">Proposed Research Topic / Course of Study</label>
          <textarea
            value={data.researchTopic || ''}
            onChange={(e) => onChange('researchTopic', e.target.value)}
            rows={3}
            placeholder="Describe your proposed research topic or course of study"
            className="input-field mt-1"
          />
          {errors.researchTopic && <p className="mt-1 text-xs text-clay-600">{errors.researchTopic}</p>}
        </div>
      </div>
    </div>
  );
}
