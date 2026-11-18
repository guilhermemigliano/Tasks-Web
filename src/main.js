import { createApp } from 'vue';
import App from './App.vue';
import revelar from './utilitarios/revelar.js';
import parallax from './utilitarios/parallax.js';
import './estilos/base.css';

createApp(App)
  .directive('revelar', revelar)
  .directive('parallax', parallax)
  .mount('#app');
