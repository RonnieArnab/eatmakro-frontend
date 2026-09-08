import * as THREE from 'three';

/**
 * The printed macro sticker, drawn to a canvas and used as a texture.
 * Regenerated whenever the bowl or the portion changes — the label is the
 * product, so it can never be a generic decal.
 */
export function labelTexture(bowl, size) {
  const d = bowl[size];
  const c = document.createElement('canvas');
  c.width = 640; c.height = 400;
  const x = c.getContext('2d');

  x.fillStyle = '#f4f4f0'; x.fillRect(0, 0, 640, 400);
  x.fillStyle = bowl.accent.light; x.fillRect(0, 0, 640, 96);
  x.fillStyle = '#f4f4f0';
  x.font = '700 42px Helvetica, Arial, sans-serif';
  x.fillText(bowl.name.toUpperCase(), 28, 50);
  x.font = '500 20px Helvetica, Arial, sans-serif';
  x.fillText('EATMAKRO · HYDERABAD', 28, 80);
  x.textAlign = 'right';
  x.fillText(`${size.toUpperCase()} · ${bowl.tag}`, 612, 80);
  x.textAlign = 'left';

  x.fillStyle = '#111a20';
  x.font = '700 118px Helvetica, Arial, sans-serif';
  x.fillText(String(d.p), 28, 224);
  const w = x.measureText(String(d.p)).width;
  x.font = '500 29px Helvetica, Arial, sans-serif';
  x.fillText('g protein', 28 + w + 14, 224);

  const rows = [
    ['Carbs', d.c, 120, ' g', '#4a6f52'],
    ['Fat', d.f, 40, ' g', '#a97a3d'],
    ['Energy', d.k, 900, ' kcal', '#111a20'],
  ];
  x.font = '500 22px Helvetica, Arial, sans-serif';
  rows.forEach((row, i) => {
    const y = 272 + i * 36;
    x.fillStyle = '#111a20';
    x.fillText(row[0], 28, y);
    x.fillText(row[1] + row[3], 466, y);
    x.fillStyle = 'rgba(17,26,32,0.12)';
    x.fillRect(136, y - 17, 300, 18);
    x.fillStyle = row[4];
    x.fillRect(136, y - 17, Math.min(300, (row[1] / row[2]) * 300), 18);
  });

  x.fillStyle = '#111a20'; x.fillRect(0, 372, 640, 28);
  x.fillStyle = '#f4f4f0';
  x.font = '500 16px Helvetica, Arial, sans-serif';
  x.fillText(`WEIGHED HYD·0417   ·   NET ${d.net} g   ·   EAT WITHIN 6 h`, 28, 392);

  const tex = new THREE.CanvasTexture(c);
  tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = 8;
  return tex;
}
