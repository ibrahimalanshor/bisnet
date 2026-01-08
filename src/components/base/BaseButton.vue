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
  loading: Boolean,
  tag: {
    type: String,
    default: 'button',
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
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    light: 'bg-white border border-gray-300',
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

  const sizes = {
    md: 'h-10 px-3 rounded-md',
  };

  return sizes[props.size];
});
const iconSizeClass = computed(() => {
  if (props.sizeVariant === 'square') {
    return 'w-4 h-4';
  }

  return '';
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      buttonSizeClass,
      buttonColorClass,
      'font-medium inline-flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
    ]"
    :disabled="loading"
  >
    <Icon
      v-if="loading"
      icon="ri:loader-4-fill"
      :class="['animate-spin', iconSizeClass]"
    />
    <Icon v-else-if="icon" :icon="icon" :class="iconSizeClass" />

    <slot />
  </component>
</template>
