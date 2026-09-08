import { useCallback, useEffect, useState } from 'react';

const KEY = 'em-theme';
const read = () => {
  try { const v = localStorage.getItem(KEY); return v === 'dark' || v === 'light' ? v : null; }
  catch { return null; }   // private mode: fall back to the OS preference
};

/**
 * Three states, not two: an explicit choice stamps data-theme, and the
 * default leaves it off so prefers-color-scheme decides.
 */
export function useTheme() {
  const [choice, setChoice] = useState(read);
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = () => setSystemDark(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (choice) root.setAttribute('data-theme', choice);
    else root.removeAttribute('data-theme');
  }, [choice]);

  const isDark = choice ? choice === 'dark' : systemDark;
  const toggle = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    setChoice(next);
    try { localStorage.setItem(KEY, next); } catch { /* nothing to persist to */ }
  }, [isDark]);

  return { isDark, toggle };
}
