import { useEffect, useRef } from 'react';

/**
 * Scroll progress through the document, plus the measured top and height of
 * any sections named by selector. Kept in a ref rather than state: this is
 * read every animation frame and must never trigger a React render.
 */
export function useScrollProgress(selectors) {
  const ref = useRef({ p: 0, max: 1, sections: {} });

  useEffect(() => {
    const state = ref.current;

    const measure = () => {
      state.max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const next = {};
      selectors.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const r = el.getBoundingClientRect();
        next[sel] = { top: r.top + window.scrollY, h: r.height };
      });
      state.sections = next;
    };
    const onScroll = () => { state.p = Math.min(1, Math.max(0, window.scrollY / state.max)); };

    const onResize = () => { measure(); onScroll(); };
    measure();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // late webfonts and images reflow the page under us
    const t = setTimeout(onResize, 900);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [selectors]);

  /** 0 when a section's top reaches the bottom of the viewport, 1 when its
   *  bottom leaves the top. Choreography keys off this, not raw page percent,
   *  so adding a section never desynchronises the animation. */
  const sectionProgress = (sel) => {
    const s = ref.current.sections[sel];
    if (!s) return 0;
    const v = (window.scrollY + window.innerHeight - s.top) / (s.h + window.innerHeight);
    return v < 0 ? 0 : v > 1 ? 1 : v;
  };

  return { ref, sectionProgress };
}
