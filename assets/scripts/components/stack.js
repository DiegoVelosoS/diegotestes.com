/* Pilha de cartas numa só posição do deck: a primeira fica na frente e as demais
   aparecem atrás, um pouco acima. O destaque no hover fica no CSS (stack.css). */
import { el } from "../utils/dom.js";
import { createCard } from "./card.js";

export function createStack(apps, offset){
  const stack = el("div", "stack");
  apps.forEach((app, i) => {
    const card = createCard(app, offset);
    card.classList.add(i ? "stack-back" : "stack-front");
    stack.append(card);
  });
  return stack;
}
