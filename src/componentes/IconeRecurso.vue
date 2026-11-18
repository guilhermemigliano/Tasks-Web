<script setup>
defineProps({ nome: { type: String, required: true } });
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="nome === 'pastas'">
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h3.4a1.5 1.5 0 0 1 1.2.6l.9 1.2h8.5A1.5 1.5 0 0 1 20 9.3v8.2a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 3 17.5z" />
      <path d="M7 6V4.5A1.5 1.5 0 0 1 8.5 3h3.2a1.5 1.5 0 0 1 1.2.6l.9 1.2h5.7" opacity=".45" />
    </template>
    <template v-else-if="nome === 'colunas'">
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="9.5" y="4" width="5" height="11" rx="1.5" />
      <rect x="16" y="4" width="5" height="7" rx="1.5" />
    </template>
    <template v-else-if="nome === 'relogio'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </template>
    <template v-else-if="nome === 'etiqueta'">
      <path d="M12.6 3.5H19a1.5 1.5 0 0 1 1.5 1.5v6.4a1.5 1.5 0 0 1-.44 1.06l-7.1 7.1a1.5 1.5 0 0 1-2.12 0l-6.4-6.4a1.5 1.5 0 0 1 0-2.12l7.1-7.1a1.5 1.5 0 0 1 1.06-.44z" />
      <circle cx="16.3" cy="7.7" r="1.4" />
    </template>
    <template v-else-if="nome === 'clipe'">
      <path d="M18.5 10.5 11 18a4 4 0 0 1-5.7-5.7l7.8-7.8a2.7 2.7 0 0 1 3.8 3.8l-7.7 7.7a1.4 1.4 0 0 1-2-2l7.1-7.1" />
    </template>
    <template v-else-if="nome === 'cadeado'">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
      <circle cx="12" cy="15.5" r="1.3" />
    </template>
  </svg>
</template>
