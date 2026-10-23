/* Ao clicar numa carta: um clone voa até o portal do vídeo de fundo, inclina,
   encolhe e some — só então o link é aberto. */

// posição da porta dentro do quadro do vídeo (fração da largura/altura)
const PORTAL = { x: 0.49, y: 0.38 };
const DURATION = 600;
// tempo máximo para o vídeo da carta chegar ao fim depois do clique
const VIDEO_RUSH = 0.6;
// duração do fade do modo organizado (máx. 0,6 s)
const FADE_DURATION = 600;

let busy = false;

export function bindPortalEntry(card){
  card.addEventListener("click", (e) => {
    // ctrl/cmd/shift/botão do meio mantêm o comportamento padrão do link
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    if (busy) return;
    busy = true;
    const run = document.body.classList.contains("layout-org") ? fadeOut : enterPortal;
    run(card).finally(() => { busy = false; });
  });
}

async function enterPortal(card){
  const rect = card.getBoundingClientRect();
  const target = portalPoint();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = target.x - cx;
  const dy = target.y - cy;

  // clone solto no <body>, sem o 3D do deck, no mesmo lugar da carta
  const w = card.offsetWidth;
  const ghost = card.cloneNode(true);
  ghost.classList.add("portal-ghost");
  // nomes da transição de layout são únicos por carta/arte
  ghost.style.viewTransitionName = "none";
  const ghostArt = ghost.querySelector(".art");
  if (ghostArt) ghostArt.style.viewTransitionName = "none";
  ghost.removeAttribute("href");
  ghost.style.setProperty("--cw", w + "px");
  ghost.style.left = (cx - w / 2) + "px";
  ghost.style.top = (cy - card.offsetHeight / 2) + "px";
  document.body.appendChild(ghost);
  card.classList.add("portal-gone");
  rushVideo(card.querySelector(".hover-video"), ghost.querySelector(".hover-video"));

  const rot = getComputedStyle(card).getPropertyValue("--rot").trim() || "0deg";
  const t = (k, extra) => `perspective(900px) translate(${dx * k}px, ${dy * k}px) ${extra}`;
  const flight = ghost.animate([
    { transform: t(0,    `rotate(${rot}) rotateX(0deg) scale(1)`), filter: "brightness(1)", opacity: 1 },
    { transform: t(0.3,  `translateY(-6vh) rotate(-6deg) rotateX(18deg) scale(.82)`), filter: "brightness(1.05)", opacity: 1, offset: .35 },
    { transform: t(0.85, `rotate(4deg) rotateX(58deg) scale(.32)`), filter: "brightness(1.6) saturate(1.3)", opacity: .9, offset: .8 },
    { transform: t(1,    `rotate(0deg) rotateX(76deg) scale(.04)`), filter: "brightness(2.4) saturate(1.6)", opacity: 0 },
  ], { duration: DURATION, easing: "cubic-bezier(.55,.05,.65,.95)", fill: "forwards" });

  await flight.finished;
  openLink(card);

  // devolve a carta ao deck
  setTimeout(() => {
    ghost.remove();
    card.classList.remove("portal-gone");
  }, 600);
}

// modo organizado: a carta só fica transparente e some, depois abre o link
async function fadeOut(card){
  const fade = card.animate([
    { opacity: 1 },
    { opacity: 0 },
  ], { duration: FADE_DURATION, easing: "ease-out", fill: "forwards" });

  await fade.finished;
  openLink(card);

  setTimeout(() => fade.cancel(), 600);
}

// o clone continua o vídeo de onde a carta parou, acelerado para acabar em até VIDEO_RUSH s
function rushVideo(from, video){
  if (!from || !video || !from.currentSrc) return;
  const start = () => {
    const rest = Math.max(0, video.duration - from.currentTime);
    const rate = Math.min(16, Math.max(1, rest / VIDEO_RUSH));
    video.currentTime = from.currentTime;
    video.defaultPlaybackRate = rate;
    video.playbackRate = rate;
    video.play().catch(() => {});
  };
  video.muted = true;
  video.loop = false;
  if (video.readyState >= 1) start();
  else {
    video.addEventListener("loadedmetadata", start, { once: true });
    video.preload = "auto";            // o clone herda preload="none"
    video.load();
  }
}

// converte PORTAL (coordenadas do vídeo) para a tela, considerando object-fit:cover
function portalPoint(){
  const vw = innerWidth, vh = innerHeight;
  const video = document.getElementById("bgVideo");
  const w = video?.videoWidth || 16, h = video?.videoHeight || 9;
  const scale = Math.max(vw / w, vh / h);
  return {
    x: vw / 2 + (PORTAL.x - 0.5) * w * scale,
    y: vh / 2 + (PORTAL.y - 0.5) * h * scale,
  };
}

function openLink(card){
  if (card.target === "_blank"){
    const win = window.open(card.href, "_blank");
    if (win){ win.opener = null; return; }
    // pop-up bloqueado: abre na mesma aba
  }
  location.href = card.href;
}
