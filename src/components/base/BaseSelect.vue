<script setup>
import { computed } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    default: 'md',
  },
  width: {
    type: String,
    default: 'full',
  },
});

const selected = defineModel();

const sizeClass = computed(() => {
  return {
    sm: 'h-8 px-2',
    md: 'h-10 px-2.5',
  }[props.size];
});
const classList = computed(() => [
  sizeClass.value,
  props.width === 'full' ? 'w-full' : '',
  'px-2.5 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 disabled:bg-gray-100',
]);
</script>

<template>
  <select :class="classList" v-model="selected">
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>
