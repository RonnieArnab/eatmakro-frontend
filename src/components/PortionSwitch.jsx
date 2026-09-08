import React from 'react';

export function PortionSwitch({ bowl, size, onSize }) {
  const d = bowl[size];
  return (
    <section className="sec" id="portions">
      <div className="marker mono">{bowl.cut.grain} g / {bowl.bulk.grain} g</div>
      <h2>Cut or bulk. Pick one and the box changes.</h2>
      <p className="lede">
        Same kitchen, same 5 ml of oil, different weights on the scale. Switch it here and
        watch the bowl rebuild itself.
      </p>
      <div className="switch" role="group" aria-label="Portion size">
        <button type="button" aria-pressed={size === 'cut'} onClick={() => onSize('cut')}>Cut</button>
        <button type="button" aria-pressed={size === 'bulk'} onClick={() => onSize('bulk')}>Bulk</button>
      </div>
      <div className="portion-read">
        <div><b className="mono">{d.grain} g</b><span>{bowl.grainLabel}</span></div>
        <div><b className="mono">{d.prot} g</b><span>{bowl.proteinLabel}</span></div>
        <div><b className="mono">{d.net} g</b><span>net weight</span></div>
      </div>
      <p>
        Riders carry one type each, so a cut round and a bulk round leave the kitchen
        separately. That is why the plan asks which one you want up front rather than letting
        you change it meal to meal.
      </p>
    </section>
  );
}
