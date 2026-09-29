import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck, ClipboardCheck, Award } from 'lucide-react';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import { SchemeCard } from '@/components/SchemeCard';
import { schemeList } from '@/config/schemes';

const processSteps = [
  { label: 'Apply', icon: FileText },
  { label: 'Verify', icon: ShieldCheck },
  { label: 'Screen', icon: ClipboardCheck },
  { label: 'Select', icon: Award },
];

const howItWorksSteps = [
  { num: '01', label: 'Register' },
  { num: '02', label: 'Select Scheme' },
  { num: '03', label: 'Complete Application' },
  { num: '04', label: 'Submit Documents' },
  { num: '05', label: 'Verification' },
  { num: '06', label: 'Screening & Selection' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <PublicHeader />

      {/* Hero */}
      <section className="border-b border-ink-200 bg-white">
        <div className="container-page py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-eyebrow">Ministry of Tribal Affairs</p>
              <h1 className="mt-4 max-w-2xl text-display text-4xl leading-[1.1] lg:text-5xl">
                Scholarships and fellowships for Scheduled Tribe students
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-600">
                A single digital platform to apply, track and manage scholarship and fellowship applications.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/schemes" className="btn-primary">
                  View Schemes
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/how-it-works" className="btn-secondary">
                  How It Works
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-ink-200 bg-ink-50 p-6">
                <p className="text-eyebrow">Application Process</p>
                <div className="mt-5 flex items-center justify-between">
                  {processSteps.map((step, idx) => (
                    <div key={step.label} className="flex items-center last:flex-none">
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center border border-ink-300 bg-white text-ink-600">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <span className="mt-2 text-2xs font-medium text-ink-500">{step.label}</span>
                      </div>
                      {idx < processSteps.length - 1 && (
                        <div className="mx-1 mb-5 h-px w-8 bg-ink-300 lg:w-12" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-ink-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-500">Current application window</span>
                    <span className="font-medium text-forest-700">Open</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-ink-500">Schemes available</span>
                    <span className="font-medium text-ink-800">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schemes */}
      <section className="border-b border-ink-200">
        <div className="container-page py-16">
          <div className="flex items-end justify-between border-b border-ink-200 pb-4">
            <div>
              <p className="text-eyebrow">Explore</p>
              <h2 className="mt-1 font-serif text-2xl font-medium text-ink-950">Available Schemes</h2>
            </div>
            <Link to="/schemes" className="text-sm font-medium text-ink-600 hover:text-ink-950">
              View all schemes →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {schemeList.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-ink-200 bg-white">
        <div className="container-page py-16">
          <div className="border-b border-ink-200 pb-4">
            <p className="text-eyebrow">Process</p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-ink-950">How It Works</h2>
            <p className="mt-1.5 text-sm text-ink-500">
              A structured six-step process from registration to selection.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-px border border-ink-200 bg-ink-200 md:grid-cols-3 lg:grid-cols-6">
            {howItWorksSteps.map((step) => (
              <div key={step.num} className="bg-white p-6">
                <p className="font-serif text-2xl font-medium text-saffron-500">{step.num}</p>
                <p className="mt-2 text-sm font-medium text-ink-800">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
