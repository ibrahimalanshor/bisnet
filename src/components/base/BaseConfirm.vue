<script setup>
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';
import { Icon } from '@iconify/vue';

defineProps({
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
});
defineEmits(['confirm']);

const visible = defineModel('visible');
</script>

<template>
  <BaseModal size="xs" v-model:visible="visible">
    <div class="text-center mb-6 space-y-2">
      <Icon
        :icon="type === 'error' ? 'ri:alert-line' : 'ri:information-line'"
        :class="[
          'size-12 mx-auto',
          type === 'error' ? 'text-red-600' : 'text-blue-600',
        ]"
      />
      <h2 class="font-bold text-2xl">{{ title }}</h2>
      <p class="text-gray-700">{{ message }}</p>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <BaseButton
        :color="confirmColor"
        :loading="loading"
        @click="$emit('confirm')"
        >{{ confirmText }}</BaseButton
      >
      <BaseButton color="light" @click="visible = false">{{
        cancelText
      }}</BaseButton>
    </div>
  </BaseModal>
</template>
