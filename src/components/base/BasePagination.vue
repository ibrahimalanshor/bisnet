<script setup>
import { computed, h } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  sideCount: {
    type: Number,
    default: 1,
  },
  totalPages: Number,
});
const emit = defineEmits(['change']);
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

  const res = [];

  for (let i = left; i <= right; i++) {
    res.push(i);
  }

  return res;
});
const hasFirstPage = computed(() => currentPage.value >= 2 + props.sideCount);
const hasLastPage = computed(
  () => currentPage.value <= props.totalPages - (1 + props.sideCount),
);
const hasEllipsisLeft = computed(
  () => currentPage.value >= props.sideCount + 4,
);
const hasEllipsisRight = computed(
  () => currentPage.value < props.totalPages - (2 + props.sideCount),
);

const PaginationButton = ({ name = '', type = 'link', active = false }) => {
  const classList = computed(() => {
    return [
      'block w-10 h-10 flex items-center justify-center',
      active ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100',
    ];
  });

  if (type === 'ellipsis') {
    return h(
      'span',
      { class: classList.value },
      h(Icon, { icon: 'ri:more-fill' }),
    );
  }

  if (type === 'prev') {
    return h(
      'span',
      { class: classList.value },
      h(Icon, { icon: 'ri:arrow-drop-left-line', class: 'size-6' }),
    );
  }

  if (type === 'next') {
    return h(
      'span',
      { class: classList.value },
      h(Icon, { icon: 'ri:arrow-drop-right-line', class: 'size-6' }),
    );
  }

  if (active) {
    return h('span', { class: classList.value }, name);
  }

  return h('a', { href: '', class: classList.value }, name);
};

function onChangePage(page) {
  if (page !== currentPage.value) {
    currentPage.value = page;

    emit('change');
  }
}
</script>

<template>
  <nav
    class="w-fit flex items-center border divide-x border-gray-300 divide-gray-300 rounded-md mx-auto overflow-hidden"
  >
    <PaginationButton
      v-if="currentPage > 1"
      type="prev"
      @click.prevent="onChangePage(currentPage - 1)"
    />
    <PaginationButton
      v-if="hasFirstPage"
      name="1"
      @click.prevent="onChangePage(1)"
    />
    <PaginationButton v-if="hasEllipsisLeft" type="ellipsis" />
    <PaginationButton
      v-for="page in pages"
      :key="page"
      :name="page"
      :active="currentPage === page"
      @click.prevent="onChangePage(page)"
    />
    <PaginationButton v-if="hasEllipsisRight" type="ellipsis" />
    <PaginationButton
      v-if="hasLastPage"
      :name="totalPages"
      @click.prevent="onChangePage(totalPages)"
    />
    <PaginationButton
      v-if="currentPage < totalPages"
      type="next"
      @click.prevent="onChangePage(currentPage + 1)"
    />
  </nav>
</template>
