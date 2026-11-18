<script setup>
import { computed, ref } from 'vue';
import { usarProgressoDeRolagem, trecho } from '../utilitarios/progressoDeRolagem.js';

const trilho = ref(null);
const { progresso, reduzido } = usarProgressoDeRolagem(trilho);

/* Linha do tempo da cena, em fracoes do percurso de rolagem ------------- */
const surgir   = computed(() => trecho(progresso.value, 0.06, 0.22));  // o cartao nasce
const detalhar = computed(() => trecho(progresso.value, 0.24, 0.38));  // ganha prazo e etiquetas
const mover    = computed(() => trecho(progresso.value, 0.42, 0.62));  // vai para Em andamento
const avancar  = computed(() => trecho(progresso.value, 0.62, 0.78));  // subtarefas sao marcadas
const concluir = computed(() => trecho(progresso.value, 0.82, 0.97));  // vai para Concluido

const PASSOS = [
  { titulo: 'Crie a tarefa', texto: 'Um título e pronto: ela já nasce na coluna A fazer.' },
  { titulo: 'Dê o contexto', texto: 'Prazo, prioridade e etiquetas aparecem no próprio cartão.' },
  { titulo: 'Arraste conforme avança', texto: 'Solte o cartão em Em andamento quando começar.' },
  { titulo: 'Marque o que já foi', texto: 'As subtarefas viram um contador de progresso.' },
  { titulo: 'Conclua', texto: 'O cartão vai para Concluído e sai do seu caminho.' }
];

const passoAtivo = computed(() => {
  const p = progresso.value;
  if (p < 0.24) return 0;
  if (p < 0.42) return 1;
  if (p < 0.62) return 2;
  if (p < 0.82) return 3;
  return 4;
});

/* Posicao do cartao: 0 = A fazer, 1 = Em andamento, 2 = Concluido -------- */
const coluna = computed(() => mover.value + concluir.value);

const estiloCartao = computed(() => {
  const emTransito = Math.sin(Math.PI * mover.value) + Math.sin(Math.PI * concluir.value);
  return {
    '--coluna': coluna.value,
    '--erguer': emTransito,
    opacity: surgir.value,
    transform: `scale(${0.94 + 0.06 * surgir.value})`
  };
});

const feitas = computed(() => 1 + Math.round(avancar.value * 4));
const concluida = computed(() => concluir.value > 0.6);
</script>

<template>
  <section class="demo" :class="{ estatico: reduzido }">
    <div class="trilho" ref="trilho">
      <div class="palco">
        <div class="limite grade">

          <div class="roteiro">
            <span class="etiqueta-secao">Como funciona</span>
            <h2>Do título ao concluído, sem cerimônia</h2>
            <ol>
              <li v-for="(passo, i) in PASSOS" :key="passo.titulo"
                  :class="{ ativo: passoAtivo === i, visto: passoAtivo > i }">
                <b>{{ passo.titulo }}</b>
                <span>{{ passo.texto }}</span>
              </li>
            </ol>
          </div>

          <div class="quadro" aria-hidden="true">
            <div class="coluna" v-for="col in ['A fazer', 'Em andamento', 'Concluído']" :key="col">
              <header><i :class="col === 'A fazer' ? 'cinza' : col === 'Em andamento' ? 'azul' : 'verde'"></i>{{ col }}</header>
            </div>

            <!-- cartoes de apoio, parados -->
            <article class="cartao fixo um"><span class="caixa"></span><p>Revisar os textos da página</p></article>
            <article class="cartao fixo dois"><span class="caixa"></span><p>Trocar as fotos da equipe</p></article>

            <!-- o cartao que percorre a cena -->
            <article class="cartao movel" :class="{ feito: concluida }" :style="estiloCartao">
              <div class="linha">
                <span class="caixa" :class="{ marcada: concluida }"></span>
                <p>Montar o formulário de contato</p>
              </div>
              <div class="chips" :style="{ opacity: detalhar }">
                <span class="chip alta">Alta</span>
                <span class="chip prazo">16/11</span>
                <span class="chip conta">{{ feitas }}/5</span>
                <span class="chip etq">urgente</span>
              </div>
            </article>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trilho { height: 340vh; }
.palco { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; overflow: hidden; }
.grade { display: grid; grid-template-columns: minmax(280px, 1fr) minmax(0, 1.35fr); gap: 56px; align-items: center; }

