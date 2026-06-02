// Round-robin from `pool` into `items` every `interval` positions.
// Deterministic by position — same inputs produce the same output, so SSR
// and client renders agree. Position 0 is always an item; the last position
// is never an ad (the i+1 < items.length guard).
export function interleave<A, S>(
  items: ReadonlyArray<A>,
  pool: ReadonlyArray<S>,
  interval: number,
): ReadonlyArray<A | S> {
  if (pool.length === 0 || items.length === 0 || interval <= 0) return items;
  const result: Array<A | S> = [];
  let adIndex = 0;
  for (let i = 0; i < items.length; i++) {
    result.push(items[i]);
    if ((i + 1) % interval === 0 && i + 1 < items.length) {
      result.push(pool[adIndex % pool.length]);
      adIndex++;
    }
  }
  return result;
}
