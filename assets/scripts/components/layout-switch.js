/* Botão switch do canto superior direito: alterna entre o modo card (deck 3D)
   e o modo organizado (grade plana com tipo da aplicação e botão). Abre no organizado
   por padrão e lembra a escolha. */
const KEY = "layout-mode";
const ORG_CLASS = "layout-org";

export function initLayoutSwitch(btn){
  if (!btn) return;

  const apply = (org) => {
    document.body.classList.toggle(ORG_CLASS, org);
    btn.setAttribute("aria-checked", String(org));
  };

  // padrão: modo organizado (só abre em card se o usuário escolheu antes)
  apply(read() !== "cards");

  btn.addEventListener("click", () => {
    const org = !document.body.classList.contains(ORG_CLASS);
    save(org ? "org" : "cards");
    // transição suave entre os layouts quando o navegador suporta
    if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches){
      document.startViewTransition(() => apply(org));
    } else {
      apply(org);
    }
  });
}

function read(){
  try { return localStorage.getItem(KEY); } catch { return null; }
}
function save(v){
  try { localStorage.setItem(KEY, v); } catch {}
}
