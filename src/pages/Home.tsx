import { Link } from 'react-router-dom';
import { topics } from '../data/problems';
import { useProgress } from '../hooks/useProgress';
import { Topic } from '../types';

function TopicCard({ topic }: { topic: Topic }) {
  const { getTopicStats } = useProgress();
  const ids = topic.problems.map(p => p.id);
  const { done, review, total } = getTopicStats(ids);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <Link
      to={`/topic/${topic.id}`}
      className="block p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-700 hover:bg-gray-900/80 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors leading-tight">
          {topic.title}
        </h3>
        <span className="shrink-0 text-xs text-gray-500 mt-0.5">{done}/{total}</span>
      </div>
      <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">{topic.description}</p>
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {review > 0 && (
        <p className="text-xs text-yellow-500 mt-2">{review} to review</p>
      )}
    </Link>
  );
}

export default function Home() {
  const { getTopicStats } = useProgress();
  const algorithmTopics = topics.filter(t => t.section === 'algorithms');
  const frontendTopics = topics.filter(t => t.section === 'frontend');
  const systemDesignTopics = topics.filter(t => t.section === 'system-design');

  const allIds = topics.flatMap(t => t.problems.map(p => p.id));
  const { done, total } = getTopicStats(allIds);

  return (
    <div className="pt-8 pb-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Interview Prep</h1>
        <p className="text-gray-400 text-sm">
          {done} of {total} problems solved
        </p>
        <div className="mt-3 w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${total > 0 ? Math.round((done / total) * 100) : 0}%` }}
          />
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Algorithms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {algorithmTopics.map(topic => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      {frontendTopics.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Frontend
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {frontendTopics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </section>
      )}

      {systemDesignTopics.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            System Design
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {systemDesignTopics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
