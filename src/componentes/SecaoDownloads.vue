<script setup>
import { onMounted, ref } from 'vue';
import { SISTEMAS, VERSAO, enderecoDe, detectarSistema, provavelAppleSilicon } from '../dados/downloads.js';

const meuSistema = ref(null);
const meuChipApple = ref(true);

function destacado(sistema, opcao) {
  if (sistema.id !== meuSistema.value) return false;
  if (sistema.id === 'windows') return opcao.id === 'win-instalador';
  return opcao.id === (meuChipApple.value ? 'mac-arm' : 'mac-intel');
}

onMounted(() => {
  meuSistema.value = detectarSistema();
  meuChipApple.value = provavelAppleSilicon();
});
</script>

<template>
  <section id="baixar" class="secao secao-alt">
    <div class="limite">
      <div class="cabecalho-secao" v-revelar>
        <span class="etiqueta-secao">Download</span>
        <h2>Escolha a sua versão</h2>
        <p>Versão {{ VERSAO }} · gratuita · sem cadastro. Não sabe qual? A opção recomendada já vem marcada.</p>
      </div>

      <div class="sistemas">
        <article v-for="(sistema, i) in SISTEMAS" :key="sistema.id" class="bloco" v-revelar="i">
          <header>
            <h3>{{ sistema.nome }}</h3>
            <span v-if="sistema.id === meuSistema" class="seu">Seu sistema</span>
            <p>{{ sistema.requisito }}</p>
          </header>

          <div class="opcoes">
            <div v-for="opcao in sistema.opcoes" :key="opcao.id"
                 class="opcao" :class="{ destaque: destacado(sistema, opcao) }">
              <div class="info">
                <h4>
                  {{ opcao.titulo }}
                  <em v-if="opcao.recomendado">recomendado</em>
                </h4>
                <p>{{ opcao.resumo }}</p>
                <small>{{ opcao.arquivo }} · {{ opcao.tamanho }}</small>
              </div>
              <a v-if="enderecoDe(opcao)" class="botao botao-principal" :href="enderecoDe(opcao)" download>
                Baixar
              </a>
              <span v-else class="botao indisponivel" title="Os arquivos ainda não foram publicados">
                Em breve
              </span>
            </div>
          </div>

          <details class="aviso">
            <summary>{{ sistema.aviso.titulo }}</summary>
            <p>{{ sistema.aviso.texto }}</p>
          </details>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sistemas { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr)); gap: 22px; align-items: start; }
.bloco { background: #fff; border: 1px solid var(--borda); border-radius: var(--raio); padding: 26px; box-shadow: var(--sombra-s); }
.bloco header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.bloco header h3 { font-size: 1.3rem; }
.bloco header p { width: 100%; color: var(--texto-fraco); font-size: .88rem; margin-top: -4px; }
.seu { background: var(--acento-fundo); color: var(--acento); font-size: .74rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: .05em; }

.opcoes { display: flex; flex-direction: column; gap: 12px; }
.opcao {
  display: flex; align-items: center; gap: 16px; justify-content: space-between;
  border: 1px solid var(--borda); border-radius: 12px; padding: 16px 18px;
  transition: border-color .22s ease, background .22s ease, transform .22s ease;
}
.opcao:hover { transform: translateY(-2px); border-color: #cfd2de; }
.opcao.destaque { border-color: var(--acento); background: linear-gradient(180deg, var(--acento-fundo), #fff); }
.info h4 { margin: 0 0 4px; font-size: 1rem; display: flex; align-items: center; gap: 8px; }
.info h4 em {
  font-style: normal; font-size: .68rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .05em; color: var(--verde); background: #e8f8ee; padding: 3px 8px; border-radius: 999px;
}
.info p { color: var(--texto-suave); font-size: .9rem; }
.info small { color: var(--texto-fraco); font-size: .78rem; display: block; margin-top: 6px; word-break: break-all; }
.opcao .botao { padding: 11px 20px; }
.indisponivel { background: #eceef3; color: var(--texto-fraco); cursor: not-allowed; }

.aviso { margin-top: 20px; border-top: 1px solid var(--borda); padding-top: 14px; }
.aviso summary { cursor: pointer; font-size: .9rem; font-weight: 600; color: var(--texto-suave); }
.aviso summary::marker { color: var(--texto-fraco); }
.aviso p { margin-top: 10px; font-size: .9rem; color: var(--texto-suave); }

@media (max-width: 560px) {
  .opcao { flex-direction: column; align-items: stretch; }
  .opcao .botao { width: 100%; }
}
</style>
