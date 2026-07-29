export const clamp = (v, lo = 0, hi = 999999) => Math.max(lo, Math.min(hi, v));

export const clampMoney = (v) => Math.round(Math.max(-999999999, Math.min(999999999, v)));

export const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

export const prependLogs = (newEntries, existing = []) =>
  [...newEntries.slice().reverse(), ...existing].slice(0, 100);
