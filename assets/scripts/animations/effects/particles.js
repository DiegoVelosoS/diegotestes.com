/* particles — sprites gerados continuamente que sobem, balançam e somem.
   Usa um pool de <img> para não criar/destruir nós a cada partícula. */
import { el } from "../../utils/dom.js";
import { rand, pick } from "../utils.js";

export function createParticles({ stage, images, params }){
  const p = { rate: 1.6, life: 5200, size: [22, 60], rise: 130, sway: 42, spin: 70, max: 44, ...params };
  const layer = el("div", "fx-layer fx-layer--particles");
  stage.appendChild(layer);

  const pool = [];
  const live = [];
  let acc = 0;

  function obtain(){
    let pt = pool.pop();
    if (!pt){
      const img = el("img", "fx-sprite fx-particle");
      img.alt = "";
      img.decoding = "async";
      layer.appendChild(img);
      pt = { img };
    }
    return pt;
  }

  function spawn(){
    if (live.length >= p.max) return;
    const pt = obtain();
    pt.img.src = pick(images);
    pt.img.style.width = rand(p.size[0], p.size[1]).toFixed(0) + "px";
    pt.x = rand(6, 94);            // % da largura do palco
    pt.y = 108;                    // começa logo abaixo do palco
    pt.vy = rand(0.7, 1.3) * p.rise;   // px/s para cima
    pt.swayAmp = rand(0.3, 1);
    pt.swayPhase = Math.random() * Math.PI * 2;
    pt.swaySpeed = rand(0.5, 1.4);
    pt.rot = rand(0, 360);
    pt.vr = rand(-p.spin, p.spin);
    pt.age = 0;
    pt.life = p.life * rand(0.7, 1.2);
    pt.img.hidden = false;
    live.push(pt);
  }

  function release(idx){
    const pt = live[idx];
    pt.img.hidden = true;
    live.splice(idx, 1);
    pool.push(pt);
  }

  function tick(dt){
    const s = dt / 1000;
    acc += s * p.rate;
    while (acc >= 1){ spawn(); acc -= 1; }

    const h = stage.clientHeight || 1;
    for (let i = live.length - 1; i >= 0; i--){
      const pt = live[i];
      pt.age += dt;
      const t = pt.age / pt.life;
      if (t >= 1){ release(i); continue; }

      pt.y -= (pt.vy * s) / h * 100;
      pt.swayPhase += pt.swaySpeed * s;
      pt.rot += pt.vr * s;

      const dx = Math.sin(pt.swayPhase) * pt.swayAmp * p.sway;
      const fade = t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1;
      pt.img.style.left = pt.x.toFixed(2) + "%";
      pt.img.style.top  = pt.y.toFixed(2) + "%";
      pt.img.style.opacity = (fade * 0.9).toFixed(3);
      pt.img.style.transform =
        `translate(-50%, -50%) translate(${dx.toFixed(1)}px, 0) rotate(${pt.rot.toFixed(1)}deg)`;
    }
  }

  function destroy(){
    layer.remove();
    pool.length = 0;
    live.length = 0;
  }

  return { name: "particles", tick, destroy };
}
