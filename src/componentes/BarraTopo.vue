<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { arquivoPublico } from '../utilitarios/caminho.js';

const rolou = ref(false);
const menuAberto = ref(false);

function aoRolar() {
  rolou.value = window.scrollY > 12;
}

onMounted(() => {
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });
});
onUnmounted(() => window.removeEventListener('scroll', aoRolar));
</script>

<template>
  <header class="topo" :class="{ fixado: rolou }">
    <div class="limite barra">
      <a href="#inicio" class="marca">
        <img :src="arquivoPublico('icone-180.png')" alt="" width="30" height="30" />
        <span>Controle de Tarefas</span>
      </a>

      <nav class="links" :class="{ aberto: menuAberto }" @click="menuAberto = false">
        <a href="#recursos">Recursos</a>
        <a href="#telas">Telas</a>
        <a href="#perguntas">Perguntas</a>
        <a href="#suporte">Suporte</a>
        <a class="botao botao-principal compacto" href="#baixar">Baixar grátis</a>
      </nav>

      <button class="hamburguer" :aria-expanded="menuAberto" aria-label="Abrir menu"
              @click="menuAberto = !menuAberto">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.topo {
  position: fixed; inset: 0 0 auto; z-index: 50;
  transition: background .3s ease, box-shadow .3s ease, border-color .3s ease;
  border-bottom: 1px solid transparent;
}
.topo.fixado {
  background: rgba(255, 255, 255, .82);
  backdrop-filter: saturate(180%) blur(14px);
  border-bottom-color: var(--borda);
}
.barra { display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 20px; }
.marca { display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: -.02em; }
.marca img { border-radius: 7px; }
.links { display: flex; align-items: center; gap: 28px; }
.links a { color: var(--texto-suave); font-weight: 500; font-size: .96rem; transition: color .2s ease; }
.links a:hover { color: var(--texto); }
.links .botao { color: #fff; }
.compacto { padding: 9px 18px; font-size: .92rem; }
.hamburguer { display: none; background: none; border: 0; padding: 8px; }
.hamburguer span { display: block; width: 22px; height: 2px; background: var(--texto); border-radius: 2px; }
.hamburguer span + span { margin-top: 5px; }

@media (max-width: 760px) {
  .hamburguer { display: block; }
  .links {
    position: absolute; top: 68px; left: 0; right: 0;
    flex-direction: column; align-items: stretch; gap: 0;
    background: #fff; border-bottom: 1px solid var(--borda);
    padding: 8px 24px 20px; box-shadow: var(--sombra-m);
    display: none;
  }
  .links.aberto { display: flex; }
  .links a { padding: 12px 0; }
  .links .botao { margin-top: 10px; justify-content: center; }
}
</style>
