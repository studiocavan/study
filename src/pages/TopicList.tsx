import { Link, useParams, Navigate } from 'react-router-dom';
import { topics } from '../data/problems';
import { useProgress } from '../hooks/useProgress';
import { Difficulty, Problem } from '../types';

const difficultyColor: Record<Difficulty, string> = {
  Easy: 'text-green-400',
  Medium: 'text-yellow-400',
  Hard: 'text-red-400',
};

function StatusIcon({ status }: { status: 'done' | 'review' | null }) {
  if (status === 'done') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
  }
  if (status === 'review') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    );
  }
  return <div className="w-4 h-4 rounded-full border border-gray-700 shrink-0" />;
}

function ProblemRow({ problem, topicId }: { problem: Problem; topicId: string }) {
  const { getStatus } = useProgress();
  const status = getStatus(problem.id);

  return (
    <Link
      to={`/topic/${topicId}/problem/${problem.id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 transition-colors rounded-lg group"
    >
      <StatusIcon status={status} />
      <div className="flex-1 min-w-0">
        <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
          {problem.title}
        </span>
        <span className="ml-2 text-xs text-gray-600">{problem.pattern}</span>
      </div>
      <span className={`text-xs font-medium shrink-0 ${difficultyColor[problem.difficulty]}`}>
        {problem.difficulty}
      </span>
    </Link>
  );
}

export default function TopicList() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topics.find(t => t.id === topicId);

  if (!topic) return <Navigate to="/" replace />;

  const { getTopicStats } = useProgress();
  const ids = topic.problems.map(p => p.id);
  const { done, total } = getTopicStats(ids);

  return (
    <div className="pt-8">
      <div className="mb-6">
        <p className="text-xs text-blue-400 font-medium uppercase tracking-widest mb-1">
          {topic.section === 'algorithms' ? 'Algorithms' : 'Frontend'}
        </p>
        <h1 className="text-2xl font-bold text-white mb-1">{topic.title}</h1>
        <p className="text-gray-400 text-sm mb-3">{topic.description}</p>
        <p className="text-xs text-gray-500">{done}/{total} solved</p>
        <div className="mt-2 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${total > 0 ? Math.round((done / total) * 100) : 0}%` }}
          />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="divide-y divide-gray-800/50">
          {topic.problems.map(problem => (
            <ProblemRow key={problem.id} problem={problem} topicId={topic.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
