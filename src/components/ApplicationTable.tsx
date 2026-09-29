import type { Application } from '@/types';
import { StatusBadge } from './StatusBadge';

type ColumnKey = 'applicantName' | 'scheme' | 'programme' | 'submitted' | 'stage' | 'status' | 'state' | 'documents' | 'eligibility';

interface ApplicationTableProps {
  applications: Application[];
  columns?: ColumnKey[];
  onRowClick?: (app: Application) => void;
  compact?: boolean;
}

const columnLabels: Record<string, string> = {
  applicantName: 'Applicant',
  scheme: 'Scheme',
  programme: 'Programme',
  submitted: 'Submitted',
  stage: 'Current Stage',
  status: 'Status',
  state: 'State',
  documents: 'Documents',
  eligibility: 'Eligibility',
};

const defaultColumns: ColumnKey[] = ['scheme', 'programme', 'submitted', 'stage', 'status'];

export function ApplicationTable({
  applications,
  columns = defaultColumns,
  onRowClick,
  compact = false,
}: ApplicationTableProps) {
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full">
        <thead>
          <tr className="border-b border-ink-200 bg-ink-50 text-left">
            <th className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500">
              Application ID
            </th>
            {(columns ?? defaultColumns).map((col) => (
              <th
                key={col}
                className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-wider text-ink-500"
              >
                {columnLabels[col]}
              </th>
            ))}
            <th className="px-4 py-2.5 text-right text-2xs font-semibold uppercase tracking-wider text-ink-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              className={`border-b border-ink-100 ${onRowClick ? 'cursor-pointer table-row-hover' : 'table-row-hover'}`}
              onClick={() => onRowClick?.(app)}
            >
              <td className="px-4 py-3 font-mono text-xs font-medium text-ink-800">
                {app.id}
              </td>
              {(columns ?? defaultColumns).map((col) => (
                <td key={col} className="px-4 py-3 text-sm text-ink-700">
                  {col === 'status' ? (
                    <StatusBadge status={app.status} size="sm" />
                  ) : col === 'documents' ? (
                    <span className="text-xs text-ink-600">
                      {app.documentsVerified}/{app.documentsTotal}
                    </span>
                  ) : col === 'eligibility' ? (
                    <span className={`text-xs font-medium ${
                      app.eligibilityStatus === 'Eligible' ? 'text-forest-600' :
                      app.eligibilityStatus === 'Not Eligible' ? 'text-clay-600' : 'text-ink-500'
                    }`}>
                      {app.eligibilityStatus}
                    </span>
                  ) : col === 'stage' ? (
                    <span className="text-xs font-medium text-ink-700">{app.currentStage}</span>
                  ) : col === 'scheme' ? (
                    <span className="text-xs text-ink-600">{app.schemeName}</span>
                  ) : (
                    <span className="text-sm text-ink-700">{(app as any)[col]}</span>
                  )}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <button
                  className="text-xs font-medium text-ink-600 transition-colors hover:text-ink-950"
                  onClick={(e) => { e.stopPropagation(); onRowClick?.(app); }}
                >
                  {compact ? 'View' : 'View Application'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
