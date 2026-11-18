<script setup>
const EMAIL = 'guilhermemigliano@gmail.com';
const ASSUNTO = encodeURIComponent('Controle de Tarefas — suporte');
</script>

<template>
  <section id="suporte" class="secao">
    <div class="limite">
      <div class="caixa" v-revelar>
        <div class="texto">
          <span class="etiqueta-secao">Suporte</span>
          <h2>Travou em alguma coisa?</h2>
          <p>
            Problema, dúvida ou sugestão: é só mandar um e-mail. Toda mensagem é lida
            e respondida por uma pessoa — não há central de atendimento nem robô no meio.
          </p>
          <p class="detalhe">
            Se for um erro, conte o que você estava fazendo e informe o sistema
            (Windows ou macOS) e a versão do aplicativo, que aparece em
            <b>Ajustes&nbsp;›&nbsp;Sobre</b>. Com isso fica bem mais rápido resolver.
          </p>
        </div>

        <div class="acao">
          <a class="botao botao-principal" :href="`mailto:${EMAIL}?subject=${ASSUNTO}`">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
                 stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="m3.5 7 8.5 6 8.5-6" />
            </svg>
            Enviar e-mail
          </a>
          <a class="endereco" :href="`mailto:${EMAIL}?subject=${ASSUNTO}`">{{ EMAIL }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.caixa {
  display: grid; grid-template-columns: minmax(0, 1.5fr) auto; gap: clamp(28px, 5vw, 60px);
  align-items: center;
  background: linear-gradient(135deg, #f4f4fd 0%, #eef6fb 100%);
  border: 1px solid var(--borda);
  border-radius: 18px;
  padding: clamp(32px, 4.5vw, 52px);
}
.texto h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); margin-bottom: 14px; }
.texto p { color: var(--texto-suave); max-width: 560px; }
.texto .detalhe { font-size: .92rem; margin-top: 14px; color: var(--texto-fraco); }
.texto .detalhe b { color: var(--texto-suave); font-weight: 600; }

.acao { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.acao .botao { padding: 15px 28px; font-size: 1.02rem; }
.endereco {
  font-size: .9rem; color: var(--texto-suave); border-bottom: 1px dashed var(--borda-forte, #c9ccd6);
  padding-bottom: 1px; transition: color .2s ease;
}
.endereco:hover { color: var(--acento); }

@media (max-width: 820px) {
  .caixa { grid-template-columns: 1fr; text-align: center; }
  .texto p { margin-inline: auto; }
  .acao .botao { width: 100%; }
}
</style>
