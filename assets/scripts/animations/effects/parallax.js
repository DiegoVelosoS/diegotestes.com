/* parallax — camadas de imagem em profundidades diferentes que reagem
   ao movimento do mouse sobre o palco e ao scroll da página. */
import { el } from "../../utils/dom.js";
import { clamp, easeFactor } from "../utils.js";

export function createParallax({ stage, images, params }){
  const p = { layers: 5, depth: 30, scroll: 0.16, size: 190, blurFar: 2, ...params };
  const layer = el("div", "fx-layer fx-layer--parallax");
  const nodes = [];

  for (let i = 0; i < p.layers; i++){
    const img = el("img", "fx-sprite");
    img.src = images[i % images.length];
    img.alt = "";
    img.decoding = "async";
    const k = p.layers > 1 ? i / (p.layers - 1) : 1;      // 0 = fundo .. 1 = frente
    img.style.width  = (p.size * (0.55 + k * 0.9)).toFixed(0) + "px";
    img.style.left   = (12 + k * 68).toFixed(2) + "%";
    img.style.top    = (26 + (i % 2 ? 34 : -6)).toFixed(2) + "%";
    img.style.filter = `blur(${((1 - k) * p.blurFar).toFixed(1)}px) drop-shadow(0 12px 24px rgba(6,10,25,.4))`;
    img.style.opacity = (0.4 + k * 0.6).toFixed(2);
    img.style.zIndex  = String(i);
    layer.appendChild(img);
    nodes.push({ img, k, cx: 0, cy: 0 });
  }
  stage.appendChild(layer);

  let px = 0, py = 0;         // alvo do mouse, -1..1 relativo ao palco
  const onMove = (e) => {
    const r = stage.getBoundingClientRect();
    px = clamp(((e.clientX - r.left) / r.width  - 0.5) * 2, -1, 1);
    py = clamp(((e.clientY - r.top)  / r.height - 0.5) * 2, -1, 1);
  };
  const onLeave = () => { px = 0; py = 0; };
  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerleave", onLeave);

  let scrollAmt = 0;         // -1 (palco abaixo da viewport) .. 1 (acima)
  const onScroll = () => {
    const r = stage.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    scrollAmt = clamp(((vh - r.top) / (vh + r.height)) * 2 - 1, -1, 1);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function tick(dt){
    const ease = easeFactor(dt, 0.002);
    for (const n of nodes){
      const reach = n.k * 1.6 + 0.3;
      const gx = -px * p.depth * reach;
      const gy = -py * p.depth * reach + scrollAmt * p.scroll * 120 * (n.k + 0.2);
      n.cx += (gx - n.cx) * ease;
      n.cy += (gy - n.cy) * ease;
      n.img.style.transform =
        `translate(-50%, -50%) translate(${n.cx.toFixed(2)}px, ${n.cy.toFixed(2)}px)`;
    }
  }

  function destroy(){
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("scroll", onScroll);
    layer.remove();
    nodes.length = 0;
  }

  return { name: "parallax", tick, destroy };
}
