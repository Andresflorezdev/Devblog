<template>
  <RouterLink :to="`/post/${post.slug}`" class="card">
    <img :src="post.image" :alt="post.title" class="card__img" />
    <div class="card__body">
      <span class="card__tag" :class="`tag--${post.category}`">{{ post.category }}</span>
      <h3 class="card__title">{{ post.title }}</h3>
      <p class="card__excerpt">{{ post.excerpt }}</p>
      <div class="card__meta">
        <span>{{ post.author }}</span>
        <span>{{ post.readTime }} min</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  post: { type: Object, required: true }
})
</script>

<style scoped>
.card {
  display: block;
  background: white;
  border: 0.5px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, transform 0.15s;
}
.card:hover { border-color: #534AB7; transform: translateY(-2px); }
.card__img  { width: 100%; height: 160px; object-fit: cover; display: block; }
.card__body { padding: 16px; }
.card__tag  {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  margin-bottom: 8px;
}
.tag--vue        { background: #E1F5EE; color: #0F6E56; }
.tag--javascript { background: #FAEEDA; color: #854F0B; }
.tag--patrones   { background: #EEEDFE; color: #534AB7; }
.tag--css        { background: #E6F1FB; color: #185FA5; }
.card__title   { font-size: 15px; font-weight: 600; margin-bottom: 6px; line-height: 1.4; }
.card__excerpt { font-size: 13px; color: #666; line-height: 1.5; margin-bottom: 12px; }
.card__meta    {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #aaa;
  border-top: 0.5px solid #f0f0f0;
  padding-top: 10px;
}
</style>