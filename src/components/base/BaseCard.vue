<script setup>
defineProps({
  title: String,
  bordered: {
    type: Boolean,
    default: true,
  },
  responsive: Boolean,
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
        :class="[
          'border-b border-gray-300 px-4 py-3 flex',
          responsive
            ? 'flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0'
            : 'items-center justify-between',
        ]"
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
