<script setup>
import { computed } from 'vue';

const props = defineProps({
  level: {
    type: Number,
    default: 1,
  },
});

const sizeClass = computed(() => {
  return {
    1: 'text-3xl xl:text-4xl',
    3: 'text-xl xl:text-2xl',
  }[props.level];
});
</script>

<template>
  <div
    class="flex flex-wrap gap-4 flex-col sm:flex-row sm:items-center sm:justify-between"
  >
    <component :is="`h${level}`" :class="['font-bold', sizeClass]">
      <slot />
    </component>
    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>
