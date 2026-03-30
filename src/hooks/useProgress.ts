import { useState, useCallback } from 'react';

const STORAGE_KEY = 'studiocavan-study-progress';

type Status = 'done' | 'review' | null;

interface Progress {
  [problemId: string]: Status;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  });

  const setStatus = useCallback((problemId: string, status: Status) => {
    setProgress(prev => {
      const next = { ...prev };
      if (status === null) {
        delete next[problemId];
      } else {
        next[problemId] = status;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getStatus = useCallback((problemId: string): Status => {
    return progress[problemId] ?? null;
  }, [progress]);

  const getTopicStats = useCallback((problemIds: string[]) => {
    const done = problemIds.filter(id => progress[id] === 'done').length;
    const review = problemIds.filter(id => progress[id] === 'review').length;
    return { done, review, total: problemIds.length };
  }, [progress]);

  return { setStatus, getStatus, getTopicStats };
}
