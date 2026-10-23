/* Ponto de entrada do frontend: monta o deck de cartas e liga a troca de layout. */
import { APPS } from "./data/apps.js";
import { OFFSETS } from "./data/offsets.js";
import { createCard } from "./components/card.js";
import { initLayoutSwitch } from "./components/layout-switch.js";

const deck = document.getElementById("deck");
if (deck){
  APPS.forEach((app, i) => {
    const offset = OFFSETS[i % OFFSETS.length];
    deck.appendChild(createCard(app, offset));
  });
  nameForLayoutTransition(deck);
}

initLayoutSwitch(document.getElementById("layoutSwitch"));

const fx = document.getElementById("fx");

// Troca de layout (layout-switch.css): cada carta e sua arte têm nome de transição próprio,
// para se deslocarem sozinhas, em cascata (55ms entre uma carta e a seguinte).
function nameForLayoutTransition(deck){
  const rules = [];
  [...deck.children].forEach((card, i) => {
    card.style.viewTransitionName = "card-" + i;
    const art = card.querySelector(".art");
    if (art){
      art.style.viewTransitionName = "art-" + i;
      art.style.viewTransitionClass = "card-art";
    }
    if (i) rules.push(["card-" + i, "art-" + i]
      .flatMap((n) => [`::view-transition-group(${n})`, `::view-transition-old(${n})`, `::view-transition-new(${n})`])
      .join(",") + `{animation-delay:${i * 55}ms;}`);
  });
  const style = document.createElement("style");
  style.textContent = rules.join("\n");
  document.head.append(style);
}
