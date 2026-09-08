import React, { useEffect, useRef, useState } from 'react';

/** The scale zeroing, then weighing up to a full box. */
export function Loader() {
  const [k, setK] = useState(0);
  const [gone, setGone] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const DUR = 1100;
    const tick = () => {
      const v = Math.min(1, (performance.now() - start) / DUR);
      setK(v);
      if (v < 1) { raf.current = requestAnimationFrame(tick); return; }
      setTimeout(() => setGone(true), 560);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  if (gone) return null;
  const steps = ['Zeroing the scale', 'Weighing components', 'Printing the label'];
  return (
    <div className={`loader${k >= 1 ? ' done' : ''}`}>
      <div className="lname">Eat<em>Makro</em></div>
      <div className="lbar"><i style={{ width: `${k * 100}%` }} /></div>
      <div className="lrow">
        <span>{steps[Math.min(2, Math.floor(k * 3))]}</span>
        <span className="mono">{Math.round(k * 620)} g</span>
      </div>
    </div>
  );
}
