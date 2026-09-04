/* float — imagens flutuando em loop: deriva horizontal + sobe/desce + giro leve. */
import { el } from "../../utils/dom.js";
import { rand } from "../utils.js";

export function createFloat({ stage, images, params }){
  const p = { count: 10, minSize: 54, maxSize: 150, drift: 46, bob: 24, spin: 10, speed: 1, ...params };
  const layer = el("div", "fx-layer fx-layer--float");
  const items = [];

  for (let i = 0; i < p.count; i++){
    const img = el("img", "fx-sprite");
    img.src = images[i % images.length];
    img.alt = "";
    img.decoding = "async";
    img.style.width = rand(p.minSize, p.maxSize).toFixed(0) + "px";
    img.style.left = rand(8, 92).toFixed(2) + "%";
    img.style.top  = rand(10, 90).toFixed(2) + "%";
    layer.appendChild(img);

    const depth = rand(0.45, 1.25);
    items.push({
      img,
      depth,
      driftPhase: Math.random() * Math.PI * 2,
      bobPhase:   Math.random() * Math.PI * 2,
      driftSpeed: rand(0.15, 0.4) * p.speed,
      bobSpeed:   rand(0.4, 0.95) * p.speed,
      spinSpeed:  rand(-p.spin, p.spin) * p.speed,
      rot:        rand(0, 360),
    });
  }
  stage.appendChild(layer);

  function tick(dt){
    const s = dt / 1000;
    for (const it of items){
      it.driftPhase += it.driftSpeed * s;
      it.bobPhase   += it.bobSpeed * s;
      it.rot        += it.spinSpeed * s;
      const dx = Math.cos(it.driftPhase) * p.drift * it.depth;
      const dy = Math.sin(it.bobPhase)   * p.bob   * it.depth;
      it.img.style.transform =
        `translate(-50%, -50%) translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) rotate(${it.rot.toFixed(2)}deg)`;
    }
  }

  function destroy(){ layer.remove(); items.length = 0; }

  return { name: "float", tick, destroy };
}
