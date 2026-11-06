/* Página /corriculo — portfólio comercial.
   Para adicionar uma aplicação, inclua um item em APPS (os campos estão descritos no primeiro). */

const CONTACT_EMAIL = "admdiegoveloso@gmail.com"; // destino do formulário (Solicitar Orçamento / itens da faixa de soluções)
// WhatsApp do botão "Fale conosco" do topo: ver o href de .nav-cta no index.html (wa.me/5595991150093)

const IMG = "/assets/images/";

/* Ícones: Icons8, estilo iOS (https://icons8.com.br/icons/), em /corriculo/img/icons.
   São PNGs pretos usados como máscara (.ic no CSS), então a cor vem de `color`. */
const ICONS = {
  users: "user-group-man-man", leaf: "leaf", layers: "layers", chart: "bar-chart", church: "church", quiz: "ask-question",
  monitor: "monitor", pin: "marker", dashboard: "statistics", auto: "workflow", puzzle: "api-settings", phone: "iphone",
  code: "code", wrench: "maintenance", database: "database", rocket: "rocket",
  external: "external-link", check: "checkmark", send: "paper-plane",
};
/* Situação do sistema, mostrada no rodapé da imagem (hover) na janela de detalhes.
   Use status: "build" | "prod" | "beta" na aplicação, ou em cada imagem/versão. */
const STATUS = {
  build: { label: "Em fase de construção", color: "#f5a524" },
  prod:  { label: "Em funcionamento (produção)", color: "#22c55e" },
  beta:  { label: "Em fase de teste (beta)", color: "#60a5fa" },
};

const icon = (name, cls = "") =>
  `<span class="ic ${cls}" style="--i:url('/corriculo/img/icons/${ICONS[name] || name}.png')" aria-hidden="true"></span>`;

/* -----------------------------------------------------------------------
   Aplicações
     id, name, short (texto do card), category, color (ícone/categoria), icon, art (imagem do card),
     url (Abrir), objective, problem, features[], tech[], images[], benefits[]
   ----------------------------------------------------------------------- */
