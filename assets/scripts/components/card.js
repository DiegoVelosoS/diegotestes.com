/* Monta uma carta (estilo TCG) a partir de um item de APPS + seu offset 3D. */
import { el } from "../utils/dom.js";
import { isLight } from "../utils/color.js";
import { hostOf } from "../utils/url.js";
import { loadShot } from "../services/screenshot.js";

export function createCard(app, offset){
  const a = el("a", "card");
  a.href = app.url;
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Abrir " + app.name);
  a.style.setProperty("--accent", app.accent || "#2f6fc4");
  a.style.setProperty("--fg", isLight(app.accent) ? "#12203a" : "#ffffff");
  a.style.setProperty("--tx", `calc(var(--cw) * ${offset.tx || 0})`);
  a.style.setProperty("--ty", `calc(var(--cw) * ${offset.ty})`);
  a.style.setProperty("--tz", `calc(var(--cw) * ${offset.tz})`);
  a.style.setProperty("--rot", offset.rot);

  const frame = el("span", "frame");

  // faixa do nome (título da carta)
  const titlebar = el("span", "titlebar");
  titlebar.append(el("span", "gem"), el("span", "cardname", app.name));

  // janela de "arte" = print da tela inicial
  const art = el("span", "art");
  const ph = el("span", "ph", (app.name || "?").trim().charAt(0).toUpperCase());
  const img = el("img");
  img.loading = "lazy"; img.alt = "";
  art.append(ph, img);
  if (app.img){                         // imagem local/fixa (ex.: assets/images/xxx.png)
    img.src = app.img;
    img.onload = () => img.classList.add("ready");
    img.onerror = () => img.remove();
  } else if (app.noshot){               // sem print
    img.remove();
  } else {
    loadShot(img, app.shot || app.url); // screenshot ao vivo
  }

  // linha de tipo
  const typeline = el("span", "typeline", app.type || "Aplicação · Homologação");

  // caixa de texto (rodapé da carta)
  const textbox = el("span", "textbox");
  const row = el("span", "row");
  row.append(el("span", "cta", "ABRIR ↗"));
  textbox.append(el("span", "host", hostOf(app.url)), row);

  frame.append(titlebar, art, typeline, textbox);
  a.append(frame, el("span", "badge", app.badge || "HML"), el("span", "foil"));

  bindTilt(a);
  return a;
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
