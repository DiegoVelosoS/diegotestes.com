# diegotestes.com

Menu / área de homologações das aplicações hospedadas na VPS `diegotestes.com`.
Site estático, sem build e sem dependências: só HTML, CSS e JavaScript (ES Modules).

## Estrutura

```text
.
├── index.html                  # markup mínimo: vídeo de fundo, botão de layout, hero + deck
└── assets/
    ├── images/logos/           # logomarcas das cartas e imagens das animações de hover
    ├── videos/                 # portal.mp4 (fundo) e vortex.mp4 (hover das cartas)
    ├── styles/                 # CSS modular, um arquivo por responsabilidade
    │   ├── index.css           # ponto de entrada: @import de todos os módulos, na ordem da cascata
    │   ├── tokens.css          # variáveis globais (cores)
    │   ├── base.css            # reset, tipografia, fundo, .noscript
    │   ├── layout.css          # .page (grade principal)
    │   ├── hero.css            # bloco de texto (marca, título, subtítulo)
    │   ├── deck.css            # .stage + .deck (palco 3D)
    │   ├── card.css            # a carta estilo TCG e seus elementos
    │   ├── portal.css          # animação "entrar no portal" ao clicar numa carta
    │   ├── responsive.css      # media queries
    │   ├── layout-switch.css   # botão e modo organizado (grade)
    │   └── hover-fx.css        # animações da arte no hover do modo organizado
    └── scripts/                # JavaScript modular (ES Modules)
        ├── main.js             # entrada: monta o deck e liga a troca de layout
        ├── data/
        │   ├── apps.js         # lista das aplicações (editar aqui para adicionar cards)
        │   └── offsets.js      # deslocamentos 3D por posição (ciclo)
        ├── components/
        │   ├── card.js         # createCard(app, offset) -> elemento <a.card>
        │   ├── hover-fx.js     # markup das animações de hover por aplicação
        │   └── layout-switch.js # alterna modo cartas / modo organizado
        ├── animations/
        │   └── portal-entry.js # clique na carta: voa até o portal e abre o link
        ├── services/
        │   └── screenshot.js   # screenshot ao vivo (provedores sem API key) + fallback
        └── utils/
            ├── dom.js          # helper de criação de elementos
            └── color.js        # luminância -> escolhe cor do texto
```

## Adicionar / editar uma aplicação

Edite **`assets/scripts/data/apps.js`**. Cada item aceita:

- `name` (obrigatório): nome exibido na carta
- `url` (obrigatório): link aberto ao clicar
- `accent` / `accent2` / `accent3`: cores do título, da moldura e dos detalhes (hex); padrão `#2f6fc4`
- `logo`: logomarca exibida na "arte"
- `video`: vídeo atrás da logo no hover (padrão `assets/videos/vortex.mp4`)
- `hoverFx`: animação de hover no modo organizado (`eleitores` \| `coleta` \| `seadi` \| `louvor` \| `zeerr` \| `zeerr2` \| `expoferr`)
- `shot`: URL usada só para o screenshot (padrão = `url`)
- `img`: imagem fixa para a "arte" (ex.: `assets/images/foo.png`)
- `noshot`: `true` desativa o screenshot e mostra só a inicial do app
- `type`: texto do rodapé no modo organizado
- `badge`: selo do canto (padrão `HML`)

O layout se ajusta a qualquer quantidade de cards (os offsets 3D são percorridos em ciclo).

## Rodar localmente

ES Modules não carregam via `file://`: sirva a pasta por HTTP:

```bash
python -m http.server 8080
```
ou: npx serve .

Depois abra `http://localhost:8080`.

## Deploy

Publicar o conteúdo da raiz do projeto como está, não há etapa de build.
