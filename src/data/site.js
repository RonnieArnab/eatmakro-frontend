/**
 * Site-wide content. Prices, zones and plan lengths come from the 06 Sep
 * meeting (₹200–250 band, discounts on 10/20/30-day plans).
 */

/* TODO before launch: these handles are the conventional ones for the name,
   but nobody has claimed them yet. Confirm each account exists and belongs to
   EatMakro before this ships — an unclaimed handle may be someone else's. */
export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', handle: '@eatmakro', url: 'https://instagram.com/eatmakro' },
  { id: 'whatsapp', label: 'WhatsApp', handle: 'Order line', url: 'https://wa.me/' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'EatMakro', url: 'https://linkedin.com/company/eatmakro' },
  { id: 'youtube', label: 'YouTube', handle: 'Kitchen camera', url: 'https://youtube.com/@eatmakro' },
  { id: 'email', label: 'Email', handle: 'hello@eatmakro.in', url: 'mailto:hello@eatmakro.in' },
];

export const PLANS = [
  { id: 'trial', rate: 280, length: 'Trial · 3 days', total: '₹840', pick: false },
  { id: '10day', rate: 250, length: '10-day plan', total: '₹2,500', pick: false },
  { id: '20day', rate: 230, length: '20-day plan', total: '₹4,600', pick: true },
  { id: '30day', rate: 210, length: '30-day plan', total: '₹6,300', pick: false },
];

/**
 * Kitchen at the origin; each area's position is kilometres east (x) and
 * north (y) of it — real relative directions (Gachibowli west, Madhapur
 * northeast, Kondapur north, Financial District southwest), distances
 * chosen so the three live zones sit inside the 4 km radius and the two
 * "next" zones sit just outside it. Illustrative, not turn-by-turn GPS.
 */
export const KITCHEN = { x: 0, y: 0 };
export const DELIVERY_RADIUS_KM = 4;
export const AREAS = [
  { name: 'Gachibowli', state: 'live', x: -0.8, y: -0.3 },
  { name: 'Hitech City', state: 'live', x: 1.6, y: 0.4 },
  { name: 'Madhapur', state: 'live', x: 3.0, y: 1.3 },
  { name: 'Kondapur', state: 'next', x: 0.9, y: 3.95 },
  { name: 'Financial District', state: 'next', x: -3.3, y: -3.4 },
];

export const NAV = [
  { href: '#choose', label: 'bowls' },
  { href: '#box', label: 'the box' },
  { href: '#portions', label: 'portions' },
  { href: '#plans', label: 'plans' },
];

/**
 * The kitchen's own morning, ending exactly at the hero's desk-drop window.
 * The plating time (45–60 s a box, two stations) and the cut/bulk rider
 * split are both from the 06 Sep meeting log; the rest are the kitchen's
 * own round clock times, not independently verified.
 */
export const DAY_TIMELINE = [
  { time: '5:30', label: 'Marinade checked', body: 'Chicken has sat in curd overnight. The kitchen opens by tasting it, not by turning on a stove.' },
  { time: '9:00', label: 'First batch on the pan', body: 'Pan-fried, not air-fried — it holds up better across a whole morning’s batches.' },
  { time: '11:00', label: 'Weigh & plate', body: 'The bottleneck, on purpose: 45–60 seconds a box, two stations, nothing scooped by eye.' },
  { time: '11:40', label: 'Seal & label print', body: 'The lid goes on, then the sticker — printed after the box is weighed, never before.' },
  { time: '12:00', label: 'Riders split cut / bulk', body: 'One rider carries one portion size, so a mixed order never gets sorted on a doorstep.' },
  { time: '12:30–1:15', label: 'Desk drop', body: 'Only inside the zones a rider can reach while the box is still at its best.' },
];

export const MARQUEE = [
  'WEIGHED, NOT GUESSED', '4 BOWLS', 'KITCHEN ON CAMERA', 'PRINTED MACROS',
  'RETURNABLE STEEL', '5 ml OIL', '70 BOXES A DAY', 'DIRECT ONLY',
];
