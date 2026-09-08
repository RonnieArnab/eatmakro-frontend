import React from 'react';
import { BOWLS } from '../data/bowls.js';

export function BowlPicker({ currentId, onSelect }) {
  return (
    <section className="sec" id="choose">
      <div className="marker mono">4 bowls</div>
      <h2>Pick a bowl. The whole page follows it.</h2>
      <p className="lede">
        Four rotations, one kitchen. Choose one and watch the dabba empty out and refill —
        every ingredient is modelled, and the site takes its colour from whatever is in the box.
      </p>
      <div className="bowls" role="group" aria-label="Choose a bowl">
        {BOWLS.map((b) => (
          <button
            key={b.id}
            type="button"
            className="bowl"
            style={{ '--bc': b.accent.light }}
            aria-pressed={b.id === currentId}
            onClick={() => onSelect(b.id)}
          >
            <span className="swatch" style={{ background: b.swatch }} />
            <span className="bt">{b.tag}</span>
            <span className="bn">{b.name}</span>
            <span className="bm">{b.cut.p} g protein · {b.cut.k} kcal</span>
          </button>
        ))}
      </div>
      <p>
        Your plan is tied to one bowl so the rider carries a single rotation. Changing it later
        is a message to the kitchen, not a checkout step.
      </p>
    </section>
  );
}
