import React from 'react';

/** The page is framed as a weighing instrument: the rail reports grams. */
export function ScaleRail({ railRef }) {
  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-ticks" />
      <div className="rail-read" ref={railRef}>
        <b>0</b>
        <span>GRAMS</span>
      </div>
      <div className="rail-cap">NET WEIGHT</div>
    </div>
  );
}
