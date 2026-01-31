<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  bordered: {
    type: Boolean,
    default: true,
  },
  responsive: Boolean,
  responsiveScreen: {
    type: String,
    default: 'sm',
  },
  customClass: {
    type: Object,
    default: () => ({}),
  },
  paddless: Boolean,
});

const responsiveClass = computed(() => {
  return {
    sm: 'sm:flex-row sm:items-center sm:justify-between sm:gap-0',
    md: 'md:flex-row md:items-center md:justify-between md:gap-0',
  }[props.responsiveScreen];
});
</script>

<template>
  <div
    :class="[
      'bg-white rounded-lg',
      !!title || $slots.header ? '' : paddless ? '' : 'p-4',
      bordered ? 'border border-gray-300' : '',
    ]"
  >
    <slot name="header">
      <div
        v-if="title"
        :class="[
          'border-b border-gray-300 px-4 py-3 flex',
          responsive
            ? ['flex-col gap-2', responsiveClass]
            : 'items-center justify-between',
          customClass.header,
        ]"
      >
        <h3 class="font-bold text-xl">{{ title }}</h3>
        <slot name="action" />
      </div>
    </slot>
    <div :class="title && !paddless ? 'p-4' : ''">
      <slot />
    </div>
  </div>
</template>
