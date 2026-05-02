<template>
  <div>
    <div v-if="loading" class="state">Cargando post...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>

    <template v-else-if="post">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <RouterLink :to="`/category/${post.category}`">{{ post.category }}</RouterLink>
        <span>/</span>
        <span>{{ post.title }}</span>
      </nav>

      <!-- Cabecera del post -->
      <article class="post">
        <header class="post__header">
          <span class="post__tag" :class="`tag--${post.category}`">{{ post.category }}</span>
          <h1 class="post__title">{{ post.title }}</h1>
          <div class="post__meta">
            <div class="author">
              <div class="author__avatar">{{ initials(post.author) }}</div>
              <div>
                <p class="author__name">{{ post.author }}</p>
                <p class="author__date">{{ post.date }} · {{ post.readTime }} min de lectura</p>
              </div>
            </div>
          </div>
        </header>

        <img :src="post.image" :alt="post.title" class="post__img" />

        <div class="post__body">
          <p>{{ post.content }}</p>
          <!-- Cuando tengas contenido real con HTML usa v-html="post.content" -->
        </div>

        <!-- Footer del post -->
        <footer class="post__footer">
          <RouterLink to="/" class="btn-back">← Volver a todos los posts</RouterLink>
        </footer>
      </article>

    </template>

    <div v-else class="state">Post no encontrado.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { PostRepository } from '@/repositories/PostRepository'

const route   = useRoute()
const post    = ref(null)
const loading = ref(false)
const error   = ref(null)

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

onMounted(async () => {
  loading.value = true
  error.value   = null
  try {
    post.value = await PostRepository.getBySlug(route.params.slug)
  } catch {
    error.value = 'No se pudo cargar el post.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.state       { padding: 60px; text-align: center; color: #888; font-size: 15px; }
.state.error { color: #E24B4A; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #aaa;
  margin-bottom: 24px;
}
.breadcrumb a    { color: #666; text-decoration: none; }
.breadcrumb a:hover { color: #534AB7; }
.breadcrumb span { color: #ccc; }

.post {
  background: white;
  border: 0.5px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  max-width: 760px;
  margin: 0 auto;
}
.post__header { padding: 32px 40px 24px; }
.post__tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.tag--vue        { background: #E1F5EE; color: #0F6E56; }
.tag--javascript { background: #FAEEDA; color: #854F0B; }
.tag--patrones   { background: #EEEDFE; color: #534AB7; }
.tag--css        { background: #E6F1FB; color: #185FA5; }

.post__title { font-size: 28px; font-weight: 700; line-height: 1.3; margin-bottom: 20px; }
.author      { display: flex; align-items: center; gap: 12px; }
.author__avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: #EEEDFE; color: #534AB7;
  font-size: 13px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.author__name { font-size: 14px; font-weight: 600; margin: 0; }
.author__date { font-size: 12px; color: #888; margin: 0; }

.post__img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
}
.post__body {
  padding: 36px 40px;
  font-size: 16px;
  color: #333;
  line-height: 1.8;
}
.post__footer {
  padding: 20px 40px 32px;
  border-top: 0.5px solid #f0f0f0;
}
.btn-back {
  display: inline-block;
  font-size: 14px;
  color: #534AB7;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.15s;
}
.btn-back:hover { opacity: 0.7; }
</style>