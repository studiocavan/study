import { Link } from 'react-router-dom';
import { patternCategories } from '../data/patterns';

const categoryColors = [
  'text-blue-400 bg-blue-400/10 border-blue-800/40',
  'text-purple-400 bg-purple-400/10 border-purple-800/40',
  'text-green-400 bg-green-400/10 border-green-800/40',
  'text-yellow-400 bg-yellow-400/10 border-yellow-800/40',
  'text-orange-400 bg-orange-400/10 border-orange-800/40',
  'text-red-400 bg-red-400/10 border-red-800/40',
  'text-pink-400 bg-pink-400/10 border-pink-800/40',
  'text-cyan-400 bg-cyan-400/10 border-cyan-800/40',
  'text-indigo-400 bg-indigo-400/10 border-indigo-800/40',
  'text-teal-400 bg-teal-400/10 border-teal-800/40',
  'text-lime-400 bg-lime-400/10 border-lime-800/40',
  'text-amber-400 bg-amber-400/10 border-amber-800/40',
  'text-rose-400 bg-rose-400/10 border-rose-800/40',
  'text-sky-400 bg-sky-400/10 border-sky-800/40',
  'text-violet-400 bg-violet-400/10 border-violet-800/40',
];

export default function Study() {
  const totalPatterns = patternCategories.reduce((n, c) => n + c.patterns.length, 0);

  return (
    <div className="pt-8 pb-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Pattern Study Guide</h1>
        <p className="text-gray-400 text-sm">{totalPatterns} patterns across {patternCategories.length} categories</p>
      </div>

      <div className="space-y-3">
        {patternCategories.map((cat, idx) => {
          const color = categoryColors[idx % categoryColors.length];
          return (
            <div key={cat.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              {/* Category header */}
              <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${color}`}>
                  {cat.romanNumeral}
                </span>
                <h2 className="font-semibold text-white text-sm">{cat.title}</h2>
                <span className="ml-auto text-xs text-gray-500">{cat.patterns.length} patterns</span>
              </div>

              {/* Pattern list */}
              <div className="divide-y divide-gray-800/60">
                {cat.patterns.map(p => (
                  <Link
                    key={p.id}
                    to={`/study/pattern/${p.id}`}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800/50 transition-colors group"
                  >
                    <span className="text-xs text-gray-600 w-6 shrink-0 font-mono">{p.number}</span>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {p.title}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 ml-auto shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
