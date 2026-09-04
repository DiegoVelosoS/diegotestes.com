/* Helpers numéricos compartilhados pelos efeitos. */
export const rand  = (min, max) => min + Math.random() * (max - min);
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const pick  = (arr) => arr[(Math.random() * arr.length) | 0];

/* Interpolação independente de frame-rate: fração a aplicar neste dt (ms)
   para um decaimento com "meia-vida" ~= -1/log2(keep) frames a 60fps. */
export const easeFactor = (dt, keepPerSecond = 0.001) => 1 - Math.pow(keepPerSecond, dt / 1000);
