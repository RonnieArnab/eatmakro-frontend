import * as THREE from 'three';

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const ramp = (p, a, b) => clamp01((p - a) / (b - a));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Deterministic value noise, so food never looks machine-made. */
export function hash3(x, y, z) {
  const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

/** A box with its corners pushed out onto a sphere: the base shape for
 *  anything cut with a knife rather than grown. */
export function roundedBox(w, h, d, r, seg = 4) {
  r = Math.min(r, Math.min(w, h, d) / 2 - 0.001);
  const g = new THREE.BoxGeometry(w, h, d, seg, seg, seg);
  const pos = g.attributes.position;
  const v = new THREE.Vector3();
  const c = new THREE.Vector3();
  const hx = w / 2 - r, hy = h / 2 - r, hz = d / 2 - r;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    c.set(
      THREE.MathUtils.clamp(v.x, -hx, hx),
      THREE.MathUtils.clamp(v.y, -hy, hy),
      THREE.MathUtils.clamp(v.z, -hz, hz),
    );
    const dir = v.clone().sub(c);
    if (dir.lengthSq() > 1e-8) { dir.setLength(r); v.copy(c).add(dir); }
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

/** Organic vertex displacement. */
export function roughen(geo, amount, freq = 3) {
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n = hash3(v.x * freq, v.y * freq, v.z * freq) - 0.5;
    const l = v.length() || 1;
    v.multiplyScalar(1 + (n * amount) / l);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export function mat(color, roughness = 0.62, extra) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra });
}
