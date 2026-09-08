# EatMakro — frontend

Scroll-driven 3D site for a high-protein tiffin subscription in Hyderabad.
**Weighed, not guessed.**

React 18 + three.js. Every 3D asset is procedural — there is not one image,
model or texture file in the repo.

## Run it

```bash
npm install
npm run dev            # vite, http://localhost:5173
npm run build          # normal production build -> dist/
npm run build:artifact # single-file build -> dist-artifact/eatmakro.html
```

## Layout

```
src/
  main.jsx                 mount
  App.jsx                  theme, active bowl / portion / plan state
  pages/
    Home.jsx                hero -> chooser -> box -> label -> portions
                             -> plans -> day timeline -> areas -> hold
  components/
    Header  Logo  ThemeToggle  ScaleRail  Loader  Marquee  Footer  SocialLinks
    Hero  BowlPicker  SpecTable  MacroTiles  PortionSwitch  PlanGrid
    DayTimeline  DeliveryMap  DeliveryAreas  HoldSlot  Annotations  BowlScene
  hooks/
    useTheme                three-state light/dark, persisted
    useScrollProgress       page progress + per-section progress, in a ref
    useReducedMotion
    useSignups              the pre-launch list
  three/
    helpers  palette  env  steel  food  label  bowlBuilders
  data/
    bowls.js  site.js       plans, areas, day timeline, nav, socials
scripts/build-artifact.mjs  concatenates src/ into one publishable HTML
```

Scroll choreography keys off **per-section progress**, not raw page percent
(`useScrollProgress.sectionProgress`), so adding or reordering a section never
desynchronises the animation. Nav links and in-page CTAs are plain single
`#fragment` anchors matching real section ids — no client-side router.

## Palette

Neutrals are a cold prep-room grey-blue and never change. Every saturated value
comes from the selected bowl: choosing a bowl re-themes the site.

| Bowl | Light accent | Dark accent |
|---|---|---|
| Chicken Tikka | `#a8452a` | `#e08b6b` |
| Paneer Makhani | `#85591a` | `#d9a962` |
| Chana + Beet | `#8f3457` | `#d1809b` |
| Egg + Millet | `#3f6b52` | `#7fb495` |

Food colours live in `src/three/palette.js`, held one stop back in saturation
from the raw ingredient — chicken tikka is brick, not orange; a boiled yolk is
ochre, not neon. The lighting rig is deliberately low (`src/three/env.js`): the
environment map supplies most of the diffuse, and a full-strength key on top is
what greys food out.

## Plans, the day, and the delivery zone

- **Plans** (`PlanGrid.jsx`) each carry a "Choose this plan" button that sets
  the sign-up form's plan and scrolls to it — the grid and the form's own
  `Plan` select stay in sync either direction.
- **A typical morning** (`DayTimeline.jsx`) walks cook → weigh → seal → ride →
  drop, ending exactly at the hero's `12:30–1:15 desk drop` stat. The 45–60 s
  plating time and the cut/bulk rider split are from the 06 Sep meeting log;
  the clock times themselves are the kitchen's own, not independently verified.
- **The delivery map** (`DeliveryMap.jsx`) is a small locator SVG, not a road
  map: the kitchen at the centre, a 4 km ring, and each area at its real
  compass direction and roughly its real distance — close enough that the
  three "live" zones fall inside the ring and the two "next" zones fall just
  outside it. Geometry lives in `src/data/site.js` (`KITCHEN`,
  `DELIVERY_RADIUS_KM`, `AREAS`).

## Before launch

- **Social handles in `src/data/site.js` are unclaimed placeholders.** Confirm
  each account exists and belongs to EatMakro before shipping.
- The delivery map's positions are illustrative, not surveyed GPS — fine for
  "can a rider reach this," not for turn-by-turn routing.
- Two figures from the 06–07 Sep meeting log are still open and unresolved:
  the ₹4 lakh / 266-orders contradiction, and the ₹158 per-meal cost that was
  reconstructed from an unclear recording.

## The published artifact

`scripts/build-artifact.mjs` inlines the whole app into one HTML file. Published
artifacts run under a CSP that blocks all external resources except scripts from
cdnjs and Google Fonts stylesheets — no images, no media, no model files, no
fetch. That is why every asset is procedural. React, ReactDOM and three load as
UMD globals from cdnjs, JSX is transpiled in the browser by Babel Standalone,
and each source file is concatenated with its import/export keywords stripped.
Same components, same boundaries, one file.

`legacy-single-file.html` is the pre-React version, kept for reference only.
