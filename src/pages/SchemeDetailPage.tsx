import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileText, Users, GraduationCap, ListChecks, Info, ClipboardList } from 'lucide-react';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import { schemes } from '@/config/schemes';

export function SchemeDetailPage() {
  const { schemeId } = useParams<{ schemeId: string }>();
  const scheme = schemeId ? schemes[schemeId] : null;

  if (!scheme) {
    return <Navigate to="/schemes" replace />;
  }

  const sections = [
    { icon: FileText, title: 'Overview', content: scheme.overview },
    { icon: Users, title: 'Who Can Apply', list: scheme.whoCanApply },
    { icon: GraduationCap, title: 'Study Category', list: scheme.studyCategory },
    { icon: ClipboardList, title: 'Application Process', list: scheme.applicationProcess },
    { icon: ListChecks, title: 'Required Documents', documents: scheme.requiredDocuments },
    { icon: Info, title: 'Important Information', list: scheme.importantInfo },
  ];

  return (
    <div className="min-h-screen bg-ink-50">
      <PublicHeader />

      <section className="border-b border-ink-200 bg-white">
        <div className="container-page py-8">
          <Link to="/schemes" className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Schemes
          </Link>
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-saffron-600">{scheme.code}</p>
              <h1 className="mt-1.5 font-serif text-3xl font-medium text-ink-950">{scheme.name}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-600">{scheme.description}</p>
            </div>
            <span className={`shrink-0 border px-3 py-1.5 text-xs font-medium ${
              scheme.status === 'Open' ? 'border-forest-300 bg-forest-50 text-forest-700' : 'border-ink-300 bg-ink-100 text-ink-500'
            }`}>
              {scheme.status}
            </span>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink-100 pt-5 sm:grid-cols-4">
            <div>
              <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Study Level</dt>
              <dd className="mt-1 text-sm font-medium text-ink-800">{scheme.studyLevel}</dd>
            </div>
            <div>
              <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Destination</dt>
              <dd className="mt-1 text-sm font-medium text-ink-800">{scheme.destination}</dd>
            </div>
            <div>
              <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Opens</dt>
              <dd className="mt-1 text-sm font-medium text-ink-800">{scheme.applicationOpen}</dd>
            </div>
            <div>
              <dt className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Closes</dt>
              <dd className="mt-1 text-sm font-medium text-ink-800">{scheme.applicationClose}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {sections.map((section) => (
              <div key={section.title} className="border border-ink-200 bg-white p-6">
                <div className="flex items-center gap-2.5 border-b border-ink-100 pb-3">
                  <section.icon className="h-4 w-4 text-ink-400" />
                  <h2 className="font-serif text-lg font-medium text-ink-900">{section.title}</h2>
                </div>
                <div className="pt-4">
                  {section.content && (
                    <p className="text-sm leading-relaxed text-ink-600">{section.content}</p>
                  )}
                  {section.list && (
                    <ul className="space-y-2.5">
                      {section.list.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-ink-700">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.documents && (
                    <div className="overflow-x-auto scrollbar-thin">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-ink-200 text-left">
                            <th className="pb-2 text-2xs font-semibold uppercase tracking-wider text-ink-500">Document</th>
                            <th className="pb-2 text-2xs font-semibold uppercase tracking-wider text-ink-500">Description</th>
                            <th className="pb-2 text-2xs font-semibold uppercase tracking-wider text-ink-500">Format</th>
                            <th className="pb-2 text-2xs font-semibold uppercase tracking-wider text-ink-500">Max Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.documents.map((doc) => (
                            <tr key={doc.id} className="border-b border-ink-100 last:border-0">
                              <td className="py-2.5 text-sm font-medium text-ink-800">{doc.label}</td>
                              <td className="py-2.5 text-sm text-ink-600">{doc.description}</td>
                              <td className="py-2.5 text-xs text-ink-500">{doc.format}</td>
                              <td className="py-2.5 text-xs text-ink-500">{doc.maxSize}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-ink-200 bg-white p-6">
              <h3 className="font-serif text-lg font-medium text-ink-900">Application Action</h3>
              <p className="mt-2 text-sm text-ink-600">
                To apply for this scheme, you must register or log in to your Tribal Scholar account.
              </p>
              <div className="mt-5 space-y-3">
                <Link to="/login" className="btn-primary w-full">
                  Apply for {scheme.code}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/login" className="btn-secondary w-full">
                  Login to Continue
                </Link>
              </div>
              <div className="mt-5 border-t border-ink-100 pt-4">
                <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Application Window</p>
                <p className="mt-1.5 text-sm text-ink-700">
                  {scheme.applicationOpen} — {scheme.applicationClose}
                </p>
              </div>
              <div className="mt-4 border-t border-ink-100 pt-4">
                <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Screening Criteria</p>
                <ul className="mt-2 space-y-2">
                  {scheme.screeningCriteria.map((criterion) => (
                    <li key={criterion.id} className="flex items-center justify-between text-sm">
                      <span className="text-ink-700">{criterion.label}</span>
                      <span className="font-medium text-ink-500">{criterion.weight}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
