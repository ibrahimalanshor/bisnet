<script setup>
const props = defineProps({
  sideCount: {
    type: Number,
    default: 1,
  },
  totalPages: Number,
});
const currentPage = defineModel();

const pages = computed(() => {
  let left = Math.max(1, currentPage.value - props.sideCount);

  if (left - 1 === 2) {
    left--;
  }

  let right = Math.min(currentPage.value + props.sideCount, props.totalPages);

  if (props.totalPages - right === 2) {
    right++;
  }

  return Array.from({ length: right - left }, (_, i) => i + 1);
});
</script>

<template>
  <nav>{{ pages }}</nav>
</template>
