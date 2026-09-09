/**
 * The six rotations. Each carries its own accent, pulled out of its own
 * food — used on the bowl-picker swatch, the picker's selection ring and
 * the printed macro sticker, not the site's own accent, which is now fixed
 * (see src/styles/tokens.css). Accents are held one stop back from the raw
 * ingredient colour so they stay readable as type.
 *
 * Weights are cooked weights and sum to `net`. Macros come from the team's
 * 06 Sep target of 45–52 g protein and about 520 kcal for the chicken bowl;
 * the rest are computed from their own components and are honestly lower
 * where the ingredients are lower. Steak and fish were added from a set of
 * four reference photos (charred steak/quinoa/olives/slaw bowls and a
 * herb-crusted fish bowl) — see src/three/food.js for the new primitives
 * (steakSlice, quinoaMound, sweetPotatoCube, slawRibbon, oliveBall,
 * ramekinDip, fishFillet, lemonWheel, peaCluster, microgreenScatter) that
 * model them procedurally, the same way every other ingredient here is
 * modelled — nothing is a loaded image or a scanned mesh.
 */
export const BOWLS = [
  {
    id: 'tikka',
    name: 'Chicken Tikka',
    tag: 'NON-VEG',
    accent: { light: '#a8452a', dark: '#e08b6b' },
    swatch: '#b85a34',
    grainLabel: 'basmati rice',
    proteinLabel: 'chicken tikka',
    cut:  { net: 620, grain: 130, prot: 120, p: 48, c: 55, f: 12, k: 520 },
    bulk: { net: 810, grain: 250, prot: 190, p: 72, c: 94, f: 18, k: 825 },
    items: [
      ['Chicken tikka, charred', 120, '#b85a34', 'Marinated in curd overnight, cooked dry.'],
      ['Basmati rice', 130, '#eee9dc', 'Cooked weight, drained.'],
      ['Broccoli', 110, '#5d7f47', 'Steamed 4 minutes so it still bites back.'],
      ['Beetroot + carrot', 100, '#9c5271', 'Cut the same morning.'],
      ['Curd, low fat', 150, '#f4f1e6', 'Set overnight in the kitchen, not bought in a tub.'],
      ['Oil + masala', 10, '#8a6740', 'About 5 ml of oil. Masala is measured too — it counts.'],
    ],
    anchors: {
      prot: [0.36, 0.56, 0.22], grain: [0, 0.36, 0], veg: [0.38, 0.46, 0.58],
      veg2: [-0.28, 0.44, -0.5], top: [-0.62, 0.48, 0.18], masala: [1.02, 0.34, 0.26],
    },
  },
  {
    id: 'paneer',
    name: 'Paneer Makhani',
    tag: 'VEG',
    accent: { light: '#85591a', dark: '#d9a962' },
    swatch: '#bd6a3d',
    grainLabel: 'jeera rice',
    proteinLabel: 'paneer, grilled',
    cut:  { net: 610, grain: 130, prot: 140, p: 38, c: 54, f: 20, k: 550 },
    bulk: { net: 800, grain: 250, prot: 210, p: 56, c: 92, f: 30, k: 862 },
    items: [
      ['Paneer, grilled', 140, '#f0ead6', 'Pressed, cubed and charred on a flat top.'],
      ['Jeera rice', 130, '#e8dcc4', 'Cooked weight. Cumin is weighed with it.'],
      ['Capsicum + onion', 110, '#628350', 'Three colours of capsicum, not one.'],
      ['Tomato makhani', 90, '#bd6a3d', 'Tomato and cashew, no cream.'],
      ['Curd, low fat', 130, '#f4f1e6', 'Set overnight in the kitchen.'],
      ['Oil + masala', 10, '#8a6740', 'About 5 ml of oil. Masala is measured too — it counts.'],
    ],
    anchors: {
      prot: [0.36, 0.56, 0.22], grain: [0, 0.36, 0], veg: [0.42, 0.46, 0.4],
      veg2: [-0.26, 0.46, -0.42], top: [-0.6, 0.48, 0.2], masala: [1.02, 0.34, 0.26],
    },
  },
  {
    id: 'chana',
    name: 'Chana + Beet',
    tag: 'VEGAN',
    accent: { light: '#8f3457', dark: '#d1809b' },
    swatch: '#9c5271',
    grainLabel: 'bajra millet',
    proteinLabel: 'kabuli chana',
    cut:  { net: 650, grain: 140, prot: 200, p: 30, c: 76, f: 13, k: 540 },
    bulk: { net: 850, grain: 260, prot: 280, p: 44, c: 118, f: 19, k: 820 },
    items: [
      ['Kabuli chana', 200, '#cfab72', 'Soaked 8 hours, boiled. Never from a tin.'],
      ['Bajra millet', 140, '#cdbb93', 'Cooked weight. Lower GI than rice.'],
      ['Beetroot', 100, '#9c5271', 'Roasted, not boiled. This is where the colour comes from.'],
      ['Spinach', 90, '#4d7048', 'Wilted in the pan for 40 seconds.'],
      ['Tomato + onion', 110, '#ac5442', 'The base masala, weighed after it reduces.'],
      ['Oil + masala', 10, '#8a6740', 'About 5 ml of oil. Masala is measured too — it counts.'],
    ],
    anchors: {
      prot: [0.3, 0.5, 0.24], grain: [0, 0.36, 0], veg: [0.4, 0.44, 0.36],
      veg2: [-0.34, 0.42, -0.46], top: [-0.3, 0.5, -0.46], masala: [1.02, 0.34, 0.26],
    },
  },
  {
    id: 'egg',
    name: 'Egg + Millet',
    tag: 'EGG',
    accent: { light: '#3f6b52', dark: '#7fb495' },
    swatch: '#dda94e',
    grainLabel: 'bajra millet',
    proteinLabel: 'boiled egg',
    cut:  { net: 580, grain: 130, prot: 150, p: 36, c: 46, f: 18, k: 490 },
    bulk: { net: 770, grain: 240, prot: 225, p: 54, c: 80, f: 27, k: 779 },
    items: [
      ['Boiled egg, 3 halves', 150, '#dda94e', 'Seven minutes, so the yolk is still soft.'],
      ['Bajra millet', 130, '#cdbb93', 'Cooked weight. Lower GI than rice.'],
      ['Spinach', 100, '#4d7048', 'Wilted in the pan for 40 seconds.'],
      ['Tomato + onion', 90, '#ac5442', 'The base masala, weighed after it reduces.'],
      ['Curd, low fat', 100, '#f4f1e6', 'Set overnight in the kitchen.'],
      ['Oil + masala', 10, '#8a6740', 'About 5 ml of oil. Masala is measured too — it counts.'],
    ],
    anchors: {
      prot: [0.36, 0.54, 0.22], grain: [0, 0.36, 0], veg: [0.4, 0.44, 0.42],
      veg2: [-0.34, 0.46, -0.44], top: [-0.58, 0.48, 0.24], masala: [1.02, 0.34, 0.26],
    },
  },
  {
    id: 'steak',
    name: 'Charred Steak Bowl',
    tag: 'NON-VEG',
    accent: { light: '#8a4a35', dark: '#c98a6f' },
    swatch: '#8a4a35',
    grainLabel: 'tri-colour quinoa',
    proteinLabel: 'charred steak',
    cut:  { net: 590, grain: 130, prot: 150, p: 46, c: 54, f: 18, k: 560 },
    bulk: { net: 780, grain: 240, prot: 220, p: 66, c: 88, f: 27, k: 860 },
    items: [
      ['Steak, charred', 150, '#8a4a35', 'Seared hot and fast, rested before it is sliced.'],
      ['Tri-colour quinoa', 130, '#e8dcc0', 'Cooked weight, three grains for one texture.'],
      ['Sweet potato, roasted', 100, '#c4691f', 'Roasted whole, cut after — the char stays on the outside.'],
      ['Broccoli', 90, '#5d7f47', 'Steamed 4 minutes so it still bites back.'],
      ['Red cabbage slaw + olives', 110, '#6b3a5c', 'Shredded raw. The olives bring their own salt.'],
      ['Oil + masala', 10, '#8a6740', 'About 5 ml of oil. Masala is measured too — it counts.'],
    ],
    anchors: {
      prot: [0.36, 0.54, 0.22], grain: [0, 0.36, 0], veg: [0.5, 0.44, 0.3],
      veg2: [-0.42, 0.42, 0.1], top: [0.58, 0.48, -0.42], masala: [1.02, 0.34, 0.26],
    },
  },
  {
    id: 'fish',
    name: 'Chimichurri Fish Bowl',
    tag: 'PESCATARIAN',
    accent: { light: '#3f7a52', dark: '#7fc294' },
    swatch: '#4a6b2e',
    grainLabel: 'basmati rice',
    proteinLabel: 'chimichurri fish',
    cut:  { net: 580, grain: 140, prot: 150, p: 40, c: 48, f: 15, k: 500 },
    bulk: { net: 760, grain: 250, prot: 220, p: 58, c: 80, f: 22, k: 760 },
    items: [
      ['Grilled fish, chimichurri', 150, '#e8d4c0', 'Herb-crusted, pan-seared skin-off.'],
      ['Basmati rice', 140, '#eee9dc', 'Cooked weight, drained.'],
      ['Broccoli + carrot', 110, '#5d7f47', 'Steamed 4 minutes so it still bites back.'],
      ['Green peas', 60, '#6b8f4a', 'Blanched, not boiled — colour stays.'],
      ['Curd, low fat', 100, '#f4f1e6', 'Set overnight in the kitchen.'],
      ['Lemon + microgreens', 20, '#d4be62', 'Squeezed at the table, not before.'],
    ],
    anchors: {
      prot: [0.3, 0.5, 0.16], grain: [0, 0.36, 0], veg: [0.6, 0.34, -0.4],
      veg2: [-0.5, 0.36, 0.3], top: [0.6, 0.42, -0.4], masala: [1.02, 0.34, 0.26],
    },
  },
];

export const BOWL_BY_ID = BOWLS.reduce((acc, b) => { acc[b.id] = b; return acc; }, {});
