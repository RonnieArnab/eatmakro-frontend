import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The pre-launch list. Writes go to the artifact's document store; the page
 * only ever reads the size of the collection, never anybody's address.
 * Resolves to a disabled state wherever the store is unreachable.
 */
export function useSignups() {
  const store = useRef(null);
  const [held, setHeld] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stop = null;
    const claude = typeof window !== 'undefined' ? window.claude : null;
    if (!claude || typeof claude.use !== 'function') { setReady(true); return undefined; }
    claude.use('db').then((db) => {
      setReady(true);
      if (!db) return;
      store.current = db;
      stop = db.collection('signups').limit(1000).onSnapshot(
        (snap) => setHeld(snap.size),
        () => setHeld(null),
      );
    }).catch(() => setReady(true));
    return () => { if (stop) stop(); };
  }, []);

  const hold = useCallback(async (entry) => {
    if (!store.current) throw Object.assign(new Error('no store'), { code: 'unavailable' });
    await store.current.collection('signups').add({ ...entry, at: new Date().toISOString() });
  }, []);

  return { held, hold, ready, available: () => !!store.current };
}
