# diegotestes.com

Menu / área de homologações das aplicações hospedadas na VPS `diegotestes.com`.
Site estático, sem build e sem dependências: só HTML, CSS e JavaScript (ES Modules).

## Estrutura

```text
.
├── index.html                  # markup mínimo: hero + deck + seção de animações + <link>/<script>
└── assets/
    ├── images/                 # imagens, fallback dos cards e fonte dos efeitos de animação
    │   └── expoferrquiz.png
    ├── styles/                 # CSS modular, um arquivo por responsabilidade
    │   ├── index.css           # ponto de entrada: @import de todos os módulos, na ordem da cascata
    │   ├── tokens.css          # variáveis globais (cores)
    │   ├── base.css            # reset, tipografia, fundo, .noscript
    │   ├── layout.css          # .page (grade principal)
    │   ├── hero.css            # bloco de texto (marca, título, subtítulo)
    │   ├── deck.css            # .stage + .deck (palco 3D)
    │   ├── card.css            # a carta estilo TCG e seus elementos
    │   ├── animations.css      # seção .fx-section: palco, controles, efeito reveal
    │   └── responsive.css      # media queries
    └── scripts/                # JavaScript modular (ES Modules)
        ├── main.js             # entrada: monta o deck e liga a área de animações
        ├── data/
        │   ├── apps.js         # lista das aplicações (editar aqui para adicionar cards)
        │   └── offsets.js      # deslocamentos 3D por posição (ciclo)
        ├── components/
        │   └── card.js         # createCard(app, offset) -> elemento <a.card>
        ├── services/
        │   └── screenshot.js   # screenshot ao vivo (provedores sem API key) + fallback
        ├── animations/         # área de animações (ver seção abaixo)
        │   ├── index.js        # orquestrador: registry de efeitos, botões, pausa, rAF on/off
        │   ├── config.js       # imagens usadas + efeito padrão + parâmetros por efeito
        │   ├── engine.js       # ticker único de requestAnimationFrame
        │   ├── utils.js        # rand / clamp / pick / easeFactor
        │   └── effects/        # 1 arquivo por efeito
        │       ├── float.js        # imagens flutuando em loop
        │       ├── parallax.js     # camadas reagindo a mouse + scroll
        │       ├── reveal.js       # grade que surge ao entrar na viewport
        │       └── particles.js    # sprites gerados que sobem e somem (pool)
        └── utils/
            ├── dom.js          # helper de criação de elementos
            ├── url.js          # hostname legível
            └── color.js        # luminância -> escolhe cor do texto
```

## Adicionar / editar uma aplicação

Edite **`assets/scripts/data/apps.js`**. Cada item aceita:

- `name` (obrigatório): nome exibido na carta
- `url` (obrigatório): link aberto ao clicar
- `accent`: cor da carta (hex); padrão `#2f6fc4`
- `shot`: URL usada só para o screenshot (padrão = `url`)
- `img`: imagem fixa para a "arte" (ex.: `assets/images/foo.png`)
- `noshot`: `true` desativa o screenshot e mostra só a inicial do app
- `type`: texto da linha de tipo
- `badge`: selo do canto (padrão `HML`)

O layout se ajusta a qualquer quantidade de cards (os offsets 3D são percorridos em ciclo).

## Área de animações

Seção `#fx` no `index.html`, abaixo do deck. Um palco (`[data-fx-stage]`) onde
efeitos em JS animam as imagens de `assets/images/`. Os botões trocam de efeito;
o botão da direita pausa/retoma. O ticker de `requestAnimationFrame` só roda
quando a seção está visível, a aba está ativa e não está pausado; `prefers-reduced-motion`
começa pausado (e o efeito `reveal` fica no estado final).

**Configurar** (`assets/scripts/animations/config.js`):

- `images`: arquivos de `assets/images/` usados pelos efeitos (percorridos em ciclo; 1 ou N)
- `defaultEffect`: `"float"` \| `"parallax"` \| `"reveal"` \| `"particles"`
- `effects.<nome>`: parâmetros do efeito (contagem, tamanhos, velocidade, `reveal.variant` = `fade`/`slide`/`zoom`, etc.)

**Efeitos disponíveis:**

- `float`: imagens flutuando em loop (deriva + sobe/desce + giro leve)
- `parallax`: camadas em profundidades diferentes reagindo ao mouse e ao scroll
- `reveal`: grade de imagens que surge (fade/slide/zoom) ao entrar na viewport (IntersectionObserver)
- `particles`: sprites gerados continuamente que sobem, balançam e somem (pool de nós)

**Adicionar um efeito novo:**

1. Crie `assets/scripts/animations/effects/<nome>.js` exportando
   `create<Nome>({ stage, images, params })` que retorna `{ name, tick, destroy }`
   (`tick(dt, now)` opcional, só se o efeito precisa de rAF).
2. Importe e registre em `REGISTRY` no `animations/index.js`.
3. Adicione um `<button class="fx-btn" data-fx-effect="<nome>">` no `index.html`
   e, se quiser, um bloco `effects.<nome>` no `config.js`.

## Rodar localmente

ES Modules não carregam via `file://`: sirva a pasta por HTTP:

```bash
python -m http.server 8080
```
ou: npx serve .

Depois abra `http://localhost:8080`.

## Deploy

Publicar o conteúdo da raiz do projeto como está, não há etapa de build.
