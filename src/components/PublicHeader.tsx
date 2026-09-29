import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Schemes', path: '/schemes' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Help', path: '/help' },
];

export function PublicHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur-sm">
      <div className="border-b border-ink-200 bg-ink-50">
        <div className="container-page flex h-8 items-center justify-between">
          <p className="text-2xs font-medium uppercase tracking-[0.15em] text-ink-500">
            Government of India · Ministry of Tribal Affairs
          </p>
          <p className="hidden text-2xs font-medium text-ink-500 sm:block">
            Digital Public Service Platform
          </p>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight text-ink-950">
            TRIBAL
          </span>
          <span className="font-sans text-sm font-semibold uppercase tracking-wider text-saffron-600">
            Scholar
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'font-medium text-ink-950'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-ink-700 transition-colors hover:text-ink-950 sm:block"
          >
            Login
          </Link>
          <Link to="/login" className="btn-primary">
            Apply Now
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
