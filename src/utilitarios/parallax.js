/**
 * Diretiva v-parallax: desloca o elemento conforme ele atravessa a tela,
 * num ritmo um pouco diferente do resto da pagina.
 *
 * Uso: <figure v-parallax> ou <figure v-parallax="40"> (forca em pixels).
 * O valor sai na variavel CSS --parallax, que o estilo aplica como quiser.
 */
const itens = new Map();
let agendado = false;

function medir() {
  agendado = false;
  const meio = window.innerHeight / 2;
  for (const [el, forca] of itens) {
    const caixa = el.getBoundingClientRect();
    if (caixa.bottom < -200 || caixa.top > window.innerHeight + 200) continue;
    const centro = caixa.top + caixa.height / 2;
    const desvio = (centro - meio) / window.innerHeight;   // -1 em cima, 1 embaixo
    el.style.setProperty('--parallax', `${(desvio * forca).toFixed(1)}px`);
  }
}

function aoRolar() {
  if (agendado) return;
  agendado = true;
  requestAnimationFrame(medir);
}

function ligar() {
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar);
}

function desligar() {
  window.removeEventListener('scroll', aoRolar);
  window.removeEventListener('resize', aoRolar);
}

export default {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (itens.size === 0) ligar();
    itens.set(el, Number(binding.value) || 30);
    aoRolar();
  },
  unmounted(el) {
    itens.delete(el);
    if (itens.size === 0) desligar();
  }
};
