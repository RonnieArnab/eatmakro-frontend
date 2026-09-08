import React from 'react';
import { SOCIALS } from '../data/site.js';

const ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.2A8.2 8.2 0 1112 20.2a8.4 8.4 0 01-4-1l-4.5 1.3z" />
      <path d="M8.6 8.2c.4-.1.7 0 .9.4l.6 1.3c.1.3 0 .5-.2.7l-.4.4c-.1.2-.2.3 0 .6a6 6 0 002.6 2.2c.3.1.5 0 .6-.1l.5-.6c.2-.2.4-.2.7-.1l1.3.6c.3.2.4.5.3.8-.2.7-.9 1.3-1.8 1.3-2.5 0-5.9-3.4-5.9-5.9 0-.8.4-1.5 1-1.6z" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.4 10.4v6.2M7.4 7.5v.1M11.4 16.6v-6.2M11.4 12.8c0-1.3.9-2.1 2.1-2.1s2.1.8 2.1 2.4v3.5" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.3 9.6l4.6 2.4-4.6 2.4z" />
    </>
  ),
  email: (
    <>
      <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.5" />
      <path d="M3.4 6.6L12 12.7l8.6-6.1" />
    </>
  ),
};

export function SocialLinks({ compact }) {
  return (
    <div className="socials">
      {SOCIALS.map((s) => (
        <a
          key={s.id}
          className="social"
          href={s.url}
          target={s.id === 'email' ? undefined : '_blank'}
          rel="noreferrer noopener"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {ICONS[s.id]}
          </svg>
          <span>{s.label}</span>
          {!compact && <span className="h">{s.handle}</span>}
        </a>
      ))}
    </div>
  );
}
