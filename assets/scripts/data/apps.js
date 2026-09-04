/* =======================================================================
   👉 EDITE ESTA LISTA com as aplicações hospedadas na VPS (diegotestes.com).
      name   : nome da carta
      url    : link aberto ao clicar (tela de entrada da aplicação)
      accent : cor da carta (opcional; padrão azul)
      shot   : URL usada só para o print ao vivo (opcional; padrão = url)
      img    : caminho de uma imagem fixa p/ a "arte" (ex.: "assets/images/foo.png")
      noshot : true  -> não tenta screenshot, mostra só a inicial do app
      type   : texto da linha de tipo (padrão "Aplicação · Homologação")
      flavor : texto em itálico no rodapé da carta
      badge  : selo no canto (padrão "HML")
   ======================================================================= */
export const APPS = [
  { name: "Eleitores",     url: "https://eleitores.diegotestes.com",     accent: "#2f6fc4", img: "assets/images/eleitores.png" },
  { name: "Coleta",        url: "https://coleta.diegotestes.com",        accent: "#0d9488", img: "assets/images/coleta.png" },
  { name: "ProgramasEADI", url: "https://programaseadi.diegotestes.com", accent: "#6d28d9", img: "assets/images/planoseadi.png" },
  { name: "Zeerr",         url: "https://zeerr.diegotestes.com",         accent: "#18181b", img: "assets/images/mapas-interativos.png" },
  { name: "Louvor",        url: "https://louvor.diegotestes.com",        accent: "#e11d48", img: "assets/images/louvor.png" },
  { name: "ExpoferrQuiz",  url: "https://expoferrquiz.diegotestes.com",  accent: "#0a8f47", img: "assets/images/expoferrquiz.png" },
];
