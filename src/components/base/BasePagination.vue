<script setup>
import { computed, h } from 'vue';

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

  return Array.from({ length: right - left + 1 }, (_, i) => i + 1);
});
const hasEllipsisLeft = computed(
  () => currentPage.value >= props.sideCount + 4,
);
const hasEllipsisRight = computed(
  () => currentPage.value < props.totalPages - (2 + props.sideCount),
);

const PaginationButton = ({ name = '', type = 'link' }) => {
  if (type === 'ellipsis') {
    return h('span', '…');
  }

  return h('a', { href: '' }, name);
};
</script>

<template>
  <nav>
    <PaginationButton name="1" />
    <PaginationButton v-if="hasEllipsisLeft" type="ellipsis" />
    <PaginationButton v-for="page in pages" :key="page" :name="page" />
    <PaginationButton v-if="hasEllipsisLeft" type="ellipsis" />
    <PaginationButton :name="totalPages" />
  </nav>
</template>
