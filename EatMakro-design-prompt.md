# EatMakro — design prompt & 3D animation brief

A hand-off brief for the EatMakro landing site. Written so it can be given to a
designer, a front-end dev, or pasted into another tool as a build prompt.

Source of truth for the business facts: the team's meeting log of 06–07 Sep 2026.

---

## 1. The one-line brief

> Build a scroll-driven 3D landing page for **EatMakro**, a high-protein tiffin
> subscription launching in Hyderabad. A stainless steel dabba assembles, comes
> apart into six weighed components with a spec-drawing annotation for each,
> reassembles, seals, and gets its macro sticker printed on the lid. The page is
> framed as a weighing instrument: a ruler runs down the left edge and reports
> grams as you scroll.

**Positioning line:** *Weighed, not guessed.*

**Audience:** people in Gachibowli / Hitech City offices who lift, track macros,
and are tired of trusting a photo of a salad. They read numbers before they read
adjectives.

**Primary job of the page:** convert a cold visitor into a pre-launch sign-up
(the team's action item #6 — start collecting sign-ups 1–2 months before opening).

---

## 2. Why this direction, and what it deliberately avoids

The reference sites (CRAV, Bucks Sauce, Planetoño, Active Hop) share a grammar:
a loading screen with a themed status line, an oversized display headline, a hero
object that reacts to scroll, and product facts revealed section by section. We
keep that grammar and change the *material story*.

Most fitness-food sites go dark-and-neon, or warm-cream-and-terracotta. Neither
is true to this product. This product's real materials are **stainless steel**
(the Indian tiffin dabba), **a digital kitchen scale**, and **printed labels**.
So the site is built as an instrument, not as a mood board:

- The page ground is cool **steel-sage**, the colour of a clean prep counter —
  not cream, not near-black.
- Section markers are **gram values** (`620 g`, `48 g`, `₹230`), not tracked-out
  all-caps eyebrows. The marker carries information because the whole product is
  about numbers.
- The one monospace face in the design appears **only** in the scale readout and
  the annotation labels. It is the instrument's typeface, used nowhere else.
- Food supplies every saturated colour on the page. Chrome stays neutral.

Deliberately not used: cream + serif + terracotta, acid green on near-black,
identical rounded shadow cards, `→` in button text, `A · B · C` meta strings.

---

## 3. Tokens

### Colour

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#DCE0D6` | `#141812` | Ground. Cool steel-sage. |
| `--paper-2` | `#E7EAE1` | `#1C211A` | Recessed panels, inputs, macro tiles. |
| `--ink` | `#12180F` | `#E6EADE` | Type. Near-black with a green cast. |
| `--chilli` | `#E0361F` | `#FF5C40` | The single hot accent: price, scale readout, the recommended plan, errors. |
| `--broccoli` | `#3D6B22` | `#8CC25C` | Secondary data colour. Bars, confirmations. |
| `--steel` | `#8F9A8C` | `#7C877A` | Hairlines, disabled, the dabba's own colour. |

Rule: `--chilli` is used at most three times per viewport. It marks the number
that matters, nothing else.

### Type

- **Bricolage Grotesque** — everything. Variable width and weight, so one family
  covers a 148px display slab (`wght 800 / wdth 96 / tracking −0.035em / leading 0.86`)
  and 17px body without a second family.
- **DM Mono** — the scale rail, the annotation chips, batch strings. Nowhere else.

Scale: 148 / 64 / 40 / 21 / 17 / 14 / 12. Body measure capped at 34ch, lede at 40ch.

### Layout

```
┌──┬─────────────────────────────────────────────────────┐
│▐ │  EatMakro          the box  portions  plans   [hold]│
│▐ │                                                      │
│▐ │  WEIGHED,                            ╭──────────╮   │
│▐ │  not GUESSED.                        │          │   │
│▐ │                                      │   3D     │   │
│▐ │  A high-protein tiffin cooked in     │  dabba   │   │
│▐ │  Hyderabad every morning…            │          │   │
│▐ │                                      ╰──────────╯   │
│▐ │  48 g       520      ₹230    12:30–1:15             │
│▐ │  protein    kcal     /meal   desk drop              │
└──┴─────────────────────────────────────────────────────┘
  ↑ scale rail: ticks + a gram readout that tracks scroll
```

Everything left-aligned. Copy occupies the left ~60% on desktop
(`main { padding-right: 32vw }`); the 3D object lives in the right third and is
never covered. On mobile the object moves up and shrinks, and copy blocks get an
opaque veil so they stay readable over it.

---

## 4. The 3D scene

### Assets (all procedural — nothing loaded from a file)

| Asset | Construction |
|---|---|
| Steel tiffin base | `LatheGeometry` profile: flat base → curved wall → rolled rim → thin inner wall, plus a turned base ring. `metalness 0.94`, `roughness 0.29`. |
| Lid | Second lathe profile with a squashed-sphere knob. |
| Rice | `InstancedMesh`, ~460 grains. Sphere scaled `1.9 / 0.85 / 0.85`, scattered on a disc with a mound falloff. |
| Chicken slice | Rounded box (box geometry spherified at the corners) + value-noise displacement, with two seared bars laid across the top face as grill marks. |
| Broccoli | Tapered stem + 7 noise-displaced icosahedra, flat shaded, two greens mixed. |
| Carrot / capsicum / curd | Tapered cylinder, thin flattened torus, squashed noisy sphere. |
| Macro sticker | 640×400 canvas texture: chilli header band, the protein number at 132px, three macro bars, a `WEIGHED HYD·0417 · NET 620 g` batch strip. Regenerated when the portion switches. |
| Environment | 512×256 canvas equirect (gradient + two white strip lights + a warm bounce card), run through `PMREMGenerator`. **Required** — `metalness: 0.94` renders black without it. |
| Contact shadow | Radial-gradient canvas on a ground plane. Cheaper and softer than a real shadow map. |

Budget: ~12.7k triangles plus instanced rice. Device pixel ratio capped at 1.75.

### Lighting

Four lights, a kitchen-studio rig: hemisphere fill `0.55`, warm key from
front-right-high `2.1`, cool bounce from the left `0.6`, hard rim from behind
`1.15`. ACES Filmic tone mapping, exposure `1.04`, transparent canvas so the
sage paper shows through.

### Scroll choreography

Scroll progress `p` (0→1) is smoothed with a lag of `0.09` per frame, then drives
everything. Camera positions are keyframed and eased with a cubic in-out.

| `p` | What happens |
|---|---|
| 0.00 – 0.13 | Assembled dabba, slow idle rotation and float. Camera close, slightly above. |
| 0.13 – 0.245 | **Explode.** Layers separate vertically: bowl −0.38, rice +0.52, chicken +1.24, veg +1.98, curd +2.62. Camera pulls back and lifts. |
| 0.165 – 0.345 | **Annotations.** Six HTML chips project onto 3D anchor points each frame, joined to their anchor by a dashed SVG leader line. This is the signature moment — the meal reads as an exploded spec drawing. |
| 0.30 – 0.365 | Reassemble. |
| ~0.46 | Camera swings to a high three-quarter view for the macro readout. |
| ~0.56 | Front, close, for the cut/bulk switch. |
| 0.60 – 0.72 | **Seal.** Lid descends from y 3.4 to 0.70, unwinding a 1.4 rad rotation as it lands. |
| 0.71 – 0.80 | **Label prints.** Sticker scales up and settles onto the lid at y 0.88. |
| 0.84 – 1.00 | Sealed box tilts, drifts up and away; contact shadow fades. |

### Interaction

**Cut / bulk switch** is the only user-triggered motion, and it changes the model,
not just the copy: chicken slices ease in or out (4 → 7), the rice mound scales
(0.72 → 1.16), and the sticker texture is regenerated with new macros. Everything
eases over ~10 frames so it feels mechanical rather than snappy.

### Quality floor

`prefers-reduced-motion` kills idle rotation and float and the marquee, keeping
the scroll mapping. Render loop pauses on `visibilitychange`. Visible focus rings.
Light and dark both defined. Nothing on the page depends on colour alone.

---

## 5. Content map

| Section | Marker | Job |
|---|---|---|
| Hero | — | Position + four hard numbers: 48 g protein, 520 kcal, ₹230/meal, 12:30–1:15. |
| The box | `620 g` | Six weighed components as a spec table, mirrored by the 3D exploded view. |
| The label | `48 g` | Macro tiles. "The label is the product." |
| Portions | `150 g / 250 g` | Cut vs bulk switch. Notes that riders carry one type each. |
| Plans | `₹230` | ₹280 trial · ₹250 (10-day) · **₹230 (20-day)** · ₹210 (30-day). |
| Where we deliver | `4 km` | Gachibowli, Hitech City, Madhapur live; Kondapur and Financial District dashed. Kitchen camera + returnable steel. |
| Hold a slot | — | Email + area + plan. Writes to the artifact's `db`, shows a live count of slots held. |

### Voice

Plain verbs, sentence case, no exclamation marks. Say the number instead of the
adjective. "Cooked in about 5 ml of oil. Masala is measured too — it counts."
Not "premium hand-crafted nutrition."

CTA is **"Hold a slot"** everywhere — nav, button, section heading — and the
confirmation says "You're on the list," never "Submit" → "Success."

---

## 6. Stack

Published page: React 18 + three.js r128, both as UMD script tags, Babel Standalone
for JSX, everything else inline in one HTML file.

For the production codebase, port to Next.js + `@react-three/fiber` +
`@react-three/drei`. `EatMakroScene.jsx` in this package is the R3F version of the
scene — same asset factories, `useFrame` instead of a manual `requestAnimationFrame`
loop, `useScroll` from drei instead of reading `window.scrollY`.

---

## 7. Two figures to settle before this goes public

1. The 07 Sep target of **₹4 lakh/month across 266 orders/day** works out to about
   ₹50 per order, which contradicts the ₹200–250 agreed on 06 Sep. At ₹230 across
   266 orders/day the same volume is closer to ₹18 lakh/month revenue. Confirm
   whether ₹4 lakh was meant as *profit*, and fix the order count either way.
2. Per-meal cost (₹158 all-in at 100 meals/day) was reconstructed from an unclear
   transcript. At ₹230 that is a 31% margin, which matches the target — but the
   site quotes prices publicly, so check it against the team's own sheet first.
