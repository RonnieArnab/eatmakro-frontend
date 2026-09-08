import * as THREE from 'three';
import { FOOD } from './palette.js';
import { roundedBox, roughen, mat, hash3 } from './helpers.js';

/* ------------------------------------------------------------------ grains */

export function grainMound({ count, color, r = 0.038, sx = 1.9, sy = 0.85, sz = 0.85 }) {
  const geo = new THREE.SphereGeometry(r, 7, 5);
  geo.scale(sx, sy, sz);
  const m = new THREE.InstancedMesh(geo, mat(color, 0.74), count);
  const d = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    const a = hash3(i, 1.3, 7.7) * Math.PI * 2;
    const rr = Math.sqrt(hash3(i, 4.1, 2.2)) * 0.8;
    d.position.set(
      Math.cos(a) * rr,
      0.22 * (1 - rr / 0.8) * (0.5 + hash3(i, 9.9, 0.4)),
      Math.sin(a) * rr,
    );
    d.rotation.set(hash3(i, 2, 5) * Math.PI, hash3(i, 5, 2) * Math.PI, hash3(i, 8, 3) * Math.PI);
    d.scale.setScalar(0.82 + hash3(i, 3, 3) * 0.4);
    d.updateMatrix();
    m.setMatrixAt(i, d.matrix);
  }
  m.instanceMatrix.needsUpdate = true;
  return m;
}

export const basmati = () => grainMound({ count: 460, color: FOOD.rice });
export const millet = () =>
  grainMound({ count: 520, color: FOOD.millet, r: 0.033, sx: 1.15, sy: 1, sz: 1 });

export function jeeraRice() {
  const g = new THREE.Group();
  g.add(grainMound({ count: 420, color: FOOD.jeeraRice }));
  g.add(grainMound({ count: 46, color: FOOD.cumin, r: 0.026, sx: 1.7, sy: 0.9, sz: 0.9 }));
  return g;
}

/* ---------------------------------------------------------------- proteins */

let charMat = null;
export function tikkaChunk(seed = 0) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(roughen(roundedBox(0.31, 0.27, 0.31, 0.09, 5), 0.05, 5 + seed), mat(FOOD.tikka, 0.6)));
  charMat = charMat || mat(FOOD.tikkaChar, 0.74);
  for (let i = 0; i < 3; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.055 + hash3(i, seed, 2) * 0.03, 7, 5), charMat);
    const a = hash3(i, seed, 4) * 6.283;
    s.position.set(Math.cos(a) * 0.1, 0.12 + hash3(i, 1, seed) * 0.02, Math.sin(a) * 0.1);
    s.scale.y = 0.45;
    g.add(s);
  }
  return g;
}

let searMat = null;
export function paneerCube(seed = 0) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(roundedBox(0.3, 0.25, 0.3, 0.045, 4), mat(FOOD.paneer, 0.7)));
  searMat = searMat || mat(FOOD.paneerSear, 0.58);
  for (let i = 0; i < 2; i++) {
    const bar = new THREE.Mesh(roundedBox(0.28, 0.02, 0.045, 0.01, 2), searMat);
    bar.position.set(0, 0.126, -0.06 + i * 0.12);
    g.add(bar);
  }
  return g;
}

export function chickpeas(n) {
  const geo = roughen(new THREE.SphereGeometry(0.082, 9, 7), 0.05, 9);
  geo.scale(1, 0.9, 1);
  const m = new THREE.InstancedMesh(geo, mat(FOOD.chickpea, 0.58), n);
  const d = new THREE.Object3D();
  for (let i = 0; i < n; i++) {
    const a = hash3(i, 2.7, 1.1) * 6.283;
    const rr = Math.sqrt(hash3(i, 5.5, 3.3)) * 0.62;
    d.position.set(Math.cos(a) * rr, 0.1 + hash3(i, 7, 2) * 0.13, Math.sin(a) * rr);
    d.rotation.set(hash3(i, 1, 9) * 3.14, hash3(i, 4, 6) * 3.14, hash3(i, 6, 4) * 3.14);
    d.scale.setScalar(0.85 + hash3(i, 8, 8) * 0.35);
    d.updateMatrix();
    m.setMatrixAt(i, d.matrix);
  }
  m.instanceMatrix.needsUpdate = true;
  return m;
}

export function eggHalf(seed = 0) {
  const g = new THREE.Group();
  const white = new THREE.Mesh(new THREE.SphereGeometry(0.22, 18, 12), mat(FOOD.eggWhite, 0.48));
  white.scale.set(1, 0.74, 1);
  const yolk = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 10), mat(FOOD.eggYolk, 0.56));
  yolk.scale.set(1, 0.42, 1);
  yolk.position.y = 0.145;
  g.add(white, yolk);
  g.rotation.y = seed;
  return g;
}