const APPS = [
  {
    id: "eleitores", logo: IMG + "logos/eleitores.svg", name: "Eleitores Conectados", short: "Gerenciador de campanhas e relacionamento com eleitores.",
    status: "prod",
    category: "Gestão", color: "#f08a24", icon: "users", art: IMG + "Eleitores.svg",
    url: "https://eleitores.diegotestes.com", keywords: "crm campanha política eleição liderança",
    objective: "Centralizar o cadastro de eleitores e lideranças de uma campanha, com a rede de apoio organizada em hierarquia.",
    problem: "Listas espalhadas em planilhas e mensagens, sem saber quem trouxe cada apoiador nem o tamanho real de cada liderança.",
    features: ["Cadastro de eleitores com líder imediato e super líder calculado até o topo da rede", "Hierarquia Super Líder → Líder → Eleitor", "Dashboard e relatórios por liderança", "Login com JWT e backup dos dados"],
    tech: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Next.js", "React", "TypeScript", "Tailwind", "Docker"],
    images: [IMG + "Eleitores.svg"],
    benefits: ["Visão clara do alcance de cada liderança", "Dados em um único lugar, com acesso controlado"],
  },
  {
    id: "coleta", logo: IMG + "logos/coleta.svg", name: "Coleta SEADI", short: "Coleta e organização de dados de campo.",
    status: "beta",
    category: "Dados", color: "#2f8f4e", icon: "leaf", art: IMG + "Coleta.png",
    url: "https://coleta.diegotestes.com", keywords: "formulário campo mobile offline pesquisa",
    objective: "Registrar dados de campo pelo celular e consolidá-los em um painel web para a equipe técnica.",
    problem: "Fichas em papel e planilhas manuais atrasavam a consolidação e geravam erros de digitação.",
    features: ["App mobile para a coleta em campo", "Painel web para acompanhar e revisar os registros", "API central com os dados consolidados", "Ambiente em containers"],
    tech: ["FastAPI", "Angular", "Flutter", "PostgreSQL", "Docker"],
    images: ["/corriculo/img/coleta.webp"],
    benefits: ["Dados disponíveis assim que coletados", "Menos retrabalho e erros de transcrição"],
  },
  {
    id: "zeerr", name: "Mapas Interativos ZEE-RR", short: "Visualização de dados territoriais e zoneamento ecológico-econômico.",
    category: "Mapas / SIG", color: "#12a99a", icon: "layers", art: IMG + "Mapas v3.0.png",
    url: "https://zeerr3.diegotestes.com", keywords: "mapas sig geo geoprocessamento gis território zoneamento leaflet",
    objective: "Disponibilizar na web o Zoneamento Ecológico-Econômico de Roraima, com as camadas geoespaciais consultáveis por qualquer pessoa.",
    problem: "Os dados territoriais ficavam restritos a softwares de SIG e servidores especializados, longe do público e dos gestores.",
    features: ["76 camadas geoespaciais organizadas em árvore por categoria", "Identificação por clique em todas as camadas ativas", "Tooltip no hover e troca de mapa base", "Camadas estáticas pré-geradas: rápido e sem GeoServer em produção"],
    tech: ["Leaflet", "JavaScript", "PHP", "PostGIS", "GeoServer", "GeoJSON", "esbuild"],
    images: [
      { src: IMG + "Mapas v3.0.png", version: "v3.0", url: "https://zeerr3.diegotestes.com", status: "build" },
      { src: IMG + "Mapas v2.0.png", version: "v2.0", url: "https://zeerr.diegotestes.com", status: "prod" },
    ],
    benefits: ["Acesso público aos dados do zoneamento", "Infraestrutura simples e barata de manter"],
  },
  {
    id: "myfinance", logo: IMG + "logos/myfinance.svg", name: "My Finance", short: "Controle financeiro pessoal (PWA).",
    status: "prod",
    category: "Finanças", color: "#5b3fd1", icon: "chart", art: IMG + "My Finance.webp",
    url: "https://fin.dvscloud.sbs", keywords: "finanças dinheiro contas pwa orçamento planilha",
    objective: "Substituir a planilha de contas por um app instalável que funciona offline no celular.",
    problem: "Planilha difícil de usar no celular, sem sincronização entre dispositivos e sem histórico confiável.",
    features: ["PWA instalável, mobile-first e offline", "Importador da planilha existente", "Sincronização com a API e fila de envio", "Login por convite, multiusuário com dados isolados", "Backup diário do banco"],
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Dexie (IndexedDB)", "Zod", "Node.js", "PostgreSQL", "Vitest", "Playwright"],
    images: [IMG + "My Finance.webp"],
    benefits: ["Lançamentos em segundos, mesmo sem internet", "Dados sincronizados e com backup"],
  },
  {
    id: "louvor", logo: IMG + "logos/louvor.png", name: "Louvor", short: "Escala e gestão de grupos de louvor da igreja.",
    status: "beta",
    category: "Organização", color: "#16407a", icon: "church", art: IMG + "Louvor.png",
    url: "https://louvor.diegotestes.com", keywords: "igreja escala ministério música agenda",
    objective: "Montar e divulgar a escala do ministério de louvor da igreja.",
    problem: "Escalas combinadas em grupos de mensagem, com conflitos de agenda e pouca visibilidade para os integrantes.",
    features: ["Escala de cultos e eventos", "Gestão dos integrantes e funções", "Consulta da escala pelos membros"],
    tech: ["PHP", "PostgreSQL", "Composer", "PHPUnit"],
    images: [IMG + "Louvor.png"],
    benefits: ["Escala organizada e fácil de consultar", "Menos conflitos e trocas de última hora"],
  },
  {
    id: "quizrr", logo: IMG + "logos/tepui.svg", name: "Quiz Roraima", short: "Quiz interativo sobre história, geografia e cultura de Roraima.",
    status: "prod",
    category: "Educação", color: "#f0811e", icon: "quiz", art: IMG + "Tepui.svg",
    url: "https://quizrr.dvscloud.sbs", keywords: "quiz jogo educação ranking roraima tepui",
    objective: "Ensinar história, geografia, natureza e cultura de Roraima em forma de jogo.",
    problem: "Conteúdo regional pouco atrativo para estudantes e visitantes de eventos.",
    features: ["Perguntas de múltipla escolha sorteadas pelo servidor", "Ajudas: pular, IA e roleta", "Ranking com pontuação validada no servidor", "Modo claro/escuro com cenário animado do lavrado"],
    tech: ["PHP", "SQLite", "JavaScript", "CSS"],
    images: [IMG + "Tepui.svg"],
    benefits: ["Aprendizado com engajamento", "Ranking confiável, sem fraude pelo navegador"],
  },
];

