<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { arquivoPublico } from '../utilitarios/caminho.js';
import { detectarSistema, VERSAO } from '../dados/downloads.js';

const sistema = ref(null);
const visivel = ref(false);

/**
 * Quanto a janela ainda esta inclinada: 1 no topo da pagina, 0 depois de
 * rolar. A cena comeca deitada no espaco e se endireita conforme o visitante
 * desce, que e o que da a sensacao de profundidade sem atrapalhar a leitura.
 */
const inclinacao = ref(1);
let agendado = false;

function medir() {
  agendado = false;
  inclinacao.value = Math.max(0, 1 - window.scrollY / 540);
}

function aoRolar() {
  if (agendado) return;
  agendado = true;
  requestAnimationFrame(medir);
}

const rotuloBotao = computed(() => {
  if (sistema.value === 'windows') return 'Baixar para Windows';
  if (sistema.value === 'mac') return 'Baixar para macOS';
  return 'Baixar grátis';
});

onMounted(() => {
  sistema.value = detectarSistema();
  requestAnimationFrame(() => { visivel.value = true; });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    inclinacao.value = 0;
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
</script>

<template>
  <section id="inicio" class="hero" :class="{ pronto: visivel }">
    <div class="limite conteudo">
      <span class="selo"><i></i> Versão {{ VERSAO }} · Windows e macOS</span>

      <h1>
        Suas tarefas organizadas,<br />
        <em>no seu computador</em>
      </h1>

      <p class="chamada">
        Crie projetos, quebre em tarefas e acompanhe tudo num quadro simples.
        Sem nuvem, sem conta e sem mensalidade — os dados ficam na sua máquina.
      </p>

      <div class="acoes">
        <a class="botao botao-principal" href="#baixar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 20h16" />
          </svg>
          {{ rotuloBotao }}
        </a>
        <a class="botao botao-secundario" href="#telas">Ver como funciona</a>
      </div>

      <ul class="garantias">
        <li>Grátis para usar</li>
        <li>Funciona offline</li>
        <li>Sem cadastro</li>
      </ul>
    </div>

    <div class="palco" :style="{ '--inclina': inclinacao }">
      <div class="cena">
        <div class="janela">
          <div class="janela-barra"><span></span><span></span><span></span><b>Controle de Tarefas</b></div>
          <!-- Em escala 1:1 e cortada embaixo. No celular entra um recorte de
               uma coluna: e o unico jeito de a interface seguir legivel. -->
          <picture>
            <source media="(max-width: 700px)"
                    :srcset="arquivoPublico('capturas/hero-celular.webp')" width="744" height="666" />
            <img :src="arquivoPublico('capturas/hero-amplo.webp')" width="2720" height="1040"
                 fetchpriority="high"
                 alt="Quadro do aplicativo com as colunas A fazer, Em andamento e Concluído" />
          </picture>
        </div>

        <!-- cartao erguido acima do plano da janela: e ele que faz a cena
             parecer tridimensional, em vez de uma imagem apenas inclinada -->
        <article class="cartao-solto" aria-hidden="true">
          <div class="linha"><span class="caixa"></span><p>Montar o formulário de contato</p></div>
          <div class="chips">
            <span class="chip alta">Alta</span>
            <span class="chip prazo">16/11</span>
            <span class="chip">3/5</span>
            <span class="chip etq">urgente</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; padding: 140px 0 0; overflow: hidden; }
.conteudo { position: relative; text-align: center; max-width: 820px; }

/* Antes eram dois circulos com filter: blur(90px) e animacao infinita. O
   navegador precisava redesenhar essa superficie borrada a cada quadro, o que
   derrubava o desempenho em monitores grandes. Um gradiente estatico tem o
   mesmo efeito visual e e desenhado uma unica vez. */
.hero {
  background:
    radial-gradient(760px 540px at 6% -140px, rgba(186, 186, 245, .62), transparent 62%),
    radial-gradient(700px 500px at 94% -110px, rgba(173, 223, 245, .58), transparent 62%);
}

.selo {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--acento-fundo); color: var(--acento);
  padding: 7px 15px; border-radius: 999px; font-size: .86rem; font-weight: 600;
  opacity: 0; transform: translateY(14px);
}
.selo i { width: 7px; height: 7px; border-radius: 999px; background: var(--verde); }

h1 { margin: 22px 0 0; opacity: 0; transform: translateY(18px); }
h1 em { font-style: normal; color: var(--acento); }
.chamada { margin: 20px auto 0; max-width: 580px; font-size: 1.12rem; color: var(--texto-suave); opacity: 0; transform: translateY(18px); }
.acoes { display: flex; gap: 12px; justify-content: center; margin-top: 32px; flex-wrap: wrap; opacity: 0; transform: translateY(18px); }
.garantias { display: flex; gap: 22px; justify-content: center; flex-wrap: wrap; list-style: none; padding: 0; margin: 26px 0 0; font-size: .9rem; color: var(--texto-fraco); opacity: 0; }
.garantias li { display: flex; align-items: center; gap: 7px; }
.garantias li::before {
  content: ""; width: 15px; height: 15px; border-radius: 999px; flex: none;
  background: var(--verde) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 13 4 4 10-10'/%3E%3C/svg%3E") center/10px no-repeat;
}

