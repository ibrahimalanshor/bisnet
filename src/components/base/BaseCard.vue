<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div :class="['bg-white shadow-xl rounded-lg', !!title ? '' : 'p-4']">
    <div
      v-if="title"
      class="border-b border-gray-300 px-4 py-3 flex items-center justify-between"
    >
      <h3 class="font-bold text-xl">{{ title }}</h3>
      <slot name="action" />
    </div>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>
