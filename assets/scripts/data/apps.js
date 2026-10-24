/* =======================================================================
   👉 EDITE ESTA LISTA com as aplicações hospedadas na VPS (diegotestes.com).
      name   : nome da carta
      type   : texto curto com o tipo da aplicação, no rodapé do modo organizado (opcional; padrão = name)
      url    : link aberto ao clicar (tela de entrada da aplicação)
      accent : cor principal da carta — barra do título (opcional; padrão azul)
      accent2: cor da moldura (opcional; padrão = accent)
      accent3: cor dos detalhes — losango e selo (opcional; padrão = accent2)
      shot   : URL usada só para o print ao vivo (opcional; padrão = url)
      logo   : logomarca exibida na "arte" (fundo claro, imagem inteira)
      video  : vídeo exibido atrás da logo no hover (opcional; padrão assets/videos/vortex.mp4)
      hoverFx: animação da arte no hover do modo organizado (eleitores | coleta | seadi | louvor | zeerr | zeerr2 | expoferr)
      img    : caminho de uma imagem fixa p/ a "arte" (ex.: "assets/images/foo.png")
      noshot : true  -> não tenta screenshot, mostra só a inicial do app
      badge  : selo no canto (padrão "HML")
   ======================================================================= */
export const APPS = [
  { name: "Eleitores",     type: "Gerenciador de campanha.", url: "https://eleitores.diegotestes.com",     accent: "#e5973e", accent2: "#13284f", logo: "assets/images/logos/eleitores.svg", hoverFx: "eleitores" },
  { name: "Coleta SEADI",   type: "Coleta de dados de campo.", url: "https://coleta.diegotestes.com",        accent: "#2d6a4f", logo: "assets/images/logos/coleta.svg", hoverFx: "coleta" },
  { name: "MAPAS v3",   type: "Versão 3.0 do sistema de Mapas Interativos do ZEE-RR.", url: "https://zeerr3.diegotestes.com", accent: "#00aff0", logo: "assets/images/logos/zeerr.svg", hoverFx: "zeerr" },
  { name: "MAPAS v2",   type: "Mapas do Zoneamento Ecológico-Econômico de Roraima.", url: "https://zeerr.diegotestes.com",         accent: "#00a85a", logo: "assets/images/logos/zeerr.svg", hoverFx: "zeerr2" },
  { name: "Louvor",        type: "Escala do grupo de louvor da igreja.", url: "https://louvor.diegotestes.com",        accent: "#14305b", logo: "assets/images/logos/louvor.png", hoverFx: "louvor" },
  { name: "ExpoferrQuiz",  type: "Quiz interativo.", url: "https://expoferrquiz.diegotestes.com",  accent: "#fcc800", logo: "assets/images/logos/expoferrquiz.png", hoverFx: "expoferr" },
];
