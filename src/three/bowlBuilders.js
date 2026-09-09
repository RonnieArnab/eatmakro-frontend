import * as THREE from 'three';
import { hash3 } from './helpers.js';
import {
  basmati, jeeraRice, millet, tikkaChunk, paneerCube, chickpeas, eggHalf,
  broccoli, carrot, beetSlice, capsicum, CAPSICUM_COLOURS, onionPetal,
  tomatoWedge, spinachLeaf, lemonWedge, curdDollop, makhaniDollop, corianderScatter,
  steakSlice, quinoaMound, sweetPotatoCube, slawRibbon, oliveBall, ramekinDip,
  fishFillet, lemonWheel, peaCluster, microgreenScatter,
} from './food.js';

/**
 * One builder per rotation. Each fills four named layers — grain, prot, veg,
 * top — which the scene explodes, restacks and swaps independently.
 */
export const BUILDERS = {
  tikka(L) {
    L.grain.add(basmati());
    for (let i = 0; i < 7; i++) {
      const s = tikkaChunk(i);
      const a = (i / 7) * 6.283 + 0.4;
      s.position.set(Math.cos(a) * 0.36, 0.5 + i * 0.012, Math.sin(a) * 0.36);
      s.rotation.y = -a + 0.3;
      L.prot.add(s);
    }
    for (let b = 0; b < 3; b++) {
      const br = broccoli(b * 1.7);
      const ba = -0.9 + b * 0.7;
      br.position.set(Math.cos(ba) * 0.62, 0.34, Math.sin(ba) * 0.62);
      br.scale.setScalar(0.9);
      L.veg.add(br);
    }
    for (let c = 0; c < 3; c++) {
      const car = carrot();
      car.position.set(-0.34 + c * 0.16, 0.4 + c * 0.05, -0.52);
      car.rotation.set(Math.PI / 2, 0.2 * c, 0.35 + c * 0.1);
      L.veg.add(car);
    }
    for (let t = 0; t < 3; t++) {
      const bs = beetSlice();
      bs.position.set(0.52 - t * 0.3, 0.4 + t * 0.05, 0.46 - t * 0.08);
      bs.rotation.set(1.25 + t * 0.18, 0.4 * t, 0.22);
      L.veg.add(bs);
    }
    const cd = curdDollop();
    cd.position.set(-0.62, 0.42, 0.18);
    L.top.add(cd, corianderScatter(30, 0.72, 0.5));
  },

  paneer(L) {
    L.grain.add(jeeraRice());
    for (let i = 0; i < 7; i++) {
      const s = paneerCube(i);
      const a = (i / 7) * 6.283 + 0.9;
      s.position.set(Math.cos(a) * 0.36, 0.5 + i * 0.012, Math.sin(a) * 0.36);
      s.rotation.y = -a + 0.3;
      s.rotation.z = (hash3(i, 3, 1) - 0.5) * 0.2;
      L.prot.add(s);
    }
    for (let c = 0; c < 5; c++) {
      const cap = capsicum(CAPSICUM_COLOURS[c]);
      const ca = (c / 5) * 6.283;
      cap.position.set(Math.cos(ca) * 0.58, 0.38 + c * 0.03, Math.sin(ca) * 0.58);
      cap.rotation.set(hash3(c, 1, 2) * 1.4, ca, hash3(c, 4, 1) * 0.8);
      L.veg.add(cap);
    }
    for (let o = 0; o < 3; o++) {
      const on = onionPetal();
      on.position.set(-0.3 + o * 0.3, 0.42 + o * 0.04, -0.42 + o * 0.1);
      on.rotation.set(1.1 + o * 0.3, o * 1.2, 0.3);
      L.veg.add(on);
    }
    const mk = makhaniDollop();
    mk.position.set(-0.6, 0.42, 0.2);
    mk.scale.setScalar(1.05);
    const cd = curdDollop();
    cd.position.set(0.46, 0.42, -0.44);
    cd.scale.setScalar(0.8);
    L.top.add(mk, cd, corianderScatter(34, 0.74, 0.52));
  },

  chana(L) {
    L.grain.add(millet());
    L.prot.add(chickpeas(46));
    for (let t = 0; t < 4; t++) {
      const bs = beetSlice();
      bs.position.set(0.56 - t * 0.32, 0.38 + t * 0.045, 0.44 - t * 0.22);
      bs.rotation.set(1.25 + t * 0.16, 0.4 * t, 0.22);
      L.veg.add(bs);
    }
    for (let s = 0; s < 4; s++) {
      const lf = spinachLeaf(s * 1.4);
      lf.position.set(Math.cos(s * 1.7) * 0.56, 0.36 + s * 0.03, Math.sin(s * 1.7) * 0.56);
      lf.rotation.z = (hash3(s, 2, 2) - 0.5) * 0.5;
      L.veg.add(lf);
    }
    for (let w = 0; w < 3; w++) {
      const tw = tomatoWedge();
      tw.position.set(-0.34 + w * 0.34, 0.44 + w * 0.03, -0.48);
      tw.rotation.set(1.2 + w * 0.25, w * 1.1, 0.25);
      L.top.add(tw);
    }
    L.top.add(corianderScatter(40, 0.76, 0.5));
  },

  egg(L) {
    L.grain.add(millet());
    for (let i = 0; i < 3; i++) {
      const e = eggHalf(i * 1.9);
      const a = (i / 3) * 6.283 + 0.5;
      e.position.set(Math.cos(a) * 0.36, 0.48, Math.sin(a) * 0.36);
      L.prot.add(e);
    }
    for (let s = 0; s < 5; s++) {
      const lf = spinachLeaf(s * 1.25);
      lf.position.set(Math.cos(s * 1.5) * 0.58, 0.36 + s * 0.025, Math.sin(s * 1.5) * 0.58);
      lf.rotation.z = (hash3(s, 3, 1) - 0.5) * 0.5;
      L.veg.add(lf);
    }
    for (let w = 0; w < 3; w++) {
      const tw = tomatoWedge();
      tw.position.set(-0.36 + w * 0.36, 0.44 + w * 0.03, -0.46);
      tw.rotation.set(1.2 + w * 0.25, w * 1.1, 0.25);
      L.veg.add(tw);
    }
    const cd = curdDollop();
    cd.position.set(-0.58, 0.42, 0.24);
    const lw = lemonWedge();
    lw.position.set(0.58, 0.42, 0.3);
    lw.rotation.set(1.5, 0.8, 0.4);
    L.top.add(cd, lw, corianderScatter(28, 0.7, 0.5));
  },

  /* Steak, quinoa, sweet potato, cabbage slaw and olives — the reference set
     of images across two different plates all sharing that composition. */
  steak(L) {
    L.grain.add(quinoaMound());
    for (let i = 0; i < 6; i++) {
      const s = steakSlice(i);
      const a = (i / 6) * 6.283 + 0.5;
      s.position.set(Math.cos(a) * 0.36, 0.48 + i * 0.012, Math.sin(a) * 0.36);
      s.rotation.y = -a + 0.25;
      L.prot.add(s);
    }
    for (let sp = 0; sp < 4; sp++) {
      const cube = sweetPotatoCube(sp);
      const a = -0.7 + sp * 0.5;
      cube.position.set(Math.cos(a) * 0.6, 0.36 + sp * 0.01, Math.sin(a) * 0.6);
      cube.rotation.y = hash3(sp, 2, 5) * 6.283;
      L.veg.add(cube);
    }
    for (let b = 0; b < 2; b++) {
      const br = broccoli(b * 2.1);
      br.position.set(-0.3 + b * 0.6, 0.34, -0.5);
      br.scale.setScalar(0.85);
      L.veg.add(br);
    }
    for (let r = 0; r < 8; r++) {
      const ribbon = slawRibbon(r);
      const a = hash3(r, 3, 9) * 6.283;
      const rr = 0.2 + hash3(r, 5, 1) * 0.24;
      ribbon.position.set(Math.cos(a) * rr - 0.42, 0.4 + hash3(r, 8, 2) * 0.05, Math.sin(a) * rr + 0.1);
      L.veg.add(ribbon);
    }
    for (let o = 0; o < 4; o++) {
      const ball = oliveBall();
      ball.position.set(-0.48 + o * 0.1, 0.44 + hash3(o, 4, 4) * 0.03, 0.5 - o * 0.02);
      L.top.add(ball);
    }
    const dip = ramekinDip();
    dip.position.set(0.58, 0.44, -0.42);
    L.top.add(dip, corianderScatter(18, 0.5, 0.5));
  },

  /* Herb-crusted fish, basmati, peas and a full lemon wheel — the fourth
     reference plate, chimichurri standing in for the site's usual masala. */
  fish(L) {
    L.grain.add(basmati());
    const fillet = fishFillet();
    fillet.position.set(0.3, 0.5, 0.16);
    fillet.rotation.y = 0.3;
    L.prot.add(fillet);
    for (let b = 0; b < 2; b++) {
      const br = broccoli(b * 1.6);
      br.position.set(Math.cos(-0.6 + b * 0.7) * 0.6, 0.34, Math.sin(-0.6 + b * 0.7) * 0.6);
      br.scale.setScalar(0.85);
      L.veg.add(br);
    }
    for (let c = 0; c < 3; c++) {
      const car = carrot();
      car.position.set(-0.3 + c * 0.16, 0.4 + c * 0.04, -0.5);
      car.rotation.set(Math.PI / 2, 0.2 * c, 0.3 + c * 0.1);
      L.veg.add(car);
    }
    const peas = peaCluster(50);
    peas.position.set(-0.5, 0.36, 0.3);
    L.veg.add(peas);
    const cd = curdDollop();
    cd.position.set(-0.6, 0.42, 0.16);
    cd.scale.setScalar(0.85);
    const lw = lemonWheel();
    lw.position.set(0.6, 0.42, -0.4);
    lw.rotation.x = -Math.PI / 2;
    L.top.add(cd, lw, microgreenScatter(24, 0.42, 0.5));
  },
};

/** Builds one rotation's contents into a group of four named layers. */
export function buildContents(id) {
  const g = new THREE.Group();
  const L = {};
  ['grain', 'prot', 'veg', 'top'].forEach((n) => {
    L[n] = new THREE.Group();
    g.add(L[n]);
  });
  BUILDERS[id](L);
  g.userData.L = L;
  return g;
}
