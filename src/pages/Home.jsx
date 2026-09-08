import React from 'react';
import { Hero } from '../components/Hero.jsx';
import { BowlPicker } from '../components/BowlPicker.jsx';
import { SpecTable } from '../components/SpecTable.jsx';
import { MacroTiles } from '../components/MacroTiles.jsx';
import { PortionSwitch } from '../components/PortionSwitch.jsx';
import { PlanGrid } from '../components/PlanGrid.jsx';
import { DayTimeline } from '../components/DayTimeline.jsx';
import { DeliveryAreas } from '../components/DeliveryAreas.jsx';
import { HoldSlot } from '../components/HoldSlot.jsx';
import { BowlScene } from '../components/BowlScene.jsx';

export const HOME_SECTIONS = ['#choose', '#box', '#label', '#portions', '#plans', '#day', '#where', '#hold'];

export function Home({
  bowl, size, onBowl, onSize, reduced, isDark, railRef, scroll,
  selectedPlanId, onChoosePlan,
}) {
  return (
    <>
      <BowlScene
        bowlId={bowl.id} size={size} reduced={reduced} isDark={isDark}
        railRef={railRef} scroll={scroll}
      />
      <main className="main">
        <Hero bowl={bowl} size={size} />
        <BowlPicker currentId={bowl.id} onSelect={onBowl} />
        <SpecTable bowl={bowl} size={size} />
        <MacroTiles bowl={bowl} size={size} />
        <PortionSwitch bowl={bowl} size={size} onSize={onSize} />
        <PlanGrid selectedPlanId={selectedPlanId} onChoose={onChoosePlan} />
        <DayTimeline />
        <DeliveryAreas />
        <HoldSlot currentBowlName={bowl.name} selectedPlanId={selectedPlanId} onPlanChange={onChoosePlan} />
      </main>
    </>
  );
}
