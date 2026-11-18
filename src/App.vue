<script setup>
import BarraTopo from './componentes/BarraTopo.vue';
import SecaoHero from './componentes/SecaoHero.vue';
import SecaoRecursos from './componentes/SecaoRecursos.vue';
import SecaoCapturas from './componentes/SecaoCapturas.vue';
import SecaoDownloads from './componentes/SecaoDownloads.vue';
import SecaoPerguntas from './componentes/SecaoPerguntas.vue';
import RodapeSite from './componentes/RodapeSite.vue';
</script>

<template>
  <BarraTopo />
  <main>
    <SecaoHero />
    <SecaoRecursos />
    <SecaoCapturas />
    <SecaoDownloads />
    <SecaoPerguntas />
  </main>
  <RodapeSite />
</template>
