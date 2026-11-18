<script setup>
import { computed, onMounted, ref } from 'vue';
import { arquivoPublico } from '../utilitarios/caminho.js';
import { detectarSistema, VERSAO } from '../dados/downloads.js';

const sistema = ref(null);
const visivel = ref(false);

const rotuloBotao = computed(() => {
  if (sistema.value === 'windows') return 'Baixar para Windows';
  if (sistema.value === 'mac') return 'Baixar para macOS';
  return 'Baixar grátis';
});

onMounted(() => {
  sistema.value = detectarSistema();
  requestAnimationFrame(() => { visivel.value = true; });
});
</script>

<template>
  <section id="inicio" class="hero" :class="{ pronto: visivel }">
    <div class="brilho brilho-a"></div>
    <div class="brilho brilho-b"></div>

    <div class="limite conteudo">
      <span class="selo">
        <i></i> Versão {{ VERSAO }} · Windows e macOS
      </span>

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

    <div class="limite palco">
      <div class="janela flutua">
        <div class="janela-barra"><span></span><span></span><span></span><b>Controle de Tarefas</b></div>
        <img :src="arquivoPublico('capturas/quadro-claro.webp')" width="1920" height="1200"
             alt="Quadro do aplicativo com as colunas A fazer, Em andamento e Concluído" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; padding: 140px 0 0; overflow: hidden; }
.conteudo { position: relative; text-align: center; max-width: 820px; }

.brilho { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .5; pointer-events: none; }
.brilho-a { width: 520px; height: 520px; background: #c7c7f8; top: -180px; left: -120px; animation: vagar 17s ease-in-out infinite; }
.brilho-b { width: 460px; height: 460px; background: #bfe6f7; top: -120px; right: -140px; animation: vagar 21s ease-in-out infinite reverse; }

@keyframes vagar {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, 30px) scale(1.12); }
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

.chamada {
  margin: 20px auto 0; max-width: 580px; font-size: 1.12rem; color: var(--texto-suave);
  opacity: 0; transform: translateY(18px);
}

.acoes { display: flex; gap: 12px; justify-content: center; margin-top: 32px; flex-wrap: wrap; opacity: 0; transform: translateY(18px); }

.garantias {
  display: flex; gap: 22px; justify-content: center; flex-wrap: wrap;
  list-style: none; padding: 0; margin: 26px 0 0;
  font-size: .9rem; color: var(--texto-fraco); opacity: 0;
}
.garantias li { display: flex; align-items: center; gap: 7px; }
.garantias li::before {
  content: ""; width: 15px; height: 15px; border-radius: 999px; flex: none;
  background: var(--verde) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 13 4 4 10-10'/%3E%3C/svg%3E") center/10px no-repeat;
}

.palco { margin-top: clamp(44px, 6vw, 72px); padding-bottom: 20px; perspective: 1400px; }
.palco .janela { opacity: 0; transform: translateY(44px) rotateX(7deg); transform-origin: top center; }

.pronto .selo,
.pronto h1,
.pronto .chamada,
.pronto .acoes { opacity: 1; transform: none; transition: opacity .7s ease, transform .7s cubic-bezier(.22,.68,.3,1); }
.pronto h1 { transition-delay: .08s; }
.pronto .chamada { transition-delay: .16s; }
.pronto .acoes { transition-delay: .24s; }
.pronto .garantias { opacity: 1; transition: opacity .7s ease .34s; }
.pronto .palco .janela {
  opacity: 1; transform: none;
  transition: opacity .9s ease .3s, transform 1s cubic-bezier(.22,.68,.3,1) .3s;
}

.flutua { animation: flutuar 7s ease-in-out 1.6s infinite; }
@keyframes flutuar {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -10px; }
}

@media (max-width: 760px) {
  .hero { padding-top: 112px; }
  .acoes .botao { width: 100%; }
}
</style>
