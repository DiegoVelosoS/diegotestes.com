/* Orquestrador da área de animações.
   - registra os efeitos disponíveis (REGISTRY);
   - troca de efeito pelos botões [data-fx-effect];
   - pausa/retoma pelo botão [data-fx-toggle];
   - liga o ticker só quando faz sentido (visível, aba ativa, não pausado);
   - respeita prefers-reduced-motion.

   Para adicionar um efeito novo: crie assets/scripts/animations/effects/<nome>.js
   exportando create<Nome>({ stage, images, params }) -> { name, tick, destroy },
   importe aqui e registre em REGISTRY. Adicione um botão data-fx-effect="<nome>". */
import { createTicker } from "./engine.js";
import { FX_CONFIG } from "./config.js";
import { createFloat } from "./effects/float.js";
import { createParallax } from "./effects/parallax.js";
import { createReveal } from "./effects/reveal.js";
import { createParticles } from "./effects/particles.js";

const REGISTRY = {
  float: createFloat,
  parallax: createParallax,
  reveal: createReveal,
  particles: createParticles,
};

export function initAnimations(root, config = FX_CONFIG){
  const stage = root.querySelector("[data-fx-stage]") || root;
  const ticker = createTicker();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let current = null;
  let unTick = null;
  let onScreen = true;
  let paused = reduced;

  function clearEffect(){
    if (unTick){ unTick(); unTick = null; }
    if (current && current.destroy) current.destroy();
    current = null;
  }

  function updateRunning(){
    const shouldRun = !paused && !document.hidden && onScreen && !!(current && current.tick);
    if (shouldRun && !ticker.running) ticker.start();
    else if (!shouldRun && ticker.running) ticker.stop();
  }

  function syncEffectButtons(name){
    root.querySelectorAll("[data-fx-effect]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.fxEffect === name));
    });
  }

  function setEffect(name){
    const factory = REGISTRY[name];
    if (!factory) return;
    clearEffect();
    stage.dataset.fxCurrent = name;
    current = factory({
      stage,
      images: config.images,
      params: (config.effects && config.effects[name]) || {},
    });
    if (current.tick) unTick = ticker.add(current.tick);
    syncEffectButtons(name);
    updateRunning();
  }

  function setPaused(next){
    paused = next;
    if (toggleBtn){
      toggleBtn.textContent = paused ? "Retomar" : "Pausar";
      toggleBtn.setAttribute("aria-pressed", String(paused));
    }
    updateRunning();
  }

  // --- controles -----------------------------------------------------------
  root.querySelectorAll("[data-fx-effect]").forEach((b) => {
    b.addEventListener("click", () => setEffect(b.dataset.fxEffect));
  });
  const toggleBtn = root.querySelector("[data-fx-toggle]");
  if (toggleBtn) toggleBtn.addEventListener("click", () => setPaused(!paused));

  // --- economia de recursos ---------------------------------------------------
  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    updateRunning();
  }, { threshold: 0.01 });
  io.observe(root);
  document.addEventListener("visibilitychange", updateRunning);

  // --- arranque -------------------------------------------------------------
  setPaused(paused);
  setEffect(config.defaultEffect || Object.keys(REGISTRY)[0]);

  return {
    setEffect,
    play(){ setPaused(false); },
    pause(){ setPaused(true); },
    destroy(){
      clearEffect();
      io.disconnect();
      document.removeEventListener("visibilitychange", updateRunning);
      ticker.stop();
    },
  };
}
