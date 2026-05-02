<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: 'Inter', sans-serif; background: #f8f8f8; }
.app  { display: flex; flex-direction: column; min-height: 100vh; }
.main { flex: 1; max-width: 1100px; width: 100%; margin: 0 auto; padding: 32px 24px; }
</style>