/* ----------------------------------------------------------- roteiro */
.roteiro h2 { margin-bottom: 26px; }
.roteiro ol { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.roteiro li {
  display: grid; gap: 2px; padding: 12px 16px; border-radius: 11px;
  border-left: 2px solid var(--borda); opacity: .38;
  transition: opacity .4s ease, background .4s ease, border-color .4s ease, transform .4s ease;
}
.roteiro li b { font-size: 1.02rem; }
.roteiro li span { font-size: .93rem; color: var(--texto-suave); }
.roteiro li.visto { opacity: .6; border-left-color: #c9cbf5; }
.roteiro li.ativo {
  opacity: 1; background: #fff; border-left-color: var(--acento);
  box-shadow: var(--sombra-s); transform: translateX(4px);
}

/* ----------------------------------------------------------- quadro */
.quadro {
  position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
  background: var(--fundo-alt); border: 1px solid var(--borda); border-radius: 16px;
  padding: 16px; height: 390px; box-shadow: var(--sombra-m);
}
.coluna { background: #fff; border: 1px solid var(--borda); border-radius: 12px; }
.coluna header {
  display: flex; align-items: center; gap: 8px; padding: 12px 13px;
  font-size: .86rem; font-weight: 650; color: var(--texto-suave);
}
.coluna header i { width: 8px; height: 8px; border-radius: 999px; background: #9aa1ac; }
.coluna header i.azul { background: #3b82f6; }
.coluna header i.verde { background: #16a34a; }

.cartao {
  position: absolute; width: calc((100% - 32px - 28px) / 3); left: 16px;
  background: #fff; border: 1px solid var(--borda); border-radius: 10px;
  padding: 10px 11px; box-shadow: var(--sombra-s);
}
.cartao p { font-size: .88rem; line-height: 1.35; }
.cartao .linha { display: flex; gap: 8px; align-items: flex-start; }
.caixa { width: 15px; height: 15px; border-radius: 5px; border: 1.5px solid #cfd3dc; flex: none; margin-top: 2px; position: relative; }
.caixa.marcada { background: #16a34a; border-color: #16a34a; }
.caixa.marcada::after {
  content: ""; position: absolute; left: 4px; top: 1px; width: 4px; height: 8px;
  border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(43deg);
}
.cartao.fixo { display: flex; gap: 8px; align-items: flex-start; }
.cartao.um { top: 62px; }
.cartao.dois { top: 118px; }

.cartao.movel {
  top: 174px; z-index: 3;
  /* a posicao horizontal acompanha --coluna (0, 1 ou 2) e --erguer da o salto */
  translate: calc(var(--coluna, 0) * (100% + 14px)) calc(var(--erguer, 0) * -16px);
  rotate: calc(var(--erguer, 0) * -1.6deg);
  box-shadow: 0 calc(4px + var(--erguer, 0) * 18px) calc(12px + var(--erguer, 0) * 28px) rgba(18, 20, 30, calc(.07 + var(--erguer, 0) * .13));
  will-change: translate, rotate;
}
.cartao.movel.feito p { text-decoration: line-through; color: var(--texto-fraco); }
/* concluida, a tarefa perde o alarme do prazo vencido */
.cartao.movel.feito .chip { opacity: .55; }
.cartao.movel.feito .chip.prazo { background: transparent; border-color: var(--borda); color: var(--texto-fraco); }

.chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; transition: opacity .3s ease; }
.chip { font-size: .68rem; padding: 2px 7px; border-radius: 999px; border: 1px solid var(--borda); color: var(--texto-suave); }
.chip.alta { color: #e5484d; border-color: #f6c3c5; }
.chip.prazo { background: #e5484d; border-color: #e5484d; color: #fff; }
.chip.etq { background: #fdeaea; border-color: #f5c6c6; color: #c73a3f; font-weight: 600; }

/* ----------------------------------------------------------- telas menores */
@media (max-width: 900px) {
  .trilho { height: 300vh; }
  .grade { grid-template-columns: 1fr; gap: 28px; }
  .quadro { height: 320px; padding: 12px; gap: 10px; }
  .cartao { width: calc((100% - 24px - 20px) / 3); left: 12px; font-size: .8rem; }
  .cartao.movel { translate: calc(var(--coluna, 0) * (100% + 10px)) calc(var(--erguer, 0) * -14px); }
  .roteiro li { padding: 9px 12px; }
  .roteiro li span { font-size: .86rem; }
}

/* quem pediu menos movimento ve a cena final, sem rolagem presa */
.demo.estatico .trilho { height: auto; }
.demo.estatico .palco { position: static; height: auto; padding: clamp(68px, 9vw, 120px) 0; }
.demo.estatico .roteiro li { opacity: 1; }
</style>