/* ------------------------------------------------------------ a cena 3D */

.palco {
  margin: clamp(52px, 7vw, 86px) auto 0;
  width: 100%; max-width: 1360px; padding: 0 24px;
  perspective: 1250px;            /* quanto menor, mais acentuada a profundidade */
  perspective-origin: 50% 35%;
}

.cena {
  position: relative;
  transform-style: preserve-3d;   /* deixa o cartao existir fora do plano */
  transform-origin: 50% 100%;
  /* so inclinacao no eixo X: girar de lado distorce o texto da interface */
  transform:
    rotateX(calc(var(--inclina, 0) * 14deg))
    scale(calc(1 - var(--inclina, 0) * 0.035));
}

/* luz no chao: ancora a janela no espaco em vez de deixa-la boiando */
.cena::after {
  content: "";
  position: absolute; left: 8%; right: 8%; bottom: -34px; height: 70px;
  background: radial-gradient(ellipse at center, rgba(91, 91, 214, .20), transparent 72%);
  opacity: calc(var(--inclina, 0) * .9);   /* opacidade e composicao, nao repintura */
  transform: translateZ(-40px);
  pointer-events: none;
}

.janela {
  border-radius: 14px 14px 0 0; border-bottom: 0; overflow: hidden;
  background: #fff; border: 1px solid var(--borda);
  /* sombra fixa: animar o raio do box-shadow obriga a repintar a camada
     inteira a cada quadro, e essa camada tem o tamanho da janela */
  box-shadow: 0 30px 70px rgba(20, 22, 40, .20), 0 2px 6px rgba(20, 22, 40, .06);
  position: relative;
}

/* o desvanecer da base era um mask-image, que o Safari rerasteriza junto com a
   transformacao 3D; um degrade por cima custa muito menos */
.janela::after {
  content: "";
  position: absolute; inset: auto 0 0 0; height: 28%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff 92%);
  pointer-events: none;
}
.janela-barra {
  display: flex; align-items: center; gap: 7px; padding: 11px 14px;
  background: #f1f2f6; border-bottom: 1px solid var(--borda);
}
.janela-barra span { width: 11px; height: 11px; border-radius: 999px; background: #d6d9e0; }
.janela-barra span:nth-child(1) { background: #ff5f57; }
.janela-barra span:nth-child(2) { background: #febc2e; }
.janela-barra span:nth-child(3) { background: #28c840; }
.janela-barra b { margin: 0 auto; font-size: .78rem; color: var(--texto-fraco); font-weight: 500; }
.janela img { display: block; width: 100%; height: auto; }

/* o cartao flutua a frente da janela, no eixo Z */
.cartao-solto {
  position: absolute; right: 7%; top: 30%; width: 268px;
  background: #fff; border: 1px solid var(--borda); border-radius: 12px;
  padding: 12px 13px; text-align: left;
  transform: translate3d(0, 0, calc(70px + var(--inclina, 0) * 70px)) rotate(-2deg);
  box-shadow: 0 26px 48px rgba(20, 22, 40, .22);
}
.cartao-solto .linha { display: flex; gap: 9px; align-items: flex-start; }
.cartao-solto p { font-size: .9rem; line-height: 1.35; font-weight: 500; }
.cartao-solto .caixa { width: 16px; height: 16px; border-radius: 5px; border: 1.5px solid #cfd3dc; flex: none; margin-top: 2px; }
.cartao-solto .chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 9px; }
.cartao-solto .chip { font-size: .7rem; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--borda); color: var(--texto-suave); }
.cartao-solto .chip.alta { color: #e5484d; border-color: #f6c3c5; }
.cartao-solto .chip.prazo { background: #e5484d; border-color: #e5484d; color: #fff; }
.cartao-solto .chip.etq { background: #fdeaea; border-color: #f5c6c6; color: #c73a3f; font-weight: 600; }

/* ------------------------------------------------------------ entrada */

.pronto .selo, .pronto h1, .pronto .chamada, .pronto .acoes {
  opacity: 1; transform: none;
  transition: opacity .7s ease, transform .7s cubic-bezier(.22, .68, .3, 1);
}
.pronto h1 { transition-delay: .08s; }
.pronto .chamada { transition-delay: .16s; }
.pronto .acoes { transition-delay: .24s; }
.pronto .garantias { opacity: 1; transition: opacity .7s ease .34s; }

.palco { opacity: 0; translate: 0 40px; }
.pronto .palco { opacity: 1; translate: none; transition: opacity .9s ease .3s, translate 1s cubic-bezier(.22, .68, .3, 1) .3s; }

@media (max-width: 860px) {
  .cartao-solto { display: none; }        /* sem espaco para a profundidade */
  .cena { transform: rotateX(calc(var(--inclina, 0) * 10deg)) scale(calc(1 - var(--inclina, 0) * 0.02)); }
}

@media (max-width: 760px) {
  .hero { padding-top: 112px; }
  .acoes .botao { width: 100%; }
  .palco { max-width: 420px; }
  .janela::after { height: 16%; }
}

@media (prefers-reduced-motion: reduce) {
  .cena { transform: none; }
  .cartao-solto { transform: translateZ(0) rotate(-2.5deg); }
}
</style>
