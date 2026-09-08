import React from 'react';

/**
 * Six HTML chips projected onto 3D anchor points every frame, each joined to
 * its anchor by a dashed leader line. The scene writes straight into these
 * refs — routing 60 fps position updates through React state would be
 * pointless work.
 */
export function Annotations({ hostRef, chipRefs, lineRefs, items }) {
  return (
    <div className="annos" aria-hidden="true" ref={hostRef}>
      <svg>
        {items.map((_, i) => (
          <path
            key={i}
            ref={(n) => { lineRefs.current[i] = n; }}
            fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"
          />
        ))}
      </svg>
      {items.map(([name, grams], i) => (
        <div className="chip" key={name} ref={(n) => { chipRefs.current[i] = n; }} style={{ opacity: 0 }}>
          <b>{grams} g</b>
          <span>{name.split(',')[0]}</span>
        </div>
      ))}
    </div>
  );
}
