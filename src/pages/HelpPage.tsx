import { Mail, Phone, MapPin, Clock, HelpCircle, MessageSquare } from 'lucide-react';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';

const supportChannels = [
  { icon: Phone, title: 'Helpline', value: '1800-XXX-XXXX', detail: 'Toll-free, Monday to Friday, 9:00 AM — 6:00 PM IST' },
  { icon: Mail, title: 'Email Support', value: 'helpdesk@tribalscholar.gov.in', detail: 'Responses within 48 hours' },
  { icon: MessageSquare, title: 'Grievance Portal', value: 'Register a grievance', detail: 'Track status through your dashboard' },
];

const faqLinks = [
  { label: 'How do I apply for a scheme?', path: '/faqs' },
  { label: 'What documents do I need?', path: '/faqs' },
  { label: 'How is eligibility determined?', path: '/faqs' },
  { label: 'What happens during verification?', path: '/faqs' },
];

export function HelpPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <PublicHeader />

      <section className="border-b border-ink-200 bg-white">
        <div className="container-page py-12">
          <p className="text-eyebrow">Support</p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-ink-950">Help & Support</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-600">
            Get assistance with your application, find answers to common questions, or reach out to the helpdesk.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {supportChannels.map((channel) => (
            <div key={channel.title} className="border border-ink-200 bg-white p-6">
              <div className="flex items-center gap-2.5 border-b border-ink-100 pb-3">
                <channel.icon className="h-4 w-4 text-ink-400" />
                <h3 className="font-serif text-base font-medium text-ink-900">{channel.title}</h3>
              </div>
              <p className="mt-3 text-sm font-medium text-ink-800">{channel.value}</p>
              <p className="mt-1 text-xs text-ink-500">{channel.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="border border-ink-200 bg-white p-6">
            <div className="flex items-center gap-2.5 border-b border-ink-100 pb-3">
              <HelpCircle className="h-4 w-4 text-ink-400" />
              <h3 className="font-serif text-lg font-medium text-ink-900">Common Questions</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {faqLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.path} className="flex items-center justify-between text-sm text-ink-700 hover:text-ink-950">
                    {link.label}
                    <span className="text-ink-400">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-ink-200 bg-white p-6">
            <div className="flex items-center gap-2.5 border-b border-ink-100 pb-3">
              <MapPin className="h-4 w-4 text-ink-400" />
              <h3 className="font-serif text-lg font-medium text-ink-900">Ministry Address</h3>
            </div>
            <div className="mt-4 space-y-3 text-sm text-ink-600">
              <p>Ministry of Tribal Affairs</p>
              <p>Government of India</p>
              <p>Tribal Bhavan, Shastri Bhavan</p>
              <p>New Delhi — 110001</p>
              <div className="flex items-center gap-2 pt-2 text-xs text-ink-400">
                <Clock className="h-3.5 w-3.5" />
                Monday to Friday, 9:00 AM — 6:00 PM IST
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border border-saffron-200 bg-saffron-50 p-5">
          <p className="text-sm text-saffron-800">
            <span className="font-semibold">Note:</span> This is a prototype environment for demonstration purposes.
            Contact details shown above are illustrative and not monitored.
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
