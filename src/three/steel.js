import * as THREE from 'three';
import { FOOD } from './palette.js';

export function steelMat(dark) {
  return new THREE.MeshStandardMaterial({
    color: dark ? FOOD.steelDark : FOOD.steel, metalness: 0.95, roughness: 0.24,
  });
}

/** Lathe profile: flat base, curved wall, rolled rim, thin inner wall. The
 *  turned base ring is the detail that makes a dabba read as a dabba. */
export function steelBowl() {
  const V = THREE.Vector2;
  const p = [
    new V(0.00, 0.00), new V(0.72, 0.00), new V(0.90, 0.05), new V(1.02, 0.18),
    new V(1.10, 0.38), new V(1.15, 0.58), new V(1.19, 0.66), new V(1.15, 0.70),
    new V(1.10, 0.66), new V(1.05, 0.55), new V(0.96, 0.32), new V(0.84, 0.14),
    new V(0.66, 0.06), new V(0.00, 0.06),
  ];
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.70, 0.028, 10, 60), steelMat(true));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.02;
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.LatheGeometry(p, 72), steelMat()), ring);
  return g;
}

export function steelLid() {
  const V = THREE.Vector2;
  const p = [
    new V(0.00, 0.16), new V(0.52, 0.155), new V(0.90, 0.13), new V(1.10, 0.08),
    new V(1.20, 0.00), new V(1.16, -0.06), new V(1.06, -0.02), new V(0.86, 0.075),
    new V(0.50, 0.10), new V(0.00, 0.105),
  ];
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 14), steelMat(true));
  knob.scale.y = 0.72;
  knob.position.y = 0.19;
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.LatheGeometry(p, 72), steelMat()), knob);
  return g;
}