/* Soluções (faixa + seção) */
const SOLUTIONS = [
  { icon: "monitor", name: "Sistemas Web", desc: "Sistemas de gestão, cadastros, CRMs e portais acessados pelo navegador." },
  { icon: "pin", name: "Mapas e SIG", desc: "Mapas interativos, camadas geoespaciais e consulta de dados territoriais." },
  { icon: "dashboard", name: "Painéis e Dashboards", desc: "Indicadores e relatórios que transformam dados em decisão." },
  { icon: "auto", name: "Automação de Processos", desc: "Fluxos que eliminam planilhas, retrabalho e tarefas repetitivas." },
  { icon: "puzzle", name: "Integrações e APIs", desc: "APIs e conexões entre sistemas, bancos de dados e serviços." },
  { icon: "phone", name: "Apps Mobile e PWA", desc: "Aplicativos para celular, inclusive com funcionamento offline." },
];

const SERVICES = [
  { icon: "code", name: "Desenvolvimento sob medida", desc: "Do levantamento de requisitos à entrega, com a tecnologia certa para o seu caso." },
  { icon: "wrench", name: "Manutenção e evolução", desc: "Correções, novas funcionalidades e modernização de sistemas existentes." },
  { icon: "database", name: "Integração de dados", desc: "Migração de planilhas, importadores, bancos de dados e sincronização." },
  { icon: "rocket", name: "Implantação e hospedagem", desc: "Publicação em VPS com Docker, domínio, HTTPS e rotina de backup." },
];

/* Tecnologias: cada chip agrupa uma ou mais ferramentas [nome, site oficial] */
const TECH = [
  [["Python", "https://www.python.org"], ["FastAPI", "https://fastapi.tiangolo.com"]],
  [["PHP", "https://www.php.net"]],
  [["JavaScript", "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"], ["TypeScript", "https://www.typescriptlang.org"]],
  [["React", "https://react.dev"], ["Next.js", "https://nextjs.org"]],
  [["Angular", "https://angular.dev"]],
  [["Flutter", "https://flutter.dev"]],
  [["Node.js", "https://nodejs.org"]],
  [["PostgreSQL", "https://www.postgresql.org"], ["PostGIS", "https://postgis.net"]],
  [["SQLite", "https://www.sqlite.org"]],
  [["Leaflet", "https://leafletjs.com"], ["GeoServer", "https://geoserver.org"]],
  [["Tailwind", "https://tailwindcss.com"]],
  [["Docker", "https://www.docker.com"]],
  [["Vitest", "https://vitest.dev"], ["Playwright", "https://playwright.dev"]],
];

/* ----------------------------------------------------------------------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/* Cards */
const appsEl = $("#apps");
appsEl.innerHTML = APPS.map((a) => `
  <article class="app" style="--c:${a.color}" data-id="${a.id}" data-search="${esc(norm([a.name, a.category, a.short, a.keywords].join(" ")))}">
    <a class="app-hit" href="#app/${a.id}" aria-label="Ver detalhes de ${esc(a.name)}"></a>
    <span class="app-ico">${icon(a.icon)}</span>
    <div class="app-body">
      <h3>${esc(a.name)}</h3>
      <p>${esc(a.short)}</p>
      <div class="app-foot">
        <span class="tag">${esc(a.category)}</span>
        <a class="app-open" href="${a.url}" target="_blank" rel="noopener">Abrir ${icon("external")}</a>
      </div>
    </div>
    <div class="app-art"><img src="${a.art}" alt="" loading="lazy">${a.logo ? `<img class="art-logo" src="${a.logo}" alt="" loading="lazy">` : ""}</div>
  </article>`).join("");

