import React from 'react';
import { AREAS } from '../data/site.js';
import { DeliveryMap } from './DeliveryMap.jsx';

export function DeliveryAreas() {
  return (
    <section className="sec" id="where">
      <div className="marker mono">4 km</div>
      <h2>A four kilometre radius, on purpose.</h2>
      <p className="lede">
        Food cooked at 11 should not be in a bag at 2. We only take addresses a rider can
        reach inside the drop window.
      </p>
      <DeliveryMap />
      <div className="areas">
        {AREAS.map((a) => (
          <span className={`area ${a.state}`} key={a.name}>
            {a.name} <i>{a.state}</i>
          </span>
        ))}
      </div>
      <p>
        The kitchen has a camera over the prep counter and the scale is in frame. If you want
        to see the box you are eating being weighed, ask and we will send you the clip.
      </p>
    </section>
  );
}
