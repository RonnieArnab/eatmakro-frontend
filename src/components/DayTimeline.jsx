import React from 'react';
import { DAY_TIMELINE } from '../data/site.js';

/**
 * The kitchen's own morning, cook to drop. Ends exactly at the hero's
 * "12:30–1:15 desk drop" stat, so the two never drift apart.
 */
export function DayTimeline() {
  return (
    <section className="sec" id="day">
      <div className="marker mono">05:30 &#8594; 13:15</div>
      <h2>One box, from marinade to your desk.</h2>
      <p className="lede">
        The scale isn't the only fixed point in the morning — everything else is built
        around getting a box from a cold pan to a warm desk inside one window.
      </p>
      <ol className="timeline">
        {DAY_TIMELINE.map((step, i) => (
          <li className="tl-step" key={step.time}>
            <div className="tl-rail">
              <span className="tl-dot" />
              {i < DAY_TIMELINE.length - 1 && <span className="tl-line" />}
            </div>
            <div className="tl-body">
              <div className="tl-time mono">{step.time}</div>
              <h3 className="tl-label">{step.label}</h3>
              <p className="tl-copy">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
