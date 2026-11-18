<script setup>
import { PERGUNTAS } from '../dados/recursos.js';
</script>

<template>
  <section id="perguntas" class="secao">
    <div class="limite estreito">
      <div class="cabecalho-secao" v-revelar>
        <span class="etiqueta-secao">Perguntas</span>
        <h2>Dúvidas comuns</h2>
      </div>

      <details v-for="(item, i) in PERGUNTAS" :key="item.pergunta" class="item" v-revelar="i">
        <summary>{{ item.pergunta }}</summary>
        <p>{{ item.resposta }}</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.estreito { max-width: 760px; }
.item { border-bottom: 1px solid var(--borda); padding: 18px 0; }
.item summary {
  cursor: pointer; font-weight: 600; font-size: 1.03rem; list-style: none;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.item summary::-webkit-details-marker { display: none; }
.item summary::after {
  content: "+"; font-size: 1.4rem; font-weight: 400; color: var(--texto-fraco);
  transition: transform .25s ease; line-height: 1;
}
.item[open] summary::after { transform: rotate(45deg); }
.item p { margin-top: 12px; color: var(--texto-suave); font-size: .98rem; }
</style>
