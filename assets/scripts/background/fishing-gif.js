/* Remove o verde do gif via chroma key: o <img> animado (visível mas
   com opacity:0, ver fishing-gif.css) serve de fonte de frames,
   redesenhados continuamente num canvas que zera o alpha dos pixels
   esverdeados. O canvas é renderizado numa resolução menor que o gif
   original para manter o custo por frame baixo. Em
   prefers-reduced-motion a animação para no primeiro frame já tratado.
   O gif original tem uma borda preta de uns 4px no topo e na base
   (artefato do vídeo de origem) que não pode ser removida pelo chroma
   key — é a mesma cor do silhueta do pescador — então é cortada na
   hora de desenhar. */
export function initFishingGif(root){
  if (!root) return null;
  const img = root.querySelector("img");
  const canvas = root.querySelector("canvas");
  if (!img || !canvas) return null;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RENDER_WIDTH = 400;
  const BORDER_CROP_RATIO = 0.012;
  let raf = 0;
  let cropY = 0;
  let sourceHeight = 0;

  function isGreenish(r, g, b){
    return g > 80 && g > r * 1.15 && g > b * 1.15;
  }

  function drawFrame(){
    ctx.drawImage(
      img,
      0, cropY, img.naturalWidth, sourceHeight,
      0, 0, canvas.width, canvas.height
    );
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = frame.data;
    for (let i = 0; i < data.length; i += 4){
      if (isGreenish(data[i], data[i + 1], data[i + 2])) data[i + 3] = 0;
    }
    ctx.putImageData(frame, 0, 0);
  }

  function loop(){
    drawFrame();
    if (!reduceMotion) raf = requestAnimationFrame(loop);
  }

  function onLoad(){
    cropY = Math.round(img.naturalHeight * BORDER_CROP_RATIO);
    sourceHeight = img.naturalHeight - cropY * 2;
    canvas.width = RENDER_WIDTH;
    canvas.height = Math.round(RENDER_WIDTH * (sourceHeight / img.naturalWidth));
    loop();
  }

  if (img.complete && img.naturalWidth) onLoad();
  else img.addEventListener("load", onLoad, { once: true });

  return {
    destroy(){
      if (raf) cancelAnimationFrame(raf);
    },
  };
}
