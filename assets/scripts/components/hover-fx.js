/* Animação exibida na "arte" da carta ao passar o mouse no modo organizado.
   Cada uma é uma miniatura da tela de entrada do próprio projeto:
     eleitores : lado esquerdo do login (métricas contando + barra da meta)
     coleta    : cabeçalho do governo abrindo e a folha caindo até o card
     seadi     : emblema da folha do modal de boas-vindas
     louvor    : logomarca encolhe sobre o fundo de luzes, o nome cresce e o card branco surge atrás
     zeerr     : logo ZEE Roraima se montando (mapa gira, faixas envolvem, texto surge)
     zeerr2    : GIF do mapa de Roraima com as camadas do ZEE aparecendo uma a uma, terminando na logo
     expoferr  : fundo do ExpoferRR Quiz (cena da fazenda + selo com raios de luz girando)
   O desenho e o tempo ficam em assets/styles/hover-fx.css; aqui só monta o HTML
   (e o contador do Eleitores, que precisa de JS). */
import { el } from "../utils/dom.js";

const MARKUP = {
  eleitores: `
    <span class="el-circulo el-c1"></span><span class="el-circulo el-c2"></span>
    <span class="el-marca">
      <span class="el-icone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg></span>
      <span class="el-nome"><b>ELEITORES</b><b class="laranja">CONECTADOS</b><small>CADA VOZ IMPORTA</small></span>
    </span>
    <span class="el-corpo">
      <span class="el-titulo">Cada cadastro aproxima a campanha da vitória.</span>
      <span class="el-stats">
        <span class="el-stat"><svg class="roxo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg><b data-n="super">0</b><small>Super líderes</small></span>
        <span class="el-stat"><svg class="azul" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><b data-n="lider">0</b><small>Líderes</small></span>
        <span class="el-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><b data-n="liderado">0</b><small>Liderados</small></span>
      </span>
      <span class="el-meta"><span>Progresso da meta (20.000)</span><b data-n="pct">0,0%</b></span>
      <span class="el-barra"><span data-n="barra"></span></span>
    </span>`,

  coleta: `
    <span class="cl-banner">
      <span class="cl-parte cl-esq"><img src="assets/images/logos/coleta-banner.png" alt=""></span>
      <span class="cl-parte cl-dir"><img src="assets/images/logos/coleta-banner.png" alt=""></span>
      <span class="cl-linha"></span>
    </span>
    <span class="cl-card">
      <span class="cl-folha"><svg viewBox="0 0 24 24"><path d="M6.05 8.05c-2.73 2.73-2.73 7.15-.02 9.88 1.47-3.4 4.09-6.24 7.36-7.93-2.77 2.34-4.71 5.61-5.39 9.32 2.6 1.23 5.8.78 7.95-1.37C21.43 14.51 22 4 22 4S11.49 4.57 6.05 8.05z"/></svg></span>
      <b class="cl-nome">Coleta SEADI</b>
      <small class="cl-sub">Gestão de Formulários e Dados de Campo</small>
      <span class="cl-campos"><i></i><i></i></span>
    </span>`,

  seadi: `
    <span class="sd-cena">
      <span class="sd-circulo sd-c1"></span><span class="sd-circulo sd-c2"></span>
      <span class="sd-emblema">
        <span class="sd-orbita"></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 2 17 2c1 4.5-1.5 10-6 12"/><path d="M2 21c0-3 1.85-5.36 5.08-6.94C9.22 13 12 12 16 12"/></svg>
      </span>
    </span>`,

  louvor: `
    <span class="lv-luz lv-l1"></span><span class="lv-luz lv-l2"></span><span class="lv-luz lv-l3"></span>
    <span class="lv-widget"></span>
    <img class="lv-logo" src="assets/images/logos/louvor-marca.png" alt="">
    <b class="lv-nome">Louvor Paz Church</b>`,

  zeerr2: `
    <img class="z2-mapa" src="assets/images/logos/zeerr2-camadas.gif" alt="">`,

  expoferr: `
    <img class="ex-cena" src="assets/images/logos/expoferr-cena.jpg" alt="">
    <span class="ex-selo">
      <img class="ex-raios" src="assets/images/logos/expoferr-raios.png" alt="">
      <img class="ex-badge" src="assets/images/logos/expoferr-selo.png" alt="">
    </span>`,
};

// SVGs grandes ficam em arquivo e são embutidos no primeiro hover (precisam estar no DOM
// para o CSS animar cada grupo).
const SVG_FILES = {
  zeerr: "assets/images/logos/zeerr-anim.svg",
};

// imagens de fundo usadas só no CSS da animação: baixadas logo na carga da página, para não
// surgirem de repente no meio do primeiro hover
const PRELOAD = {
  louvor: ["assets/images/logos/louvor-luzes.svg"],
};

export function createHoverFx(card, kind){
  if (!MARKUP[kind] && !SVG_FILES[kind]) return null;
  (PRELOAD[kind] || []).forEach((src) => { new Image().src = src; });
  const fx = el("span", "hover-fx fx-" + kind);
  fx.setAttribute("aria-hidden", "true");
  if (MARKUP[kind]) fx.innerHTML = MARKUP[kind];
  if (SVG_FILES[kind]) bindSvg(card, fx, SVG_FILES[kind]);
  if (kind === "eleitores") bindCounter(card, fx);
  if (kind === "zeerr2") bindGifRestart(card, fx.querySelector("img"));
  return fx;
}

// O GIF continua rodando enquanto a camada está escondida; trocar a URL (só o fragmento,
// sem novo download) faz cada hover recomeçar do mapa vazio.
function bindGifRestart(card, img){
  const src = img.getAttribute("src");
  let n = 0;
  const restart = () => { img.src = src + "#" + (++n); };
  card.addEventListener("pointerenter", restart);
  card.addEventListener("focus", restart);
}

function bindSvg(card, fx, src){
  let loading = null;
  const load = () => {
    loading ||= fetch(src)
      .then((r) => r.ok ? r.text() : "")
      .then((svg) => { fx.innerHTML = svg; })
      .catch(() => {});
  };
  card.addEventListener("pointerenter", load);
  card.addEventListener("focus", load);
}

// Contagem decorativa do login do Eleitores (mesmos números ilustrativos, em loop até a meta).
const META = 20000;

function bindCounter(card, fx){
  const out = {};
  fx.querySelectorAll("[data-n]").forEach((n) => { out[n.dataset.n] = n; });
  let total = 0;
  let timer = null;

  const render = () => {
    out.super.textContent = Math.round(total * 0.02);
    out.lider.textContent = Math.round(total * 0.18);
    out.liderado.textContent = Math.round(total * 0.8);
    const pct = (total / META) * 100;
    out.pct.textContent = pct.toFixed(1).replace(".", ",") + "%";
    out.barra.style.width = Math.min(pct, 100) + "%";
  };
  const start = () => {
    if (timer || !document.body.classList.contains("layout-org")) return;
    total = 0;
    render();
    const passo = Math.round(META / 260);
    timer = setInterval(() => {
      total = total + passo >= META ? 0 : total + passo;
      render();
    }, 90);
  };
  const stop = () => { clearInterval(timer); timer = null; };

  card.addEventListener("pointerenter", start);
  card.addEventListener("pointerleave", stop);
  card.addEventListener("focus", start);
  card.addEventListener("blur", stop);
}
