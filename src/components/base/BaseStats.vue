<script setup>
import BaseCard from './BaseCard.vue';
import { Icon } from '@iconify/vue';
import { formatCurrency } from '../../utils/common.js';
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  trend: Number,
  color: {
    type: String,
    default: 'success',
  },
});

const colorClass = computed(() => {
  return {
    success: {
      bg: 'bg-green-600',
      icon: 'text-green-100',
    },
    info: {
      bg: 'bg-blue-600',
      icon: 'text-blue-100',
    },
    error: {
      bg: 'bg-red-600',
      icon: 'text-red-100',
    },
    warning: {
      bg: 'bg-yellow-600',
      icon: 'text-yellow-100',
    },
  }[props.color];
});
</script>

<template>
  <BaseCard>
    <div class="flex gap-3 items-center">
      <div
        :class="[
          'w-14 h-14 rounded-md flex items-center justify-center',
          colorClass.bg,
        ]"
      >
        <Icon :icon="icon" :class="['size-6', colorClass.icon]" />
      </div>
      <div>
        <p class="text-sm font-medium tracking-wide text-gray-500">
          {{ label }}
        </p>
        <p class="font-bold text-gray-900 text-xl">
          {{ formatCurrency(value) }}
        </p>
      </div>
      <span>
        {{ trend }}
      </span>
    </div>
  </BaseCard>
</template>
