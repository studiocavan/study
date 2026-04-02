import { useParams, Navigate, Link } from 'react-router-dom';
import { patternCategories } from '../data/patterns';
import hljs from 'highlight.js/lib/core';
import kotlin from 'highlight.js/lib/languages/kotlin';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('kotlin', kotlin);

export default function PatternDetail() {
  const { patternId } = useParams<{ patternId: string }>();

  let pattern = null;
  let category = null;
  let prevPattern = null;
  let nextPattern = null;

  for (const cat of patternCategories) {
    const idx = cat.patterns.findIndex(p => p.id === patternId);
    if (idx !== -1) {
      pattern = cat.patterns[idx];
      category = cat;
      prevPattern = cat.patterns[idx - 1] ?? null;
      nextPattern = cat.patterns[idx + 1] ?? null;
      break;
    }
  }

  if (!pattern || !category) return <Navigate to="/study" replace />;

  const highlighted = hljs.highlight(pattern.kotlinTemplate, { language: 'kotlin' }).value;

  return (
    <div className="pt-8 pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-5">
        <Link to="/study" className="hover:text-gray-300 transition-colors">Study Guide</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span className="text-gray-400">{category.title}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-gray-600">#{pattern.number}</span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{category.romanNumeral} · {category.title}</span>
        </div>
        <h1 className="text-xl font-bold text-white">{pattern.title}</h1>
      </div>

      {/* Description */}
      <div className="mb-5 p-4 bg-gray-900 border border-gray-800 rounded-xl">
        <p className="text-sm text-gray-300 leading-relaxed">{pattern.description}</p>
      </div>

      {/* Key Insight */}
      <div className="mb-5 p-4 bg-indigo-950/40 border border-indigo-800/40 rounded-xl flex gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
        <div>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">Key Insight</p>
          <p className="text-sm text-indigo-200 leading-relaxed">{pattern.keyInsight}</p>
        </div>
      </div>

      {/* Complexity */}
      <div className="mb-5 flex gap-3">
        <div className="flex-1 p-3 bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Time Complexity</p>
          <p className="text-sm font-mono text-green-400">{pattern.timeComplexity}</p>
        </div>
        <div className="flex-1 p-3 bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Space Complexity</p>
          <p className="text-sm font-mono text-blue-400">{pattern.spaceComplexity}</p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Common Problems</p>
        <div className="flex flex-wrap gap-2">
          {pattern.useCases.map(uc => (
            <span key={uc} className="text-xs px-2.5 py-1 bg-gray-800 border border-gray-700 text-gray-300 rounded-full">
              {uc}
            </span>
          ))}
        </div>
      </div>

      {/* Kotlin Template */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Kotlin Template</p>
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
            <span className="text-xs font-medium text-gray-400">Kotlin</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto leading-relaxed font-mono !bg-transparent">
            <code
              className="language-kotlin"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      </div>

      {/* Prev / Next within category */}
      <div className="flex justify-between gap-4 pt-4 border-t border-gray-800">
        {prevPattern ? (
          <Link
            to={`/study/pattern/${prevPattern.id}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>#{prevPattern.number} {prevPattern.title}</span>
          </Link>
        ) : (
          <Link to="/study" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Patterns
          </Link>
        )}
        {nextPattern && (
          <Link
            to={`/study/pattern/${nextPattern.id}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors text-right"
          >
            <span>#{nextPattern.number} {nextPattern.title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
