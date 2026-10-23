/* Monta uma carta (estilo TCG) a partir de um item de APPS + seu offset 3D. */
import { el } from "../utils/dom.js";
import { isLight } from "../utils/color.js";
import { loadShot } from "../services/screenshot.js";
import { bindPortalEntry } from "../animations/portal-entry.js";
import { createHoverFx } from "./hover-fx.js";

export function createCard(app, offset){
  const a = el("a", "card");
  a.href = app.url;
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Abrir " + app.name);
  a.style.setProperty("--accent", app.accent || "#2f6fc4");
  a.style.setProperty("--fg", isLight(app.accent) ? "#12203a" : "#ffffff");
  if (app.accent2) a.style.setProperty("--accent2", app.accent2);
  if (app.accent3) a.style.setProperty("--accent3", app.accent3);
  const detail = app.accent3 || app.accent2 || app.accent;
  a.style.setProperty("--fg-detail", isLight(detail) ? "#12203a" : "#ffffff");
  a.style.setProperty("--tx", `calc(var(--cw) * ${offset.tx || 0})`);
  a.style.setProperty("--ty", `calc(var(--cw) * ${offset.ty})`);
  a.style.setProperty("--tz", `calc(var(--cw) * ${offset.tz})`);
  a.style.setProperty("--rot", offset.rot);

  const frame = el("span", "frame");

  // faixa do nome (título da carta) + selo
  const titlebar = el("span", "titlebar");
  titlebar.append(el("span", "gem"), el("span", "cardname", app.name), el("span", "badge", app.badge || "HML"));

  // janela de "arte" = logomarca do projeto (ou print da tela inicial)
  const art = el("span", app.logo ? "art logo" : "art");
  const ph = el("span", "ph", (app.name || "?").trim().charAt(0).toUpperCase());
  const img = el("img");
  img.loading = "lazy"; img.alt = "";
  art.append(ph, img);
  if (app.logo) art.prepend(createHoverVideo(a, app.video || HOVER_VIDEO));
  if (app.logo){                        // logomarca do projeto
    img.src = app.logo;
    img.onload = () => img.classList.add("ready");
    img.onerror = () => img.remove();
  } else if (app.img){                         // imagem local/fixa (ex.: assets/images/xxx.png)
    img.src = app.img;
    img.onload = () => img.classList.add("ready");
    img.onerror = () => img.remove();
  } else if (app.noshot){               // sem print
    img.remove();
  } else {
    loadShot(img, app.shot || app.url); // screenshot ao vivo
  }
  // animação da arte no hover do modo organizado
  const fx = app.hoverFx && createHoverFx(a, app.hoverFx);
  if (fx) art.append(fx);

  // rodapé do modo organizado: tipo da aplicação (ponto = no ar) e botão (oculto no modo card)
  const info = el("span", "info");
  const kind = el("span", "info-name");
  kind.append(el("span", "dot"), el("span", null, app.type || app.name));
  info.append(kind, el("span", "open", "Abrir ↗"));

  frame.append(titlebar, art, info);
  a.append(frame, el("span", "foil"));

  bindTilt(a);
  bindPortalEntry(a);
  return a;
}

// vídeo que aparece atrás da logomarca enquanto o cursor está sobre a carta
const HOVER_VIDEO = "assets/videos/vortex.mp4";

function createHoverVideo(card, src){
  const video = el("video", "hover-video");
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "none";              // só baixa no primeiro hover
  video.setAttribute("aria-hidden", "true");

  const start = () => {
    if (document.body.classList.contains("layout-org")) return; // modo organizado não tem vídeo
    if (!video.src) video.src = src;
    video.play().catch(() => {});
  };
  const stop = () => video.pause();
  card.addEventListener("pointerenter", start);
  card.addEventListener("pointerleave", stop);
  card.addEventListener("focus", start);
  card.addEventListener("blur", stop);
  return video;
}

// inclinação 3D leve que segue o cursor sobre a carta
const TILT_DEG = 8;

function bindTilt(card){
  card.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    card.style.setProperty("--ry", ((px - 0.5) * TILT_DEG * 2).toFixed(2) + "deg");
    card.style.setProperty("--rx", ((0.5 - py) * TILT_DEG * 2).toFixed(2) + "deg");
  });
  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
}
