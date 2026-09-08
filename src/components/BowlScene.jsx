import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BOWL_BY_ID } from '../data/bowls.js';
import { clamp01, ramp, lerp, ease, hash3, mat } from '../three/helpers.js';
import { studioEnv, contactShadow, kitchenRig } from '../three/env.js';
import { steelBowl, steelLid } from '../three/steel.js';
import { flake, steamRibbon } from '../three/food.js';
import { buildContents } from '../three/bowlBuilders.js';
import { labelTexture } from '../three/label.js';
import { Annotations } from './Annotations.jsx';

/* Camera keyframes are anchored to sections rather than raw page percent, so
   adding or editing a section never desynchronises the choreography. */
const CAMK = [
  { sel: null,        f: 0,    pos: [0.28, 2.30, 4.05],  tgt: [0, 0.44, 0] },
  { sel: '#choose',   f: 0.45, pos: [1.00, 2.05, 3.85],  tgt: [0, 0.50, 0] },
  { sel: '#box',      f: 0.26, pos: [0.00, 2.45, 5.85],  tgt: [0, 1.35, 0] },
  { sel: '#box',      f: 0.86, pos: [-0.45, 1.95, 4.55], tgt: [0, 0.68, 0] },
  { sel: '#label',    f: 0.50, pos: [1.95, 3.40, 2.55],  tgt: [0, 0.45, 0] },
  { sel: '#portions', f: 0.50, pos: [0.10, 1.75, 3.55],  tgt: [0, 0.50, 0] },
  { sel: '#plans',    f: 0.60, pos: [0.00, 2.05, 4.35],  tgt: [0, 0.80, 0] },
  { sel: '#where',    f: 0.50, pos: [-1.95, 1.75, 4.30], tgt: [0, 0.72, 0] },
  { sel: '#hold',     f: 0.95, pos: [0.35, 1.30, 6.25],  tgt: [0, 0.62, 0] },
];
const EXPLODE = {
  grain: [0, 0.52, 0], prot: [0.10, 1.24, 0.02],
  veg: [-0.14, 1.98, -0.04], top: [0.06, 2.62, 0.06],
};
const CHIP_OFFSET = [[-146, 4], [140, 10], [148, -16], [-150, 16], [138, -12], [-142, 18]];
const CHIP_LAYER = ['prot', 'grain', 'veg', 'veg', 'top', null];
const CHIP_ANCHOR = ['prot', 'grain', 'veg', 'veg2', 'top', 'masala'];

