<template>
  <div class="spinner-wrap" role="status" aria-live="polite">
    <span class="spinner" :class="`spinner--${size}`" aria-hidden="true"></span>
    <p v-if="label" class="spinner-label">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
});
</script>

<style scoped>
.spinner-wrap {
  display: grid;
  place-items: center;
  gap: 10px;
  padding: 24px;
}

.spinner {
  display: inline-block;
  border: 2px solid #e8e8e8;
  border-top-color: #534ab7;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner--sm {
  width: 16px;
  height: 16px;
}
.spinner--md {
  width: 24px;
  height: 24px;
}
.spinner--lg {
  width: 34px;
  height: 34px;
}

.spinner-label {
  margin: 0;
  font-size: 13px;
  color: #777;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
