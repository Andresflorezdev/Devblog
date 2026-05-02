<template>
  <div>
    <BaseSpinner v-if="loading" label="Cargando posts..." />

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <section
        v-if="showFeatured && featured && !categorySlug"
        class="featured"
      >
        <span class="featured__badge">Destacado</span>
        <h1 class="featured__title">{{ featured.title }}</h1>
        <p class="featured__meta">
          {{ featured.author }} · {{ featured.date }} ·
          {{ featured.readTime }} min
        </p>
        <RouterLink :to="`/post/${featured.slug}`" class="featured__btn">
          Leer articulo ->
        </RouterLink>
      </section>

      <section class="posts-grid">
        <h2 class="section-title">{{ title }}</h2>
        <div v-if="posts.length" class="grid">
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
        <p v-else class="empty">No hay posts para mostrar.</p>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import PostCard from '@/components/blog/PostCard.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import { usePosts } from '@/composables/usePosts';

const props = defineProps({
  categorySlug: { type: String, default: '' },
  showFeatured: { type: Boolean, default: true },
  title: { type: String, default: 'Ultimos posts' },
});

const { posts, featured, loading, error, fetchAll, fetchByCategory } =
  usePosts();

const normalizedCategory = computed(() => props.categorySlug.trim());

async function loadPosts() {
  if (normalizedCategory.value) {
    await fetchByCategory(normalizedCategory.value);
    return;
  }
  await fetchAll();
}

onMounted(loadPosts);

watch(
  () => props.categorySlug,
  () => {
    loadPosts();
  },
);
</script>

<style scoped>
.error {
  padding: 40px;
  text-align: center;
  color: #e24b4a;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #888;
  font-size: 14px;
  background: white;
  border: 0.5px solid #e5e5e5;
  border-radius: 12px;
}
</style>
