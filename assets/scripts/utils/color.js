/* True quando a cor hex é clara o bastante para pedir texto escuro por cima. */
export function isLight(hex){
  const c = (hex || "").replace("#", "");
  if (c.length < 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 150;
}
