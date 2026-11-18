<script setup>
import BarraTopo from './componentes/BarraTopo.vue';
import SecaoHero from './componentes/SecaoHero.vue';
import SecaoDemonstracao from './componentes/SecaoDemonstracao.vue';
import SecaoRecursos from './componentes/SecaoRecursos.vue';
import SecaoCapturas from './componentes/SecaoCapturas.vue';
import SecaoDownloads from './componentes/SecaoDownloads.vue';
import SecaoPerguntas from './componentes/SecaoPerguntas.vue';
import SecaoSuporte from './componentes/SecaoSuporte.vue';
import RodapeSite from './componentes/RodapeSite.vue';
</script>

<template>
  <BarraTopo />
  <main>
    <SecaoHero />
    <SecaoDemonstracao />
    <SecaoRecursos />
    <SecaoCapturas />
    <SecaoDownloads />
    <SecaoPerguntas />
    <SecaoSuporte />
  </main>
  <RodapeSite />
</template>
