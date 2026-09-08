/**
 * Bundles the React source into one self-contained HTML page for publishing
 * as a Claude Artifact, with no npm install and no bundler.
 *
 * Published artifacts run under a CSP that blocks every external resource
 * except scripts from cdnjs and stylesheets from Google Fonts — no images,
 * no media, no module graph, no fetch. So React, ReactDOM and three come from
 * cdnjs as UMD globals, JSX is transpiled in the browser by Babel Standalone,
 * and every source file is concatenated into one scope with its import and
 * export keywords stripped. Same components, same file boundaries, one file.
 *
 *   node scripts/build-artifact.mjs   ->  dist-artifact/eatmakro.html
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* Dependency order. Everything lands in one scope, so a file may only use
   names declared above it. */
const ORDER = [
  'src/three/helpers.js',
  'src/three/palette.js',
  'src/three/env.js',
  'src/three/steel.js',
  'src/three/food.js',
  'src/three/label.js',
  'src/three/bowlBuilders.js',
  'src/data/site.js',
  'src/data/bowls.js',
  'src/hooks/useReducedMotion.js',
  'src/hooks/useTheme.js',
  'src/hooks/useScrollProgress.js',
  'src/hooks/useSignups.js',
  'src/components/Logo.jsx',
  'src/components/ThemeToggle.jsx',
  'src/components/SocialLinks.jsx',
  'src/components/Marquee.jsx',
  'src/components/ScaleRail.jsx',
  'src/components/Loader.jsx',
  'src/components/Header.jsx',
  'src/components/Footer.jsx',
  'src/components/Hero.jsx',
  'src/components/BowlPicker.jsx',
  'src/components/SpecTable.jsx',
  'src/components/MacroTiles.jsx',
  'src/components/PortionSwitch.jsx',
  'src/components/PlanGrid.jsx',
  'src/components/DayTimeline.jsx',
  'src/components/DeliveryMap.jsx',
  'src/components/DeliveryAreas.jsx',
  'src/components/HoldSlot.jsx',
  'src/components/Annotations.jsx',
  'src/components/BowlScene.jsx',
  'src/pages/Home.jsx',
  'src/App.jsx',
];

const CDN = {
  react: 'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js',
  reactDom: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js',
  three: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  babel: 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.25.6/babel.min.js',
};

/** Strip module syntax: one scope, so imports resolve by declaration order. */
function flatten(source) {
  return source
    .replace(/^\s*import\s+[^;]*?;\s*$/gm, '')       // import ... from '...';
    .replace(/^\s*import\s+'[^']*';\s*$/gm, '')      // bare css import
    .replace(/^export\s+default\s+function\s/gm, 'function ')
    .replace(/^export\s+default\s+/gm, 'const __default = ')
    .replace(/^export\s+(const|let|function|class)\s/gm, '$1 ')
    .replace(/^export\s*\{[^}]*\};?\s*$/gm, '')
    .trimEnd();
}

const files = await Promise.all(
  ORDER.map(async (rel) => ({ rel, code: flatten(await readFile(resolve(ROOT, rel), 'utf8')) })),
);
const css = [
  await readFile(resolve(ROOT, 'src/styles/tokens.css'), 'utf8'),
  await readFile(resolve(ROOT, 'src/styles/global.css'), 'utf8'),
].join('\n');

const bundle = files.map((f) => `/* ===== ${f.rel} ${'='.repeat(Math.max(2, 66 - f.rel.length))} */\n${f.code}`).join('\n\n');

const html = `<title>EatMakro</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=DM+Mono:wght@400;500&display=swap">
<style>
${css}
#boot{position:fixed;inset:0;z-index:120;background:var(--paper);display:flex;
  flex-direction:column;justify-content:flex-end;padding:var(--gutter);gap:14px;
  transition:opacity .35s ease}
#boot.off{opacity:0;pointer-events:none}
#boot .bn{font-size:clamp(36px,7.6vw,84px);font-weight:800;letter-spacing:-.04em;line-height:.9}
#boot .bn em{font-style:normal;color:var(--accent)}
#boot .br{display:flex;justify-content:space-between;font-family:var(--font-scale);font-size:13px;
  color:var(--ink-60);border-top:1px solid var(--ink);padding-top:12px}
</style>

<div id="boot">
  <div class="bn">Eat<em>Makro</em></div>
  <div class="br"><span>Warming the kitchen</span><span class="mono">0 g</span></div>
</div>
<div id="root"></div>

<script src="${CDN.react}"></script>
<script src="${CDN.reactDom}"></script>
<script src="${CDN.three}"></script>
<script src="${CDN.babel}"></script>

<script type="text/babel" data-presets="react">
/* =============================================================================
   EatMakro — built from src/ by scripts/build-artifact.mjs. Do not edit here:
   edit the component under src/ and rebuild. The file boundaries below are the
   real ones from the React project.
   ========================================================================== */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

${bundle}

/* ===== mount ============================================================== */
const boot = document.getElementById('boot');
if (boot) { boot.classList.add('off'); setTimeout(() => boot.remove(), 400); }
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
</script>
`;

await mkdir(resolve(ROOT, 'dist-artifact'), { recursive: true });
await writeFile(resolve(ROOT, 'dist-artifact/eatmakro.html'), html, 'utf8');
console.log(`built dist-artifact/eatmakro.html — ${(html.length / 1024).toFixed(1)} KB from ${files.length} modules`);
