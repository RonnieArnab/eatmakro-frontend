import React from 'react';
import { Logo } from './Logo.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import { NAV } from '../data/site.js';

export function Header({ isDark, onToggleTheme, logoTipped }) {
  return (
    <header className="header">
      <a className={`brand${logoTipped ? ' tip' : ''}`} href="#top" aria-label="EatMakro, home">
        <Logo />
        Eat<span className="hot">Makro</span>
      </a>
      <nav className="nav">
        {NAV.map((n) => (
          <a key={n.label} className="navlink" href={n.href}>
            {n.label}
          </a>
        ))}
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        <a className="btn" href="#hold">Hold a slot</a>
      </nav>
    </header>
  );
}
