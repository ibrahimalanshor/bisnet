<script setup>
import { Icon } from '@iconify/vue';
import { computed, useSlots } from 'vue';

const props = defineProps({
  icon: String,
  colorVariant: {
    type: String,
    default: 'solid',
  },
  color: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
});
const slot = useSlots();

const buttonColorClass = computed(() => {
  if (props.colorVariant === 'transparent') {
    return 'bg-transparent text-gray-900 hover:bg-gray-100';
  }

  const colors = {
    success: 'bg-green-600 text-white hover:bg-green-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
  };

  return colors[props.color];
});
const buttonSizeClass = computed(() => {
  if (!slot.default) {
    const sizes = {
      md: 'w-10 h-10 rounded-md',
      sm: 'w-8 h-8 rounded-md',
    };

    return sizes[props.size];
  }

  return '';
});
const iconSizeClass = computed(() => {
  if (props.sizeVariant === 'square') {
    return 'w-4 h-4';
  }

  return '';
});
</script>

<template>
  <button
    :class="[
      buttonSizeClass,
      buttonColorClass,
      'inline-flex items-center justify-center cursor-pointer',
    ]"
  >
    <Icon v-if="icon" :icon="icon" :class="iconSizeClass" />
  </button>
</template>
