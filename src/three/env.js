import * as THREE from 'three';

/**
 * Metal renders black without reflections, so the scene paints its own
 * equirectangular studio and runs it through PMREM. Softer than a photographic
 * HDRI on purpose: two broad strips rather than hard point sources, so the
 * steel has long calm highlights instead of glare.
 */
export function studioEnv(renderer) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.00, '#dfe6ec');
  g.addColorStop(0.30, '#a8b3bd');
  g.addColorStop(0.50, '#6c7883');
  g.addColorStop(0.68, '#3b434b');
  g.addColorStop(1.00, '#141a1f');      // a dark floor is what makes steel read
  x.fillStyle = g; x.fillRect(0, 0, 512, 256);
  x.fillStyle = '#f2f6f9';
  x.fillRect(38, 16, 152, 38);
  x.fillRect(298, 28, 104, 26);         // two soft strip lights
  x.fillStyle = 'rgba(26,31,36,0.7)';
  x.fillRect(216, 10, 50, 58);          // a gap for the highlight to break on
  x.fillStyle = 'rgba(214,180,142,0.34)';
  x.fillRect(190, 122, 130, 38);        // warm bounce, so food is not grey

  const tex = new THREE.CanvasTexture(c);
  // Without this the canvas values are read as linear, so the whole image
  // lights the scene about 1.8x too hard and every albedo washes to white.
  tex.encoding = THREE.sRGBEncoding;
  tex.mapping = THREE.EquirectangularReflectionMapping;
  const pm = new THREE.PMREMGenerator(renderer);
  pm.compileEquirectangularShader();
  const env = pm.fromEquirectangular(tex).texture;
  pm.dispose(); tex.dispose();
  return env;
}

/** Cheaper and softer than a real shadow map. */
export function contactShadow(radius = 2.2, opacity = 1) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(128, 128, 8, 128, 128, 126);
  g.addColorStop(0, 'rgba(12,17,22,0.55)');
  g.addColorStop(0.45, 'rgba(12,17,22,0.22)');
  g.addColorStop(1, 'rgba(12,17,22,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(radius * 2, radius * 2),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, opacity,
    }),
  );
  m.rotation.x = -Math.PI / 2;
  return m;
}

/** Four lights, a kitchen-studio rig held slightly below full so the muted
 *  food palette is not blown back up by exposure. */
export function kitchenRig(scene) {
  // Held deliberately low. The environment already supplies most of the
  // diffuse; adding a full-strength key on top is what greys food out.
  const hemi = new THREE.HemisphereLight(0xffffff, 0x66717c, 0.38);
  const key = new THREE.DirectionalLight(0xfff1dd, 1.45);
  key.position.set(3.2, 5.4, 2.6);
  const fill = new THREE.DirectionalLight(0xd8e6ff, 0.42);
  fill.position.set(-4, 1.6, 2.2);
  const rim = new THREE.DirectionalLight(0xffffff, 0.72);
  rim.position.set(-1.4, 2.2, -4.2);
  scene.add(hemi, key, fill, rim);
  return { hemi, key, fill, rim };
}
