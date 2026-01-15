<script setup>
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  title: String,
  message: String,
  confirmText: String,
  confirmColor: {
    type: String,
    default: 'error',
  },
  cancelText: String,
  loading: Boolean,
  type: {
    type: String,
    default: 'error',
  },
  disabled: Boolean,
});
defineEmits(['confirm']);

const visible = defineModel('visible');

const icon = computed(() => {
  return {
    error: 'ri:alert-fill',
    info: 'ri:information-fill',
    success: 'ri:checkbox-circle-fill',
  }[props.type];
});
const iconColorClass = computed(() => {
  return {
    error: 'text-red-600',
    info: 'text-blue-600',
    success: 'text-green-600',
  }[props.type];
});
</script>

<template>
  <BaseModal vertical-align="center" size="xs" v-model:visible="visible">
    <div class="text-center mb-6 space-y-2">
      <Icon :icon="icon" :class="['size-12 mx-auto', iconColorClass]" />
      <h2 class="font-bold text-2xl">{{ title }}</h2>
      <slot name="message">
        <p class="text-gray-700">{{ message }}</p>
      </slot>
    </div>
    <slot name="action">
      <div class="grid grid-cols-2 gap-2">
        <BaseButton
          :color="confirmColor"
          :loading="loading"
          :disabled="disabled"
          @click="$emit('confirm')"
          >{{ confirmText }}</BaseButton
        >
        <BaseButton color="light" @click="visible = false">{{
          cancelText
        }}</BaseButton>
      </div>
    </slot>
  </BaseModal>
</template>