/* Busca por nome ou categoria (sem acento, sem caixa) */
const search = $("#search");
search.addEventListener("input", () => {
  const q = norm(search.value.trim());
  let shown = 0;
  appsEl.querySelectorAll(".app").forEach((card) => {
    const hit = !q || q.split(/\s+/).every((t) => card.dataset.search.includes(t));
    card.hidden = !hit;
    shown += hit;
  });
  $("#empty").hidden = shown > 0;
  $("#emptyTerm").textContent = search.value.trim();
});

/* Soluções, serviços, tecnologias */
$("#solutionsList").innerHTML = SOLUTIONS.slice(0, 5).map((s) =>
  `<li><a href="#" data-open-contact data-subject="${esc(s.name)}">${icon(s.icon)}<span>${esc(s.name)}</span></a></li>`).join("");
$("#solutionsGrid").innerHTML = SOLUTIONS.map((s) =>
  `<div class="tile">${icon(s.icon, "tile-ico")}<h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></div>`).join("");
$("#servicesGrid").innerHTML = SERVICES.map((s) =>
  `<div class="service">${icon(s.icon, "tile-ico")}<div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></div></div>`).join("");
$("#techList").innerHTML = TECH.map((group) => `<li>${group.map(([name, url]) =>
  `<a href="${url}" target="_blank" rel="noopener" title="Site oficial do ${esc(name)}">${esc(name)}</a>`).join(" / ")}</li>`).join("");

/* Detalhes da aplicação: #app/<id> (link compartilhável) */
const appModal = $("#appModal");
function renderDetail(a){
  const list = (arr) => `<ul class="checks">${arr.map((x) => `<li>${icon("check")}${esc(x)}</li>`).join("")}</ul>`;
  $("#appDetail").innerHTML = `
    <header class="d-head" style="--c:${a.color}">
      <span class="app-ico">${icon(a.icon)}</span>
      <div><h2 id="appTitle">${esc(a.name)}</h2><span class="tag">${esc(a.category)}</span></div>
    </header>
    <div class="d-gallery">${a.images.map((im) => {
      // cada imagem: caminho, ou { src, version?, url? } quando a tela é de uma versão com endereço próprio
      const { src, version = "", url = a.url, status = a.status } = typeof im === "string" ? { src: im } : im;
      const st = STATUS[status];
      const label = version ? `${a.name} ${version}` : a.name;
      return `
      <a class="d-shot" href="${url}" target="_blank" rel="noopener" aria-label="Abrir ${esc(label)} em nova aba">
        <img src="${src}" alt="Tela de ${esc(label)}" loading="lazy">
        ${version ? `<span class="d-shot-badge">${esc(version)}</span>` : ""}
        <span class="d-shot-name"><span>${esc(a.name)}${version ? `<small class="d-shot-ver">${esc(version)}</small>` : ""}</span>${icon("external")}</span>
        ${st ? `<span class="d-shot-status" style="--st:${st.color}">${st.label}</span>` : ""}
      </a>`;
    }).join("")}</div>
    <div class="d-grid">
      <section><h3>Objetivo do sistema</h3><p>${esc(a.objective)}</p></section>
      <section><h3>Problema solucionado</h3><p>${esc(a.problem)}</p></section>
      <section><h3>Principais funcionalidades</h3>${list(a.features)}</section>
      <section><h3>Resultados e benefícios</h3>${list(a.benefits)}</section>
      <section class="d-wide"><h3>Tecnologias utilizadas</h3><ul class="chips">${a.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></section>
    </div>`;
}
function syncRoute(){
  const m = location.hash.match(/^#app\/([\w-]+)$/);
  const app = m && APPS.find((a) => a.id === m[1]);
  if (app){
    renderDetail(app);
    if (!appModal.open) appModal.showModal();
    appModal.scrollTop = 0;
  } else if (appModal.open){
    appModal.close();
  }
}
appModal.addEventListener("close", () => {
  if (location.hash.startsWith("#app/")) history.replaceState(null, "", location.pathname + "#aplicacoes");
});
window.addEventListener("hashchange", syncRoute);
syncRoute();

/* Solicitar projeto */
const contactModal = $("#contactModal");
const form = $("#contactForm");
const typeSel = $("#contactType");
typeSel.innerHTML = ["Ainda não sei", ...SOLUTIONS.map((s) => s.name), "Outro"].map((t) => `<option>${esc(t)}</option>`).join("");

document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open-contact]");
  if (opener){
    e.preventDefault();
    const subj = opener.dataset.subject || "";
    const match = SOLUTIONS.find((s) => s.name === subj);
    typeSel.value = match ? match.name : "Ainda não sei";
    form.elements.msg.value = subj && !match && subj !== "Orçamento" ? subj + ": " : form.elements.msg.value;
    if (appModal.open) appModal.close();
    closeMenu();
    contactModal.showModal();
    form.elements.nome.focus();
    return;
  }
  if (e.target.closest("[data-close]")) e.target.closest("dialog").close();
});
// clicar fora da caixa fecha o modal
document.querySelectorAll("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(form));
  const ok = f.nome.trim() && f.contato.trim() && f.msg.trim();
  $("#formErr").hidden = !!ok;
  if (!ok) return;
  const head = [`Nome: ${f.nome}`, `Contato: ${f.contato}`, f.org.trim() && `Organização: ${f.org}`, `Tipo de solução: ${f.tipo}`].filter(Boolean);
  const body = head.join("\n") + "\n\n" + f.msg;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Solicitação de projeto — " + f.tipo)}&body=${encodeURIComponent(body)}`;
  contactModal.close();
});

