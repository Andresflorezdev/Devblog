<template>
  <header class="header">
    <div class="header__inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <span class="logo__dot"></span>
        <span class="logo__text">DevBlog</span>
      </RouterLink>

      <!-- Nav -->
      <nav class="nav">
        <RouterLink to="/" class="nav__link">Inicio</RouterLink>
        <RouterLink to="/category/vue" class="nav__link">Vue</RouterLink>
        <RouterLink to="/category/javascript" class="nav__link"
          >JavaScript</RouterLink
        >
        <RouterLink to="/category/patrones" class="nav__link"
          >Patrones</RouterLink
        >
      </nav>

      <!-- Búsqueda -->
      <form class="search" @submit.prevent="handleSearch">
        <svg
          class="search__icon"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <circle cx="6.5" cy="6.5" r="4" />
          <path d="M11 11l2.5 2.5" />
        </svg>
        <input
          v-model="query"
          class="search__input"
          placeholder="Buscar posts..."
        />
      </form>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const query = ref('');
const router = useRouter();
const route = useRoute();
let searchTimer = null;

query.value = typeof route.query.q === 'string' ? route.query.q : '';

watch(
  () => route.query.q,
  (value) => {
    query.value = typeof value === 'string' ? value : '';
  },
);

function handleSearch() {
  if (searchTimer) {
    clearTimeout(searchTimer);
    searchTimer = null;
  }

  const text = query.value.trim();
  const currentQuery = typeof route.query.q === 'string' ? route.query.q : '';

  if (text === currentQuery && route.path === '/') return;

  router.push({
    path: '/',
    query: text ? { q: text } : {},
  });
}

watch(query, () => {
  if (searchTimer) clearTimeout(searchTimer);

  searchTimer = setTimeout(() => {
    const text = query.value.trim();
    const currentQuery = typeof route.query.q === 'string' ? route.query.q : '';

    if (text === currentQuery && route.path === '/') return;

    router.replace({
      path: '/',
      query: text ? { q: text } : {},
    });
  }, 380);
});

onBeforeUnmount(() => {
  if (searchTimer) clearTimeout(searchTimer);
});
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 0.5px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 32px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  flex-shrink: 0;
}
.logo__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #534ab7;
}
.logo__text {
  line-height: 1;
}
.nav {
  display: flex;
  gap: 24px;
  flex: 1;
  margin-left: 10px;
}
.nav__link {
  font-size: 14px;
  color: #666;
  text-decoration: none;
  transition: color 0.15s;
}
.nav__link:hover,
.nav__link.router-link-active {
  color: #534ab7;
  font-weight: 500;
}
.search {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f5f5f5;
  border: 0.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 6px 12px;
}
.search__icon {
  width: 14px;
  height: 14px;
  opacity: 0.4;
  flex-shrink: 0;
}
.search__input {
  border: none;
  background: transparent;
  font-size: 13px;
  outline: none;
  width: 160px;
  color: #1a1a1a;
}
</style>
