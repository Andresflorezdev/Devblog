<template>
  <div>
    <div v-if="loading" class="state">Cargando categoría...</div>
    <div v-else-if="error"   class="state error">{{ error }}</div>

    <template v-else>
      <!-- Cabecera de categoría -->
      <div class="cat-header">
        <RouterLink to="/" class="back">← Inicio</RouterLink>
        <div class="cat-info">
          <span class="cat-badge" :class="`tag--${slug}`">{{ category?.name ?? slug }}</span>
          <h1 class="cat-title">{{ category?.description ?? 'Posts de ' + slug }}</h1>
          <p class="cat-count">{{ posts.length }} artículo{{ posts.length !== 1 ? 's' : '' }}</p>
        </div>
      </div>

      <!-- Posts de esta categoría -->
      <div v-if="posts.length" class="grid">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>

      <div v-else class="empty">
        No hay posts en esta categoría todavía.
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '@/components/blog/PostCard.vue'
import { usePosts } from '@/composables/usePosts'
import { CategoryRepository } from '@/repositories/CategoryRepository'

const route    = useRoute()
const slug     = ref(route.params.slug)
const category = ref(null)

const { posts, loading, error, fetchByCategory } = usePosts()

async function load(s) {
  slug.value     = s
  category.value = await CategoryRepository.getBySlug(s)
  await fetchByCategory(s)
}

onMounted(() => load(route.params.slug))

// Si el usuario navega entre categorías sin recargar la página
watch(() => route.params.slug, (newSlug) => load(newSlug))
</script>

<style scoped>
.state       { padding: 60px; text-align: center; color: #888; }
.state.error { color: #E24B4A; }

.cat-header {
  margin-bottom: 32px;
}
.back {
  display: inline-block;
  font-size: 13px;
  color: #888;
  text-decoration: none;
  margin-bottom: 16px;
  transition: color 0.15s;
}
.back:hover { color: #534AB7; }

.cat-info { display: flex; flex-direction: column; gap: 6px; }

.cat-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 20px;
  width: fit-content;
}
.tag--vue        { background: #E1F5EE; color: #0F6E56; }
.tag--javascript { background: #FAEEDA; color: #854F0B; }
.tag--patrones   { background: #EEEDFE; color: #534AB7; }
.tag--css        { background: #E6F1FB; color: #185FA5; }

.cat-title  { font-size: 22px; font-weight: 700; margin: 0; }
.cat-count  { font-size: 13px; color: #aaa; margin: 0; }

.grid  { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.empty { padding: 60px; text-align: center; color: #aaa; font-size: 14px; }
</style>