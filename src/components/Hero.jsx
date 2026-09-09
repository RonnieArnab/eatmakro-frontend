import React from 'react';

export function Hero({ bowl, size }) {
  const d = bowl[size];
  return (
    <section className="sec hero" id="top">
      <h1>Weighed,<br /><span className="lo">not</span> <em>guessed.</em></h1>
      <p className="lede">
        Six high-protein bowls cooked in Hyderabad every morning, put on a bench scale
        component by component, and sealed. You get the grams. Not an adjective.
      </p>
      <div className="stats">
        <div className="stat"><b className="mono">{d.p} g</b><span>protein, {bowl.name}</span></div>
        <div className="stat"><b className="mono">{d.k}</b><span>kcal, measured</span></div>
        <div className="stat"><b className="mono">₹230</b><span>per meal, 20-day</span></div>
        <div className="stat"><b className="mono">12:30–1:15</b><span>desk drop</span></div>
      </div>
    </section>
  );
}
