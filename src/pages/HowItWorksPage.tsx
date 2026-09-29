import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';

const steps = [
  { num: '01', title: 'Register', description: 'Create your account on the Tribal Scholar portal and complete your profile with personal, academic, and contact details.' },
  { num: '02', title: 'Select Scheme', description: 'Browse available schemes and select the one that matches your study plans and eligibility.' },
  { num: '03', title: 'Complete Application', description: 'Fill in the application form with academic background, proposed research or study plan, and other required information.' },
  { num: '04', title: 'Submit Documents', description: 'Upload all required documents in the specified formats. The system validates file type and size at upload.' },
  { num: '05', title: 'Verification', description: 'Verification officers review your documents and eligibility. Deficiencies, if any, are communicated through the portal.' },
  { num: '06', title: 'Screening & Selection', description: 'Eligible applications are screened by the selection committee based on scheme-specific criteria. Results are communicated through the portal.' },
];

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <PublicHeader />

      <section className="border-b border-ink-200 bg-white">
        <div className="container-page py-12">
          <p className="text-eyebrow">Process</p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-ink-950">How It Works</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-600">
            The application journey follows a structured six-step process. Each stage is designed to ensure
            transparency, accuracy, and fairness in the selection of candidates.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="divide-y divide-ink-200 border border-ink-200 bg-white">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-6 p-6 lg:gap-10 lg:p-8">
              <div className="shrink-0">
                <p className="font-serif text-3xl font-medium text-saffron-500">{step.num}</p>
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-xl font-medium text-ink-950">{step.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
