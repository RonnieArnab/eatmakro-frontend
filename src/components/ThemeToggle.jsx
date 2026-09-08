import React from 'react';

export function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      className="theme"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.5 14.6A8.6 8.6 0 019.4 3.5a8.6 8.6 0 1011.1 11.1z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.4" />
          <path d="M12 1.6v2.6M12 19.8v2.6M4.2 4.2l1.9 1.9M17.9 17.9l1.9 1.9M1.6 12h2.6M19.8 12h2.6M4.2 19.8l1.9-1.9M17.9 6.1l1.9-1.9" />
        </svg>
      )}
    </button>
  );
}
