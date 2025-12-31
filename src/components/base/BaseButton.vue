<script setup>
import { Icon } from '@iconify/vue';
import { computed, useSlots } from 'vue';

const props = defineProps({
  icon: String,
  colorVariant: {
    type: String,
    default: 'solid',
  },
});
const slot = useSlots();

const buttonColorClass = computed(() => {
  if (props.colorVariant === 'transparent') {
    return 'bg-transparent text-gray-900 hover:bg-gray-100';
  }

  return '';
});
const buttonSizeClass = computed(() => {
  if (!slot.default) {
    return 'w-10 h-10 rounded-md';
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
      'flex items-center justify-center',
    ]"
  >
    <Icon v-if="icon" :icon="icon" :class="iconSizeClass" />
  </button>
</template>
