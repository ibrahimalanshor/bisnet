<script setup>
defineProps({
  title: String,
  bordered: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div
    :class="[
      'bg-white rounded-lg',
      !!title || $slots.header ? '' : 'p-4',
      bordered ? 'border border-gray-300' : '',
    ]"
  >
    <slot name="header">
      <div
        v-if="title"
        class="border-b border-gray-300 px-4 py-3 flex items-center justify-between"
      >
        <h3 class="font-bold text-xl">{{ title }}</h3>
        <slot name="action" />
      </div>
    </slot>
    <div :class="title ? 'p-4' : ''">
      <slot />
    </div>
  </div>
</template>
