<script setup>
import { arquivoPublico } from '../utilitarios/caminho.js';

const TELAS = [
  {
    id: 'quadro',
    titulo: 'O quadro inteiro de um projeto',
    texto: 'Três colunas, o andamento no topo e os filtros à mão. Cada cartão já mostra prazo, prioridade, etiquetas, progresso das subtarefas e quantos arquivos tem anexados.',
    arquivo: 'capturas/quadro.webp', formato: 'largo'
  },
  {
    id: 'tarefa',
    titulo: 'Tudo da tarefa numa janela só',
    texto: 'Descrição, checklist com contador, etiquetas do projeto e anexos com miniatura. Os arquivos entram arrastando para dentro da janela.',
    arquivo: 'capturas/tarefa.webp', formato: 'medio'
  },
  {
    id: 'etiquetas',
    titulo: 'Etiquetas sob controle',
    texto: 'Cada projeto tem o seu conjunto. Ao excluir uma etiqueta em uso, o aplicativo avisa quantas tarefas serão afetadas antes de confirmar.',
    arquivo: 'capturas/etiquetas.webp', formato: 'medio'
  },
  {
    id: 'escuro',
    titulo: 'Claro ou escuro, como preferir',
    texto: 'O aplicativo segue o tema do sistema na primeira abertura e troca quando você quiser, por um botão ou pelo atalho de teclado.',
    arquivo: 'capturas/app-escuro.webp', formato: 'largo escura'
  }
];
</script>

<template>
  <section id="telas" class="secao">
    <div class="limite">
      <div class="cabecalho-secao" v-revelar>
        <span class="etiqueta-secao">Telas</span>
        <h2>Veja antes de baixar</h2>
        <p>Imagens do aplicativo em funcionamento, sem montagem.</p>
      </div>

      <div class="linhas">
        <article v-for="(tela, i) in TELAS" :key="tela.id" class="linha" :class="{ invertida: i % 2 === 1 }">
          <div class="texto" v-revelar>
            <h3>{{ tela.titulo }}</h3>
            <p>{{ tela.texto }}</p>
          </div>
          <figure class="arte" :class="tela.formato" v-revelar="1" v-parallax="26">
            <img :src="arquivoPublico(tela.arquivo)" :alt="tela.titulo" loading="lazy" />
          </figure>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.linhas { display: flex; flex-direction: column; gap: clamp(56px, 7vw, 96px); }
.linha { display: grid; grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.22fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
/* ao inverter, as larguras das colunas trocam junto com a ordem:
   a imagem precisa continuar na coluna larga, nao na estreita */
.linha.invertida { grid-template-columns: minmax(0, 1.22fr) minmax(260px, 0.78fr); }
.linha.invertida .texto { order: 2; }
.linha.invertida .arte { order: 1; }
.texto h3 { font-size: clamp(1.25rem, 2.1vw, 1.6rem); margin-bottom: 12px; letter-spacing: -.02em; }
.texto p { color: var(--texto-suave); font-size: 1.02rem; }

.arte {
  margin: 0; border-radius: 14px; overflow: hidden;
  border: 1px solid var(--borda); background: #fff;
  box-shadow: var(--sombra-m);
  translate: 0 var(--parallax, 0);
}
.arte img { width: 100%; height: auto; }
.arte.escura { border-color: #262a35; background: #11131a; }
.arte.medio { max-width: 560px; margin-inline: auto; }

@media (max-width: 860px) {
  .linha, .linha.invertida { grid-template-columns: 1fr; }
  .linha.invertida .texto, .linha.invertida .arte { order: initial; }
  .arte { translate: none; }
}
</style>
