import { useState, useCallback } from 'react';
import { Language } from '../types';

const STORAGE_KEY = 'studiocavan-study-lang';

export function useLangPreference() {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === 'typescript' || stored === 'kotlin') ? stored : 'kotlin';
  });

  const setLang = useCallback((l: Language) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLangState(l);
  }, []);

  return { lang, setLang };
}
