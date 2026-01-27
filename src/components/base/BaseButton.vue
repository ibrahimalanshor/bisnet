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
  iconPosition: {
    type: String,
    default: 'start',
  },
  disabled: Boolean,
});
const slot = useSlots();

const buttonColorClass = computed(() => {
  if (props.colorVariant === 'transparent') {
    const colors = {
      primary: 'bg-transparent text-gray-900 hover:bg-gray-100',
      error: 'bg-transparent text-gray-900 hover:bg-red-600 hover:text-white',
    };

    return colors[props.color];
  }

  const colors = {
    success: 'bg-green-600 text-white hover:bg-green-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    light: 'bg-white border border-gray-300 hover:bg-gray-100',
  };

  return colors[props.color];
});
const buttonSizeClass = computed(() => {
  if (!slot.default) {
    const sizes = {
      md: 'w-10 h-10 rounded-md',
      sm: 'w-8 h-8 rounded-md',
      xs: 'w-6 h-6 rounded',
    };

    return sizes[props.size];
  }

  const sizes = {
    sm: 'h-8 px-3 rounded-md',
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
      'font-medium inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50',
    ]"
    :disabled="loading || disabled"
  >
    <Icon
      v-if="loading"
      icon="ri:loader-4-fill"
      :class="['animate-spin', iconSizeClass]"
    />
    <Icon
      v-else-if="icon && iconPosition === 'start'"
      :icon="icon"
      :class="iconSizeClass"
    />

    <slot />

    <Icon
      v-if="!loading && icon && iconPosition === 'end'"
      :icon="icon"
      :class="iconSizeClass"
    />
  </component>
</template>
