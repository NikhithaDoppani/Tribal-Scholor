import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import { SchemeCard } from '@/components/SchemeCard';
import { schemeList } from '@/config/schemes';

export function SchemesPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <PublicHeader />

      <section className="border-b border-ink-200 bg-white">
        <div className="container-page py-12">
          <p className="text-eyebrow">Schemes</p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-ink-950">Available Schemes</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-600">
            Browse scholarship and fellowship schemes currently administered by the Ministry of Tribal Affairs.
            Select a scheme to view detailed eligibility criteria, required documents, and application process.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {schemeList.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
