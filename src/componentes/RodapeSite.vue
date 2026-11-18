<script setup>
import { arquivoPublico } from '../utilitarios/caminho.js';
const ano = new Date().getFullYear();
const REPOSITORIO = 'https://github.com/guilhermemigliano/Tasks-Web';
</script>

<template>
  <footer class="rodape">
    <div class="limite grade">
      <div class="sobre">
        <a href="#inicio" class="marca">
          <img :src="arquivoPublico('icone-180.png')" alt="" width="34" height="34" />
          <span>Controle de Tarefas</span>
        </a>
        <p>Um gerenciador de projetos e tarefas que roda no seu computador, sem nuvem e sem assinatura.</p>
      </div>

      <nav>
        <h4>Navegar</h4>
        <a href="#recursos">Recursos</a>
        <a href="#telas">Telas</a>
        <a href="#baixar">Download</a>
        <a href="#perguntas">Perguntas</a>
      </nav>

      <nav>
        <h4>Projeto</h4>
        <a :href="REPOSITORIO" target="_blank" rel="noopener">Código deste site</a>
        <a :href="`${REPOSITORIO}/issues`" target="_blank" rel="noopener">Relatar um problema</a>
      </nav>
    </div>

    <div class="limite base">
      <small>© {{ ano }} Task Manager</small>
      <small>Windows 10+ · macOS 11+</small>
    </div>
  </footer>
</template>

<style scoped>
.rodape { background: var(--fundo-escuro); color: #aeb5c4; padding: 60px 0 28px; }
.grade { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; padding-bottom: 40px; }
.marca { display: flex; align-items: center; gap: 11px; color: #fff; font-weight: 700; margin-bottom: 14px; }
.marca img { border-radius: 8px; }
.sobre p { max-width: 330px; font-size: .93rem; }
nav { display: flex; flex-direction: column; gap: 10px; }
nav h4 { margin: 0 0 4px; color: #fff; font-size: .82rem; text-transform: uppercase; letter-spacing: .08em; }
nav a { font-size: .93rem; transition: color .2s ease; }
nav a:hover { color: #fff; }
.base {
  display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  border-top: 1px solid rgba(255, 255, 255, .1); padding-top: 22px; color: #6d7586; font-size: .84rem;
}
@media (max-width: 760px) { .grade { grid-template-columns: 1fr; gap: 30px; } }
</style>
