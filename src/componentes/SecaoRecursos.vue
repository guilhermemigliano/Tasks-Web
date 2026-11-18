<script setup>
import { RECURSOS } from '../dados/recursos.js';
import IconeRecurso from './IconeRecurso.vue';
</script>

<template>
  <section id="recursos" class="secao secao-alt">
    <div class="limite">
      <div class="cabecalho-secao" v-revelar>
        <span class="etiqueta-secao">Recursos</span>
        <h2>O suficiente para organizar, sem virar mais um trabalho</h2>
        <p>Tudo que um controle de tarefas precisa ter — e nada que atrapalhe o caminho.</p>
      </div>

      <div class="grade">
        <article v-for="(recurso, i) in RECURSOS" :key="recurso.titulo" class="cartao" v-revelar="i">
          <div class="icone"><IconeRecurso :nome="recurso.icone" /></div>
          <h3>{{ recurso.titulo }}</h3>
          <p>{{ recurso.texto }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr)); gap: 20px; }
.cartao {
  background: #fff; border: 1px solid var(--borda); border-radius: var(--raio);
  padding: 26px 24px; box-shadow: var(--sombra-s);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.cartao:hover { transform: translateY(-4px); box-shadow: var(--sombra-m); border-color: #d7d9e4; }
.icone {
  width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center;
  background: var(--acento-fundo); color: var(--acento); margin-bottom: 16px;
}
.icone svg { width: 23px; height: 23px; }
.cartao h3 { margin-bottom: 8px; }
.cartao p { color: var(--texto-suave); font-size: .96rem; }
</style>