/* -------------------------------------------------------------- vegetables */

export function broccoli(seed = 0) {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.085, 0.3, 10), mat(FOOD.stem, 0.8));
  stem.position.y = 0.15;
  g.add(stem);
  const head = mat(FOOD.broccoli, 0.9, { flatShading: true });
  const deep = mat(FOOD.broccoliDeep, 0.94, { flatShading: true });
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * 6.283 + seed;
    const r = i === 0 ? 0 : 0.115;
    const blob = new THREE.Mesh(
      roughen(new THREE.IcosahedronGeometry(0.115 + hash3(i, seed, 1) * 0.05, 1), 0.05, 6),
      i % 3 === 0 ? deep : head,
    );
    blob.position.set(Math.cos(a) * r, 0.31 + hash3(i, 2, seed) * 0.07, Math.sin(a) * r);
    g.add(blob);
  }
  return g;
}

export const carrot = () =>
  new THREE.Mesh(roughen(new THREE.CylinderGeometry(0.055, 0.075, 0.46, 8), 0.018, 8), mat(FOOD.carrot, 0.64));

export function beetSlice() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.055, 22), mat(FOOD.beetBody, 0.46)));
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.145, 0.058, 22), mat(FOOD.beetFace, 0.42)));
  return g;
}

/** Capsicum, onion and tomato are all cuts of the same sphere. */
function shell(color, r, thin, rough = 0.36) {
  const geo = new THREE.SphereGeometry(r, 14, 9, 0, Math.PI * 0.62, 0, Math.PI * 0.52);
  const m = new THREE.Mesh(geo, mat(color, rough, { side: THREE.DoubleSide }));
  m.scale.y = thin;
  return m;
}
export const capsicum = (c) => shell(c, 0.21, 0.5, 0.32);
export const onionPetal = () => shell(FOOD.onion, 0.19, 0.42, 0.42);
export const tomatoWedge = () => shell(FOOD.tomato, 0.19, 0.62, 0.3);
export const CAPSICUM_COLOURS = [FOOD.capGreen, FOOD.capRed, FOOD.capYellow, FOOD.capGreen, FOOD.capRed];

export function spinachLeaf(seed = 0) {
  const geo = roughen(new THREE.SphereGeometry(0.2, 12, 8), 0.09, 7);
  geo.scale(1.35, 0.1, 0.9);
  const m = new THREE.Mesh(geo, mat(FOOD.spinach, 0.84, { side: THREE.DoubleSide }));
  m.rotation.y = seed;
  return m;
}

export function lemonWedge() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.075, 14, 1, false, 0, Math.PI * 0.55), mat(FOOD.lemon, 0.48)));
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.168, 0.168, 0.062, 14, 1, true, 0, Math.PI * 0.55), mat(0xb9a44a, 0.62, { side: THREE.DoubleSide })));
  return g;
}

export function curdDollop(color = FOOD.curd) {
  const m = new THREE.Mesh(roughen(new THREE.SphereGeometry(0.26, 18, 12), 0.05, 4), mat(color, 0.44));
  m.scale.y = 0.5;
  return m;
}
export const makhaniDollop = () => curdDollop(FOOD.makhani);

/* ----------------------------------------------- garnish, steam, particles */

let flakeGeo = null;
export function flake() {
  flakeGeo = flakeGeo || roundedBox(0.055, 0.012, 0.038, 0.005, 2);
  return flakeGeo;
}

export function corianderScatter(n, radius, y) {
  const m = new THREE.InstancedMesh(flake(), mat(FOOD.coriander, 0.72), n);
  const d = new THREE.Object3D();
  for (let i = 0; i < n; i++) {
    const a = hash3(i, 3.3, 8.8) * 6.283;
    const rr = Math.sqrt(hash3(i, 6.6, 1.1)) * radius;
    d.position.set(Math.cos(a) * rr, y + hash3(i, 2, 2) * 0.05, Math.sin(a) * rr);
    d.rotation.set(hash3(i, 9, 1) * 1.2, hash3(i, 1, 7) * 6.283, hash3(i, 5, 5) * 1.2);
    d.updateMatrix();
    m.setMatrixAt(i, d.matrix);
  }
  m.instanceMatrix.needsUpdate = true;
  return m;
}

/** A wavy tube that drifts and fades: steam above food that is still hot. */
export function steamRibbon(seed = 0) {
  const pts = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    pts.push(new THREE.Vector3(
      Math.sin(t * 4 + seed) * 0.18 * t,
      t * 1.5,
      Math.cos(t * 3.4 + seed * 1.7) * 0.16 * t,
    ));
  }
  return new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 22, 0.028, 5, false),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, depthWrite: false }),
  );
}
