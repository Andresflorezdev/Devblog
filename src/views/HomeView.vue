<template>
  <div>
    <!-- Spinner de carga -->
    <div v-if="loading" class="loading">Cargando posts...</div>

    <!-- Error -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <!-- Post destacado -->
      <section v-if="featured && !hasSearch" class="featured">
        <span class="featured__badge">Destacado</span>
        <h1 class="featured__title">{{ featured.title }}</h1>
        <p class="featured__meta">
          {{ featured.author }} · {{ featured.date }} ·
          {{ featured.readTime }} min
        </p>
        <RouterLink :to="`/post/${featured.slug}`" class="featured__btn">
          Leer artículo →
        </RouterLink>
      </section>

      <!-- Grid de posts -->
      <section class="posts-grid">
        <h2 class="section-title">
          {{ hasSearch ? `Resultados para "${searchTerm}"` : 'Últimos posts' }}
        </h2>
        <p v-if="hasSearch" class="search-meta">
          {{ filteredPosts.length }} resultado{{
            filteredPosts.length !== 1 ? 's' : ''
          }}
        </p>
        <div v-if="filteredPosts.length" class="grid">
          <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
        </div>
        <p v-else class="empty">No encontramos posts con ese término.</p>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostCard from '@/components/blog/PostCard.vue';
import { usePosts } from '@/composables/usePosts';

const route = useRoute();
const { posts, featured, loading, error, fetchAll } = usePosts();

const searchTerm = computed(() => {
  const q = route.query.q;
  return typeof q === 'string' ? q.trim().toLowerCase() : '';
});

const hasSearch = computed(() => !!searchTerm.value);

const filteredPosts = computed(() => {
  if (!hasSearch.value) return posts.value;

  return posts.value.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.content,
      post.author,
      post.category,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(searchTerm.value);
  });
});

onMounted(fetchAll);
</script>

<style scoped>
.loading,
.error {
  padding: 40px;
  text-align: center;
  color: #888;
}
.featured {
  background: white;
  border: 0.5px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
}
.featured__badge {
  display: inline-block;
  background: #eeedfe;
  color: #534ab7;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
}
.featured__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
}
.featured__meta {
  font-size: 13px;
  color: #888;
  margin-bottom: 20px;
}
.featured__btn {
  display: inline-block;
  background: #534ab7;
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s;
}
.featured__btn:hover {
  background: #3c3489;
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}
.search-meta {
  font-size: 13px;
  color: #888;
  margin-bottom: 12px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.empty {
  padding: 28px;
  border: 0.5px solid #e5e5e5;
  border-radius: 12px;
  background: white;
  color: #777;
  text-align: center;
}
</style>
