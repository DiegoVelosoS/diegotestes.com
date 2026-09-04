/* Screenshot ao vivo da tela inicial de cada app, sem chave de API.
   Tenta o 1º provedor com algumas tentativas; se falhar, cai pro 2º;
   se nada vier, o <img> é removido e sobra o placeholder (inicial do app). */

// Provedores de screenshot. Tenta o 1º; se falhar, o 2º.
export const PROVIDERS = [
  (url, n) => "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(url) +
              "?w=900&h=675" + (n ? "&r=" + n : ""),
  (url)    => "https://image.thum.io/get/width/900/crop/720/noanimate/" + url,
];

export function loadShot(img, url){
  let provider = 0, tries = 0;
  const MAX = 6;
  const go = () => { img.src = PROVIDERS[provider](url, tries); };

  img.onload = () => {
    // mShots costuma devolver 1º uma imagem "gerando..." pequena — insiste até vir a real.
    if (provider === 0 && img.naturalWidth && img.naturalWidth < 600 && tries < MAX){
      tries++; setTimeout(go, 3500); return;
    }
    img.classList.add("ready");
  };
  img.onerror = () => {
    if (provider === 0 && tries < MAX){ tries++; setTimeout(go, 3500); return; }
    if (provider === 0){ provider = 1; tries = 0; go(); return; }
    img.remove(); // desiste sem quebrar o layout — sobra o placeholder
  };
  go();
}
