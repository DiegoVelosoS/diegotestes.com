/* =======================================================================
   👉 CONFIG DA ÁREA DE ANIMAÇÕES.
      images : caminhos (a partir da raiz do site) das imagens de /assets/images
               usadas pelos efeitos. Os efeitos percorrem a lista em ciclo,
               então funciona com 1 ou N imagens.
      defaultEffect : efeito carregado ao abrir a página.
      effects : parâmetros por efeito (todos opcionais; há defaults no código).
   ======================================================================= */
export const FX_CONFIG = {
  images: [
    "assets/images/expoferrquiz.png",
    // adicione mais arquivos de assets/images/ aqui:
    // "assets/images/outra.png",
  ],

  defaultEffect: "float",

  effects: {
    // Imagens flutuando em loop (deriva + sobe/desce + giro leve).
    float:     { count: 10, minSize: 54, maxSize: 150, drift: 46, bob: 24, spin: 10, speed: 1 },

    // Camadas com profundidades diferentes reagindo ao mouse e ao scroll.
    parallax:  { layers: 5, depth: 30, scroll: 0.16, size: 190, blurFar: 2 },

    // Grade de imagens que surge (fade/slide/zoom) ao entrar na viewport.
    reveal:    { variant: "zoom", tiles: 9, stagger: 90 },

    // Sprites gerados continuamente que sobem, balançam e somem.
    particles: { rate: 1.6, life: 5200, size: [22, 60], rise: 130, sway: 42, spin: 70, max: 44 },
  },
};
