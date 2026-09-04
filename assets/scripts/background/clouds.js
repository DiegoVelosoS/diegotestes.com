/* Camada de nuvens (Lottie) atrás do conteúdo, alinhada ao gradiente de
   céu do body (ver assets/styles/base.css). Pausa se a aba estiver oculta
   ou se o usuário preferir menos animação. */
const LOTTIE_CDN = "https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/esm/lottie_light.min.js";
const DATA_PATH = "assets/lottie/clouds-bg.json";

export async function initCloudsBackground(container){
  if (!container) return null;

  const { default: lottie } = await import(/* @vite-ignore */ LOTTIE_CDN);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const anim = lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: !reduceMotion,
    path: DATA_PATH,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  });

  if (reduceMotion) anim.goToAndStop(0, true);

  const onVisibility = () => {
    if (document.hidden) anim.pause();
    else if (!reduceMotion) anim.play();
  };
  document.addEventListener("visibilitychange", onVisibility);

  return anim;
}
