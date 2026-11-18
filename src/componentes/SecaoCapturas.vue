<script setup>
import { ref } from 'vue';
import { arquivoPublico } from '../utilitarios/caminho.js';

const TELAS = [
  { id: 'quadro', rotulo: 'Quadro', arquivo: 'capturas/quadro-claro.webp', escura: false,
    texto: 'Arraste os cartões entre as colunas. Cada um mostra prazo, prioridade, etiquetas e quantos anexos tem.' },
  { id: 'tarefa', rotulo: 'Detalhes da tarefa', arquivo: 'capturas/tarefa.webp', escura: false,
    texto: 'Descrição, checklist de subtarefas, etiquetas e arquivos anexados — tudo numa janela só.' },
  { id: 'escuro', rotulo: 'Tema escuro', arquivo: 'capturas/quadro-escuro.webp', escura: true,
    texto: 'O app segue o tema do sistema e pode ser trocado a qualquer momento, com um atalho de teclado.' },
  { id: 'lista', rotulo: 'Modo lista', arquivo: 'capturas/lista-escuro.webp', escura: true,
    texto: 'Prefere ver tudo em sequência? A mesma informação, em uma lista compacta e ordenada por status.' },
  { id: 'ajustes', rotulo: 'Etiquetas', arquivo: 'capturas/configuracoes.webp', escura: false,
    texto: 'Crie e remova etiquetas por projeto. Ao excluir uma que está em uso, o app avisa quantas tarefas serão afetadas.' }
];

const ativa = ref(TELAS[0]);
</script>

<template>
  <section id="telas" class="secao">
    <div class="limite">
      <div class="cabecalho-secao" v-revelar>
        <span class="etiqueta-secao">Telas</span>
        <h2>Veja antes de baixar</h2>
        <p>Imagens reais do aplicativo rodando, sem montagem.</p>
      </div>

      <div class="abas" v-revelar>
        <button v-for="tela in TELAS" :key="tela.id"
                :class="{ ativa: ativa.id === tela.id }"
                @click="ativa = tela">
          {{ tela.rotulo }}
        </button>
      </div>

      <div class="palco" v-revelar>
        <Transition name="trocar" mode="out-in">
          <div class="janela" :class="{ escura: ativa.escura }" :key="ativa.id">
            <div class="janela-barra"><span></span><span></span><span></span><b>Controle de Tarefas</b></div>
            <img :src="arquivoPublico(ativa.arquivo)" :alt="`Tela do aplicativo: ${ativa.rotulo}`"
                 width="1920" height="1200" loading="lazy" />
          </div>
        </Transition>
        <Transition name="trocar" mode="out-in">
          <p class="legenda" :key="ativa.id">{{ ativa.texto }}</p>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.abas { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 30px; }
.abas button {
  border: 1px solid var(--borda); background: #fff; color: var(--texto-suave);
  padding: 9px 17px; border-radius: 999px; font-size: .93rem; font-weight: 500;
  transition: all .22s ease;
}
.abas button:hover { color: var(--texto); border-color: var(--texto-fraco); }
.abas button.ativa { background: var(--texto); border-color: var(--texto); color: #fff; }

.palco { max-width: 1000px; margin: 0 auto; }
.legenda { text-align: center; color: var(--texto-suave); margin-top: 20px; font-size: .97rem; }

.trocar-enter-active, .trocar-leave-active { transition: opacity .28s ease, transform .28s ease; }
.trocar-enter-from { opacity: 0; transform: translateY(10px); }
.trocar-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
