/* reveal — grade de imagens que surge (fade/slide/zoom) quando entra na
   viewport. Sem tick: usa IntersectionObserver + transições CSS.
   variant: "fade" | "slide" | "zoom" (classe no data-variant do layer). */
import { el } from "../../utils/dom.js";

export function createReveal({ stage, images, params }){
  const p = { variant: "zoom", tiles: 9, stagger: 90, ...params };
  const layer = el("div", "fx-layer fx-layer--reveal");
  layer.dataset.variant = p.variant;
  const cells = [];

  for (let i = 0; i < p.tiles; i++){
    const cell = el("div", "fx-reveal-cell");
    cell.style.transitionDelay = (i % 6) * p.stagger + "ms";
    const img = el("img", "fx-sprite");
    img.src = images[i % images.length];
    img.alt = "";
    img.decoding = "async";
    cell.appendChild(img);
    layer.appendChild(cell);
    cells.push(cell);
  }
  stage.appendChild(layer);

  const io = new IntersectionObserver((entries) => {
    for (const en of entries) en.target.classList.toggle("is-in", en.isIntersecting);
  }, { threshold: 0.35 });
  cells.forEach((c) => io.observe(c));

  function destroy(){
    io.disconnect();
    layer.remove();
    cells.length = 0;
  }

  return { name: "reveal", tick: null, destroy };
}
