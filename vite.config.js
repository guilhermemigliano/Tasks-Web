import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// O site é publicado em guilhermemigliano.github.io/Tasks-Web/, então os
// arquivos precisam ser servidos a partir desse subcaminho. Em desenvolvimento
// o caminho é a raiz, senão o servidor local não acha os arquivos.
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'build' ? '/Tasks-Web/' : '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048
  }
}));
