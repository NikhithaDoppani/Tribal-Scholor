export function PublicFooter() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="container-page py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-semibold text-ink-950">TRIBAL</span>
              <span className="font-sans text-sm font-semibold uppercase tracking-wider text-saffron-600">Scholar</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-ink-500">
              Scholarship & Fellowship Management System for Scheduled Tribe students.
              An initiative of the Ministry of Tribal Affairs, Government of India.
            </p>
            <p className="mt-4 text-2xs font-medium uppercase tracking-[0.15em] text-ink-400">
              Prototype Environment — Demo Data Only
            </p>
          </div>
          <div>
            <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Platform</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li><a href="/schemes" className="hover:text-ink-900">Schemes</a></li>
              <li><a href="/how-it-works" className="hover:text-ink-900">How It Works</a></li>
              <li><a href="/faqs" className="hover:text-ink-900">FAQs</a></li>
              <li><a href="/help" className="hover:text-ink-900">Help & Support</a></li>
            </ul>
          </div>
          <div>
            <p className="text-2xs font-semibold uppercase tracking-wider text-ink-400">Access</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li><a href="/login" className="hover:text-ink-900">Login</a></li>
              <li><a href="/login" className="hover:text-ink-900">Apply Now</a></li>
              <li><a href="/help" className="hover:text-ink-900">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-ink-100 pt-6">
          <p className="text-xs text-ink-400">
            © 2026 Ministry of Tribal Affairs, Government of India. This is a prototype environment for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
