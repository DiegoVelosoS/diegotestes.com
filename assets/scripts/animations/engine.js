/* Ticker único de requestAnimationFrame.
   Cada efeito registra uma função tick(dt, now); o orquestrador liga/desliga. */
export function createTicker(){
  let running = false;
  let last = 0;
  let raf = 0;
  const subs = new Set();

  function frame(now){
    if (!running) return;
    const dt = last ? Math.min(now - last, 64) : 16; // clamp p/ abas que voltam do background
    last = now;
    for (const fn of subs) fn(dt, now);
    raf = requestAnimationFrame(frame);
  }

  return {
    add(fn){ subs.add(fn); return () => subs.delete(fn); },
    start(){
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    },
    stop(){
      running = false;
      if (raf){ cancelAnimationFrame(raf); raf = 0; }
    },
    get running(){ return running; },
  };
}
