/* Ponto de entrada do frontend: monta o deck de cartas e liga a área de animações. */
import { APPS } from "./data/apps.js";
import { OFFSETS } from "./data/offsets.js";
import { createCard } from "./components/card.js";
import { initAnimations } from "./animations/index.js";
import { initCloudsBackground } from "./background/clouds.js";

const deck = document.getElementById("deck");
if (deck){
  APPS.forEach((app, i) => {
    const offset = OFFSETS[i % OFFSETS.length];
    deck.appendChild(createCard(app, offset));
  });
}

const fx = document.getElementById("fx");
if (fx) initAnimations(fx);

const bgClouds = document.getElementById("bgClouds");
if (bgClouds) initCloudsBackground(bgClouds);

const bgCloudsBottom = document.getElementById("bgCloudsBottom");
if (bgCloudsBottom) initCloudsBackground(bgCloudsBottom);
