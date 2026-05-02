<template>
  <span class="badge" :class="[`tag--${normalizedCategory}`, `badge--${size}`]">
    {{ displayLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  category: { type: String, required: true },
  label: { type: String, default: '' },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value),
  },
});

const normalizedCategory = computed(() => props.category.trim().toLowerCase());
const displayLabel = computed(() => props.label || props.category);
</script>

<style scoped>
.badge {
  display: inline-block;
  font-weight: 600;
  border-radius: 20px;
}

.badge--sm {
  font-size: 11px;
  padding: 2px 8px;
}

.badge--md {
  font-size: 12px;
  padding: 3px 12px;
}

.tag--vue {
  background: #e1f5ee;
  color: #0f6e56;
}
.tag--javascript {
  background: #faeeda;
  color: #854f0b;
}
.tag--patrones {
  background: #eeedfe;
  color: #534ab7;
}
.tag--css {
  background: #e6f1fb;
  color: #185fa5;
}

.badge:not(.tag--vue):not(.tag--javascript):not(.tag--patrones):not(.tag--css) {
  background: #f1f1f1;
  color: #555;
}
</style>
