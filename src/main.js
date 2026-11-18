import { createApp } from 'vue';
import App from './App.vue';
import revelar from './utilitarios/revelar.js';
import './estilos/base.css';

createApp(App).directive('revelar', revelar).mount('#app');
