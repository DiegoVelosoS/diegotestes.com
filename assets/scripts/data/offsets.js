/* Deslocamento 3D por posição (fração da largura do card).
     tx = horizontal (- esquerda / + direita)   ty = vertical (- sobe / + desce)
     tz = profundidade (+ para frente)          rot = giro do card em graus
   Padrão: coluna da ESQUERDA mais baixa e mais afastada; MEIO e DIREITA levantados e alinhados.
   A lista é percorrida em ciclo (índice % OFFSETS.length), então funciona com qualquer nº de cards. */
export const OFFSETS = [
  { tx: "-0.09", ty: "0.03",  tz: "0.04", rot: "-0.5deg" },  // col. esq, cima
  { tx: "0",     ty: "-0.06", tz: "0.12", rot: "0.5deg"  },  // col. meio, cima
  { tx: "0",     ty: "0.00",  tz: "0.08", rot: "1.5deg"  },  // col. dir, cima
  { tx: "-0.09", ty: "0.03",  tz: "0.04", rot: "-0.5deg" },  // col. esq, baixo
  { tx: "0",     ty: "-0.06", tz: "0.12", rot: "0.5deg"  },  // col. meio, baixo
  { tx: "0",     ty: "0.00",  tz: "0.08", rot: "1.5deg"  },  // col. dir, baixo
];
