/**
 * Diretiva v-revelar: anima o elemento quando ele entra na tela.
 * Uso: <div v-revelar> ou <div v-revelar="2"> para atrasar a entrada
 * (util para escalonar uma lista de cartoes).
 *
 * Quem configurou o sistema para reduzir animacoes ve tudo ja visivel.
 */
const reduzirMovimento = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let observador = null;

function obterObservador() {
  if (observador) return observador;
  observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      entrada.target.classList.add('revelado');
      observador.unobserve(entrada.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  return observador;
}

export default {
  mounted(el, binding) {
    if (reduzirMovimento()) {
      el.classList.add('revelado');
      return;
    }
    const ordem = Number(binding.value) || 0;
    el.style.setProperty('--atraso', `${Math.min(ordem, 8) * 80}ms`);
    el.classList.add('revelavel');
    obterObservador().observe(el);
  }
};