/* Menu mobile */
const menuBtn = $("#menuBtn");
const nav = $("#nav");
function closeMenu(){ nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

/* Destaca no menu a seção visível */
const links = [...nav.querySelectorAll("a[data-sec]")];
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.dataset.sec === en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
links.forEach((l) => { const s = document.getElementById(l.dataset.sec); if (s) io.observe(s); });

/* Telas dos aparelhos do hero: toda imagem fica SHOW_MS na tela; a próxima é sorteada entre as outras.
   Os aparelhos começam em momentos diferentes, para não trocarem juntos. */
const SHOW_MS = 5000;
if (!matchMedia("(prefers-reduced-motion: reduce)").matches){
  const screens = [...document.querySelectorAll(".swap")];
  screens.forEach((screen, k) => {
    const imgs = [...screen.querySelectorAll("img")];
    if (imgs.length < 2) return;
    let cur = imgs.findIndex((i) => i.classList.contains("on"));
    if (cur < 0){ cur = 0; imgs[0].classList.add("on"); }
    // Empilhamento só cresce: a imagem que entra sempre fica acima de todas as anteriores.
    // (Antes o "top" era retirado e a imagem de saída, se viesse depois no HTML, voltava à frente e piscava.)
    let z = 1;
    imgs[cur].style.zIndex = z;
    const next = async () => {
      const others = imgs.map((_, i) => i).filter((i) => i !== cur);
      const n = others[Math.floor(Math.random() * others.length)];
      const prev = imgs[cur], incoming = imgs[n];
      try { await incoming.decode(); } catch {}    // só faz o fade com a imagem pronta (sem flash em branco)
      incoming.style.zIndex = ++z;
      incoming.classList.add("on");                // entra por cima, com fade
      setTimeout(() => prev.classList.remove("on"), 950);  // a de baixo some só depois de coberta
      cur = n;
      setTimeout(next, SHOW_MS);
    };
    setTimeout(next, SHOW_MS * (k + 1) / screens.length);  // defasagem fixa: notebook, tablet e celular em tempos diferentes
  });
}
