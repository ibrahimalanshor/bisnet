<script setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  closable: Boolean,
  color: {
    type: String,
    default: 'error',
  },
});
defineEmits(['close']);

const colorClass = computed(() => {
  return {
    error: 'bg-red-100 border-red-400 text-red-900',
    success: 'bg-green-100 border-green-400 text-green-900',
  }[props.color];
});
</script>

<template>
  <div
    :class="[
      'flex gap-2 justify-between px-3.5 py-3 border rounded-md',
      colorClass,
    ]"
  >
    <div class="flex gap-2">
      <Icon icon="ri:error-warning-line" class="size-4 mt-1" />
      <slot />
    </div>

    <button v-if="closable" @click="$emit('close')">
      <Icon icon="ri:close-fill" class="size-4" />
    </button>
  </div>
</template>