export function BowlScene({ bowlId, size, reduced, isDark, railRef, scroll }) {
  const stageRef = useRef(null);
  const hostRef = useRef(null);
  const chipRefs = useRef([]);
  const lineRefs = useRef([]);
  const S = useRef({ ready: false });
  const bowl = BOWL_BY_ID[bowlId];

  /* -------------------------------------------------------------- build */
  useEffect(() => {
    const stage = stageRef.current;
    const s = S.current;
    let raf = 0;

    try {
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.94;
      stage.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.environment = studioEnv(renderer);
      kitchenRig(scene);
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

      const meal = new THREE.Group();
      scene.add(meal);

      const shadow = new THREE.Group();
      shadow.add(contactShadow(2.4, 0.82));
      shadow.position.y = -0.01;
      const bowlLayer = new THREE.Group();
      bowlLayer.add(steelBowl());
      const lidLayer = new THREE.Group();
      lidLayer.add(steelLid());
      lidLayer.position.y = 0.70;
      const labelLayer = new THREE.Group();
      const labelMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.28, 0.8),
        new THREE.MeshStandardMaterial({
          map: labelTexture(bowl, size), roughness: 0.86, transparent: true, side: THREE.DoubleSide,
        }),
      );
      labelMesh.rotation.x = -Math.PI / 2;
      labelMesh.position.y = 0.88;
      labelLayer.add(labelMesh);
      meal.add(shadow, bowlLayer, lidLayer, labelLayer);

      const steam = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const rib = steamRibbon(i * 2.1);
        rib.position.set(-0.3 + i * 0.3, 0.55, -0.1 + i * 0.16);
        steam.add(rib);
      }
      meal.add(steam);

      const sprinkle = new THREE.InstancedMesh(flake(), mat(0x7d9660, 0.72, { transparent: true, opacity: 0 }), 90);
      sprinkle.visible = false;
      meal.add(sprinkle);

      const cache = {};
      const getContents = (id) => {
        if (!cache[id]) { cache[id] = buildContents(id); cache[id].visible = false; meal.add(cache[id]); }
        return cache[id];
      };
      const active = getContents(bowlId);
      active.visible = true;

      Object.assign(s, {
        ready: true, renderer, scene, camera, meal, shadow, bowlLayer, lidLayer,
        labelLayer, labelMesh, steam, sprinkle, cache, getContents,
        active, activeId: bowlId, size, outgoing: null, swapT: 1, p: 0, lastG: -1,
        rect: null, rectAge: 0, grainScale: 0.78, protScale: 1,
        dummy: new THREE.Object3D(), v3: new THREE.Vector3(),
        camK: CAMK.map((k) => ({ ...k, p: 0 })),
      });

      const measureCam = () => {
        const max = scroll.ref.current.max;
        let prev = 0;
        s.camK.forEach((k) => {
          let v = 0;
          if (k.sel) {
            const sec = scroll.ref.current.sections[k.sel];
            if (sec) v = clamp01((k.f * (sec.h + window.innerHeight) + sec.top - window.innerHeight) / max);
          }
          k.p = Math.max(v, prev + 0.004);
          prev = k.p;
        });
      };
      const resize = () => {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        s.rectAge = 0;
        measureCam();
      };
      resize();
      setTimeout(measureCam, 950);
      window.addEventListener('resize', resize);

      const sampleCam = (q) => {
        let i = 0;
        while (i < s.camK.length - 2 && q > s.camK[i + 1].p) i++;
        const a = s.camK[i], b = s.camK[i + 1];
        const t = ease(clamp01((q - a.p) / (b.p - a.p || 1)));
        return {
          pos: a.pos.map((v, j) => lerp(v, b.pos[j], t)),
          tgt: a.tgt.map((v, j) => lerp(v, b.tgt[j], t)),
        };
      };

      const t0 = performance.now();
      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (document.hidden) return;
        const t = (performance.now() - t0) / 1000;
        s.p += (scroll.ref.current.p - s.p) * 0.09;
        const p = s.p;

        const sBox = scroll.sectionProgress('#box');
        const sPlans = scroll.sectionProgress('#plans');
        const sHold = scroll.sectionProgress('#hold');
        const e = ease(ramp(sBox, 0.06, 0.34) * (1 - ramp(sBox, 0.6, 0.88)));
        const seal = ease(ramp(sPlans, 0.05, 0.55));
        const stick = ease(ramp(sPlans, 0.5, 0.9));
        const drift = ramp(sHold, 0.25, 0.85);

        /* --- bowl swap: old contents sink and shrink, new ones rise in --- */
        if (s.swapT < 1) s.swapT = Math.min(1, s.swapT + 0.022);
        const kOld = 1 - clamp01(s.swapT / 0.44);
        const kNew = ease(clamp01((s.swapT - 0.4) / 0.6));
        if (s.outgoing) {
          s.outgoing.visible = kOld > 0.01;
          s.outgoing.scale.setScalar(Math.max(0.001, kOld));
          s.outgoing.position.y = -0.55 * (1 - kOld);
          if (kOld <= 0.01) { s.outgoing.visible = false; s.outgoing = null; }
        }
        s.active.scale.setScalar(Math.max(0.001, kNew));
        s.active.position.y = -0.55 * (1 - kNew);

        /* --- explode / reassemble --- */
        const L = s.active.userData.L;
        Object.keys(EXPLODE).forEach((k) => {
          const v = EXPLODE[k];
          L[k].position.set(v[0] * e, v[1] * e, v[2] * e);
        });
        s.bowlLayer.position.y = -0.38 * e;

        /* --- portion: the model changes, not only the copy --- */
        const wantGrain = size === 'cut' ? 0.78 : 1.18;
        s.grainScale += (wantGrain - s.grainScale) * 0.1;
        L.grain.scale.set(s.grainScale, s.grainScale * 0.92, s.grainScale);
        const kids = L.prot.children;
        if (kids.length >= 5) {
          const want = size === 'cut' ? Math.ceil(kids.length * 0.57) : kids.length;
          kids.forEach((c, i) => {
            const target = i < want ? 1 : 0;
            c.userData.k = c.userData.k === undefined ? target : c.userData.k + (target - c.userData.k) * 0.12;
            const k = c.userData.k;
            c.scale.setScalar(Math.max(0.001, k));
            c.visible = k > 0.02;
            c.position.y = (c.userData.baseY = c.userData.baseY ?? c.position.y) + (1 - k) * 0.45;
          });
        } else {
          const wantP = size === 'cut' ? 0.88 : 1.2;
          s.protScale += (wantP - s.protScale) * 0.1;
          L.prot.scale.setScalar(s.protScale);
        }

        /* --- seal + label print --- */
        s.lidLayer.position.y = lerp(3.4, 0.7, seal);
        s.lidLayer.visible = seal > 0.002;
        s.lidLayer.rotation.y = (1 - seal) * 1.4;
        s.labelLayer.visible = stick > 0.01;
        s.labelMesh.scale.setScalar(Math.max(0.001, stick) * 0.86);
        s.labelMesh.position.y = lerp(1.35, 0.88, stick);

        /* --- steam, only while the box is open --- */
        const steamA = (1 - ramp(sBox, 0, 0.22)) * (1 - seal) * (1 - drift);
        s.steam.visible = steamA > 0.01;
        s.steam.children.forEach((rb, i) => {
          const ph = (t * 0.34 + i * 0.33) % 1;
          rb.material.opacity = 0.15 * steamA * Math.sin(ph * Math.PI);
          rb.scale.set(1, 0.5 + ph * 0.9, 1);
          rb.position.y = 0.55 + ph * 0.35;
          rb.rotation.y = t * 0.25 + i;
        });

        /* --- garnish burst during a swap --- */
        if (s.swapT < 1) {
          const sp = clamp01((s.swapT - 0.34) / 0.62);
          s.sprinkle.visible = sp > 0.01;
          s.sprinkle.material.opacity = 0.95 * (1 - ramp(sp, 0.78, 1));
          for (let i = 0; i < 90; i++) {
            const kk = ease(clamp01((sp - hash3(i, 5, 5) * 0.4) / 0.6));
            const a = hash3(i, 1, 3) * 6.2832;
            const rr = Math.sqrt(hash3(i, 4, 2)) * 0.78;
            s.dummy.position.set(Math.cos(a) * rr, lerp(2.9, 0.56 + hash3(i, 7, 1) * 0.08, kk), Math.sin(a) * rr);
            s.dummy.rotation.set(kk * 6 + a, a * 2, kk * 4);
            s.dummy.scale.setScalar(1);
            s.dummy.updateMatrix();
            s.sprinkle.setMatrixAt(i, s.dummy.matrix);
          }
          s.sprinkle.instanceMatrix.needsUpdate = true;
        } else if (s.sprinkle.visible) {
          s.sprinkle.visible = false;
        }

        /* --- root motion --- */
        const idle = reduced ? 0 : 1;
        const spin = s.swapT < 1 ? ease(s.swapT) * 6.2832 : 0;
        s.meal.rotation.y = -0.55 + p * 2.7 + spin + Math.sin(t * 0.55) * 0.04 * idle;
        s.meal.rotation.z = Math.sin(sBox * Math.PI) * 0.03;
        s.meal.position.y = Math.sin(t * 0.7) * 0.025 * idle + drift * 0.5;
        s.meal.scale.setScalar(1 - drift * 0.22);
        s.shadow.children[0].material.opacity = 0.82 * (1 - drift);
        s.shadow.position.y = -0.01 - s.meal.position.y * 0.9;

        const dolly = Math.min(2.2, Math.max(1, 1.16 / s.camera.aspect));
        const c = sampleCam(p);
        s.camera.position.set(c.pos[0] * dolly, c.tgt[1] + (c.pos[1] - c.tgt[1]) * dolly, c.pos[2] * dolly);
        s.camera.lookAt(c.tgt[0], c.tgt[1], c.tgt[2]);
        s.renderer.render(s.scene, s.camera);

        projectChips(ramp(sBox, 0.18, 0.3) * (1 - ramp(sBox, 0.56, 0.74)));
        updateRail(p);
      };

      const projectChips = (visRaw) => {
        const vis = (window.innerWidth < 901 || s.swapT < 1) ? 0 : visRaw;
        const chips = chipRefs.current, lines = lineRefs.current;
        if (!chips[0]) return;
        if (vis < 0.01) {
          if (chips[0].style.opacity !== '0') {
            chips.forEach((c, i) => { c.style.opacity = '0'; lines[i]?.setAttribute('d', ''); });
          }
          return;
        }
        if (--s.rectAge < 0) { s.rect = stage.getBoundingClientRect(); s.rectAge = 30; }
        const anchors = BOWL_BY_ID[s.activeId ?? bowlId].anchors;
        const L = s.active.userData.L;
        for (let i = 0; i < 6; i++) {
          if (!chips[i]) continue;
          const a = anchors[CHIP_ANCHOR[i]];
          s.v3.set(a[0], a[1], a[2]);
          const layerName = CHIP_LAYER[i];
          if (layerName) {
            s.v3.add(L[layerName].position).multiplyScalar(s.active.scale.x);
            s.v3.y += s.active.position.y;
          } else {
            s.v3.add(s.bowlLayer.position);
          }
          s.meal.localToWorld(s.v3);
          s.v3.project(s.camera);
          const ax = s.rect.left + (s.v3.x * 0.5 + 0.5) * s.rect.width;
          const ay = s.rect.top + (-s.v3.y * 0.5 + 0.5) * s.rect.height;
          const cx = ax + CHIP_OFFSET[i][0], cy = ay + CHIP_OFFSET[i][1];
          chips[i].style.transform = `translate(-50%,-50%) translate(${cx.toFixed(1)}px,${cy.toFixed(1)}px)`;
          chips[i].style.opacity = vis.toFixed(2);
          const mid = CHIP_OFFSET[i][0] > 0 ? cx - 46 : cx + 46;
          lines[i]?.setAttribute('d', `M${ax.toFixed(1)} ${ay.toFixed(1)}L${mid.toFixed(1)} ${cy.toFixed(1)}`);
          lines[i]?.setAttribute('opacity', vis.toFixed(2));
        }
      };

      const updateRail = (p) => {
        const node = railRef.current;
        if (!node) return;
        const g = Math.round(p * BOWL_BY_ID[s.activeId ?? bowlId][s.size ?? size].net);
        if (g !== s.lastG) { node.firstChild.textContent = String(g); s.lastG = g; }
        node.style.transform = `translateY(${(54 + p * (window.innerHeight - 108)).toFixed(0)}px)`;
      };

      frame();
      /* the other three rotations are built just after first paint, so the
         first frame is never held up by geometry nobody can see yet */
      const warm = setTimeout(() => {
        ['tikka', 'paneer', 'chana', 'egg'].forEach((id) => getContents(id));
      }, 450);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(warm);
        window.removeEventListener('resize', resize);
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        s.ready = false;
      };
    } catch (err) {
      // No WebGL, or a driver that refuses: the page must still read.
      console.error('EatMakro scene failed to start:', err);
      stage.style.display = 'none';
      document.querySelector('.main')?.classList.add('wide');
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------------------------------ react to props */
  useEffect(() => {
    const s = S.current;
    if (!s.ready || s.activeId === bowlId) return;
    const next = s.getContents(bowlId);
    if (next === s.active) { s.activeId = bowlId; return; }
    s.outgoing = s.active;
    s.active = next;
    s.active.visible = true;
    s.active.scale.setScalar(0.001);
    s.activeId = bowlId;
    s.swapT = 0;
  }, [bowlId]);

  useEffect(() => {
    const s = S.current;
    if (!s.ready) return;
    s.size = size;
    s.labelMesh.material.map.dispose();
    s.labelMesh.material.map = labelTexture(BOWL_BY_ID[bowlId], size);
    s.labelMesh.material.needsUpdate = true;
  }, [bowlId, size]);

  useEffect(() => {
    const s = S.current;
    if (s.ready) s.renderer.toneMappingExposure = isDark ? 0.84 : 0.94;
  }, [isDark]);

  return (
    <>
      <div className="stage" ref={stageRef} aria-hidden="true" />
      <Annotations hostRef={hostRef} chipRefs={chipRefs} lineRefs={lineRefs} items={bowl.items} />
    </>
  );
}
