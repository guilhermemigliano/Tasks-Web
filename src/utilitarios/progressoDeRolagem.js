import { onMounted, onUnmounted, ref } from 'vue';

/**
 * Devolve o quanto um elemento alto ja foi percorrido pela rolagem, de 0 a 1.
 *
 * Serve para animacoes conduzidas pelo scroll: o elemento "trilho" tem varias
 * telas de altura e, enquanto ele passa, o palco fica fixo e a cena evolui.
 * A leitura acontece dentro de requestAnimationFrame para nao travar a rolagem.
 */
export function usarProgressoDeRolagem(trilho) {
  const progresso = ref(0);
  const reduzido = ref(false);
  let agendado = false;

  function medir() {
    agendado = false;
    const el = trilho.value;
    if (!el) return;
    const caixa = el.getBoundingClientRect();
    const percurso = caixa.height - window.innerHeight;
    if (percurso <= 0) {
      progresso.value = caixa.top <= 0 ? 1 : 0;
      return;
    }
    progresso.value = Math.min(Math.max(-caixa.top / percurso, 0), 1);
  }

  function aoRolar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(medir);
  }

  onMounted(() => {
    reduzido.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzido.value) {
      progresso.value = 1;   // quem pediu menos movimento ve a cena pronta
      return;
    }
    medir();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', aoRolar);
    window.removeEventListener('resize', aoRolar);
  });

  return { progresso, reduzido };
}

/** Converte um trecho do progresso total em outro 0..1, com suavizacao. */
export function trecho(valor, inicio, fim) {
  const bruto = Math.min(Math.max((valor - inicio) / (fim - inicio), 0), 1);
  return bruto < 0.5 ? 2 * bruto * bruto : 1 - Math.pow(-2 * bruto + 2, 2) / 2;
}
