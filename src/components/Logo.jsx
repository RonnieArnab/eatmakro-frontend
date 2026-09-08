import React from 'react';

/**
 * The monogram is a working balance. The beam tips, the pan counter-rotates
 * so it swings level again, and the pivot dot pops. It fires on hover, on
 * keyboard focus, and whenever the bowl changes — `tipped` drives that.
 * The pan rim and pivot take the active bowl's accent.
 */
export function Logo({ tipped }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={tipped ? 'tip' : undefined}>
      <g className="lg-beam">
        <path d="M18 104h164M46 104l24 26M154 104l-24 26" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      </g>
      <g className="lg-pan">
        <path
          d="M32 128h136a10 10 0 0110 10v6c0 34-28 60-63 60h-30c-35 0-63-26-63-60v-6a10 10 0 0110-10z"
          fill="currentColor"
        />
        <rect className="lg-fill" x="32" y="128" width="156" height="13" rx="6.5" />
      </g>
      <path d="M100 104V58" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      <circle className="lg-dot lg-fill" cx="100" cy="42" r="17" />
    </svg>
  );
}
