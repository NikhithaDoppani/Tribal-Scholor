import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';

const faqs = [
  {
    category: 'General',
    question: 'Who can apply for scholarships and fellowships through this portal?',
    answer: 'Scheduled Tribe students who meet the eligibility criteria specified for each scheme can apply. Eligibility details are available on the respective scheme pages.',
  },
  {
    category: 'General',
    question: 'Is there a fee to apply?',
    answer: 'No. There is no application fee. The Tribal Scholar portal is a free public service provided by the Ministry of Tribal Affairs.',
  },
  {
    category: 'Application',
    question: 'Can I apply for multiple schemes at the same time?',
    answer: 'You may apply for multiple schemes if you meet the eligibility criteria for each. Each application is evaluated independently.',
  },
  {
    category: 'Application',
    question: 'What happens if I submit incomplete documents?',
    answer: 'If documents are missing or unclear, a deficiency will be raised and you will be notified through the portal. You will have an opportunity to resubmit the required documents.',
  },
  {
    category: 'Application',
    question: 'Can I edit my application after submitting it?',
    answer: 'Once an application is submitted, it enters the verification process. You can edit your application only while it is in Draft status.',
  },
  {
    category: 'Verification',
    question: 'How long does verification take?',
    answer: 'Verification timelines depend on the volume of applications and the completeness of your documents. You can track the status of your application through your dashboard.',
  },
  {
    category: 'Selection',
    question: 'How are candidates selected?',
    answer: 'Eligible candidates are screened by a selection committee based on scheme-specific criteria, which may include academic record, research proposal, and interview performance.',
  },
  {
    category: 'Technical',
    question: 'What should I do if I forget my password?',
    answer: 'This is a prototype environment. In the production system, you would be able to reset your password through the portal. For this demo, simply return to the login page.',
  },
];

const categories = ['All', 'General', 'Application', 'Verification', 'Selection', 'Technical'];

export function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-ink-50">
      <PublicHeader />

      <section className="border-b border-ink-200 bg-white">
        <div className="container-page py-12">
          <p className="text-eyebrow">Support</p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-ink-950">Frequently Asked Questions</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-600">
            Find answers to common questions about the application process, eligibility, and verification.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
              className={`border px-3.5 py-1.5 text-sm transition-colors ${
                activeCategory === cat
                  ? 'border-ink-950 bg-ink-950 text-white'
                  : 'border-ink-300 bg-white text-ink-600 hover:bg-ink-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 divide-y divide-ink-200 border border-ink-200 bg-white">
          {filtered.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={`${faq.category}-${faq.question}`}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-ink-50"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xs font-semibold uppercase tracking-wider text-saffron-600">{faq.category}</span>
                    <span className="text-sm font-medium text-ink-900">{faq.question}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pl-[7.5rem]">
                    <p className="text-sm leading-relaxed text-ink-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
