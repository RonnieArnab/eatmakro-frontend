import React from 'react';

const CEIL = { p: 90, c: 120, f: 40, k: 900 };

export function MacroTiles({ bowl, size }) {
  const d = bowl[size];
  const tiles = [
    { key: 'p', cls: 'tile hot', value: `${d.p} g`, label: 'protein', pct: d.p / CEIL.p },
    { key: 'c', cls: 'tile', value: `${d.c} g`, label: 'carbs', pct: d.c / CEIL.c },
    { key: 'f', cls: 'tile fat', value: `${d.f} g`, label: 'fat', pct: d.f / CEIL.f },
    { key: 'k', cls: 'tile', value: String(d.k), label: 'kcal', pct: d.k / CEIL.k },
  ];
  return (
    <section className="sec" id="label">
      <div className="marker mono">{d.p} g</div>
      <h2>The label is the product.</h2>
      <p className="lede">
        A photo of a bowl tells you nothing. The lid carries the numbers the kitchen actually
        measured, printed after the box is sealed — not before it is cooked.
      </p>
      <div className="macros">
        {tiles.map((t) => (
          <div className={t.cls} key={t.key}>
            <b className="mono">{t.value}</b>
            <div className="k">{t.label}</div>
            <div className="bar"><i style={{ width: `${Math.min(100, t.pct * 100)}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="batch mono">
        WEIGHED HYD·0417 &nbsp;·&nbsp; {bowl.name.toUpperCase()} &nbsp;·&nbsp; NET {d.net} g &nbsp;·&nbsp; EAT WITHIN 6 h
      </div>
    </section>
  );
}
