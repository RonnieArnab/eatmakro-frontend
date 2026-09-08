import React, { useEffect, useState } from 'react';
import { BOWLS } from '../data/bowls.js';
import { AREAS, PLANS } from '../data/site.js';
import { SocialLinks } from './SocialLinks.jsx';
import { useSignups } from '../hooks/useSignups.js';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export function HoldSlot({ currentBowlName, selectedPlanId, onPlanChange }) {
  const { held, hold, available } = useSignups();
  const [email, setEmail] = useState('');
  const [area, setArea] = useState(AREAS[0].name);
  const [bowl, setBowl] = useState(currentBowlName);
  const [portion, setPortion] = useState('Cut');
  const [planId, setPlanId] = useState(selectedPlanId);
  const [said, setSaid] = useState({ text: '', bad: false });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // the bowl picker and the "Choose this plan" buttons live elsewhere on the
  // page — keep the form's defaults following them until the visitor edits
  useEffect(() => setBowl(currentBowlName), [currentBowlName]);
  useEffect(() => setPlanId(selectedPlanId), [selectedPlanId]);

  const submit = async (ev) => {
    ev.preventDefault();
    if (done) return;
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setSaid({ text: 'That email is missing something. Check it and try again.', bad: true });
      return;
    }
    if (!available()) {
      setSaid({ text: 'Sign-ups are not reachable from this view. Open the published page to hold a slot.', bad: true });
      return;
    }
    setBusy(true);
    setSaid({ text: 'Holding…', bad: false });
    const plan = PLANS.find((p) => p.id === planId)?.length ?? planId;
    try {
      await hold({ email: value, area, bowl, portion, plan });
      setDone(true);
      setSaid({ text: `You are on the list. We will write to you before ${area} opens.`, bad: false });
    } catch (err) {
      setBusy(false);
      setSaid({
        text: err && err.code === 'quota_exceeded'
          ? 'The pre-launch list is full for now. Try again in a few days.'
          : 'That did not save. Try once more.',
        bad: true,
      });
    }
  };

  return (
    <section className="sec" id="hold">
      <div className="marker mono">Pre-launch</div>
      <h2>Hold a slot.</h2>
      <p className="lede">
        We can cook about 70 boxes a day at launch. Leave an email and we will tell you when
        your area opens, before it goes public.
      </p>
      <form className="form" onSubmit={submit} noValidate>
        <div>
          <label htmlFor="fEmail">Email</label>
          <input
            id="fEmail" type="email" inputMode="email" autoComplete="email"
            placeholder="you@work.com" value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />
        </div>
        <div className="row">
          <div>
            <label htmlFor="fArea">Area</label>
            <select id="fArea" value={area} onChange={(e) => setArea(e.target.value)}>
              {AREAS.map((a) => <option key={a.name}>{a.name}</option>)}
              <option>Somewhere else</option>
            </select>
          </div>
          <div>
            <label htmlFor="fBowl">Bowl</label>
            <select id="fBowl" value={bowl} onChange={(e) => setBowl(e.target.value)}>
              {BOWLS.map((b) => <option key={b.id}>{b.name}</option>)}
            </select>
          </div>
        </div>
        <div className="row">
          <div>
            <label htmlFor="fPortion">Portion</label>
            <select id="fPortion" value={portion} onChange={(e) => setPortion(e.target.value)}>
              <option>Cut</option><option>Bulk</option><option>Not sure yet</option>
            </select>
          </div>
          <div>
            <label htmlFor="fPlan">Plan</label>
            <select
              id="fPlan" value={planId}
              onChange={(e) => { setPlanId(e.target.value); onPlanChange?.(e.target.value); }}
            >
              {PLANS.map((p) => <option key={p.id} value={p.id}>{p.length} · ₹{p.rate}</option>)}
            </select>
          </div>
        </div>
        <div>
          <button className="btn" type="submit" disabled={busy || done}>
            {done ? 'Slot held' : 'Hold a slot'}
          </button>
        </div>
        <div className="count mono">
          {held === null ? ' '
            : held === 0 ? 'No slots held yet. Be the first.'
            : <><b>{held}</b> {held === 1 ? 'slot' : 'slots'} held so far.</>}
        </div>
        <div className={`said mono${said.bad ? ' bad' : ''}`} role="status">{said.text}</div>
      </form>
      <p style={{ marginTop: 28 }}>Or come and find us before launch.</p>
      <SocialLinks />
    </section>
  );
}
