import React from 'react';
import { KITCHEN, DELIVERY_RADIUS_KM, AREAS } from '../data/site.js';

const VB = 320;                 // square viewBox
const CX = VB / 2, CY = VB / 2;
const PX_PER_KM = 26;            // fits the 4 km ring with margin for labels

const toXY = (km) => ({
  x: CX + (km.x - KITCHEN.x) * PX_PER_KM,
  y: CY - (km.y - KITCHEN.y) * PX_PER_KM,   // north is up: flip for SVG's y-down
});

/**
 * A locator map, not a road map: the kitchen at the centre, a 4 km ring
 * around it, and each area placed at its real compass direction and
 * roughly its real distance. It exists to make "we only deliver where a
 * rider can reach" checkable at a glance, not to navigate by.
 */
export function DeliveryMap() {
  const ringR = DELIVERY_RADIUS_KM * PX_PER_KM;
  const kitchen = toXY(KITCHEN);

  return (
    <div className="map-wrap">
      <svg viewBox={`0 0 ${VB} ${VB}`} role="img" aria-label="Map of the 4 kilometre delivery radius around the kitchen, with live and upcoming areas marked">
        {/* ring gauge: 1 km grid so the radius is legible, not just decorative */}
        {[1, 2, 3, 4].map((km) => (
          <circle
            key={km}
            cx={kitchen.x} cy={kitchen.y} r={km * PX_PER_KM}
            className={km === DELIVERY_RADIUS_KM ? 'map-ring map-ring-edge' : 'map-ring'}
          />
        ))}
        <line x1={kitchen.x} y1={kitchen.y} x2={kitchen.x} y2={kitchen.y - ringR} className="map-radial" />
        <text x={kitchen.x + 5} y={kitchen.y - ringR + 12} className="map-radial-label mono">4 km</text>

        {/* the kitchen: a small steel dabba glyph at the centre */}
        <g transform={`translate(${kitchen.x} ${kitchen.y})`}>
          <circle r="15" className="map-kitchen-halo" />
          <path
            d="M-8 2h16a2 2 0 012 2v1c0 5-4 9-10 9s-10-4-10-9v-1a2 2 0 012-2z"
            className="map-kitchen-body"
          />
          <rect x="-8" y="2" width="16" height="2.4" rx="1.2" className="map-kitchen-rim" />
        </g>
        <text x={kitchen.x} y={kitchen.y + 30} textAnchor="middle" className="map-kitchen-label mono">KITCHEN</text>

        {/* each delivery area, live or next */}
        {AREAS.map((a) => {
          const p = toXY(a);
          const dist = Math.hypot(a.x - KITCHEN.x, a.y - KITCHEN.y).toFixed(1);
          const above = p.y > CY;
          return (
            <g key={a.name} className={`map-area map-area-${a.state}`}>
              <circle cx={p.x} cy={p.y} r="6" className="map-dot" />
              {a.state === 'live' && <circle cx={p.x} cy={p.y} r="6" className="map-dot-pulse" />}
              <text
                x={p.x} y={above ? p.y + 20 : p.y - 12}
                textAnchor="middle" className="map-area-name"
              >
                {a.name}
              </text>
              <text
                x={p.x} y={above ? p.y + 33 : p.y - 25}
                textAnchor="middle" className="map-area-dist mono"
              >
                {dist} km
              </text>
            </g>
          );
        })}
      </svg>
      <div className="map-key">
        <span className="map-key-item"><i className="map-key-dot live" />Live</span>
        <span className="map-key-item"><i className="map-key-dot next" />Next</span>
        <span className="map-key-note mono">Approximate — not for turn-by-turn use</span>
      </div>
    </div>
  );
}
