import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
        {!isHome && (
          <Link
            to="/"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Back to home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
        )}
        <Link to="/" className="font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-blue-400 font-mono text-sm">&lt;/&gt;</span>
          <span>Study</span>
        </Link>
      </div>
    </header>
  );
}
