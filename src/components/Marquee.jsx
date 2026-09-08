import React from 'react';
import { MARQUEE } from '../data/site.js';

export function Marquee() {
  // duplicated once so a -50% translate loops seamlessly
  const run = [...MARQUEE, ...MARQUEE];
  return (
    <div className="mq" aria-hidden="true">
      <div>
        {run.map((bit, i) => (
          <span key={i}>{i % 3 === 1 ? <em>{bit}</em> : bit}</span>
        ))}
      </div>
    </div>
  );
}
