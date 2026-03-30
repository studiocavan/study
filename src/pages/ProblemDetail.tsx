import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { topics } from '../data/problems';
import { useProgress } from '../hooks/useProgress';
import { useLangPreference } from '../hooks/useLangPreference';
import { Difficulty, Language, Quiz, CodeSolution } from '../types';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import kotlin from 'highlight.js/lib/languages/kotlin';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('kotlin', kotlin);

const difficultyColor: Record<Difficulty, string> = {
  Easy: 'text-green-400 bg-green-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Hard: 'text-red-400 bg-red-400/10',
};

function QuizSection({ quiz, solution, lang }: { quiz: Quiz; solution: CodeSolution; lang: Language }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const solutionLang = lang === 'kotlin' && solution.kotlin ? 'kotlin' : 'typescript';
  const code = solutionLang === 'kotlin' ? solution.kotlin : solution.typescript;
  const answered = selected !== null;

  return (
    <div className="mb-6 p-4 bg-gray-900 border border-indigo-900/40 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Knowledge Check</span>
      </div>

      <p className="text-sm text-gray-200 mb-3 leading-relaxed">{quiz.question}</p>

      <pre className="p-3 bg-gray-950 border border-gray-800 rounded-lg text-xs text-gray-300 font-mono mb-4 overflow-x-auto leading-relaxed whitespace-pre">
        <code>{quiz.codeSnippet}</code>
      </pre>

      <div className="space-y-2">
        {quiz.options.map((opt, i) => {
          const isCorrect = i === quiz.correctAnswerIndex;
          const isSelected = selected === i;

          let cls = 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600 cursor-pointer';
          if (answered) {
            if (isCorrect) cls = 'bg-green-500/10 border-green-500/40 text-green-300';
            else if (isSelected) cls = 'bg-red-500/10 border-red-500/40 text-red-300';
            else cls = 'bg-gray-900 border-gray-800 text-gray-600 opacity-40';
          }

          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex items-center justify-between gap-2 ${cls}`}
            >
              <span>{opt}</span>
              {answered && isCorrect && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
              {answered && isSelected && !isCorrect && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-4">
          <button
            onClick={() => setShowSolution(v => !v)}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            {showSolution ? 'Hide Solution' : 'Show Full Solution'}
          </button>
          {showSolution && code && (
            <pre className="mt-3 p-4 text-sm overflow-x-auto leading-relaxed font-mono !bg-transparent rounded-lg border border-indigo-900/50">
              <code
                className={`language-${solutionLang}`}
                dangerouslySetInnerHTML={{ __html: hljs.highlight(code, { language: solutionLang }).value }}
              />
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProblemDetail() {
  const { topicId, problemId } = useParams<{ topicId: string; problemId: string }>();
  const topic = topics.find(t => t.id === topicId);
  const problem = topic?.problems.find(p => p.id === problemId);

  const { getStatus, setStatus } = useProgress();
  const { lang: prefLang, setLang } = useLangPreference();
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);

  if (!topic || !problem) return <Navigate to="/" replace />;

  const hasKotlin = !!problem.solution.kotlin;
  const hasTS = !!problem.solution.typescript;
  const lang = (prefLang === 'kotlin' && hasKotlin) || !hasTS ? 'kotlin' : 'typescript';

  const status = getStatus(problem.id);
  const allProblems = topic.problems;
  const currentIdx = allProblems.findIndex(p => p.id === problemId);
  const prevProblem = allProblems[currentIdx - 1];
  const nextProblem = allProblems[currentIdx + 1];

  const code = lang === 'typescript' ? problem.solution.typescript : problem.solution.kotlin;

  return (
    <div className="pt-8 pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColor[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
            {problem.pattern}
          </span>
        </div>
        <h1 className="text-xl font-bold text-white mb-1">{problem.title}</h1>
        {problem.leetcodeUrl && (
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            View on LeetCode
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </div>

      {/* Description */}
      <div className="mb-5 p-4 bg-gray-900 border border-gray-800 rounded-xl">
        <p className="text-sm text-gray-300 leading-relaxed">{problem.description}</p>
      </div>

      {/* Examples */}
      {problem.examples && problem.examples.length > 0 && (
        <div className="mb-5 space-y-2">
          {problem.examples.map((ex, i) => (
            <div key={i} className="p-3 bg-gray-900 border border-gray-800 rounded-xl font-mono text-xs">
              <p className="text-gray-500 mb-1.5">Example {i + 1}</p>
              <p><span className="text-gray-400">Input: </span><span className="text-gray-200">{ex.input}</span></p>
              <p><span className="text-gray-400">Output: </span><span className="text-gray-200">{ex.output}</span></p>
              {ex.explanation && <p className="mt-1 text-gray-500">{ex.explanation}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Hints */}
      <div className="mb-5">
        <button
          onClick={() => setShowHints(v => !v)}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors mb-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${showHints ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          Hints ({problem.hints.length})
        </button>
        {showHints && (
          <div className="space-y-2">
            {problem.hints.slice(0, revealedHints).map((hint, i) => (
              <div key={i} className="p-3 bg-yellow-400/5 border border-yellow-400/20 rounded-lg">
                <p className="text-sm text-yellow-200">{hint}</p>
              </div>
            ))}
            {revealedHints < problem.hints.length && (
              <button
                onClick={() => setRevealedHints(v => v + 1)}
                className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors px-3 py-1.5 border border-yellow-400/30 rounded-lg"
              >
                {revealedHints === 0 ? 'Show first hint' : 'Show next hint'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Knowledge Check */}
      {problem.quiz && (
        <div className="mb-5">
          <button
            onClick={() => setShowQuiz(v => !v)}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors mb-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${showQuiz ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            Knowledge Check
          </button>
          {showQuiz && <QuizSection quiz={problem.quiz} solution={problem.solution} lang={lang} />}
        </div>
      )}

      {/* Solution */}
      <div className="mb-6">
        <button
          onClick={() => setShowSolution(v => !v)}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors mb-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${showSolution ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          Solution
        </button>
        {showSolution && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {(hasTS && hasKotlin) && (
              <div className="flex border-b border-gray-800">
                {hasTS && (
                  <button
                    onClick={() => setLang('typescript')}
                    className={`px-4 py-2 text-xs font-medium transition-colors ${lang === 'typescript' ? 'text-blue-400 border-b-2 border-blue-400 -mb-px bg-gray-900' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    TypeScript
                  </button>
                )}
                {hasKotlin && (
                  <button
                    onClick={() => setLang('kotlin')}
                    className={`px-4 py-2 text-xs font-medium transition-colors ${lang === 'kotlin' ? 'text-blue-400 border-b-2 border-blue-400 -mb-px bg-gray-900' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    Kotlin
                  </button>
                )}
              </div>
            )}
            <pre className="p-4 text-sm overflow-x-auto leading-relaxed font-mono !bg-transparent">
              <code
                className={`language-${lang}`}
                dangerouslySetInnerHTML={{
                  __html: code ? hljs.highlight(code, { language: lang }).value : '',
                }}
              />
            </pre>
          </div>
        )}
      </div>

      {/* Status buttons */}
      <div className="mb-8">
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-medium">Mark as</p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setStatus(problem.id, status === 'done' ? null : 'done')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              status === 'done'
                ? 'bg-green-500/20 border-green-500/50 text-green-300'
                : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-green-600 hover:text-green-400'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Done
          </button>
          <button
            onClick={() => setStatus(problem.id, status === 'review' ? null : 'review')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              status === 'review'
                ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
                : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-yellow-600 hover:text-yellow-400'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Needs Review
          </button>
          {status && (
            <button
              onClick={() => setStatus(problem.id, null)}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-400 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Prev / Next */}
      <div className="flex justify-between gap-4">
        {prevProblem ? (
          <Link
            to={`/topic/${topicId}/problem/${prevProblem.id}`}
            onClick={() => { setShowSolution(false); setShowHints(false); setRevealedHints(0); }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {prevProblem.title}
          </Link>
        ) : <div />}
        {nextProblem ? (
          <Link
            to={`/topic/${topicId}/problem/${nextProblem.id}`}
            onClick={() => { setShowSolution(false); setShowHints(false); setRevealedHints(0); }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            {nextProblem.title}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        ) : (
          <Link
            to={`/topic/${topicId}`}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Back to {topic.title}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
