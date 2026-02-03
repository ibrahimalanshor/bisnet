<script setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  product: Object,
});

const hasMoreStock = computed(
  () => props.product.attributes.stock >= props.product.attributes.min_stock,
);
const message = computed(() => {
  if (hasMoreStock.value) {
    return '';
  }

  return props.product.stock < 1 ? 'Stok habis' : 'Stok hampir hampir';
});
const iconColor = computed(() => {
  if (hasMoreStock.value) {
    return '';
  }

  return props.product.attributes.stock < 1
    ? 'text-red-600'
    : 'text-yellow-600';
});
</script>

<template>
  <div class="w-fit flex items-center gap-2" v-tooltip.bottom="message">
    <Icon v-if="!hasMoreStock" icon="ri:alert-fill" :class="iconColor" />
    {{ product.attributes.stock }}
  </div>
</template>
