<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div
    class="bg-red-100 flex gap-2 p-4 border border-red-400 rounded-md text-red-900"
  >
    <Icon icon="ri:error-warning-line" class="size-4 mt-1" />
    <slot />
  </div>
</template>
