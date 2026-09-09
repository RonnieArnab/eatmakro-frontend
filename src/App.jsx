import React, { useCallback, useRef, useState } from 'react';
import { BOWLS, BOWL_BY_ID } from './data/bowls.js';
import { PLANS } from './data/site.js';
import { useTheme } from './hooks/useTheme.js';
import { useReducedMotion } from './hooks/useReducedMotion.js';
import { useScrollProgress } from './hooks/useScrollProgress.js';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Marquee } from './components/Marquee.jsx';
import { Loader } from './components/Loader.jsx';
import { ScaleRail } from './components/ScaleRail.jsx';
import { Home, HOME_SECTIONS } from './pages/Home.jsx';

const DEFAULT_PLAN = PLANS.find((p) => p.pick)?.id ?? PLANS[0].id;

export default function App() {
  const [bowlId, setBowlId] = useState(BOWLS[0].id);
  const [size, setSize] = useState('cut');
  const [selectedPlanId, setSelectedPlanId] = useState(DEFAULT_PLAN);
  const [tipped, setTipped] = useState(false);
  const railRef = useRef(null);
  const { isDark, toggle } = useTheme();
  const reduced = useReducedMotion();

  const bowl = BOWL_BY_ID[bowlId];
  const scroll = useScrollProgress(HOME_SECTIONS);

  /* --accent used to be swapped at runtime for the selected bowl's own food
     colour (chicken-tikka brick, paneer saffron, ...). The site now runs a
     single fixed brand palette instead — see the "brand tokens" comment at
     the top of src/styles/tokens.css to change it. To bring per-bowl accents
     back, restore this effect:
       useEffect(() => {
         document.documentElement.style.setProperty(
           '--accent', isDark ? bowl.accent.dark : bowl.accent.light,
         );
       }, [bowl, isDark]);
  */

  const onBowl = useCallback((id) => {
    setBowlId(id);
    setTipped(true);                       // the balance tips when the load changes
    setTimeout(() => setTipped(false), 780);
  }, []);

  /* a plan card's "Choose this plan" button sets the sign-up form's plan
     and carries the visitor straight to it, without relying on hash routing
     quirks (a nested "#page#section" hash does not auto-scroll). */
  const onChoosePlan = useCallback((planId) => {
    setSelectedPlanId(planId);
    const target = document.getElementById('hold');
    if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }, [reduced]);

  return (
    <>
      <Loader />
      <ScaleRail railRef={railRef} />
      <Header isDark={isDark} onToggleTheme={toggle} logoTipped={tipped} />
      <Home
        bowl={bowl} size={size} onBowl={onBowl} onSize={setSize}
        reduced={reduced} isDark={isDark} railRef={railRef} scroll={scroll}
        selectedPlanId={selectedPlanId} onChoosePlan={onChoosePlan}
      />
      <Marquee />
      <Footer />
    </>
  );
}
