<script setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  closable: Boolean,
  color: {
    type: String,
    default: 'error',
  },
  withIcon: {
    type: Boolean,
    default: true,
  },
});
defineEmits(['close']);

const colorClass = computed(() => {
  return {
    error: 'bg-red-100 border-red-400 text-red-900',
    success: 'bg-green-100 border-green-400 text-green-900',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-900',
    primary: 'bg-blue-100 border-blue-400 text-blue-900',
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
    <div class="flex gap-2 font-medium grow">
      <Icon v-if="withIcon" icon="ri:error-warning-line" class="size-4 mt-1" />
      <slot />
    </div>

    <slot name="action">
      <button v-if="closable" @click="$emit('close')" class="shrink-0">
        <Icon icon="ri:close-fill" class="size-4" />
      </button>
    </slot>
  </div>
</template>
