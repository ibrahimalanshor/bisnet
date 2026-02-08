<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  colorVariant: {
    type: String,
    default: 'solid',
  },
  size: {
    type: String,
    default: 'md',
  },
});

const colorClass = computed(() => {
  if (props.colorVariant === 'solid') {
    return {
      success: 'bg-green-600 text-white',
      primary: 'bg-blue-600 text-white',
      error: 'bg-red-600 text-white',
      warning: 'bg-yellow-600 text-white',
    }[props.color];
  }

  return {
    success: 'bg-green-100 text-green-800',
    primary: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
  }[props.color];
});
const sizeClass = computed(() => {
  return {
    sm: 'h-5',
    md: 'h-6',
  }[props.size];
});
</script>

<template>
  <span
    :class="[
      'text-sm font-medium inline-flex items-center justify-center px-2 rounded',
      colorClass,
      sizeClass,
    ]"
    ><slot
  /></span>
</template>
