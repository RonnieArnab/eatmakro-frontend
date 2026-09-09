import React from 'react';
import { PLANS } from '../data/site.js';

export function PlanGrid({ selectedPlanId, onChoose }) {
  return (
    <section className="sec" id="plans">
      <div className="marker mono">₹230</div>
      <h2>Longer plan, lower rate.</h2>
      <p className="lede">
        One meal a day, six days a week. Sunday the kitchen is cleaned, so there is no drop.
      </p>
      <div className="plans">
        {PLANS.map((pl) => {
          const chosen = pl.id === selectedPlanId;
          return (
            <div className={`plan${pl.pick ? ' pick' : ''}${chosen ? ' chosen' : ''}`} key={pl.id}>
              {pl.pick && <div className="flag mono">MOST TAKEN</div>}
              <div className="rate mono">₹{pl.rate}</div>
              <div className="len">{pl.length}</div>
              <div className="per mono">{pl.total} total</div>
              <button
                type="button"
                className="plan-pick"
                aria-pressed={chosen}
                onClick={() => onChoose?.(pl.id)}
              >
                {chosen ? 'Chosen — go to sign-up' : 'Choose this plan'}
              </button>
            </div>
          );
        })}
      </div>
      <p>
        Prices are per meal and include delivery inside the live zones. All six bowls cost the
        same, and cut and bulk cost the same — the difference is weight, not price.
      </p>
    </section>
  );
}
